---
title: Update workspace thresholds
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
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/thresholds\n```\n### Request Format: ",
  "sidebar": true
}
[/block]

```json
{
  "winningPercent": 95,
  "losingPercent": 5,
  "visitors": 21
}
```

Update workspace Thresholds.