const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const message = core.getInput('message');
  const communityId = core.getInput('community-id');
  console.log(message, communityId);
  const postId = 666;
  core.setOutput("post-id", postId);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
