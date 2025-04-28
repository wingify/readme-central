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

## API Description

SDK provides a method to instantiate a VWO client as an instance. The method accepts an object to configure the VWO client.

The only required parameter for instantiating the SDK is *settings file*. There are other optional parameters, which you could provide for overriding the default behavior or setting environment.

## Parameter Definitions

Below is the list of all parameters that can be used for configuring the VWO SDK.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **logging**
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Override default logger behaviour. Customise log-level, and implement your own log message.
      </td>
    </tr>

    <tr>
      <td>
        **user\_storage\_service**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        The JSON representing the User Campaign Data Map. Used for sticky bucketing and deciding when to call Activate API vs. getVariationName API.
      </td>
    </tr>

    <tr>
      <td>
        **is\_development\_mode**\
        *Optional*
      </td>

      <td>
        Boolean
      </td>

      <td>
        Flag for experimenting the SDK on test-app/staging so that no impression is sent to the VWO server for tracking.
      </td>
    </tr>

    <tr>
      <td>
        **settings\_file**\
        *Optional*
      </td>

      <td>
        Class
      </td>

      <td>
        Fetched settings file
      </td>
    </tr>

    <tr>
      <td>
        **options**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        For passing integrations callback, logging configuration, batching of events configuration. etc.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

An instance of the VWO class, which can be referenced later for calling out different API methods.

## Usage

```ruby
require 'vwo'

vwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false, nil)
```
