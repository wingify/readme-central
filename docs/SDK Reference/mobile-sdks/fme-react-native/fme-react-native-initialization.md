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
To create a Wingify Client instance, you need to initialize the Wingify FE React Native SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```javascript JavaScript
import { init } from 'wingify-fme-react-native-sdk';

import {
  WingifyInitOptions,
  WingifyContext,
  GetFlagResult,
} from 'wingify-fme-react-native-sdk/src/types';

let WingifyClient;;

// initialize sdk
useEffect(() => {

    const initializeSDK = async () => {
      const options: WingifyInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID };
      try {
        WingifyClient = await init(options);
        console.log('Wingify init success');
      } catch (error) {
        console.error('Error initialising', error);
      }
    };

    initializeSDK();
}, []);
```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a Wingify Client ObjectWingify`Client`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        _Required_
      </td>

      <td>
        number
      </td>

      <td>
        Your Wingify application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**
        _Required_
      </td>

      <td>
        string
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the Wingify application, under **_Default Project_**.
      </td>
    </tr>

    <tr>
      <td>
        **logLevel**
        _Optional_
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
        _Optional_
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
        _Optional_
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
        _Optional_
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
        _Optional_
      </td>

      <td>
        number
      </td>

      <td>
        Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **batchMinSize**
        _Optional_
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
        _Optional_
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

- Integration Callback: Use `Wingify.registerIntegrationCallback` to manage integration events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-integrations)
- Log Callback: Use `Wingify.registerLogCallback` to capture and handle log events. [Refer documentation](https://developers.vwo.com/v2/docs/fme-react-native-logging)

### Polling Interval Adjustment

The `pollInterval` is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

Example usage:

```javascript
const options: WingifyInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, pollInterval: 600000 }; // 10 minutes
WingifyClient = await init(options);
```

### Cached Settings Expiry Time

The `cachedSettingsExpiryTime` parameter allows you to specify how long the cached settings should be considered valid before fetching new settings from the Wingify server. This helps in managing the freshness of the configuration data.

Example usage:

```javascript
const options: WingifyInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, cachedSettingsExpiryTime: 600000 }; // 10 minutes
WingifyClient = await init(options);
```

### Event Batching Configuration

The Wingify SDK supports storing impression events while the device is offline, ensuring no data loss. These events are batched and seamlessly synchronized with Wingify servers once the device reconnects to the internet. Additionally, online event batching allows synchronization of impression events while the device is online. This feature can be configured by setting either the minimum batch size or the batch upload time interval during SDK initialization.

#### NOTE: The batching will trigger based on whichever condition is met first if using both options.

| **Parameter**             | **Description**                                                                    | **Required** | **Type** | **Example** |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------ | -------- | ----------- |
| `batchMinSize`            | Minimum size of the batch to upload.                                               | No           | number   | `10`        |
| `batchUploadTimeInterval` | Batch upload time interval in milliseconds. Please specify at least a few minutes. | No           | number   | `300000`    |

Example usage:

```javascript
const options: WingifyInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, batchMinSize: 10, batchUploadTimeInterval: 300000 }; // 5 minutes
WingifyClient = await init(options);
```

<br />
