/**
 * Integration Test for X Post Action
 * 
 * This test actually calls the X API with credentials from .env file.
 * Make sure you have filled in your credentials in the .env file before running.
 */

// Load environment variables from .env
require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');
const util = require('util');

// Skip the tests if no environment variables are set
const hasEnvVars = process.env.X_APP_KEY && 
                  process.env.X_APP_SECRET && 
                  process.env.X_ACCESS_TOKEN && 
                  process.env.X_ACCESS_SECRET;

// Special describe block for integration tests
describe('X Post Action - INTEGRATION TEST', () => {
  let twitterClient;
  let testMessage;

  // Debug function to log detailed information
  const debugLog = (label, data) => {
    console.log('\n==========================================');
    console.log(`DEBUG [${label}]:`);
    if (typeof data === 'object') {
      console.log(util.inspect(data, { colors: true, depth: 5, compact: false }));
    } else {
      console.log(data);
    }
    console.log('==========================================\n');
  };

  beforeAll(() => {
    if (!hasEnvVars) {
      debugLog('ENVIRONMENT CHECK', 'Missing required environment variables - tests will be skipped');
      return;
    }

    debugLog('ENVIRONMENT CHECK', 'Environment variables found, proceeding with tests');
    
    // Create a timestamp to make each test message unique
    const timestamp = new Date().toISOString();
    testMessage = (process.env.TEST_MESSAGE || 'Integration test message').replace('[timestamp]', timestamp);
    
    debugLog('TEST SETUP', {
      message: testMessage,
      communityId: process.env.TEST_COMMUNITY_ID || 'None'
    });

    // Initialize the Twitter client
    try {
      debugLog('CLIENT INITIALIZATION', 'Creating Twitter client with credentials');
      twitterClient = new TwitterApi({
        appKey: process.env.X_APP_KEY,
        appSecret: process.env.X_APP_SECRET,
        accessToken: process.env.X_ACCESS_TOKEN,
        accessSecret: process.env.X_ACCESS_SECRET
      });
      
      debugLog('CLIENT INITIALIZATION', 'Twitter client created successfully');
    } catch (error) {
      debugLog('CLIENT INITIALIZATION ERROR', error);
      throw error;
    }
  });

  // Test for posting a tweet
  test('should post to X using actual API', async () => {
    // Skip if environment variables aren't set
    if (!hasEnvVars) {
      console.log('Skipping integration test - no environment variables');
      return;
    }

    debugLog('TEST EXECUTION', 'Starting tweet post test');
    
    const tweetProps = {};

    // Add community ID if provided
    if (process.env.TEST_COMMUNITY_ID) {
      debugLog('COMMUNITY ID', `Using community ID: ${process.env.TEST_COMMUNITY_ID}`);
      tweetProps.community_id = process.env.TEST_COMMUNITY_ID;
    }

    try {
      debugLog('API CALL', {
        message: testMessage,
        properties: tweetProps
      });

      // Make the actual API call
      const result = await twitterClient.v2.tweet(testMessage, tweetProps);
      
      debugLog('API RESPONSE', result);
      
      // Verify we got a result
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.id).toBeDefined();
      expect(result.data.text).toBe(testMessage);
      
      console.log(`✅ Successfully posted tweet #${result.data.id}: ${result.data.text}`);
    } catch (error) {
      debugLog('API ERROR', {
        message: error.message,
        stack: error.stack,
        details: error
      });
      
      // Fail the test
      fail(`Failed to post tweet: ${error.message}`);
    }
  }, 30000); // Increase timeout to 30 seconds for API call
}); 