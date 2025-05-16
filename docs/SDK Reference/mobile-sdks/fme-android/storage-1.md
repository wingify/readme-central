---
title: Storage
deprecated: false
hidden: true
metadata:
  robots: index
---
# Storage

Mobile SDKs for feature management and experimentation are designed to operate efficiently on Android devices. Unlike server-side SDKs, mobile SDKs utilize built-in storage to manage feature flags and experimentation data.

## Purpose of Storage

The primary purpose of using storage in mobile SDKs is to enhance performance and ensure a consistent user experience. By caching feature flag decisions locally, mobile applications can quickly access necessary data without repeatedly querying the server.

### Key Benefits

* **Consistent User Experience**: Persisting feature flag decisions ensures that users have a consistent experience, even if they close and reopen the app.
* **Decision Stability**: Once a decision is made for a user, it remains consistent, even if campaign settings are modified. This stability is crucial for accurate A/B testing and controlled feature rollouts.
* **Performance Improvement**: Caching decisions locally reduces the need for constant server communication, leading to faster response times and a smoother user experience.

## Implementation in Android

The VWO Android SDK implements storage through the built-in `SharedPreferences` API. This provides a reliable, persistent key-value store that survives app restarts and updates.

### Storage Configuration

To enable proper storage functionality in the VWO Android SDK, you must provide an application context during initialization:

#### Example

```kotlin
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.context = applicationContext // Required for storage to work

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
options.setContext(getApplicationContext()); // Required for storage to work

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

### Custom Storage

While the default implementation uses Android's `SharedPreferences`, the VWO Android SDK also allows for custom storage implementations through the `storage` parameter:

```kotlin
options.storage = MyCustomStorageImplementation()
```
## Important Notes

* Feature flag decisions are stored persistently, ensuring consistent user experiences across app launches.
* The SDK automatically handles caching and retrieval of user decisions without requiring additional configuration. 
* The `context` parameter is **required** for the default storage implementation to function correctly.
