---
title: Create a draft
excerpt: ''
api:
  file: api.json
  operationId: create-draft-in-current--sub-account
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/1/drafts\n```\nRequest Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"platform\": \"website\",\n  \"isAdvancedMode\": false,\n  \"currentDraftStepIndex\": 0,\n  \"type\": \"ab\",\n  \"urls\": [\n    {\n      \"type\": \"url\",\n      \"value\": \"http:\\/\\/wingify.com\"\n    }\n  ],\n  \"primaryUrl\": \"http:\\/\\/wingify.com\",\n  \"globalSegment\": {\n    \"segmentationType\": \"pre\",\n    \"platform\": \"website\",\n    \"id\": \"1\",\n    \"type\": \"predefined\",\n    \"name\": \"Direct\",\n    \"description\": \"Segment to allow only direct traffic\"\n  },\n  \"status\": \"draft\",\n  \"percentTraffic\": 100,\n  \"isHeatmapEnabled\": true\n}",
      "language": "json"
    }
  ]
}
[/block]
Create a draft in Current / Sub Account.