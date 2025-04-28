---
title: Add labels to a campaign
excerpt: ''
api:
  file: api.json
  operationId: add-labels-to-a-campaign
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account
```
POST /accounts/1/campaigns/72/labels
```

Request Format
[block:code]
{
  "codes": [
    {
      "code": "{\n    \"labels\": [\n      {\n        \"name\" : \"New shiny label\"\n      }\n    ]\n}",
      "language": "json"
    }
  ]
}
[/block]
Add labels to a campaign
[block:callout]
{
  "type": "info",
  "title": "Note: Mention id for associating existing account labels to campaign and name for creating a new label"
}
[/block]