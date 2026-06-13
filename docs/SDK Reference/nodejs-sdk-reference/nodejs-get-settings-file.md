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
Each Wingify SDK client corresponds to the *settings file* representing the current state of the campaign settings, that is, a list of FullStack running campaign settings. See [Review core concepts](https://developers.wingify.com/docs/core-concepts) for more information.

## Description

Wingify SDK is a helper for executing various FullStack capabilities. It requires a certain set of settings for its work. These settings are related to your FullStack campaigns you create or update in the Wingify application.\
So, before [instantiating](https://developers.wingify.com/docs/nodejs-launch) the Wingify SDK, *settings file* needs to be fetched.

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
        **accountId**
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
        **sdkKey**\
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

Returns a Promise which on success returns the *settings file* which helps in [Instantiating](https://developers.wingify.com/docs/nodejs-launch) the Wingify SDK. This method handles any error in fetching the settings file. Please follow the best practices to ensure that your app is prevented from crashing.

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

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var settingsFile;
vwoSDK.getSettingsFile(accountId, sdkKey).then(function (data) {
	settingsFile = data;
  // ...launch SDK and call APIs
});
```

## Syncing changes in Settings File

You can use [polling](https://developers.wingify.com/docs/nodejs-configure-polling) or [webhooks](https://developers.wingify.com/docs/nodejs-configure-webhooks) to keep your settings-file up-to-date with the Wingify Application(changes you made in FullStack campaigns).
