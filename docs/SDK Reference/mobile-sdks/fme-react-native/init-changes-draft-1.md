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
        number
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
        string
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
        enum
      </td>

      <td style={{ textAlign: "left" }}>
        The level of logging to be used. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-native-logging)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **logPrefix**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        A prefix to be added to log messages. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-native-logging)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **integrations**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-react-native-integrations)
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        **cachedSettingsExpiryTime**
        *Optional*
      </td>

      <td style={{ textAlign: "left" }}>
        number
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
        number
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
        number
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
        number
      </td>

      <td style={{ textAlign: "left" }}>
        Batch upload time interval in milliseconds. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/update/docs/event-batching#/)
      </td>
    </tr>
  </tbody>
</Table>

### Additional Callbacks

* Integration Callback: Use VWO.registerIntegrationCallback to manage integration events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-integrations)
* Log Callback: Use VWO.registerLogCallback to capture and handle log events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-logging)

### Polling Interval Adjustment

The `pollInterval` is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

Example usage:

```javascript
const options: VWOInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, pollInterval: 600000 }; // 10 minutes
vwoClient = await init(options);
```

### Cached Settings Expiry Time

The `cachedSettingsExpiryTime` parameter allows you to specify how long the cached settings should be considered valid before fetching new settings from the VWO server. This helps in managing the freshness of the configuration data.

Example usage:

```javascript
const options: VWOInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, cachedSettingsExpiryTime: 600000 }; // 10 minutes
vwoClient = await init(options);
```

### Event Batching Configuration

The VWO SDK supports storing impression events while the device is offline, ensuring no data loss. These events are batched and seamlessly synchronized with VWO servers once the device reconnects to the internet. Additionally, online event batching allows synchronization of impression events while the device is online. This feature can be configured by setting either the minimum batch size or the batch upload time interval during SDK initialization.

#### NOTE: The batching will trigger based on whichever condition is met first if using both options.

| **Parameter**             | **Description**                                                                    | **Required** | **Type** | **Example** |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------ | -------- | ----------- |
| `batchMinSize`            | Minimum size of the batch to upload.                                               | No           | number   | `10`        |
| `batchUploadTimeInterval` | Batch upload time interval in milliseconds. Please specify at least a few minutes. | No           | number   | `300000`    |

Example usage:

```javascript
const options: VWOInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, batchMinSize: 10, batchUploadTimeInterval: 300000 }; // 5 minutes
vwoClient = await init(options);
```