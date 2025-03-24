# 📤 outputs

the x post action provides the following output:

| output    | description         |
|-----------|---------------------|
| `post-id` | the id of the post  |

## using the post-id output

the `post-id` output can be used in subsequent steps of your workflow to reference the created post.

### example: accessing the post-id

```yaml
jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - name: post to x
        id: x_post
        uses: captradeoff/x-post-action@v1
        with:
          appKey: ${{ secrets.X_APP_KEY }}
          appSecret: ${{ secrets.X_APP_SECRET }}
          accessToken: ${{ secrets.X_ACCESS_TOKEN }}
          accessSecret: ${{ secrets.X_ACCESS_SECRET }}
          message: 'new release!'
          
      - name: use post id
        run: |
          echo "post created with id: ${{ steps.x_post.outputs.post-id }}"
          # use the post id for other operations
```

## potential uses

- link to the post from other platforms
- track engagement metrics for the post
- add the post to twitter lists
- reference the post in subsequent api calls 