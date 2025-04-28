---
title: Launch
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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/javascript-activate), [getVariationName](https://developers.vwo.com/docs/javascript-get-variation-name) and [track](https://developers.vwo.com/docs/javascript-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/javascript-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/javascript-get-settings-file).

[block:api-header]
{
  "title": "API Description"
}
[/block]
SDK provides a method to instantiate a VWO client as an instance. The method accepts an object to configure the VWO client.

The only required parameter for instantiating the SDK is *settings file*. There are other optional parameters, which you could provide for overriding the default behavior or setting environment.
[block:api-header]
{
  "title": "Parameter Definitions"
}
[/block]
Below is the list of all parameters that can be used for configuring the VWO SDK.

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**settingsFile**\n*Required*",
    "0-1": "Object",
    "0-2": "The JSON representing your project and the campaign settings.",
    "1-0": "**isDevelopmentMode**\n*Optional*",
    "1-1": "Boolean",
    "1-2": "Flag for experimenting the SDK on test-app/staging so that no impression is sent to the VWO server for tracking.",
    "2-0": "**userStorageService**\n*Optional*",
    "2-1": "Object",
    "2-2": "The JSON representing the User Campaign Data Map. Used for sticky bucketing and deciding when to call Activate API vs. getVariationName API.",
    "3-0": "**logging**\n*Optional*",
    "3-1": "Object",
    "3-2": "Override default logger behaviour. Customise log-level, and implement your own log message.",
    "4-0": "**goalTypeToTrack**\n*Optional*",
    "5-0": "**returnPromiseFor**\n*Optional*",
    "4-1": "String",
    "5-1": "Object",
    "4-2": "If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.",
    "5-2": "Pass this option to return promise instead of value from the APIs. You can also select which APIs to return promise and which not."
  },
  "cols": 3,
  "rows": 6
}
[/block]

[block:api-header]
{
  "title": "Returns"
}
[/block]
An instance of the VWO class, which can be referenced later for calling out different API methods.
[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "vwoSdk.getSettingsFile(accountId, sdkKey).then(function (settingsFile) {\n  // ...launch SDK and call APIs\n  var vwoClientInstance = vwoSDK.launch({\n  \tsettingsFile: settingsFile\n\t});\n});",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
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
      "code": "const vwoInstance = vwoSdk.launch({\n  settingsFile,\n  returnPromiseFor: {\n    all: true\n  }\n});\n\n// Or just for activate API\n\nconst vwoInstance = vwoSdk.launch({\n  settingsFile,\n  returnPromiseFor: {\n    activate: true\n  }\n});",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]
**Example** 
[block:code]
{
  "codes": [
    {
      "code": "// Using the .then() method to add a handler for a Promise\nvwoClientInstance.activate(campaignKey, userId).then(variationName => {\n  // use variationName in your application code\n});\n\n// Using \"await\" instead, within an async function\nconst variationName = await vwoClientInstance.activate(campaignKey, userId);",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]