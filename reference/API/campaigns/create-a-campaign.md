---
title: Create a campaign
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
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/40505/campaigns\n```",
  "sidebar": true
}
[/block]

[block:html]
{
  "html": "<div></div>\n\n<style></style>"
}
[/block]

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
  ],
  "stats": {
    "conversionRate": 0.05,
    "certaintyMode": 0.01,
    "expectedMonthlyVisitors": 0,
    "expectedRevenuePerVisitor": 2,
    "liftInConversionRate": 0.05
  },
  "globalCode": {
    "js": {
      "pre": "console.log(\"Pre JS\");",
      "post": "console.log(\"Post JS\");"
    },
    "css": "body {display: block;}"
  }
}
```

Create a campaign

> 🚧 Note:
> 
> If stats are not provided, default value for stats (same as given in this request) are used for the campaign created.

> 🚧 Note:
> 
> For split campaign creation, two or more variations must be present in the request with urls for which the split campaign needs to be run.

> 🚧 Note:
> 
> The "globalCode" section allows you to add Pre/Post-Campaign JS/CSS snippets within the editor. This globalCode block is optional and can be omitted if not needed.