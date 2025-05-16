---
title: Settings Cache
deprecated: false
hidden: true
metadata:
  robots: index
---
The `cachedSettingsExpiryTime` parameter allows you to manage how long the cached settings remain valid before the system fetches latest configuration from the VWO server.

By default, the SDK does not cache configuration, meaning it fetches the latest configuration data from the VWO server every time on initialization.

## How to Use cachedSettingsExpiryTime

To utilize the `cachedSettingsExpiryTime` parameter, you need to initialize the VWO SDK with this option. Below are examples of how to set this up:

### Example Usage

```kotlin
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.cachedSettingsExpiryTime = timeInMillis // in milliseconds
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
```java
VWOInitOptions options = new VWOInitOptions();
options.setSdkKey("YOUR_SDK_KEY");
options.setAccountId(YOUR_ACCOUNT_ID);
options.setCachedSettingsExpiryTime(timeInMillis); // in milliseconds
options.setContext(getApplicationContext()); // Required for cache to work

VWO.init(options, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(VWO vwo, String message) {
        // VWO initialization succeeded
    }
    
    @Override
    public void vwoInitFailed(String message) {
        // VWO initialization failed
    }
});
```

## Important Notes

* The `context` parameter is **required** for caching to work properly. Without a valid application context, the SDK cannot persist settings to the device storage.
* When the cached settings expire, the SDK will fetch fresh settings from the VWO server during initialization.
* If the device is offline and cached settings have expired, the SDK will still use the expired cached settings to ensure functionality.
* Setting `cachedSettingsExpiryTime` to `0` (the default value) disables caching, and the SDK will always fetch fresh settings from the server.
* Cached settings are stored within the application's private storage area and persist between app launches.