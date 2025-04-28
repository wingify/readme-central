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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/ruby-activate), [getVariationName](https://developers.vwo.com/docs/ruby-get-variation-name) and [track](https://developers.vwo.com/docs/ruby-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/ruby-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/ruby-get-settings-file).

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
    "0-0": "**logging**\n*Optional*",
    "0-1": "Object",
    "0-2": "Override default logger behaviour. Customise log-level, and implement your own log message.",
    "1-0": "**user_storage_service**\n*Optional*",
    "1-1": "Object",
    "1-2": "The JSON representing the User Campaign Data Map. Used for sticky bucketing and deciding when to call Activate API vs. getVariationName API.",
    "2-0": "**is_development_mode**\n*Optional*",
    "2-1": "Boolean",
    "2-2": "Flag for experimenting the SDK on test-app/staging so that no impression is sent to the VWO server for tracking.",
    "3-0": "**settings_file**\n*Optional*",
    "3-1": "Class",
    "3-2": "Fetched settings file",
    "4-0": "**options**\n*Optional*",
    "4-1": "Object",
    "4-2": "For passing integrations callback, logging configuration, batching of events configuration. etc."
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
      "code": "require 'vwo'\n\nvwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false, nil)",
      "language": "ruby"
    }
  ]
}
[/block]