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
Request URI for Sub Account

```
PATCH /accounts/1/users/874
```

Request Format

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

Update specific user of Current / Sub Account.