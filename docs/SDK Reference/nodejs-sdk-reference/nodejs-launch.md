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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/node-activate), [getVariationName](https://developers.vwo.com/docs/node-get-variation-name) and [track](https://developers.vwo.com/docs/node-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/node-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/node-get-settings-file).

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
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile\n});",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]