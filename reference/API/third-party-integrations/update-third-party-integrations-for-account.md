---
title: Update integration settings for specific account
excerpt: ''
api:
  file: api.json
  operationId: update-third-party-integrations-for-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/integrations\n```\nRequest Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"ga\": {\n    \"enabled\": true,\n    \"slot\": 4,\n    \"prefix\": \"\"\n  },\n  \"ua\": {\n    \"enabled\": false,\n    \"dimension\": 1,\n    \"prefix\": \"\"\n  },\n  \"gtm\": {\n    \"enabled\": false\n  },\n  \"clicktale\": {\n    \"enabled\": false\n  },\n  \"isGaPremium\": false\n}",
      "language": "json"
    }
  ],
  "sidebar": true
}
[/block]
Update Third Party Integrations. Here's an example of the request params: