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
Request URI for Sub Account

```
PATCH /accounts/1/integrations
```

Request Format

```json
{
    "ga": {
        "enabled": true,
        "slot": 4,
        "prefix": ""
    },
    "ua": {
        "enabled": false,
        "dimension": 1,
        "prefix": ""
    },
    "gtm": {
        "enabled": false
    },
    "clicktale": {
        "enabled": false
    },
    "isGaPremium": false
}
```

Update Third Party Integrations. Here's an example of the request params: