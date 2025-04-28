---
title: Get all campaigns in an account / sub-account
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

Get the campaigns of an account

[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "Data will be returned wrapped in the `partialCollection` along with count of total campaigns if the campaign count exceed the limit."
}
[/block]