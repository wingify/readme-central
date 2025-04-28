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
To create a VWO Client instance, you need to initialize the VWO FME Flutter SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```swift Dart
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_context.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/get_flag.dart';
import 'package:vwo_fme_flutter_sdk/vwo.dart';

// Create a VWOOptions object.
final vwoOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345
);

// Initiliaze the SDK
VWO? vwoClient = await VWO.init(initOptions);
```

The `init()` method is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature  
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accountId**  \n_Required_",
    "0-1": "Number",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdkKey**  \n_Required_",
    "1-1": "String",
    "1-2": "A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.",
    "2-0": "**pollInterval**  \n_Optional_",
    "2-1": "Number",
    "2-2": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) ",
    "3-0": "**logger**  \n_Optional_",
    "3-1": "Object",
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-flutter-logging)",
    "4-0": "**integrations**  \n_Optional_",
    "4-1": "Object",
    "4-2": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-flutter-integrations)"
  },
  "cols": 3,
  "rows": 5,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


### Poll Interval (Keeping VWO client up-to-date)

When you initialize the _vwoClient_ on your mobile, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwoClient_ has been initialized on your mobile, there needs to be some way to update your _vwoClient_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```swift Dart
// Create a VWOOptions object.
final vwoOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  pollInterval: 600000  // in milliseconds
);

// Initiliaze the SDK
VWO? vwoClient = await VWO.init(initOptions);
```

### Logger

VWO by default logs all ERROR level messages to your mobile console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```swift Dart
// Create a VWOOptions object.
final vwoOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  logger: {
    "level": "DEBUG",
  }
);

// Initiliaze the SDK
VWO? vwoClient = await VWO.init(initOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-flutter-logging) for more advanced logger options.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```swift Dart
// Create a VWOOptions object.
final vwoOptions = VWOInitOptions(
  sdkKey: 'your-sdk-key',
  accountId: 12345,
  integrationCallback: (Map<String, dynamic> properties) {
    print('VWO: Integration callback received: $properties');
  }
);

// Initiliaze the SDK
VWO? vwoClient = await VWO.init(initOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-node-integrations) to learn more about Integrations,.