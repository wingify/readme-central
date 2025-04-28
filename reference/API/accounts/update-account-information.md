---
title: Update account
excerpt: ''
api:
  file: api.json
  operationId: update-account-information
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1\n```\n### Request Format",
  "sidebar": true
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "{\n  \"name\": \"API Account Name\",\n  \"timezone\": \"Asia\\/Kolkata\",\n  \"enabled\": true,\n  \"company\": {\n    \"name\": \"API Company Name\",\n    \"website\": \"http:\\/\\/wingify.com\",\n    \"size\": \"1-200\",\n    \"industry\": {\n      \"type\": \"saas\"\n    }\n  }\n}",
      "language": "json",
      "name": null
    }
  ],
  "sidebar": true
}
[/block]
Update details of Account.
[block:parameters]
{
  "data": {
    "h-1": "Value to be passed in API",
    "h-0": "Category",
    "0-0": "eCommerce / Internet Retail",
    "1-0": "Software / SaaS / Downloads",
    "2-0": "Media / Publishers / Blog",
    "3-0": "Digital Marketing / Agency / Web Development Shop",
    "4-0": "Travel and Tourism / Hotels / Hospitality",
    "5-0": "Non-government / Charity",
    "6-0": "Entertainment",
    "7-0": "Banking / Financial Services / Insurance",
    "8-0": "Business Consulting",
    "9-0": "Healthcare / Medicine / Bio",
    "10-0": "Education / Training",
    "11-0": "Telecom",
    "0-1": "ecommerce",
    "1-1": "saas",
    "2-1": "media",
    "3-1": "agency",
    "4-1": "travel",
    "5-1": "ngo",
    "6-1": "entertainment",
    "7-1": "banking",
    "8-1": "businessConsulting",
    "9-1": "health",
    "10-1": "education",
    "11-1": "telecom"
  },
  "cols": 2,
  "rows": 12
}
[/block]

[block:callout]
{
  "type": "danger",
  "body": "Use `enabled` field to Enable/Disable account with Caution."
}
[/block]