---
title: Update a feature
excerpt: ''
api:
  file: api.json
  operationId: update-a-feature
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URL for Workspace

```
PATCH /accounts/account_id//features/feature_id
```

Request Format

```json
{
    "name": "FeatureOne",
    "variables": [
        {
            "id": 1,
            "variableName": "var1",
            "dataType": "string",
            "defaultValue": "val1up"
        },
        {
            "id": 2,
            "variableName": "var2",
            "dataType": "int",
            "defaultValue": 320
        },
        {
            "id": 4,
            "variableName": "var4",
            "dataType": "boolean",
            "defaultValue": true
        },
        {
            "id": 4,
            "variableName": "var5",
            "dataType": "float",
            "defaultValue": 0.4
        }
    ],
    "setting": {
        "isEditable": true,
        "associatedCampaigns": []
    },
    "type": "feature"
}
```

Update a feature