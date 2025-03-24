# 📥 inputs

the x post action accepts the following inputs:

| input          | description                         | required | default       |
|----------------|-------------------------------------|----------|---------------|
| `appKey`       | the x api app key                   | yes      | -             |
| `appSecret`    | the x api app secret                | yes      | -             |
| `accessToken`  | the x api access token              | yes      | -             |
| `accessSecret` | the x api access secret             | yes      | -             |
| `message`      | the message to post to x            | yes      | 'Hello, world!' |
| `community-id` | the id of the community to post to  | no       | null          |

## input details

### api credentials

the four credential inputs (`appKey`, `appSecret`, `accessToken`, `accessSecret`) are required to authenticate with the x api. for security, these should be stored as secrets in your github repository.

learn more about [setting up x api credentials](./credentials.md).

### message

the `message` input defines the content of your x post. this can be customized with dynamic content from your github workflow, such as:

- release version numbers
- commit information 
- repository data
- custom messages

### community-id

the optional `community-id` parameter allows you to post directly to a specific x community. if not provided, the post will appear on your main timeline only. 