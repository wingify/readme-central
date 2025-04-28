---
title: Create a campaign section
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-section
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/40505/campaigns/8/sections\n```",
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
      "code": "{\n  \"sections\" : {\n    \"name\": \"New shiny section\",\n    \"cssSelector\": \"DIV#js-header-fixed-trigger + SECTION > DIV:first-child > DIV:first-child > DIV:first-child\",\n    \"variations\" : [\n      \t{\n      \t\t\"name\" : \"New shiny variation\"\n    \t}\n    ]\n  }\n}",
      "language": "json"
    }
  ]
}
[/block]
Create a campaign section