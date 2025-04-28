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
  * Validates the parameters passed
  * Sends a call to the VWO server for associating custom dimensions for the user to the same users that are part of the FullStack campaign.

The API method accepts a custom dimension key - *custom_dimension_key*, custom dimension value - *custom_dimension_value*, and user-id - *user_id*.

*custom_dimension_key* is the unique key associated with a particular custom dimension made in VWO application.
*custom_dimension_value* is the value you want to tag a custom dimension with.
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
    "0-0": "**custom_dimension_key**\n*Required*",
    "0-1": "String",
    "0-2": "The custom dimension key to uniquely identify a custom dimension.",
    "1-0": "**custom_dimension_value**\n*Required*",
    "1-1": "String",
    "1-2": "The custom dimension value for a custom dimension.",
    "2-0": "**user_id**\n*Required*",
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
      "code": "vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Tracking Multiple Custom Dimensions simultaneously"
}
[/block]
There would be instances when you would like to push more than one custom dimension associated with a particular user. To solve this, you can refer to the below docs and make sure you're using the latest SDK.
[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "0-0": "**custom_dimension_map**\n*Required*",
    "h-1": "Type",
    "h-2": "Description",
    "1-0": "**user_id**\n*Required*",
    "0-2": "A map to provide different custom dimensions associated with the user in form of key-value pairs.",
    "0-1": "Hash",
    "1-1": "String",
    "1-2": "User ID, which uniquely identifies each user.\n\n**Important**: This User ID must match the User ID provided to activate or isFeatureEnabled API"
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
      "code": "custom_dimension_map = {\n  \"tag_key_1\": \"tag_value_1\",\n  \"tag_key_2\": \"tag_value_2\",\n  \"tag_key_3\": \"tag_value_3\"\n}\n\nvwo_client_instance.push(custom_dimension_map, user_id)\n",
      "language": "ruby"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "This will make multiple tracking calls to the VWO server corresponding to each key-value pair."
}
[/block]