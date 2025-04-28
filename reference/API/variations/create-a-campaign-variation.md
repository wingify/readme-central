---
title: Create a campaign variation
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-variation
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/40505/campaigns/7/variations\n```",
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
      "code": "{\n  \"variations\" : {\n\t\t\"name\": \"New shiny variation\"\n  }\n}",
      "language": "json"
    }
  ]
}
[/block]
Create a campaign variation


[block:callout]
{
  "type": "info",
  "title": "Info:",
  "body": "To add changes to the variation, please add changes under the key 'changes'. For e.g. to show an alert in variation\n\n{\n  \"variations\" : {\n\t.\n        .\n        \"changes\" : \"<script>alert('Hello World');</script>\"\n        .\n        .\n    }\n}"
}
[/block]