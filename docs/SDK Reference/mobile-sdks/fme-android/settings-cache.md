---
title: Cache Settings
deprecated: false
hidden: false
metadata:
  robots: index
---
## What is Caching of Settings?

Caching of settings in the VWO FME Android SDK refers to the ability to store and reuse configuration data locally on the device instead of fetching it from the VWO server every time. This includes feature flags, campaign configurations, and other settings that determine how your application behaves.

### Benefits of Caching Settings:

1. **Improved Performance**: Reduces network calls and latency by using locally stored settings
2. **Offline Functionality**: Allows the SDK to function even when the device is offline
3. **Reduced Server Load**: Minimizes the number of requests to VWO servers
4. **Consistent User Experience**: Ensures users get the same experience across app sessions
5. **Battery Efficiency**: Reduces battery consumption by minimizing network operations

## cachedSettingsExpiryTime Parameter

The `cachedSettingsExpiryTime` parameter controls how long the cached settings remain valid before the SDK fetches fresh configuration from the VWO server.

### Type and Default Value:
- **Type**: `Int` (milliseconds)
- **Default Value**: `0` (caching disabled)

### Behavior:
- When set to `0` (default): The SDK fetches fresh settings from the server on every initialization
- When set to a positive value: The SDK uses cached settings until the specified time expires
- When offline and cache expires: The SDK continues using expired cached settings to maintain functionality

## How Caching Works

1. **Initial Fetch**: When the SDK initializes, it fetches settings from the VWO server
2. **Cache Storage**: Settings are stored in the application's private storage area
3. **Cache Validation**: Before using cached settings, the SDK checks if they're still valid
4. **Cache Refresh**: When cache expires, the SDK automatically fetches fresh settings
5. **Fallback Mechanism**: If network is unavailable, the SDK uses expired cache as fallback

## Important Notes

* The `context` parameter is **required** for caching to work properly. Without a valid application context, the SDK cannot persist settings to the device storage.
* Cached settings are stored within the application's private storage area and persist between app launches.
* When the cached settings expire, the SDK will fetch fresh settings from the VWO server during initialization.
* If the device is offline and cached settings have expired, the SDK will still use the expired cached settings to ensure functionality.
* Setting `cachedSettingsExpiryTime` to `0` (the default value) disables caching, and the SDK will always fetch fresh settings from the server.

## Example Usage

```kotlin
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.cachedSettingsExpiryTime = 3600000 // Cache for 1 hour (in milliseconds)
options.context = applicationContext // Required for cache to work

VWO.init(options, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String?) {
        // VWO initialization succeeded
    }
    
    override fun vwoInitFailed(message: String?) {
        // VWO initialization failed
    }
})
```