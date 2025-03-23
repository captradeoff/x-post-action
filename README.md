# X Post Action

A GitHub Action that posts messages to X (formerly Twitter) communities.

## Description

This action allows you to automatically post messages to X from your GitHub workflow. It can be used to announce new releases, share updates, or integrate your GitHub workflow with X communities.

## Inputs

| Input        | Description                   | Required | Default       |
|--------------|-------------------------------|----------|---------------|
| `message`    | The message to post to X      | Yes      | 'Hello, world!' |
| `community-id` | The ID of the community to post to | No | null |

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
          message: 'New release ${{ github.event.release.tag_name }} is now available!'
          community-id: '123456789'
```

## License

[MIT](./license)