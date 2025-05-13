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
        The level of logging to be used. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
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
        A prefix to be added to log messages. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **integrations**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        IntegrationCallback
      </td>

      <td style={{ textAlign: "left" }}>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-ios-integrations)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **cachedSettingsExpiryTime**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Int64
      </td>

      <td style={{ textAlign: "left" }}>
        Expiry time for cached settings in milliseconds. For more details, please check - [Cache Management](https://developers.vwo.com/v2/update/docs/cache-setting-expiry#/)
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
        **batchMinSize**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Int
      </td>

      <td style={{ textAlign: "left" }}>
        Minimum size of batch to upload. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/update/docs/event-batching#/)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **batchUploadTimeInterval**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        Int64
      </td>

      <td style={{ textAlign: "left" }}>
        Batch upload time interval in milliseconds. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/update/docs/event-batching#/)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **logTransport**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        LogTransport
      </td>

      <td style={{ textAlign: "left" }}>
        Protocol to send logs to external systems. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>
  </tbody>
</Table>