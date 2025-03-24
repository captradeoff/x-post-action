# 🚀 example usage

below are examples of how to use the x post action in your github workflows.

## basic example

the simplest way to use the action is to post a static message:

```yaml
name: post to x

on:
  workflow_dispatch:  # manually triggered

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - name: post to x
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'hello from github actions!'
```

## announce new releases

automatically post when a new release is published:

```yaml
name: announce release

on:
  release:
    types: [published]

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - name: post to x
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'new release ${{ github.event.release.tag_name }} is now available! check it out at ${{ github.event.release.html_url }}'
          community-id: '123456789'  # optional: post to a specific community
```

## post on schedule

create scheduled posts using cron:

```yaml
name: weekly update

on:
  schedule:
    - cron: '0 12 * * 1'  # every monday at noon UTC

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v2
        
      - name: get stats
        id: stats
        run: |
          echo "::set-output name=stars::$(curl -s https://api.github.com/repos/${{ github.repository }} | jq .stargazers_count)"
          
      - name: post to x
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'weekly update: our project now has ${{ steps.stats.outputs.stars }} stars! thank you for your support.'
```

## post on successful build

post when continuous integration succeeds:

```yaml
name: build and post

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: checkout code
        uses: actions/checkout@v2
        
      - name: build project
        run: npm ci && npm run build
        
      - name: test project
        run: npm test
        
      - name: post to x
        if: success()
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'build successful for commit ${{ github.sha }} on branch ${{ github.ref_name }}. all tests passed! ✅'
``` 