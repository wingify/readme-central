---
title: Create a Feature
excerpt: ''
api:
  file: api.json
  operationId: create-a-feature
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
  "text": "Request URI for Sub Account\n```\nPOST /accounts/account_id/features\n```\nRequest Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n    \"name\": \"Feature3\",\n    \"variables\": [\n        {\n            \"variableName\": \"var1\",\n            \"dataType\": \"string\",\n            \"defaultValue\": \"strVal\"\n        },\n        {\n            \"variableName\": \"var2\",\n            \"dataType\": \"int\",\n            \"defaultValue\": 32\n        },\n        {\n            \"variableName\": \"var3\",\n            \"dataType\": \"float\",\n            \"defaultValue\": 22.5\n        },\n        {\n            \"variableName\": \"var4\",\n            \"dataType\": \"boolean\",\n            \"defaultValue\": false\n        }\n    ],\n    \"type\": \"feature\"\n}",
      "language": "json"
    }
  ]
}
[/block]