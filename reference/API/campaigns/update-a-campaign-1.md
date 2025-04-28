---
title: Update campaign status
excerpt: ''
api:
  file: api.json
  operationId: update-a-campaign-1
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/40505/campaigns/status\n```",
  "sidebar": true
}
[/block]

[block:html]
{
  "html": "<div></div>\n\n<style></style>"
}
[/block]
Request Format
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"ids\" : [14, 15],\n  \"status\" : \"TRASHED\"\n}",
      "language": "json"
    }
  ]
}
[/block]
Update campaign status
[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "Valid status changes include `TRASHED`, `RESTORED`, `RUNNING`, `STOPPED`, `PAUSED`"
}
[/block]