# x post action - post from github action to [x.com](x.com)

[![node.js ci](https://github.com/captradeoff/x-post-action/actions/workflows/node.js.yml/badge.svg)](https://github.com/captradeoff/x-post-action/actions/workflows/node.js.yml)
![github license](https://img.shields.io/github/license/captradeoff/x-post-action)
[![github stars](https://img.shields.io/github/stars/captradeoff/x-post-action?style=social)](https://github.com/captradeoff/x-post-action/stargazers)
[![github forks](https://img.shields.io/github/forks/captradeoff/x-post-action?style=social)](https://github.com/captradeoff/x-post-action/network/members)
[![twitter follow](https://img.shields.io/twitter/follow/captradeoff?style=social)](https://twitter.com/captradeoff)

> github action that creates a post on x. **[⭐ star this repo](#-support-this-project)** if you find it useful!

## 📋 table of contents

- [description](#description)
- [features](#features)
- [inputs](#inputs)
- [outputs](#outputs)
- [example usage](#example-usage)
- [how it works](#how-it-works)
- [setting up x api credentials](#setting-up-x-api-credentials)
- [development](#development)
- [contributing](#contributing)
- [documentation](#documentation)
- [support this project](#-support-this-project)
- [license](#license)

## 📝 description

this action allows you to automatically post messages to x from your github workflow.

it can be used to announce new releases, share updates, or integrate your github workflow with x communities.

## ✨ features

- **automated posting**: publish updates to x directly from your github workflows
- **community integration**: post to specific x communities to reach targeted audiences
- **release announcements**: automatically announce new releases with version information
- **customizable messages**: fully customize your post content with repository information and event data
- **secure credential handling**: uses github secrets for secure api credential management
- **easy configuration**: simple yaml-based setup with minimal configuration required

## 📥 inputs

| input          | description                         | required | default       |
|----------------|-------------------------------------|----------|---------------|
| `appKey`       | the x api app key                   | yes      | -             |
| `appSecret`    | the x api app secret                | yes      | -             |
| `accessToken`  | the x api access token              | yes      | -             |
| `accessSecret` | the x api access secret             | yes      | -             |
| `message`      | the message to post to x            | yes      | 'Hello, world!' |
| `community-id` | the id of the community to post to  | no       | null          |

## 📤 outputs

| output    | description         |
|-----------|---------------------|
| `post-id` | the id of the post  |

## 🚀 example usage

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

## ⚙️ how it works

this action uses the twitter api v2 (via the `twitter-api-v2` npm package) to post messages to x. it supports:

- posting text messages to your x account
- posting to a specific x community (optional)
- returns the post id for further processing

## 🔑 setting up x api credentials

to use this action, you'll need to create an x developer account and set up an app:

1. visit the [x developer portal](https://developer.twitter.com/en/portal/dashboard)
2. create a new app or use an existing one
3. generate the following credentials:
   - app key and app secret
   - access token and access secret

these values should be stored as secrets in your github repository and passed to the action as inputs.

## 💻 development

this project uses node.js and the twitter api v2 client.

### prerequisites

- node.js (v20 recommended)
- x developer account and api credentials

### installation

```bash
# Clone the repository
git clone https://github.com/captradeoff/x-post-action.git
cd x-post-action

# Install dependencies
npm install
```

### building

the action uses @vercel/ncc to compile the node.js code and dependencies into a single file:

```bash
npm run build
```

this will create a `dist/index.js` file that is referenced in `action.yaml`.

### testing

this project uses jest for testing. to run the tests:

1. clone the repository
2. install dependencies with `npm install`
3. run the tests with `npm test`

the tests use mocks for the twitter api and github actions core module to verify functionality without making actual api calls.

coverage report is generated automatically when running the tests. you can view the html coverage report in the `coverage` directory.

### integration testing

in addition to unit tests with mocks, there are also integration tests that make actual calls to the x api:

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

3. run the integration tests:
   ```bash
   # Run direct API integration test
   npm run test:integration
   
   # Run action function integration test
   npm run test:integration-action
   
   # Run all integration tests
   npm run test:integration-all
   ```

the integration tests include:

- **direct api test**: tests the x api directly using credentials from .env
- **action function test**: tests the postTweet function exported from index.js

both tests will:
- post actual tweets to your x account
- include extensive logging for debugging
- skip tests automatically if environment variables aren't set
- add a timestamp to make each test message unique

**note:** be careful with integration tests as they make real api calls and will post actual tweets to your account.

## 📦 dependencies

- [@actions/core](https://github.com/actions/toolkit/tree/main/packages/core): core functions for github actions
- [@actions/github](https://github.com/actions/toolkit/tree/main/packages/github): github actions toolkit
- [twitter-api-v2](https://github.com/PLhery/node-twitter-api-v2): twitter api v2 client for node.js

## 🤝 contributing

contributions are welcome! here's how you can help:

1. **fork the repository**: click the fork button at the top of this page
2. **create a feature branch**: `git checkout -b feature/your-feature-name`
3. **make your changes**: implement your feature or fix
4. **commit your changes**: `git commit -m 'add some feature'`
5. **push to the branch**: `git push origin feature/your-feature-name`
6. **open a pull request**: go to your fork on github and click the 'new pull request' button

please make sure your code passes all tests and follows the project's coding style.

## 📚 documentation

comprehensive documentation for this project is available on our dedicated documentation site at [https://captradeoff.github.io/x-post-action/](https://captradeoff.github.io/x-post-action/). the site is built using the [d-sys-wiki documentation template](https://github.com/captradeoff/d-sys-wiki-documentation-template).

the documentation includes:
- detailed usage instructions
- api reference
- configuration options
- examples and tutorials
- troubleshooting guides

the documentation source files are located in the `docs/` directory of this repository. you can contribute to the documentation by submitting pull requests to update these files.

visit the documentation site to learn more about how to effectively use this action in your workflows.

## ⭐ support this project

if you find this project useful, please consider:

- ⭐ starring the repository on github
- 🔄 forking the repository to contribute
- 📢 sharing the project with others who might find it helpful
- 🐛 reporting bugs or suggesting features through issues
- 💻 submitting pull requests to improve the code or documentation

your support helps maintain and improve this project!

## 📄 license

[mit](./license)
