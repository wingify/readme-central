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
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_user_context.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/get_flag.dart';
import 'package:vwo_fme_flutter_sdk/logger/log_transport.dart';

// Create a VWOInitOptions object
final vwoInitOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

The `init()` method is called with the `sdkKey` and `accountId`. It initializes and returns a Wingify Client Object `vwoClient`, which can be used to perform Feature Experimentation tasks. This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

| Parameter                                    | Type    | Description                                                                                                                                                                                                                                                                                                                |
| :------------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accountId**<br />*Required*                | Integer | Your Wingify application's Account ID.                                                                                                                                                                                                                                                                                         |
| **sdkKey**<br />*Required*                   | String  | A unique environment key provided to you inside the Websites & Apps section in the Wingify application, under ***Default Project***.                                                                                                                                                                                           |
| **pollInterval**<br />*Optional*             | Integer | Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.wingify.com/v2/docs/polling) |
| **cachedSettingsExpiryTime**<br />*Optional* | Integer | Controls the duration (in milliseconds) the SDK uses cached settings before fetching new ones.                                                                                                                                                                                                                             |
| **batchMinSize**<br />*Optional*             | Integer | Minimum number of events to trigger a batch upload.                                                                                                                                                                                                                                                                        |
| **batchUploadTimeInterval**<br />*Optional*  | Integer | Time interval (in milliseconds) for periodic batch uploads.                                                                                                                                                                                                                                                                |
| **logger**<br />*Optional*                   | Object  | An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-flutter-logging)                                                                                                                                                             |
| **integrations**<br />*Optional*             | Object  | A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-flutter-integrations)                                                                                              |

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the *vwoClient* on your mobile, it pulls the latest configurations you've done in the Wingify application.\
If/when you make any changes to the feature flags or rules within Wingify after the *vwoClient* has been initialized on your mobile, there needs to be some way to update your *vwoClient* with the latest settings from Wingify. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```dart
final vwoInitOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  pollInterval: 600000  // in milliseconds
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

### Logger

Wingify by default logs all ERROR level messages to your mobile console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```dart
// Create a custom logger implementation
class DartLogger implements LogTransport {
  @override
  void log(String level, String? message) {
    if (message == null) return;
    print("FE-Flutter: [$level] $message");
  }
}

// Initialize VWO SDK with logger configuration
var transport = <String, dynamic>{};
transport["defaultTransport"] = DartLogger();

var logger = <Map<String, dynamic>>[];
logger.add(transport);

final vwoInitOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  logger: {"level": "TRACE", "transports": logger},
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-flutter-logging) for more advanced logger options.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```dart
final vwoInitOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  integrations: (Map<String, dynamic> properties) {
    print('VWO: Integration callback received: $properties');
  }
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-node-integrations) to learn more about Integrations.
