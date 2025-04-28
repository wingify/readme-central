---
title: Create a campaign goal
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-goal
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI for Sub Account
```
POST /accounts/40505/campaigns/7/goals
```

Request Format
[block:code]
{
  "codes": [
    {
      "code": "{  \n   \"goals\":{  \n      \"name\":\"New goal\",\n      \"type\":\"visitPage\",\n      \"urls\":[  \n         {  \n            \"type\":\"url\",\n            \"value\":\"http://wingify.com\"\n         }\n      ]\n   }\n}",
      "language": "json"
    }
  ]
}
[/block]
Create a campaign goal
[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "- valid **type** includes `visitPage`,  `engagement`,  `formSubmit`,  `clickLink`,  `clickElement`,  `revenue`, `custom-conversion`\n- **name** is a required property\n- for type `clickElement`, **cssSelectors** is required\n- for type `visitPage`, `formSubmit`, `clickLink`, `revenue`, `custom-conversion`, **urls** is required\n- valid **url type** includes `url`, `startsWith`, `endsWith`, `contains`, `pattern`, `regex`,  `cssSelector`"
}
[/block]

-