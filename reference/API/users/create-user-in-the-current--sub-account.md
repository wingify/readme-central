---
title: Create a user
excerpt: ''
api:
  file: api.json
  operationId: create-user-in-the-current--sub-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
POST /accounts/1/users
```

```json
{
    "name": "Test via API",
    "email": "test+api@wingify.com",
    "password": "*password*",
    "confirmPassword": "*password*",
    "phone": "9999988877",
    "country": "India",
    "department": "Software Engineering",
    "title": "API Evangelist",
    "permission": "Admin"
}
```

Create User in Current / Sub Account.