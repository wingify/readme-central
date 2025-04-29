---
title: Update account thresholds
excerpt: ''
api:
  file: api.json
  operationId: update-account-thresholds
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
PATCH /accounts/1/thresholds
```

Request Format:

```json
{
    "winningPercent": 95,
    "losingPercent": 5,
    "visitors": 21
}
```

Update account Thresholds.