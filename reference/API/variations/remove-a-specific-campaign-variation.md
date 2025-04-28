---
title: Delete a campaign variation
excerpt: ''
api:
  file: api.json
  operationId: remove-a-specific-campaign-variation
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
  "text": "Request URI for Sub Account\n```\nDELETE /accounts/40505/campaigns/7/variations/1\n```",
  "sidebar": true
}
[/block]

[block:html]
{
  "html": "<div></div>\n\n<style></style>"
}
[/block]
Delete a campaign variation
[block:callout]
{
  "type": "danger",
  "body": "Please ensure that variation Id is serial. For example, if you have variations with ids 1,2,3 and you delete variation id 2, now you would have the variation ids 1, 2, whereas 3 would be updated to 2. So, issue a GET /variations after the delete which would return the updated variations.",
  "title": "Note:"
}
[/block]