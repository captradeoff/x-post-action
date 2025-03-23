/**
 * Integration Test for the postTweet Action Function
 * 
 * This test uses the actual postTweet function with environment variables
 * to make real API calls to X.
 */

// Load environment variables from .env
require('dotenv').config();

const core = require('@actions/core');
const util = require('util');
const { postTweet } = require('./index');

// Skip the tests if no environment variables are set
const hasEnvVars = process.env.X_APP_KEY && 
                  process.env.X_APP_SECRET && 
                  process.env.X_ACCESS_TOKEN && 
                  process.env.X_ACCESS_SECRET;

// Mock the core module
jest.mock('@actions/core');

// Special describe block for integration tests
describe('X Post Action Function - INTEGRATION TEST', () => {
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

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    if (!hasEnvVars) {
      debugLog('ENVIRONMENT CHECK', 'Missing required environment variables - tests will be skipped');
      return;
    }

    debugLog('ENVIRONMENT CHECK', 'Environment variables found, proceeding with tests');
    
    // Create a timestamp to make each test message unique
    const timestamp = new Date().toISOString();
    testMessage = (process.env.TEST_MESSAGE || 'Integration test message for action').replace('[timestamp]', timestamp);
    
    debugLog('TEST SETUP', {
      message: testMessage,
      communityId: process.env.TEST_COMMUNITY_ID || 'None'
    });

    // Mock the getInput method to use environment variables
    core.getInput = jest.fn((name) => {
      debugLog('CORE.GETINPUT CALL', { input: name });
      
      switch (name) {
        case 'appKey':
          return process.env.X_APP_KEY;
        case 'appSecret':
          return process.env.X_APP_SECRET;
        case 'accessToken':
          return process.env.X_ACCESS_TOKEN;
        case 'accessSecret':
          return process.env.X_ACCESS_SECRET;
        case 'message':
          return testMessage;
        case 'community-id':
          return process.env.TEST_COMMUNITY_ID || '';
        default:
          return '';
      }
    });

    // Mock setOutput to log the output
    core.setOutput = jest.fn((name, value) => {
      debugLog('CORE.SETOUTPUT CALL', { name, value });
    });

    // Mock setFailed to log any failures
    core.setFailed = jest.fn((message) => {
      debugLog('CORE.SETFAILED CALL', { message });
    });
  });

  // Test the postTweet function
  test('should post tweet using postTweet function', async () => {
    // Skip if environment variables aren't set
    if (!hasEnvVars) {
      console.log('Skipping integration test - no environment variables');
      return;
    }

    debugLog('TEST EXECUTION', 'Starting postTweet function test');
    
    try {
      debugLog('CALLING POSTWEET', 'About to call the postTweet function');
      
      // Call the function
      const result = await postTweet();
      
      debugLog('POSTWEET RESULT', result);
      
      // Verify we got a result
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
      expect(result.data.id).toBeDefined();
      expect(result.data.text).toBe(testMessage);
      
      // Verify setOutput was called with the tweet ID
      expect(core.setOutput).toHaveBeenCalledWith('post-id', result.data.id);
      
      console.log(`✅ Successfully posted tweet #${result.data.id}: ${result.data.text}`);
    } catch (error) {
      debugLog('POSTWEET ERROR', {
        message: error.message,
        stack: error.stack,
        details: error
      });
      
      // Fail the test
      fail(`Failed to post tweet: ${error.message}`);
    }
  }, 30000); // Increase timeout to 30 seconds for API call
}); 