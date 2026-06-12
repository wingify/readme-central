---
title: Initialization
deprecated: false
hidden: false
metadata:
  robots: index
---
To create a Wingify Client instance, you need to initialize the Wingify FE Flutter SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```dart
import 'package:wingify_fme_flutter_sdk/wingify.dart';
import 'package:wingify_fme_flutter_sdk/wingify/models/wingify_init_options.dart';
import 'package:wingify_fme_flutter_sdk/wingify/models/wingify_user_context.dart';
import 'package:wingify_fme_flutter_sdk/wingify/models/get_flag.dart';
import 'package:wingify_fme_flutter_sdk/logger/log_transport.dart';

// Create a WingifyInitOptions object
final wingifyInitOptions = WingifyInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345
);

// Initialize the SDK
final wingifyClient = await Wingify.init(wingifyInitOptions);
```

The `init()` method is called with the `sdkKey` and `accountId`. It initializes and returns a Wingify Client Object `wingifyClient`, which can be used to perform Feature Experimentation tasks. This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

| Parameter                                    | Type    | Description                                                                                                                                                                                                                                                                                                                |
| :------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accountId**<br />_Required_                | Integer | Your Wingify application's Account ID.                                                                                                                                                                                                                                                                                         |
| **sdkKey**<br />_Required_                   | String  | A unique environment key provided to you inside the Websites & Apps section in the Wingify application, under **_Default Project_**.                                                                                                                                                                                           |
| **pollInterval**<br />_Optional_             | Integer | Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.wingify.com/v2/docs/polling) |
| **cachedSettingsExpiryTime**<br />_Optional_ | Integer | Controls the duration (in milliseconds) the SDK uses cached settings before fetching new ones.                                                                                                                                                                                                                             |
| **batchMinSize**<br />_Optional_             | Integer | Minimum number of events to trigger a batch upload.                                                                                                                                                                                                                                                                        |
| **batchUploadTimeInterval**<br />_Optional_  | Integer | Time interval (in milliseconds) for periodic batch uploads.                                                                                                                                                                                                                                                                |
| **logger**<br />_Optional_                   | Object  | An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-flutter-logging)                                                                                                                                                             |
| **integrations**<br />_Optional_             | Object  | A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-flutter-integrations)                                                                                              |

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ on your mobile, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized on your mobile, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```dart
final wingifyInitOptions = WingifyInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  pollInterval: 600000  // in milliseconds
);

// Initialize the SDK
final wingifyClient = await Wingify.init(wingifyInitOptions);
```

### Logger

Wingify by default logs all ERROR level messages to your mobile console. To gain more control over's logging behavior, you can use the logger parameter in the init configuration.

```dart
// Create a custom logger implementation
class DartLogger implements LogTransport {
  @override
  void log(String level, String? message) {
    if (message == null) return;
    print("FE-Flutter: [$level] $message");
  }
}

// Initialize Wingify SDK with logger configuration
var transport = <String, dynamic>{};
transport["defaultTransport"] = DartLogger();

var logger = <Map<String, dynamic>>[];
logger.add(transport);

final wingifyInitOptions = WingifyInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  logger: {"level": "TRACE", "transports": logger},
);

// Initialize the SDK
final wingifyClient = await Wingify.init(wingifyInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-flutter-logging) for more advanced logger options.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives-specific properties and can forward them to any third-party tool of your choice.

```dart
final wingifyInitOptions = WingifyInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  integrations: (Map<String, dynamic> properties) {
    print('Wingify: Integration callback received: $properties');
  }
);

// Initialize the SDK
final wingifyClient = await Wingify.init(wingifyInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-node-integrations) to learn more about Integrations.
