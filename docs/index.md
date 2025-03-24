---
hide:
    - revision_date
    - revision_history
---

# x post action

github action that creates a post on x.com.

[![node.js ci](https://github.com/captradeoff/x-post-action/actions/workflows/node.js.yml/badge.svg)](https://github.com/captradeoff/x-post-action/actions/workflows/node.js.yml)
![github license](https://img.shields.io/github/license/captradeoff/x-post-action)
[![github stars](https://img.shields.io/github/stars/captradeoff/x-post-action?style=social)](https://github.com/captradeoff/x-post-action/stargazers)
[![github forks](https://img.shields.io/github/forks/captradeoff/x-post-action?style=social)](https://github.com/captradeoff/x-post-action/network/members)
[![twitter follow](https://img.shields.io/twitter/follow/captradeoff?style=social)](https://twitter.com/captradeoff)

> **⭐ star this repo** if you find it useful!

this action allows you to automatically post messages to x from your github workflow.

it can be used to announce new releases, share updates, or integrate your github workflow with x communities.

## quick links

- [description](./description.md)
- [features](./features.md)
- [inputs](./inputs.md)
- [outputs](./outputs.md)
- [example usage](./example-usage.md)
- [how it works](./how-it-works.md)
- [setting up x api credentials](./credentials.md)
- [development](./development/getting-started.md)
- [contributing](./development/contributing.md)

## example usage

```yaml
name: post to x

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
          message: 'new release ${{ github.event.release.tag_name }} is now available!'
          community-id: '123456789'
```