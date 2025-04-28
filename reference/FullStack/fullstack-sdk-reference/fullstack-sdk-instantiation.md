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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/reference), [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) and [track](https://developers.vwo.com/reference#fullstack-sdk-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/reference#v-get-settings). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/reference#fullstack-get-settings).

[block:api-header]
{
  "title": "API Description"
}
[/block]
SDK provides a method to instantiate a VWO client as an instance. The method accepts an object to configure the VWO client.

The only required parameter for instantiating the SDK is *settingsFile*. There are other optional parameters, which you could provide for overriding the default behavior or setting environment. Refer to [Customize an SDK](https://developers.vwo.com/reference#fullstack-sdk-customization) for more information.
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
    "5-0": "**shouldTrackReturningUser**\n*Optional*",
    "4-1": "String",
    "5-1": "Boolean",
    "4-2": "If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.\n\n**Note**: This is currently supported in Node.js, Python, Java, and .NET SDKs only from v1.8.0+ onwards",
    "5-2": "Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) at your end.\n\n**Note**: This is currently supported in NodeJs, Python, Java, and .NET SDKs only from v1.8.0+ onwards"
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
Instantiates an instance of the VWO class, which can be referenced later for calling out different API methods.
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
    },
    {
      "code": "<?php\n\nrequire_once('vendor/autoload.php');\n\nuse vwo\\VWO;\n\n$vwoClientInstance = new VWO($config);",
      "language": "php"
    },
    {
      "code": "import vwo\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\nvwo_client_instance = vwo.launch(settings_file)",
      "language": "python"
    },
    {
      "code": "using VWOSdk;\n\nSettings settingsFile = VWO.GetSettings(accountId, sdkKey);\nIVWOClient vwoClientInstance = VWO.Launch(settingsFile);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\nVWO vwoClientInstance = VWO.launch(settingsFile).build();\n",
      "language": "java"
    },
    {
      "code": "require 'vwo'\n\nvwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)",
      "language": "ruby"
    },
    {
      "code": "import vwo \"github.com/wingify/vwo-go-sdk\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\n\n// Get SettingsFile\nsettingsFile := vwo.GetSettingsFile(\"accountID\", \"SDKKey\")\n\n// Default instance of VwoInstance\nvwoClientInstance, err := vwo.Launch(settingsFile)\nif err != nil {\n\t//handle err\n}\n\n// Instance with custom options\nvwoClientInstance, err := vwo.Launch(settingsFile, api.WithDevelopmentMode())\nif err != nil {\n\t//handle err\n}\n",
      "language": "go"
    }
  ]
}
[/block]