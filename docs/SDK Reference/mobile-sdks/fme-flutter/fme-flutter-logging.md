---
title: Logging
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
VWO by default logs all ERROR level messages to your device console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter | Type   | Description                                                                            |
| :-------- | :----- | :------------------------------------------------------------------------------------- |
| **level** | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |

**Example 1**: Set log level to control the verbosity of logs

```swift Dart
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';

// Create a VWOOptions object
final vwoOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: account_id,
  logger: {
    "level": "DEBUG",
  }
);

// Create an instance of the SDK
VWO? vwoClient = await VWO.init(initOptions);
```

This "logger" object can be passed as one of the parameters when [initializing *vwoClient*.](https://developers.vwo.com/v2/docs/fme-initialization)
