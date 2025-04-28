---
title: Get all campaigns in a workspace
excerpt: ''
api:
  file: api.json
  operationId: get-the-campaigns-of-an-account
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
  "text": "Request URI for Sub Account\n```\nGET /accounts/40505/campaigns\n```",
  "sidebar": true
}
[/block]


[block:html]
{
  "html": "<div></div>\n\n<style></style>"
}
[/block]

Get campaigns from a workspace

> 📘 Note:
> 
> Data will be returned wrapped in the `partialCollection` along with count of total campaigns if the campaign count exceed the limit.