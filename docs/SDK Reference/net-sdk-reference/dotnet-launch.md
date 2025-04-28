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
  pages:
    - type: basic
      slug: dotnet-activate
      title: Activate
---
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/dotnet-activate), [getVariationName](https://developers.vwo.com/docs/dotnet-get-variation-name) and [track](https://developers.vwo.com/docs/dotnet-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/dotnet-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/dotnet-get-settings-file).
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
    "5-0": "**shouldTrackReturningUser**\n*Optional*\n**Deprecated from v1.23.0**",
    "4-1": "String",
    "5-1": "Boolean",
    "4-2": "If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.",
    "5-2": "Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end."
  },
  "cols": 3,
  "rows": 5
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
      "code": "using VWOSdk;\n\nSettings settingsFile = VWO.GetSettings(accountId, sdkKey);\nIVWOClient vwoClientInstance = VWO.Launch(settingsFile);",
      "language": "csharp",
      "name": ".NET"
    }
  ]
}
[/block]