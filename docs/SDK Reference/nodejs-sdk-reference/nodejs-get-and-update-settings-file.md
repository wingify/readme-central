---
title: Get And Update Settings File
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Once the SDK is launched properly, there might be scenarios later on when you need to fetch the latest settings-file and use that instead of the stale one to sync SDK and VWO application. You can do this by calling [Get Settings File](https://developers.vwo.com/docs/node-get-settings-file) API and passing the fetched settings-file to the [Launch](https://developers.vwo.com/docs/node-launch) API to re-instantiate the VWO SDK. Or, you can simply use the Get and Update Settings File API, available on the VWO Client Instance that is already available.
[block:api-header]
{
  "title": "Description"
}
[/block]
**Get And Update Settings File** API will fetch the latest settings-file from the VWO server and update the VWO Client Instance to use that. Every VWO SDK API used after this API will work according to the latest settings-file fetched.

The method accepts three parameters:

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
    "1-0": "**sdkKey**\n*Required*",
    "0-1": "Number",
    "1-1": "String",
    "0-2": "Your VWO application's account-id.",
    "1-2": "Unique environment-key provided to you inside the Projects section in VWO application..",
    "2-0": "**isViaWebhook**\n*Optional*",
    "2-1": "Boolean",
    "2-2": "VWO SDKs require this to handle webhook generated settings-file requests differently.\n**Note:** Only pass true when this API is used once the webhook is triggered.",
    "h-0": "Paramter",
    "h-1": "Type",
    "h-2": "Description"
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
Returns the fetched settings-file. If somehow the latest settings-file could not be fetched then the last fetched settings-file would be returned.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "Settings File",
    "0-1": "Object | String",
    "0-2": "The settings representing the current state of the running VWO FullStack campaigns."
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
Also, please refer to this [section](https://developers.vwo.com/docs/javascript-configure-webhooks) to know how to use this API.
[block:callout]
{
  "type": "warning",
  "title": "SDK Support",
  "body": "This is available from ***v1.10*** onwards."
}
[/block]

[block:api-header]
{
  "title": ""
}
[/block]