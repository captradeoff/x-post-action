const core = require('@actions/core');
const { TwitterApi } = require('twitter-api-v2');
const { postTweet } = require('./index');

// Mock dependencies
jest.mock('@actions/core');
jest.mock('twitter-api-v2');

describe('X Post GitHub Action', () => {
  beforeEach(() => {
    // Clear mocks
    jest.clearAllMocks();
  });

  test('should post a tweet successfully', async () => {
    // Setup mocks for inputs
    core.getInput = jest.fn(name => {
      switch (name) {
        case 'appKey': return 'test-app-key';
        case 'appSecret': return 'test-app-secret';
        case 'accessToken': return 'test-access-token';
        case 'accessSecret': return 'test-access-secret';
        case 'message': return 'Test message';
        case 'community-id': return '';
        default: return '';
      }
    });

    // Setup mock for Twitter API
    const mockTweet = jest.fn().mockResolvedValue({
      data: { id: '123456789', text: 'Test message' }
    });
    
    TwitterApi.mockImplementation(() => ({
      v2: { tweet: mockTweet }
    }));

    // Call function under test
    await postTweet();

    // Verify TwitterApi was created with correct credentials
    expect(TwitterApi).toHaveBeenCalledWith({
      appKey: 'test-app-key',
      appSecret: 'test-app-secret',
      accessToken: 'test-access-token',
      accessSecret: 'test-access-secret'
    });

    // Verify tweet was posted with correct message
    expect(mockTweet).toHaveBeenCalledWith('Test message', {});

    // Verify output was set
    expect(core.setOutput).toHaveBeenCalledWith('post-id', '123456789');
  });

  test('should include community ID when provided', async () => {
    // Setup mocks for inputs
    core.getInput = jest.fn(name => {
      switch (name) {
        case 'appKey': return 'test-app-key';
        case 'appSecret': return 'test-app-secret';
        case 'accessToken': return 'test-access-token';
        case 'accessSecret': return 'test-access-secret';
        case 'message': return 'Test message';
        case 'community-id': return '987654321';
        default: return '';
      }
    });

    // Setup mock for Twitter API
    const mockTweet = jest.fn().mockResolvedValue({
      data: { id: '123456789', text: 'Test message' }
    });
    
    TwitterApi.mockImplementation(() => ({
      v2: { tweet: mockTweet }
    }));

    // Call function under test
    await postTweet();

    // Verify tweet was posted with community ID
    expect(mockTweet).toHaveBeenCalledWith('Test message', { community_id: '987654321' });
  });

  test('should handle Twitter API errors', async () => {
    // Setup mocks
    core.getInput = jest.fn(() => 'test value');
    
    const mockTweet = jest.fn().mockRejectedValue(new Error('API error'));
    TwitterApi.mockImplementation(() => ({
      v2: { tweet: mockTweet }
    }));

    // Call function and expect it to throw
    await expect(postTweet()).rejects.toThrow('API error');
    
    // Verify error was reported
    expect(core.setFailed).toHaveBeenCalledWith('API error');
  });

  test('should handle initialization errors', async () => {
    // Setup mocks to throw an error
    core.getInput = jest.fn(() => {
      throw new Error('Input error');
    });

    // Call function and expect it to throw
    await expect(postTweet()).rejects.toThrow('Input error');
    
    // Verify error was reported
    expect(core.setFailed).toHaveBeenCalledWith('Input error');
  });
}); 