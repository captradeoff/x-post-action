# 🔑 setting up x api credentials

to use the x post action, you'll need to set up a developer account and create an app on x.

## step 1: create a developer account

1. go to the [x developer portal](https://developer.twitter.com/en/portal/dashboard)
2. sign in with your x account
3. apply for a developer account if you don't already have one

## step 2: create a new app

1. in the developer portal, navigate to "projects & apps" 
2. click "create app"
3. fill in the required information about your app
4. set the app permissions to "read and write"

## step 3: generate access tokens

1. from your app's dashboard, navigate to the "keys and tokens" tab
2. generate consumer keys (app key and app secret)
3. generate access token and access token secret

## step 4: add credentials to github secrets

1. in your github repository, go to settings > secrets and variables > actions
2. click "new repository secret"
3. add the following secrets:
   - `X_APP_KEY`: your app key
   - `X_APP_SECRET`: your app secret
   - `X_ACCESS_TOKEN`: your access token
   - `X_ACCESS_SECRET`: your access token secret

## step 5: use secrets in your workflow

reference the secrets in your workflow file:

```yaml
- name: post to x
  uses: captradeoff/x-post-action@v1
  with:
    appKey: ${{ secrets.X_APP_KEY }}
    appSecret: ${{ secrets.X_APP_SECRET }}
    accessToken: ${{ secrets.X_ACCESS_TOKEN }}
    accessSecret: ${{ secrets.X_ACCESS_SECRET }}
    message: 'hello from github actions!'
```

## troubleshooting credentials

if you encounter authentication issues:

1. verify that all four credentials are correctly stored in github secrets
2. ensure your app has "read and write" permissions
3. check that your access tokens haven't expired
4. make sure your developer account is in good standing
5. verify that you haven't exceeded rate limits 