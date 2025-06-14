---
title: Initialization
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
To create a VWO Client instance, you need to initialize the VWO FME iOS SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```swift Swift
import VWO_FME

// Set SDK Key and Account ID
let options = VWOInitOptions(accountId: ACCOUNT_ID, sdkKey: SDK_KEY)

// Initialize VWO SDK
VWOFme.initialize(options: options) { result in
    switch result {
        case .success(let message):
            // VWO SDK initialized
        case .failure(let error):
            // VWO SDK failed to initialize
    }
}
```

The `initialize()` function is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

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
        **accountId**
        *Required*
      </td>

      <td>
        Int
      </td>

      <td>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under ***Default Project***.
      </td>
    </tr>

    <tr>
      <td>
        **logLevel**
        *Optional*
      </td>

      <td>
        Enum
      </td>

      <td>
        The level of logging to be used. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>

    <tr>
      <td>
        **logPrefix**
        *Optional*
      </td>

      <td>
        String
      </td>

      <td>
        A prefix to be added to log messages. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>

    <tr>
      <td>
        **integrations**
        *Optional*
      </td>

      <td>
        IntegrationCallback
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-ios-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **cachedSettingsExpiryTime**
        *Optional*
      </td>

      <td>
        Int64
      </td>

      <td>
        Expiry time for cached settings in milliseconds. For more details, please check - [Cache Management](https://developers.vwo.com/v2/docs/cache-setting-expiry#/)
      </td>
    </tr>

    <tr>
      <td>
        **pollInterval**
        *Optional*
      </td>

      <td>
        Int64
      </td>

      <td>
        Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **batchMinSize**
        *Optional*
      </td>

      <td>
        Int
      </td>

      <td>
        Minimum size of batch to upload. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/docs/event-batching#/)
      </td>
    </tr>

    <tr>
      <td>
        **batchUploadTimeInterval**
        *Optional*
      </td>

      <td>
        Int64
      </td>

      <td>
        Batch upload time interval in milliseconds. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/docs/event-batching#/)
      </td>
    </tr>

    <tr>
      <td>
        **logTransport**
        *Optional*
      </td>

      <td>
        LogTransport
      </td>

      <td>
        Protocol to send logs to external systems. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-ios-logging)
      </td>
    </tr>
  </tbody>
</Table>

### Integrations

VWO SDKs help you integrate with several third-party destinations. SDKs help you integrate with any kind of tool, be it analytics, monitoring, customer data platforms, messaging, etc. by implementing a very basic and generic callback that is capable of receiving VWO-specific properties.

Example usage:

```swift
class MyClass: IntegrationCallback {
    func execute(_ properties: [String: Any]) {
        // Handle the integration callback here
        print("Integration callback executed with properties: \(properties)")
    }
}

// Create an instance of your class
let integrationClass = MyClass()

let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, integrations: integrationClass)
```

See [Integrations](https://developers.vwo.com/v2/docs/fme-ios-integrations#usage) documentation for additional information.

### Log Transport

You can implement the `LogTransport` protocol to customize how logs are handled and sent to external systems

Example usage:

```swift
// Define a class that conforms to the LogTransport protocol
class MyClass: LogTransport {
    // Implement the log method to handle log messages
    func log(logType: String, message: String) {
        // Send log to a third-party service or handle it as needed
        print("Log Type: \(logType), Message: \(message)")
    }
}

// Create an instance of your class
let logClass = MyClass()

// Initialize VWOInitOptions with the custom log transport
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID,  logTransport:logClass)
```

See [Logging](https://developers.vwo.com/v2/docs/fme-ios-logging) documentation for additional information.

### Polling Interval Adjustment

The `pollInterval` is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

Example usage:

```swift
// Initialize VWOInitOptions with a custom polling interval in milliseconds
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID,  pollInterval:600000)
```

See [Polling](https://developers.vwo.com/v2/docs/polling) documentation for additional information.

### Cached Settings Expiry Time

The `cachedSettingsExpiryTime` parameter allows you to specify how long the cached settings should be considered valid before fetching new settings from the VWO server. This helps in managing the freshness of the configuration data.

Example usage:

```swift
// Initialize VWOInitOptions with a custom cached settings expiry time
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, cachedSettingsExpiryTime:600000)
```

### Event Batching Configuration

The VWO SDK supports storing impression events while the device is offline, ensuring no data loss. These events are batched and seamlessly synchronized with VWO servers once the device reconnects to the internet. Additionally, online event batching allows synchronization of impression events while the device is online. This feature can be configured by setting either the minimum batch size or the batch upload time interval during SDK initialization.

#### NOTE: The uploading of events will get triggered based on whichever condition is met first if using both options.

See [Event Batching](https://developers.vwo.com/v2/docs/event-batching#/) documentation for additional information.

| **Parameter**             | **Description**                                                                    | **Required** | **Type** | **Example** |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------ | -------- | ----------- |
| `batchMinSize`            | Minimum size of the batch to upload.                                               | No           | Int      | `10`        |
| `batchUploadTimeInterval` | Batch upload time interval in milliseconds. Please specify at least a few minutes. | No           | Int64    | `300000`    |

Example usage:

```swift
// Initialize VWOInitOptions with batch configuration
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, batchMinSize:10, batchUploadTimeInterval: 300000)
```