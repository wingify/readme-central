---
title: Update a Feature Flag
excerpt: ''
api:
  file: fme-apis.json
  operationId: fme-update-a-feature-flag
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
PATCH /accounts/123456/features/1
```

### Sample Request Body

```json
{
    "name": "Feature Flag Name",
    "description": "Feature Flag Description",
    "goals": [
        {
            "metricId": 123456
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
            "defaultValue": {
                "name": "VWO",
                "product": "FME"
            }
        }
    ],
    "variations": [
        {
            "name": "variation-name",
            "key": "variation-key",
            "variables": [
                {
                    "variableId": 1,
                    "value": "Hello World updated"
                },
                {
                    "variableId": 2,
                    "value": 20
                }
            ]
        }
    ]
}
```
