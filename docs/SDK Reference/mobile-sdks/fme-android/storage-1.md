---
title: Storage
deprecated: false
hidden: true
metadata:
  robots: index
---

# Storage in VWO FME Android SDK

The VWO FME Android SDK operates in a stateless mode by default, meaning each `getFlag` call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, the SDK provides both built-in storage and the ability to implement custom storage through a storage connector. This allows you to persist feature flag decisions in your preferred storage system.

## Key Benefits of Storage

1. **Improved Performance**: Reduces network calls and latency by caching decisions locally
2. **Consistent User Experience**: Ensures users get the same experience across app sessions
3. **Reduced Server Load**: Minimizes the number of requests to VWO servers
4. **Decision Stability**: Once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application
5. **Offline Functionality**: Allows the SDK to function even when the device is offline

## How to Implement a Storage Service

### Built-in Storage

The SDK uses Android's `SharedPreferences` API for built-in storage, which provides a reliable, persistent key-value store that survives app restarts and updates.

### Requirements for Built-in Storage

* The `context` parameter is **required** for built-in storage to work properly
* Storage is automatically enabled when a valid application context is provided

### Example Usage with Built-in Storage

Kotlin:
```kotlin
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.context = applicationContext // Required for built-in storage

VWO.init(options, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String?) {
        // VWO initialization succeeded
    }
    
    override fun vwoInitFailed(message: String?) {
        // VWO initialization failed
    }
})
```

Java:
```java
VWOInitOptions options = new VWOInitOptions();
options.setSdkKey("YOUR_SDK_KEY");
options.setAccountId(YOUR_ACCOUNT_ID);
options.setContext(getApplicationContext()); // Required for built-in storage

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

### Custom Storage Implementation

You can implement your own storage mechanism by creating a class that extends the `Connector` class and implementing the required methods.

### Storage Connector Interface

The storage connector should implement two main methods:

| Method | Parameters | Description | Returns |
|--------|------------|-------------|---------|
| `get` | `featureKey: String?`, `userId: String?` | Retrieves stored data for a specific feature and user | The stored data or null if not found |
| `set` | `data: Map<String, Any>` | Stores data for a specific feature and user | void |

### Example Custom Storage Implementation

Kotlin:
```kotlin
class CustomStorageConnector : Connector() {
    /**
     * Retrieves data from storage
     * @param featureKey The feature key for the data
     * @param userId The user ID for the data
     * @return The stored data if found, or null otherwise
     */
    override fun get(featureKey: String?, userId: String?): Any? {
        // Implement your storage retrieval logic here
        // Return the stored data or null if not found
    }

    /**
     * Stores data in storage
     * @param data A map containing the data to be stored
     */
    override fun set(data: Map<String, Any>) {
        // Implement your storage logic here
        // Use data["featureKey"] and data["userId"] to store data
    }
}

// Usage
val options = VWOInitOptions()
options.sdkKey = "YOUR_SDK_KEY"
options.accountId = YOUR_ACCOUNT_ID
options.storage = CustomStorageConnector()

VWO.init(options, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String?) {
        // VWO initialization succeeded
    }
    
    override fun vwoInitFailed(message: String?) {
        // VWO initialization failed
    }
})
```

Java:
```java
public class CustomStorageConnector extends Connector {
    /**
     * Retrieves data from storage
     * @param featureKey The feature key for the data
     * @param userId The user ID for the data
     * @return The stored data if found, or null otherwise
     */
    @Override
    public Object get(String featureKey, String userId) {
        // Implement your storage retrieval logic here
        // Return the stored data or null if not found
    }

    /**
     * Stores data in storage
     * @param data A map containing the data to be stored
     */
    @Override
    public void set(Map<String, Object> data) {
        // Implement your storage logic here
        // Use data.get("featureKey") and data.get("userId") to store data
    }
}

// Usage
VWOInitOptions options = new VWOInitOptions();
options.setSdkKey("YOUR_SDK_KEY");
options.setAccountId(YOUR_ACCOUNT_ID);
options.setStorage(new CustomStorageConnector());

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

* The `context` parameter is **required** for built-in storage to work properly
* Custom storage implementations should handle data persistence and retrieval efficiently
* Storage data persists between app launches
* The SDK automatically manages storage operations for built-in storage
* Custom storage implementations should be thread-safe
* Consider implementing proper error handling in custom storage implementations
* Storage operations should be fast to avoid impacting app performance 