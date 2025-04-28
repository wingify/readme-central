---
title: Update user details
excerpt: ''
api:
  file: api.json
  operationId: update-user-of-current--sub-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/users/874\n```\nRequest Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"API User Name\",\n  \"phone\": \"9999988877\",\n  \"country\": \"India\",\n  \"department\": \"Software Engineering\",\n  \"title\": \"API Evangelist\",\n  \"permission\": \"Browse\"\n}",
      "language": "json"
    }
  ]
}
[/block]

Update specific user of Current / Sub Account.