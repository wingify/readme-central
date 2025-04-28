---
title: Push Custom Dimension
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Pushes a custom dimension for a particular user to the VWO server. It is used for post-segmenting the data in the campaign reports.

Read [here](https://help.vwo.com/hc/en-us/articles/360038019054-Creating-a-Custom-Dimension-in-VWO) on how to create custom dimension in VWO
[block:callout]
{
  "type": "info",
  "body": "This is available from version **2.6.0** onwards.",
  "title": "Note:"
}
[/block]

[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * validates the parameters passed
  * sends a call to VWO server for associating the custom dimension for the same user that became part of the campaign.

The API method accepts a custom dimension key - *customDimensionKey* and custom dimension value - *customDimensionValue*.

*customDimensionKey* is the unique key associated with a particular custom dimension made in VWO application.

*customDimensionValue* is the value you want to tag a custom dimension with.

[block:api-header]
{
  "title": "Parameter Definitions"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**customDimensionKey**\n*Required*",
    "0-1": "String",
    "0-2": "The custom dimension key to uniquely identify a custom dimension.",
    "1-0": "**customDimensionValue**\n*Required*",
    "1-1": "String",
    "1-2": "The custom dimension value for a custom dimension.",
    "2-0": "**userId**\n*Required*",
    "2-1": "String",
    "2-2": "User ID, which uniquely identifies each user.\n\n**Important**: This User ID must match the User ID provided to activate or getVariation API."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Replace custom dimension key and value with actual values\nVWO.pushCustomDimension(\"CUSTOM_DIMENSION_KEY\", \"CUSTOM_DIMENSION_VALUE\");",
      "language": "java"
    },
    {
      "code": "// Replace custom dimension key and value with actual values\nVWO.pushCustomDimension(\"CUSTOM_DIMENSION_KEY\", \"CUSTOM_DIMENSION_VALUE\")",
      "language": "kotlin",
      "name": null
    }
  ]
}
[/block]