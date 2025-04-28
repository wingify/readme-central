---
title: Get Settings File
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
Each VWO SDK client corresponds to the *settings file* representing the current state of the campaign settings, that is, a list of FullStack running campaign settings. See [Review core concepts](https://developers.vwo.com/docs/core-concepts) for more information.
[block:api-header]
{
  "title": "Description"
}
[/block]
VWO SDK is a helper for executing various FullStack capabilities. It requires a certain set of settings for its work. These settings are related to your FullStack campaigns you create or update in the VWO application.
So, before [instantiating](https://developers.vwo.com/docs/nodejs-launch) the VWO SDK, *settings file* needs to be fetched.

The method accepts two parameters:

  * **accountId** - account-id associated with your VWO account.
  * **sdkKey** - generated inside the respective *Project* under the ***FullStack Testing***.
[block:api-header]
{
  "title": "Parameter Definitions"
}
[/block]

[block:parameters]
{
  "data": {
    "0-0": "**accountId**\n*Required*",
    "h-0": "Paramter",
    "h-1": "Type",
    "h-2": "Description",
    "0-1": "Number",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdkKey**\n*Required*",
    "1-1": "String",
    "1-2": "Unique environment-key provided to you inside the Projects section in VWO application.."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Returns"
}
[/block]
Returns a Promise which on success returns the *settings file* which helps in [Instantiating](https://developers.vwo.com/docs/nodejs-launch) the VWO SDK. This method handles any error in fetching the settings file. Please follow the best practices to ensure that your app is prevented from crashing.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "h-2": "Description",
    "0-1": "Object | String",
    "0-0": "Settings File",
    "0-2": "The settings representing the current state of the running VWO FullStack campaings."
  },
  "cols": 3,
  "rows": 1
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
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar settingsFile;\nvwoSDK.getSettingsFile(accountId, sdkKey).then(function (data) {\n\tsettingsFile = data;\n  // ...launch SDK and call APIs\n});",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Syncing changes in Settings File"
}
[/block]
You can use [polling](https://developers.vwo.com/docs/nodejs-configure-polling) or [webhooks](https://developers.vwo.com/docs/nodejs-configure-webhooks) to keep your settings-file up-to-date with the VWO Application(changes you made in FullStack campaigns).