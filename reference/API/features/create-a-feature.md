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
Request URI for Sub Account

```
POST /accounts/account_id/features
```

Request Format

```json
{
    "name": "Feature3",
    "variables": [
        {
            "variableName": "var1",
            "dataType": "string",
            "defaultValue": "strVal"
        },
        {
            "variableName": "var2",
            "dataType": "int",
            "defaultValue": 32
        },
        {
            "variableName": "var3",
            "dataType": "float",
            "defaultValue": 22.5
        },
        {
            "variableName": "var4",
            "dataType": "boolean",
            "defaultValue": false
        }
    ],
    "type": "feature"
}
```