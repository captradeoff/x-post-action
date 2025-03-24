# testing

this project uses jest for testing with both unit tests and integration tests.

## unit tests

the unit tests mock the twitter api and github actions core module to verify functionality without making actual api calls.

to run the unit tests:

```bash
npm test
```

this will run all test files matching `*.test.js` in the project root.

coverage report is generated automatically when running the tests. you can view the html coverage report in the `coverage` directory.

## integration tests

integration tests make actual calls to the x api to verify real-world functionality.

### setup for integration tests

1. copy the `.env.sample` file to `.env` and fill in with your x api credentials:
   ```bash
   cp .env.sample .env
   ```

2. edit the `.env` file and replace placeholders with your actual api keys and tokens:
   ```
   X_APP_KEY=your_actual_app_key
   X_APP_SECRET=your_actual_app_secret
   X_ACCESS_TOKEN=your_actual_access_token
   X_ACCESS_SECRET=your_actual_access_secret
   ```

### running integration tests

there are several integration test scripts available:

```bash
# run direct api integration test
npm run test:integration

# run action function integration test
npm run test:integration-action

# run all integration tests
npm run test:integration-all
```

### integration test details

the integration tests include:

- **direct api test**: tests the x api directly using credentials from .env
- **action function test**: tests the postTweet function exported from index.js

both tests will:
- post actual tweets to your x account
- include extensive logging for debugging
- skip tests automatically if environment variables aren't set
- add a timestamp to make each test message unique

**note:** be careful with integration tests as they make real api calls and will post actual tweets to your account. 