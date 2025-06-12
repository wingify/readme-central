---
title: Logging
deprecated: false
hidden: false
metadata:
  robots: index
---
VWO by default logs all `ERROR` level messages to your device console. To gain more control over VWO's logging behavior, you can use the `logger` parameter in the `init` configuration.

## Logger Properties

| Parameter      | Type        | Description                                                                            |
| :------------- | :---------- | :------------------------------------------------------------------------------------- |
| **level**      | String      | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **transports** | List/Object | Custom logger implementation(s) for advanced log handling.                             |

## Examples

### Example 1: Set log level to control the verbosity of logs

```dart Dart
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';

final vwoInitOptions = VWOInitOptions(
  sdkKey: 'YOUR_SDK_KEY',
  accountId: YOUR_ACCOUNT_ID,
  logger: {"level": "TRACE"} // DEBUG, INFO, ERROR, TRACE, WARN
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

### Example 2: Implement custom transport to handle logs your way

The `transports` parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (TRACE, DEBUG, INFO, WARN, ERROR) to process log messages according to your needs.

```dart Dart
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';
import 'package:vwo_fme_flutter_sdk/logger/log_transport.dart';

// Create a custom logger implementation
class DartLogger implements LogTransport {
  @override
  void log(String level, String? message) {
    if (message == null) return;
    print("FME-Flutter: [$level] $message");
  }
}

// Initialize VWO SDK with logger configuration
var transport = <String, dynamic>{};
transport["defaultTransport"] = DartLogger();

var logger = <Map<String, dynamic>>[];
logger.add(transport);

final vwoInitOptions = VWOInitOptions(
  sdkKey: 'YOUR_SDK_KEY',
  accountId: YOUR_ACCOUNT_ID,
  logger: {"level": "TRACE", "transports": logger},
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

The custom logger implementation allows you to:

* Process log messages according to your application's needs
* Forward logs to your preferred logging service
* Filter or transform log messages before they are displayed
* Integrate with your existing logging infrastructure