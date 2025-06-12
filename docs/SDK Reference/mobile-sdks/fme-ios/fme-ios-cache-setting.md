---
title: Cache Settings
deprecated: false
hidden: false
metadata:
  robots: index
---
## What is Caching of Settings?

Caching of settings in the VWO FME iOS SDK refers to the ability to store and reuse configuration data locally on the device instead of fetching it from the VWO server every time. This includes feature flags, campaign configurations, and other settings that determine how your application behaves.

### Benefits of Caching Settings:

1. **Improved Performance**: Reduces network calls and latency by using locally stored settings
2. **Offline Functionality**: Allows the SDK to function even when the device is offline
3. **Reduced Server Load**: Minimizes the number of requests to VWO servers
4. **Consistent User Experience**: Ensures users get the same experience across app sessions
5. **Battery Efficiency**: Reduces battery consumption by minimizing network operations

## cachedSettingsExpiryTime Parameter

The `cachedSettingsExpiryTime` parameter controls how long the cached settings remain valid before the SDK fetches fresh configuration from the VWO server.

### Type and Default Value:

* **Type**: `Int64` (milliseconds)
* **Default Value**: `nil` (caching disabled)

### Behavior:

* When set to `nil` (default): The SDK fetches fresh settings from the server on every initialization
* When set to a positive value: The SDK uses cached settings until the specified time expires
* When offline and cache expires: The SDK continues using expired cached settings to maintain functionality

## How Caching Works

1. **Initial Fetch**: When the SDK initializes, it fetches settings from the VWO server
2. **Cache Storage**: Settings are stored in the application's private storage area
3. **Cache Validation**: Before using cached settings, the SDK checks if they're still valid
4. **Cache Refresh**: When cache expires, the SDK automatically fetches fresh settings
5. **Fallback Mechanism**: If network is unavailable, the SDK uses expired cache as fallback

## Important Notes

* Cached settings are stored in UserDefaults and persist between app launches.
* When the cached settings expire, the SDK will fetch fresh settings from the VWO server during initialization.
* If the device is offline and cached settings have expired, the SDK will still use the expired cached settings to ensure functionality.
* Setting `cachedSettingsExpiryTime` to `nil` (the default value) disables caching, and the SDK will always fetch fresh settings from the server.

### How to Use `cachedSettingsExpiryTime`

To utilize the `cachedSettingsExpiryTime` parameter, you need to initialize the VWO SDK with this option. Below is an example of how to set this up:

**Example usage**

```swift Swift
let options = VWOInitOptions(sdkKey: SDK_KEY, 
                             accountId: ACCOUNT_ID, 
                             cachedSettingsExpiryTime: 600000) // in milliseconds

```