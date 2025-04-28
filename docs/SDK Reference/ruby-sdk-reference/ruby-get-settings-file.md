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
So, before [instantiating](https://developers.vwo.com/docs/ruby-launch) the VWO SDK, *settings file* needs to be fetched.

The method accepts two parameters:

  * **account_id** - account-id associated with your VWO account.
  * **sdk_key** - generated inside the respective *Project* under the ***FullStack Testing***.
[block:api-header]
{
  "title": "Parameter Definitions"
}
[/block]

[block:parameters]
{
  "data": {
    "0-0": "**account_id**\n*Required*",
    "h-0": "Paramter",
    "h-1": "Type",
    "h-2": "Description",
    "0-1": "Number",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdk_key**\n*Required*",
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
Returns a Promise which on success returns the *settings file* which helps in [Instantiating](https://developers.vwo.com/docs/ruby-launch) the VWO SDK. This method handles any error in fetching the settings file. Please follow the best practices to ensure that your app is prevented from crashing.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "h-2": "Description",
    "0-1": "Object",
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
      "code": "require 'vwo'\n\n# Fetch and create instance\nvwo_client_instance = VWO.new(\n  config['account_id'],\n  config['sdk_key']\n)\n\nvwo_client_instance = VWO.new(\n  config['account_id'],\n  config['sdk_key'],\n  integrations: {\n    callback: method(:integrations_callback)\n  }\n)",
      "language": "ruby"
    }
  ]
}
[/block]