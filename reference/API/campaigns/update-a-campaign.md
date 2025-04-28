---
title: Update a campaign
excerpt: ''
api:
  file: api.json
  operationId: update-a-campaign
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
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/40505/campaigns/15\n```",
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
  "campaigns" : {
     "name" : "New name",
     "globalCode":{
        "js": {
            "pre": "console.log(\"Pre JS\");",
            "post": "console.log(\"Post JS\");"
        },
       "css": "body {display: block;}"
     }
  }
}
```

Update a campaign

> 🚧 Note:
> 
> The "globalCode" section allows you to add Pre/Post-Campaign JS/CSS snippets within the editor. This globalCode block is optional and can be omitted if not needed.