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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/python-activate), [getVariationName](https://developers.vwo.com/docs/python-get-variation-name) and [track](https://developers.vwo.com/docs/python-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/python-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/python-get-settings-file).

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
        **settings\_file**
        *Required*
      </td>

      <td>
        Object
      </td>

      <td>
        The JSON representing your project and the campaign settings.
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
        **logging**\
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
        **goal\_type\_to\_track**\
        *Optional*
      </td>

      <td>
        String
      </td>

      <td>
        If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

An instance of the VWO class, which can be referenced later for calling out different API methods.

## Usage

```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)
vwo_client_instance = vwo.launch(settings_file)
```
