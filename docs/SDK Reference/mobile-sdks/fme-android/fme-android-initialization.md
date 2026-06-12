---
title: Initialization
deprecated: false
hidden: false
metadata:
  robots: index
---
To create a VWO Client instance, you need to initialize the VWO FE Android SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```kotlin Kotlin
import com.wingify.Wingify
import com.wingify.interfaces.IWingifyInitCallback
import com.wingify.models.user.WingifyInitOptions

// Set SDK Key and Account ID
val initOptions = WingifyInitOptions()
initOptions.sdkKey = SDK_KEY
initOptions.accountId = ACCOUNT_ID

// Initialize Wingify SDK
Wingify.init(initOptions, object : IWingifyInitCallback {
    override fun wingifyInitSuccess(wingify: Wingify, message: String) {
        // Wingify SDK initialized
    }

    override fun wingifyInitFailed(message: String) {
        // Wingify SDK failed to initialize
    }
})
```
```java
import com.wingify.Wingify;
import com.wingify.interfaces.IWingifyInitCallback;
import com.wingify.models.user.WingifyInitOptions;

// Set SDK Key and Account ID
WingifyInitOptions initOptions = new WingifyInitOptions();
initOptions.setSdkKey(SDK_KEY);
initOptions.setAccountId(ACCOUNT_ID);

// Initialize Wingify SDK
Wingify.init(initOptions, new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(@NonNull Wingify wingify, @NonNull String message) {
        // Wingify SDK Initialized
    }

    @Override
    public void wingifyInitFailed(@NonNull String message) {
        // Wingify SDK failed to initialize
    }
});
```

The `init()` method is called with the `sdkKey`and `accountId`. It initializes and returns a Wingify Client Object`wingifyClient`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

| Parameter                               | Type    | Description                                                                                                                                                                                                                                                                                                                |
| :-------------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accountId** _Required_                | Integer | Wingify Account ID for authentication.                                                                                                                                                                                                                                                                                     |
| **sdkKey** _Required_                   | String  | A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under **Default Project**.                                                                                                                                                                                          |
| **context** _Required_                  | Context | Android application context. When provided, SDK will use internal storage for persisting user decisions and campaign data.                                                                                                                                                                                                 |
| **pollInterval** _Optional_             | Integer | Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) |
| **storage** _Optional_                  | Object  | Custom storage connector for persisting user decisions and campaign data.                                                                                                                                                                                                                                                  |
| **logger** _Optional_                   | Object  | An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-android-logging)                                                                                                                                                             |
| **integrations** _Optional_             | Object  | A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-android-integrations)                                                                                              |
| **cachedSettingsExpiryTime** _Optional_ | Integer | Controls the duration (in milliseconds) the SDK uses cached settings before fetching new ones.                                                                                                                                                                                                                             |
| **batchMinSize** _Optional_             | Integer | Uploads are triggered when the batch reaches this minimum size.                                                                                                                                                                                                                                                            |
| **batchUploadTimeInterval** _Optional_  | Integer | Specifies the time interval (in milliseconds) for periodic batch uploads.                                                                                                                                                                                                                                                  |

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _vwoClient_ on your mobile, it pulls the latest configurations you've done in the VWO application.<br />If/when you make any changes to the feature flags or rules within VWO after the _vwoClient_ has been initialized on your mobile, there needs to be some way to update your _vwoClient_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```kotlin
val wingifyInitOptions = WingifyInitOptions()
wingifyInitOptions.sdkKey = SDK_KEY
wingifyInitOptions.accountId = ACCOUNT_ID
wingifyInitOptions.pollInterval = POLL_INTERVAL // in milliseconds

// Initialize Wingify SDK
Wingify.init(wingifyInitOptions, object : IWingifyInitCallback {
    override fun wingifyInitSuccess(wingify: Wingify, message: String) {
        // Wingify SDK initialized
    }

    override fun wingifyInitFailed(message: String) {
        // Wingify SDK failed to initialize
    }
})
```
```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey(SDK_KEY);
wingifyInitOptions.setAccountId(ACCOUNT_ID);
wingifyInitOptions.setPollInterval(POLL_INTERVAL); // in milliseconds

// Initialize Wingify SDK
Wingify.init(wingifyInitOptions, new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(@NonNull Wingify wingify, @NonNull String message) {
        // Wingify SDK Initialized
    }

    @Override
    public void wingifyInitFailed(@NonNull String message) {
        // Wingify SDK failed to initialize
    }
});
```

### Logger

VWO by default logs all ERROR level messages to your device console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```kotlin
wingifyInitOptions.logger = mutableMapOf<String, Any>().apply {
  put("level", "INFO") // DEBUG, INFO, ERROR, TRACE, WARN
}
```
```java
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "INFO");  // DEBUG, INFO, ERROR, TRACE, WARN

wingifyInitOptions.setLogger(loggerOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-android-logging) for more advanced logger options.

### Integrations

VWO FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```kotlin
val wingifyInitOptions = WingifyInitOptions()

wingifyInitOptions.sdkKey = SDK_KEY
wingifyInitOptions.accountId = ACCOUNT_ID

val integrations = object : IntegrationCallback {
    override fun execute(properties: Map<String, Any>) {
        // your function definition
    }
}
wingifyInitOptions.integrations = integrations

// Initialize Wingify SDK
Wingify.init(wingifyInitOptions, object : IWingifyInitCallback {
    override fun wingifyInitSuccess(wingify: Wingify, message: String) {
        // Wingify SDK initialized
    }

    override fun wingifyInitFailed(message: String) {
        // Wingify SDK failed to initialize
    }
})
```
```java
IntegrationCallback integrations = new IntegrationCallback() {
            @Override
            public void execute(Map<String, Object> properties) {
                // your function definition
            }
        };

WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey("sdkKey");
wingifyInitOptions.setAccountId(12345);
wingifyInitOptions.setIntegrations(integrations);

// Initialize Wingify SDK
Wingify.init(wingifyInitOptions, new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(@NonNull Wingify wingify, @NonNull String message) {
        // Wingify SDK Initialized
    }

    @Override
    public void wingifyInitFailed(@NonNull String message) {
        // Wingify SDK failed to initialize
    }
});
```

Please click [here](https://developers.vwo.com/v2/docs/fme-android-integrations) to learn more about Integrations.

### Cached Settings Expiry Time

The `cachedSettingsExpiryTime` parameter allows you to specify how long the cached settings should be considered valid before fetching new settings from the VWO server. This helps in managing the freshness of the configuration data.

Usage:

```kotlin
// Initialize WingifyInitOptions with a custom cached settings expiry time
val wingifyInitOptions = WingifyInitOptions()
wingifyInitOptions.sdkKey = SDK_KEY
wingifyInitOptions.accountId = ACCOUNT_ID
wingifyInitOptions.cachedSettingsExpiryTime = 600000

// Create Wingify instance with the wingifyInitOptions
init(wingifyInitOptions, object : IWingifyInitCallback {
    override fun wingifyInitSuccess(wingifyClient: Wingify, message: String) {
        this@MyActivity.wingifyClient = wingifyClient
    }

    override fun wingifyInitFailed(message: String) {
        //Initialization failed
    }
})
```
```java
// Initialize WingifyInitOptions with a custom cached settings expiry time
wingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey(SDK_KEY);
wingifyInitOptions.setAccountId(ACCOUNT_ID);
wingifyInitOptions.setCachedSettingsExpiryTime(600000);

// Create Wingify instance with the wingifyInitOptions
init(wingifyInitOptions, new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(@NonNull Wingify wingifyClient, @NonNull String message) {
        MyActivity.this.wingifyClient = wingifyClient;
    }

    @Override
    public void wingifyInitFailed(@NonNull String message) {
        //Initialization failed
    }
});
```

### Event Batching Configuration

The VWO SDK supports storing impression events while the device is offline, ensuring no data loss. These events are batched and seamlessly synchronized with VWO servers once the device reconnects to the internet. Additionally, online event batching allows synchronization of impression events while the device is online. This feature can be configured by setting either the minimum batch size or the batch upload time interval during SDK initialization.

#### NOTE: The uploading of events will get triggered based on whichever condition is met first if using both options.

See [Event Batching](https://developers.vwo.com/v2/docs/event-batching#/) documentation for additional information.

| **Parameter**             | **Description**                                                                    | **Required** | **Type** | **Example** |
| ------------------------- | ---------------------------------------------------------------------------------- | ------------ | -------- | ----------- |
| `batchMinSize`            | Minimum size of the batch to upload.                                               | No           | Integer  | `10`        |
| `batchUploadTimeInterval` | Batch upload time interval in milliseconds. Please specify at least a few minutes. | No           | Integer  | `300000`    |

Usage:

```kotlin
// Initialize WingifyInitOptions with batch configuration
val wingifyInitOptions = WingifyInitOptions()
wingifyInitOptions.sdkKey = SDK_KEY
wingifyInitOptions.accountId = ACCOUNT_ID
wingifyInitOptions.batchMinSize = 10
wingifyInitOptions.batchUploadTimeInterval = 300000

// Create Wingify instance with the wingifyInitOptions
init(wingifyInitOptions, object : IWingifyInitCallback {
    override fun wingifyInitSuccess(wingifyClient: Wingify, message: String) {
        this@MyActivity.wingifyClient = wingifyClient
    }

    override fun wingifyInitFailed(message: String) {
        //Initialization failed
    }
})
```
```java
// Initialize WingifyInitOptions with batch configuration
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey(SDK_KEY);
wingifyInitOptions.setAccountId(ACCOUNT_ID);
wingifyInitOptions.setBatchMinSize(10);
wingifyInitOptions.setBatchUploadTimeInterval(300000);

// Create Wingify instance with the wingifyInitOptions
init(wingifyInitOptions, new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(@NonNull Wingify wingifyClient, @NonNull String message) {
        MyActivity.this.wingifyClient = wingifyClient;
    }

    @Override
    public void wingifyInitFailed(@NonNull String message) {
        //Initialization failed
    }
});
```

<br />
