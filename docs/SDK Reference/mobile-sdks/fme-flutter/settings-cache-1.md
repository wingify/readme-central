---
title: Settings Cache
deprecated: false
hidden: true
metadata:
  robots: index
---
The `cachedSettingsExpiryTime` parameter allows you to manage how long the cached settings remain valid before the system fetches latest configuration from the VWO server.

By default, the SDK does not cache configuration, meaning it fetches the latest configuration data from the VWO server every time on initialization.

## How to Use cachedSettingsExpiryTime

To utilize the `cachedSettingsExpiryTime` parameter, you need to initialize the VWO SDK with this option. Below is an example of how to set this up:

### Example Usage

```dart
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';

final vwoInitOptions = VWOInitOptions(
  sdkKey: 'YOUR_SDK_KEY',
  accountId: YOUR_ACCOUNT_ID,
  cachedSettingsExpiryTime: 600000 // in milliseconds
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

## Important Notes

* When the cached settings expire, the SDK will fetch fresh settings from the VWO server during initialization.
* If the device is offline and cached settings have expired, the SDK will still use the expired cached settings to ensure functionality.
* Setting `cachedSettingsExpiryTime` to `0` (the default value) disables caching, and the SDK will always fetch fresh settings from the server.
* Cached settings are stored within the application's private storage area and persist between app launches.
* The SDK uses platform-specific storage mechanisms to handle caching internally.