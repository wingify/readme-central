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
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/1/users\n```",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"Test via API\",\n  \"email\": \"test+api@wingify.com\",\n  \"password\": \"*password*\",\n  \"confirmPassword\": \"*password*\",\n  \"phone\": \"9999988877\",\n  \"country\": \"India\",\n  \"department\": \"Software Engineering\",\n  \"title\": \"API Evangelist\",\n  \"permission\": \"Admin\"\n}",
      "language": "json"
    }
  ],
  "sidebar": true
}
[/block]
Create User in Current / Sub Account.