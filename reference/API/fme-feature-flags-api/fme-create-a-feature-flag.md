---
title: Create a Feature Flag
excerpt: ''
api:
  file: fme-apis.json
  operationId: fme-create-a-feature-flag
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Request URI for Sub Account

```
POST /accounts/123456/features
```

### Sample Request Body

```json
{
    "name": "FeatureFlag1",
    "featureKey": "featureflag1",
    "description": "First feature flag created via REST APIs",
    "featureType": "TEMPORARY",
    "goals": [
        {
            "metricId": 5
        }
    ],
    "variables": [
        {
            "variableName": "variable1",
            "dataType": "string",
            "defaultValue": "Hello World"
        },
        {
            "variableName": "variable2",
            "dataType": "integer",
            "defaultValue": 10
        },
        {
            "variableName": "variable3",
            "dataType": "json",
            "defaultValue": { "name": "VWO", "description": "Description" }
        }
    ]
}
```