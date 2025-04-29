---
title: Create a Feature Flag Rule
excerpt: ''
api:
  file: fme-apis.json
  operationId: fme-create-a-feature-flag-rule
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Request URI Creating a Feature Flag Rule

```
POST /accounts/123456/environments/1/features/1/rules
```

### Sample Request Body

```json
{
    "name": "Rollout 1",
    "key": "rollout1",
    "type": "flag-rollout",
    "campaignData": {
        "percentSplit": 60
    }
}
```
