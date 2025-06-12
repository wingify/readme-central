---
title: Cache Settings
deprecated: false
hidden: false
metadata:
  robots: index
---
# Caching Settings in VWO React Native SDK

## What is Caching of Settings?

Caching of settings in the VWO FME React Native SDK refers to the ability to store and reuse configuration data locally on the device instead of fetching it from the VWO server every time. This includes feature flags, campaign configurations, and other settings that determine how your application behaves.

### Benefits of Caching Settings:

1. **Improved Performance**: Reduces network calls and latency by using locally stored settings
2. **Offline Functionality**: Allows the SDK to function even when the device is offline
3. **Reduced Server Load**: Minimizes the number of requests to VWO servers
4. **Consistent User Experience**: Ensures users get the same experience across app sessions
5. **Battery Efficiency**: Reduces battery consumption by minimizing network operations

## cachedSettingsExpiryTime Parameter

The `cachedSettingsExpiryTime` parameter controls how long the cached settings remain valid before the SDK fetches fresh configuration from the VWO server.

### Type and Default Value:

* **Type**: `number` (milliseconds)
* **Default Value**: `null` (caching disabled)

### Behavior:

* When set to `null` (default): The SDK fetches fresh settings from the server on every initialization
* When set to a positive value: The SDK uses cached settings until the specified time expires
* When offline and cache expires: The SDK continues using expired cached settings to maintain functionality

## How Caching Works

1. **Initial Fetch**: When the SDK initializes, it fetches settings from the VWO server
2. **Cache Storage**: Settings are stored in the application's private storage area using platform-specific mechanisms (SharedPreferences for Android and UserDefaults for iOS)
3. **Cache Validation**: Before using cached settings, the SDK checks if they're still valid
4. **Cache Refresh**: When cache expires, the SDK automatically fetches fresh settings
5. **Fallback Mechanism**: If network is unavailable, the SDK uses expired cache as fallback

## How to Use cachedSettingsExpiryTime

To utilize the `cachedSettingsExpiryTime` parameter, you need to initialize the VWO SDK with this option. Below is an example of how to set this up:

### Example Usage

```dart Javascript
const options: VWOInitOptions = { sdkKey: SDK_KEY, accountId: ACCOUNT_ID, cachedSettingsExpiryTime: 600000 }; // 10 minutes
vwoClient = await init(options);
```

## Important Notes

* The React Native SDK automatically handles the storage context, so no additional context parameter is required for caching to work.
* When the cached settings expire, the SDK will fetch fresh settings from the VWO server during initialization.
* If the device is offline and cached settings have expired, the SDK will still use the expired cached settings to ensure functionality.
* Setting `cachedSettingsExpiryTime` to `null` (the default value) or not passing this parameter at time of init disables caching, and the SDK will always fetch fresh settings from the server.
* Cached settings are stored within the application's private storage area and persist between app launches.
* The SDK uses platform-specific storage mechanisms (SharedPreferences for Android and UserDefaults for iOS) to handle caching internally.