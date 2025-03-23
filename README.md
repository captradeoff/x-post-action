# X Post Action ![GitHub Repo stars](https://img.shields.io/github/stars/captradeoff/x-post-action)

A GitHub Action that posts messages to X (formerly Twitter) communities.

## Description

This action allows you to automatically post messages to X from your GitHub workflow. It can be used to announce new releases, share updates, or integrate your GitHub workflow with X communities.

## Inputs

| Input          | Description                         | Required | Default       |
|----------------|-------------------------------------|----------|---------------|
| `appKey`       | The X API app key                   | Yes      | -             |
| `appSecret`    | The X API app secret                | Yes      | -             |
| `accessToken`  | The X API access token              | Yes      | -             |
| `accessSecret` | The X API access secret             | Yes      | -             |
| `message`      | The message to post to X            | Yes      | 'Hello, world!' |
| `community-id` | The ID of the community to post to  | No       | null          |

## Outputs

| Output    | Description         |
|-----------|---------------------|
| `post-id` | The ID of the post  |

## Example Usage

```yaml
name: Post to X

on:
  release:
    types: [published]

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - name: Post to X
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'New release ${{ github.event.release.tag_name }} is now available!'
          community-id: '123456789'
```

## How It Works

This action uses the Twitter API v2 (via the `twitter-api-v2` npm package) to post messages to X. It supports:

- Posting text messages to your X account
- Posting to a specific X community (optional)
- Returns the post ID for further processing

## Setting Up X API Credentials

To use this action, you'll need to create an X Developer account and set up an app:

1. Visit the [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new app or use an existing one
3. Generate the following credentials:
   - App Key and App Secret
   - Access Token and Access Secret

These values should be stored as secrets in your GitHub repository and passed to the action as inputs.

## License

[MIT](./license)

## Development

This project uses Node.js and the Twitter API v2 client.

### Prerequisites

- Node.js (v20 recommended)
- X Developer account and API credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/captradeoff/x-post-action.git
cd x-post-action

# Install dependencies
npm install
```

### Building

The action uses @vercel/ncc to compile the Node.js code and dependencies into a single file:

```bash
npm run build
```

This will create a `dist/index.js` file that is referenced in `action.yaml`.

### Testing

This project uses Jest for testing. To run the tests:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the tests with `npm test`

The tests use mocks for the Twitter API and GitHub Actions core module to verify functionality without making actual API calls.

Coverage report is generated automatically when running the tests. You can view the HTML coverage report in the `coverage` directory.

### Integration Testing

In addition to unit tests with mocks, there are also integration tests that make actual calls to the X API:

1. Copy the `.env.sample` file to `.env` and fill in with your X API credentials:
   ```bash
   cp .env.sample .env
   ```

2. Edit the `.env` file and replace placeholders with your actual API keys and tokens:
   ```
   X_APP_KEY=your_actual_app_key
   X_APP_SECRET=your_actual_app_secret
   X_ACCESS_TOKEN=your_actual_access_token
   X_ACCESS_SECRET=your_actual_access_secret
   ```

3. Run the integration tests:
   ```bash
   # Run direct API integration test
   npm run test:integration
   
   # Run action function integration test
   npm run test:integration-action
   
   # Run all integration tests
   npm run test:integration-all
   ```

The integration tests include:

- **Direct API Test**: Tests the X API directly using credentials from .env
- **Action Function Test**: Tests the postTweet function exported from index.js

Both tests will:
- Post actual tweets to your X account
- Include extensive logging for debugging
- Skip tests automatically if environment variables aren't set
- Add a timestamp to make each test message unique

**Note:** Be careful with integration tests as they make real API calls and will post actual tweets to your account.

## Dependencies

- [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core): Core functions for GitHub Actions
- [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github): GitHub Actions Toolkit
- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2): Twitter API v2 client for Node.js

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
