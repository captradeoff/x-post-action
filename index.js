const core = require("@actions/core");
const { TwitterApi } = require("twitter-api-v2");

// Export the function for testing
async function postTweet() {
  try {
    // Log debug information for troubleshooting
    console.log("Starting postTweet function");
    
    // Get input parameters with debug logging
    const appKey = core.getInput("appKey");
    const appSecret = core.getInput("appSecret");
    const accessToken = core.getInput("accessToken");
    const accessSecret = core.getInput("accessSecret");
    
    console.log("Creating TwitterApi client");
    const userClient = new TwitterApi({
      appKey,
      appSecret,
      accessToken,
      accessSecret,
    });

    const message = core.getInput("message");
    const communityId = core.getInput("community-id");
    const tweetProps = {};

    if (communityId) {
      tweetProps.community_id = communityId;
    }

    console.log("Sending tweet:", message, "with props:", JSON.stringify(tweetProps));
    const result = await userClient.v2.tweet(message, tweetProps);
    console.log("Tweet #", result.data.id, ": ", result.data.text);
    core.setOutput("post-id", result.data.id);
    return result;
  } catch (error) {
    console.error("Error in postTweet:", error);
    // More detailed error reporting
    if (error.code === 401) {
      console.error("Authentication failed. Please check your credentials.");
    }
    
    // Log all error details
    if (error.data) {
      console.error("Error details:", JSON.stringify(error.data));
    }
    
    core.setFailed(error.message);
    throw error;
  }
}

// Ensure we always run the action when the file is executed directly or by GitHub Actions
// This is the main entry point of the action
if (require.main === module) {
  console.log("Running X Post Action...");
  postTweet().catch(error => {
    // Error already handled in postTweet
    console.error("Action failed:", error.message);
  });
}

// Export for testing
module.exports = {
  postTweet
};
