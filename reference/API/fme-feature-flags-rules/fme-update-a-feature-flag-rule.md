---
title: Update a Feature Flag Rule
excerpt: ''
api:
  file: fme-apis.json
  operationId: fme-update-a-feature-flag-rule
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Request URI for Updating a Feature Flag Rule

```json
PATCH /accounts/123456/environments/1/features/1/rules/1
```

### Sample Request Body

```json
{
     "campaignData": {
        "percentSplit": 10,
        "variations": [
            {
                "featureVariationId": 1
            }
        ]
    }
}
```