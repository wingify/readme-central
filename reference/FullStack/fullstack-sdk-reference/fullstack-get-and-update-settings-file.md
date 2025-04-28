---
title: Get And Update Settings File
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
Once the SDK is launched properly, there might be scenarios later on when you need to fetch the latest settings-file and use that instead of the stale one to sync SDK and VWO application. You can do this by calling [Get Settings File](https://developers.vwo.com/reference#fullstack-get-settings) API and passing the fetched settings-file to the [Launch](https://developers.vwo.com/reference#fullstack-sdk-instantiation) API to re-instantiate the VWO SDK. Or, you can simply use the Get and Update Settings File API, available on the VWO Client Instance that is already available.

## Description

**Get And Update Settings File** API will fetch the latest settings-file from the VWO server and update the VWO Client Instance to use that. Every VWO SDK API used after this API will work according to the latest settings-file fetched.

The method accepts three parameters:

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
        Your VWO application's account-id.
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

    <tr>
      <td>
        **isViaWebhook**\
        *Optional*
      </td>

      <td>
        Boolean
      </td>

      <td>
        VWO SDKs require this to handle webhook generated settings-file requests differently.

        * \*Note:\*\* Only pass true when this API is used once the webhook is triggered.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

Returns the fetched settings-file. If somehow the latest settings-file could not be fetched then the last fetched settings-file would be returned.

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
        The settings representing the current state of the running VWO FullStack campaigns.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

Also, please refer to this [section](https://developers.vwo.com/reference#fullstack-configure-webhooks) to know how to use this API.

> 🚧 SDK Support
>
> This is available in **Node.js, Python, and Java** SDKs from *v1.10.0* onwards.

##
