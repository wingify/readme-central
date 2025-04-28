---
title: Create a campaign
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPOST /accounts/40505/campaigns\n```",
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
      "code": "{\n  \"type\" : \"ab\",\n  \"urls\": [\n            {\n                \"type\": \"url\",\n                \"value\": \"http://wingify.com\"\n            }\n        ],\n  \"primaryUrl\" : \"http://wingify.com\",\n  \"goals\":[{  \n      \"name\":\"New goal\",\n      \"type\":\"visitPage\",\n      \"urls\":[  \n         {  \n            \"type\":\"url\",\n            \"value\":\"http://wingify.com\"\n         }\n      ]\n   }],\n  \"stats\" : {\n   \t  \"conversionRate\" : 0.05,\n      \"certaintyMode\" : 0.01,\n      \"expectedMonthlyVisitors\" : 300000,\n      \"expectedRevenuePerVisitor\" : 2,\n      \"liftInConversionRate\" : 0.05\n  }\n}",
      "language": "json"
    }
  ]
}
[/block]
Create a campaign
[block:callout]
{
  "type": "warning",
  "title": "Note:",
  "body": "If stats are not provided, default value for stats (same as given in this request) are used for the campaign created."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note:",
  "body": "For split campaign creation, two or more variations must be present in the request with urls for which the split campaign needs to be run."
}
[/block]