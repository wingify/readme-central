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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/go-activate), [getVariationName](https://developers.vwo.com/docs/go-get-variation-name) and [track](https://developers.vwo.com/docs/go-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/go-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/go-get-settings-file).

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
        **settingsFile**
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
        **isDevelopmentMode**\
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
        **userStorageService**\
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
  </tbody>
</Table>

## Returns

An instance of the VWO class, which can be referenced later for calling out different API methods.

## Usage

```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

// Get SettingsFile
settingsFile := vwo.GetSettingsFile("accountID", "SDKKey")

// Default instance of VwoInstance
vwoClientInstance, err := vwo.Launch(settingsFile)
if err != nil {
	//handle err
}

// Instance with custom options
vwoClientInstance, err := vwo.Launch(settingsFile, api.WithDevelopmentMode())
if err != nil {
	//handle err
}
```
