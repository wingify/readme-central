---
title: Update configuration of a specific website
excerpt: ''
api:
  file: api.json
  operationId: update-configuration-of-a-specific-website
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Request URL for Configurations

```
PATCH /accounts/:account_id/websites/:website_id/smartcode/configuration
```

Request Format

```json
{
    "settingsData": {
        "codeType": "async",
        "settingsTimeout": 2000,
        "libraryTimeout": 2500,
        "useJquery": false,
        "rocketLoader": true,
        "hideBodyHtml": true
    }
}
```
