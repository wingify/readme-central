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
To create a VWO Client instance, you need to initialize the VWO FME React Native SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```javascript JavaScript
import { init } from 'vwo-fme-react-native-sdk';

import {
  VWOInitOptions,
  VWOContext,
  GetFlagResult,
} from 'vwo-fme-react-native-sdk/src/types';

let vwoClient;;

// initialize sdk
useEffect(() => {

    const initializeSDK = async () => {
      const options: VWOInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID };
      try {
        vwoClient = await init(options);
        console.log('VWO init success');
      } catch (error) {
        console.error('Error initialising', error);
      }
    };
    
    initializeSDK();
}, []);
```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
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
        number
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
        string
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
        enum
      </td>

      <td>
        The level of logging to be used. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-native-logging)
      </td>
    </tr>

    <tr>
      <td>
        **logPrefix**
        *Optional*
      </td>

      <td>
        string
      </td>

      <td>
        A prefix to be added to log messages. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-native-logging)
      </td>
    </tr>

    <tr>
      <td>
        **integrations**
        *Optional*
      </td>

      <td>
        boolean
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-react-native-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **cachedSettingsExpiryTime**
        *Optional*
      </td>

      <td>
        number
      </td>

      <td>
        Expiry time for cached settings in milliseconds. For more details, please check - [Cache Management](https://developers.vwo.com/v2/update/docs/cache-setting-expiry#/)
      </td>
    </tr>

    <tr>
      <td>
        **pollInterval**
        *Optional*
      </td>

      <td>
        number
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
        number
      </td>

      <td>
        Minimum size of batch to upload. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/update/docs/event-batching#/)
      </td>
    </tr>

    <tr>
      <td>
        **batchUploadTimeInterval**
        *Optional*
      </td>

      <td>
        number
      </td>

      <td>
        Batch upload time interval in milliseconds. For more detail, please check - [Event Batching](https://developers.vwo.com/v2/update/docs/event-batching#/)
      </td>
    </tr>
  </tbody>
</Table>

### Additional Callbacks

* Integration Callback: Use `VWO.registerIntegrationCallback` to manage integration events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-integrations)
* Log Callback: Use `VWO.registerLogCallback` to capture and handle log events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-logging)

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