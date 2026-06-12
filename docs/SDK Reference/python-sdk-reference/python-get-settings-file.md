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
Each Wingify SDK client corresponds to the *settings file* representing the current state of the campaign settings, that is, a list of FullStack running campaign settings. See [Review core concepts](https://developers.vwo.com/docs/core-concepts) for more information.

## Description

Wingify SDK is a helper for executing various FullStack capabilities. It requires a certain set of settings for its work. These settings are related to your FullStack campaigns you create or update in the Wingify application.\
So, before [instantiating](https://developers.vwo.com/docs/python-launch) the Wingify SDK, *settings file* needs to be fetched.

The method accepts two parameters:

* **accountId** - account-id associated with your Wingify account.
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
        **account\_id**
        *Required*
      </td>

      <td>
        Number
      </td>

      <td>
        Your Wingify application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdk\_ey**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique environment-key provided to you inside the Projects section in Wingify application..
      </td>
    </tr>
  </tbody>
</Table>

## Returns

Returns the *settings file* which helps in [Instantiating](https://developers.vwo.com/docs/python-launch) the Wingify SDK. This method handles any error in fetching the settings file. Please follow the best practices to ensure that your app is prevented from crashing.

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
        Object | String
      </td>

      <td>
        The settings representing the current state of the running Wingify FullStack campaings.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)
```

## Syncing changes in Settings File

You can use [webhooks](https://developers.vwo.com/docs/python-configure-webhooks) to keep your settings-file up-to-date with the Wingify Application(changes you made in FullStack campaigns).
