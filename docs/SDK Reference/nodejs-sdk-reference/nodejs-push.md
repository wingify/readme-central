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
  * Sends an asynchronous impression to the VWO server for associating custom dimension(s) for the user that became part of the FullStack campaign.

The API method accepts a custom dimension key - *customDimensionKey*, custom dimension value - *customDimensionValue*, and user-id - *userId*.

*customDimensionKey* is the unique key associated with a particular custom dimension created in the VWO application.
*customDimensionValue* is the value you want to associate with the custom dimension.
*userId* is the unique ID associated with the user for identification.

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
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**customDimensionMap**\n*Required*",
    "1-0": "**userId**\n*Required*",
    "0-2": "An object to provide different custom dimensions associated with the user in form of key-value pairs.",
    "1-2": "User ID, which uniquely identifies each user.\n\n**Important**: This User ID must match the User ID provided to activate or isFeatureEnabled API",
    "0-1": "Object",
    "1-1": "Object"
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
      "code": "const customDimensionMap = {\n  browser: 'chrome',\n  price: '20'\n};\n\nvwoClientInstance.push(customDimensionMap, userId);",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "This will make multiple asynchronous tracking calls to the VWO server corresponding to each key-value pair."
}
[/block]

[block:api-header]
{
  "title": "Promises and async"
}
[/block]
If your application uses promises for asynchronous operations, you can configure the SDK to manage asynchronous operations. VWO SDK is capable of returning a value as well as promise depending on the use case. 
When returning a value, API response time is faster (< 50ms) as it does not wait for the asynchronous tracking call to get completed. in the case of returning a promise, API will wait for both the decision as well as the asynchronous tracking call to get completed, and thereby, the response time of the API will include the round-trip time of the network call.

Since the async/await syntax is based on Promises, all APIs will also work with it.

**Configuring the SDK**

You can pass ***returnPromiseFor*** option at the time of instantiating the SDK i.e. while using *launch* API.
The ***returnPromiseFor*** option is an object and you can use it either to enable promise-based response from all the APIs or select the required API(s).
[block:code]
{
  "codes": [
    {
      "code": "const vwoInstance = vwoSdk.launch({\n  settingsFile,\n  returnPromiseFor: {\n    all: true\n  }\n});\n\n// Or just for push API\n\nconst vwoInstance = vwoSdk.launch({\n  settingsFile,\n  returnPromiseFor: {\n    push: true\n  }\n});",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]
**Example** 
[block:code]
{
  "codes": [
    {
      "code": "// Using the .then() method to add a handler for a Promise\nvwoClientInstance.push(tagKey, tagValue, userId).then(response => {\n  // your application code\n});\n\n// Using \"await\" instead, within an async function\nconst response = await vwoClientInstance.push(tagKey, tagValue, userId);",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]