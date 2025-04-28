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
The VWO client class needs to be instantiated as an instance that exposes various API methods like [activate](https://developers.vwo.com/docs/java-activate), [getVariationName](https://developers.vwo.com/docs/java-get-variation-name) and [track](https://developers.vwo.com/docs/java-track).

Each VWO client represents the state of a project corresponding to the [settingsFile](https://developers.vwo.com/docs/java-get-settings-file). *SettingsFile* needs to be fetched before instantiating a VWO client. Read more on how to get [SettingsFile](https://developers.vwo.com/docs/java-get-settings-file).

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
        String
      </td>

      <td>
        The JSON representing your project and the campaign settings in stringified format.
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

    <tr>
      <td>
        **goalTypeToTrack**\
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

```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);
VWO vwoClientInstance = VWO.launch(settingsFile).build();
```
