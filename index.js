const core = require("@actions/core");
const { TwitterApi } = require("twitter-api-v2");

// Export the function for testing
async function postTweet() {
  try {
    const userClient = new TwitterApi({
      appKey: core.getInput("appKey"),
      appSecret: core.getInput("appSecret"),
      accessToken: core.getInput("accessToken"),
      accessSecret: core.getInput("accessSecret"),
    });

    const message = core.getInput("message");
    const communityId = core.getInput("community-id");
    const tweetProps = {};

    if (communityId) {
      tweetProps.community_id = communityId;
    }

    const result = await userClient.v2.tweet(message, tweetProps);
    console.log("Tweet #", result.data.id, ": ", result.data.text);
    core.setOutput("post-id", result.data.id);
    return result;
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

// Only run the action if this file is being run directly
if (require.main === module) {
  postTweet().catch(error => {
    // Error already handled in postTweet
  });
}

// Export for testing
module.exports = {
  postTweet
};
