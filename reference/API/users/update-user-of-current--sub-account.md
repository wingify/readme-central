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
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/users/874\n```\nRequest Format",
  "sidebar": true
}
[/block]


```json
{
  "name": "API User Name",
  "phone": "9999988877",
  "country": "India",
  "department": "Software Engineering",
  "title": "API Evangelist",
  "permission": "Browse"
}
```

Update specific user of a workspace.