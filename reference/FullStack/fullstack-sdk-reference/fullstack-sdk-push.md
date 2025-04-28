---
title: Push
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
[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * validates the parameters passed
  * sends a call to the VWO server for associating custom dimensions for the user to the same users that are part of the FullStack campaign.

The API method accepts a custom dimension key - *customDimensionKey*, custom dimension value - *customDimensionValue*, and user-id - *userId*.

*customDimensionKey* is the unique key associated with a particular custom dimension made in VWO application.
*customDimensionValue* is the value you want to tag a custom dimension with.
*userId* is the unique id associated with the user for identification.

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
  "rows": 3
}
[/block]

[block:api-header]
{
  "title": "Returns"
}
[/block]
A boolean value based on whether the call was made to the VWO server.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "0-0": "true",
    "h-2": "Description",
    "0-1": "Boolean",
    "1-0": "false",
    "1-1": "Boolean",
    "1-2": "If validation fails or call is not made",
    "0-2": "If call is successfully being made to the VWO server for post-segmentation"
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
      "code": "vwoClientInstance.push(customDimensionKey, customDimensionValue, userId);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n\n$vwoClientInstance->push($customDimensionKey, $customDimensionValue, $userId);",
      "language": "php"
    },
    {
      "code": "vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)",
      "language": "python"
    },
    {
      "code": "bool isSuccessful = vwoClientInstance.Push(customDimensionKey, customDimensionValue, userId);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "boolean isSuccessful = vwoClientInstance.push(customDimensionKey, customDimensionValue, userId);",
      "language": "java"
    },
    {
      "code": "vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)",
      "language": "ruby"
    },
    {
      "code": "isSuccessful = vwoClientInstance.Push(customDimensionKey, customDimensionValue, userId)\n",
      "language": "go"
    }
  ]
}
[/block]