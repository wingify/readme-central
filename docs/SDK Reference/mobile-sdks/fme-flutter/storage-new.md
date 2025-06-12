---
title: Storage (New)
deprecated: false
hidden: true
metadata:
  robots: index
---
Mobile SDKs for feature management and experimentation are designed to operate efficiently on Flutter applications. Mobile SDKs utilize built-in storage to manage feature flags and experimentation data.

## Purpose of Storage

The primary purpose of using storage in mobile SDKs is to enhance performance and ensure a consistent user experience. By caching feature flag decisions locally, mobile applications can quickly access necessary data without repeatedly querying the server.

### Key Benefits

* **Consistent User Experience**: Persisting feature flag decisions ensures that users have a consistent experience, even if they close and reopen the app.
* **Decision Stability**: Once a decision is made for a user, it remains consistent, even if campaign settings are modified. This stability is crucial for accurate A/B testing and controlled feature rollouts.
* **Performance Improvement**: Caching decisions locally reduces the need for constant server communication, leading to faster response times and a smoother user experience.

## Implementation in Flutter

The VWO Flutter SDK implements storage through platform-specific mechanisms, such as `SharedPreferences` for Android and `UserDefaults` for iOS. This provides a reliable, persistent key-value store that survives app restarts and updates.

### Storage Configuration

To enable proper storage functionality in the VWO Flutter SDK, you do not need to provide any external storage parameter during initialization:

#### Example

```dart
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';

final vwoInitOptions = VWOInitOptions(
  sdkKey: 'YOUR_SDK_KEY',
  accountId: YOUR_ACCOUNT_ID,
);

// Initialize the SDK
final vwoClient = await VWO.init(vwoInitOptions);
```

## Important Notes

* Feature flag decisions are stored persistently, ensuring consistent user experiences across app launches.
* The SDK automatically handles caching and retrieval of user decisions without requiring additional configuration.