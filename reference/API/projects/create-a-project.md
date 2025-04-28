---
title: Create a Project
excerpt: ''
api:
  file: api.json
  operationId: create-a-project
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/account_id/projects\n```\nRequest Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n    \"name\": \"Project One\",\n    \"languages\": [\n        \"NODEJS\",\n        \"PYTHON\"\n    ],\n    \"environments\": [\n        {\n            \"name\": \"Env1\",\n            \"isEnabled\": true\n        },\n        {\n            \"name\": \"Env2\"\n        }\n    ],\n    \"type\": \"project\"\n}",
      "language": "json"
    }
  ]
}
[/block]