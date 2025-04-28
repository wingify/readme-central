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

## Description

VWO SDK is a helper for executing various FullStack capabilities. It requires a certain set of settings for its work. These settings are related to your FullStack campaigns you create or update in the VWO application.\
So, before [instantiating](https://developers.vwo.com/docs/java-launch) the VWO SDK, *settings file* needs to be fetched.

The method accepts two parameters:

* **accountId** - account-id associated with your VWO account.
* **sdkKey** - generated inside the respective *Project* under the ***FullStack Testing***.

## Parameter Definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
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
        **accountId**
        *Required*
      </td>

      <td>
        Number
      </td>

      <td>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique environment-key provided to you inside the Projects section in VWO application..
      </td>
    </tr>
  </tbody>
</Table>

## Returns

Returns the *settings file* which helps in [Instantiating](https://developers.vwo.com/docs/java-launch) the VWO SDK. This method handles any error in fetching the settings file. Please follow the best practices to ensure that your app is prevented from crashing.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
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
        Settings File
      </td>

      <td>
        String
      </td>

      <td>
        The settings representing the current state of the running VWO FullStack campaings.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);
```

## Syncing changes in Settings File

You can use [polling](https://developers.vwo.com/docs/java-configure-polling) or [webhooks](https://developers.vwo.com/docs/java-configure-webhooks) to keep your settings-file up-to-date with the VWO Application(changes you made in FullStack campaigns).
