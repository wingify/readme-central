---
title: Update workspace
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
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1\n```\n### Request Format",
  "sidebar": true
}
[/block]


```json
{
  "name": "API Account Name",
  "timezone": "Asia\/Kolkata",
  "enabled": true,
  "company": {
    "name": "API Company Name",
    "website": "http:\/\/wingify.com",
    "size": "1-200",
    "industry": {
      "type": "saas"
    }
  }
}
```

Update details of Account.

| Category                                          | Value to be passed in API |
| :------------------------------------------------ | :------------------------ |
| eCommerce / Internet Retail                       | ecommerce                 |
| Software / SaaS / Downloads                       | saas                      |
| Media / Publishers / Blog                         | media                     |
| Digital Marketing / Agency / Web Development Shop | agency                    |
| Travel and Tourism / Hotels / Hospitality         | travel                    |
| Non-government / Charity                          | ngo                       |
| Entertainment                                     | entertainment             |
| Banking / Financial Services / Insurance          | banking                   |
| Business Consulting                               | businessConsulting        |
| Healthcare / Medicine / Bio                       | health                    |
| Education / Training                              | education                 |
| Telecom                                           | telecom                   |

> ❗️ 
> 
> Use `enabled` field to Enable/Disable workspace with Caution.