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

The `init()` method is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
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
        Number
      </td>

      <td>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**\
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
        **pollInterval**\
        *Optional*
      </td>

      <td>
        Number
      </td>

      <td>
        Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) 
      </td>
    </tr>

    <tr>
      <td>
        **logger**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-flutter-logging)
      </td>
    </tr>

    <tr>
      <td>
        **integrations**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-flutter-integrations)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the *vwoClient* on your mobile, it pulls the latest configurations you've done in the VWO application.\
If/when you make any changes to the feature flags or rules within VWO after the *vwoClient* has been initialized on your mobile, there needs to be some way to update your *vwoClient* with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

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
