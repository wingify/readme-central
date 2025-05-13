---
title: Init changes (Draft)
deprecated: false
hidden: true
metadata:
  robots: index
---
## Parameter Definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Parameter
      </th>

      <th style={{ textAlign: "left" }}>
        Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        **accountId**
        *Required*
      </td>

      <td style={{ textAlign: "left" }}>
        Int
      </td>

      <td style={{ textAlign: "left" }}>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **sdkKey**
        *Required*
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under ***Default Project***.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **logLevel**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Enum
      </td>

      <td style={{ textAlign: "left" }}>
        The level of logging to be used.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **logPrefix**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        String
      </td>

      <td style={{ textAlign: "left" }}>
        A prefix to be added to log messages.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **pollInterval**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Int64
      </td>

      <td style={{ textAlign: "left" }}>
        Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **logger**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Object
      </td>

      <td style={{ textAlign: "left" }}>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **integrations**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Object
      </td>

      <td style={{ textAlign: "left" }}>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-ios-integrations)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **cachedSettingsExpiryTime**
      </td>

      <td style={{ textAlign: "left" }}>
        Int64
      </td>

      <td style={{ textAlign: "left" }}>
        Expiry time for cached settings in milliseconds. For more details, please check - [Cache Management](https://developers.vwo.com/v2/update/docs/cache-setting-expiry#/)
      </td>
    </tr>
  </tbody>
</Table>



| **Parameter**                | **Description**                                                                                                                                             | **Required** | **Type** | **Example**                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- | ------------------------------- |
| `accountId`                  | VWO Account ID for authentication.                                                                                                                          | Yes          | Int      | `123456`                        |
| `sdkKey`                     | SDK key corresponding to the specific environment to initialize the VWO SDK Client. You can get this key from VWO Application.                              | Yes          | String   | `"32-alpha-numeric-sdk-key"`    |
| `logLevel`                   | The level of logging to be used.                                                                                                                            | No           | Enum     | `.error`                        |
| `logPrefix`                  | A prefix to be added to log messages.                                                                                                                        | No           | String   | `"VWO"`                         |
| `pollInterval`               | Time interval for fetching updates from VWO servers (in milliseconds).                                                                                      | No           | Int64    | `60000`                         |
| `integrations`               | Callback for integrations.                                                                                                                                  | No           | IntegrationCallback | See [Integrations](#integrations) section |
| `cachedSettingsExpiryTime`   | Expiry time for cached settings in milliseconds.                                                                                                            | No           | Int64    | `3600000`                       |
| `batchMinSize`               | Minimum size of batch to upload.                                                                                                                            | No           | Int      | `10`                            |
| `batchUploadTimeInterval`    | Batch upload time interval in milliseconds.                                                                                                                 | No           | Int64    | `300000`                        |
| `logTransport`               | Custom log transport for handling log messages.                                                                                                             | No           | LogTransport  | See [LogTransport](#logtransport) section |