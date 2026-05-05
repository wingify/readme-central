---
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Request URI for Sub Account

```
POST /accounts/40505/campaigns
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>

Request Format

```json
{
  "type": "ab",
  "urls": [
    {
      "type": "url",
      "value": "http://wingify.com"
    }
  ],
  "primaryUrl": "http://wingify.com",
  "goals": [
    {
      "name": "New goal",
      "type": "visitPage",
      "urls": [
        {
          "type": "url",
          "value": "http://wingify.com"
        }
      ]
    }
  ]
}
```

Create a campaign

> 🚧 **Warning**
>
> Note:
>
> If stats are not provided, default value for stats (same as given in this request) are used for the campaign created.

> 🚧 **Warning**
>
> Note:
>
> For split campaign creation, two or more variations must be present in the request with urls for which the split campaign needs to be run.

> 🚧 **Warning**
>
> Note:
>
> The "globalCode" section allows you to add Pre/Post-Campaign JS/CSS snippets within the editor. This globalCode block is optional and can be omitted if not needed.
