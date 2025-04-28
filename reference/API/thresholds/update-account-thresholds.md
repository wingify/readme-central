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
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/thresholds\n```\n### Request Format: ",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"winningPercent\": 95,\n  \"losingPercent\": 5,\n  \"visitors\": 21\n}",
      "language": "json"
    }
  ],
  "sidebar": true
}
[/block]
Update account Thresholds.