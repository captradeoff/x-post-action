const core = require("@actions/core");
const { TwitterApi } = require("twitter-api-v2");

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

  const { data: createdTweet } = await userClient.v2.tweet(message, tweetProps);
  console.log("Tweet #", createdTweet.id, ": ", createdTweet.text);
  core.setOutput("post-id", createdTweet.id);
} catch (error) {
  core.setFailed(error.message);
}
