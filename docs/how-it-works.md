# ⚙️ how it works

## architecture

the x post action uses the twitter api v2 (via the `twitter-api-v2` npm package) to post messages to x.

when your github workflow runs, the action:

1. authenticates with the x api using your credentials
2. creates a new post with your specified message
3. optionally associates the post with a community
4. returns the post id for further processing

## supported features

- posting text messages to your x account
- posting to a specific x community (optional)
- returning the post id for further processing

## technical details

the action is built with node.js and uses the following core components:

- [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core): core functions for github actions
- [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github): github actions toolkit
- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2): twitter api v2 client for node.js

the action is compiled using @vercel/ncc to create a single javascript file with all dependencies included, making it fast and reliable to use in your workflows.

## error handling

the action implements comprehensive error handling to:

- validate all required inputs
- provide clear error messages if the api request fails
- report detailed diagnostic information for troubleshooting
- gracefully handle rate limiting and other api restrictions 