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
To create a VWO Client instance, you need to initialize the VWO FME Android SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```kotlin Kotlin
import com.vwo.VWO
import com.vwo.interfaces.IVwoInitCallback
import com.vwo.models.user.VWOContext
import com.vwo.models.user.VWOInitOptions

// Set SDK Key and Account ID
val vwoInitOptions = VWOInitOptions()
vwoInitOptions.sdkKey = SDK_KEY
vwoInitOptions.accountId = ACCOUNT_ID

// Initialize VWO SDK
VWO.init(vwoInitOptions, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String) {
        // VWO SDK initialized
    }
 
    override fun vwoInitFailed(message: String) {
        // VWO SDK failed to initialize
    }
})
```
```java
import com.vwo.VWO;
import com.vwo.interfaces.IVwoInitCallback;
import com.vwo.models.user.VWOContext;
import com.vwo.models.user.VWOInitOptions;

// Set SDK Key and Account ID
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setSdkKey(SDK_KEY);
vwoInitOptions.setAccountId(ACCOUNT_ID);

// Initialize VWO SDK
VWO.init(vwoInitOptions, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(@NonNull VWO vwo, @NonNull String message) {
        // VWO SDK Initialized  
    }
 
    @Override
    public void vwoInitFailed(@NonNull String message) {
        // VWO SDK failed to initialize
    }
});
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
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-android-logging)",
    "4-0": "**integrations**  \n_Optional_",
    "4-1": "Object",
    "4-2": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-android-integrations)"
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

```kotlin
val vwoInitOptions = VWOInitOptions()
vwoInitOptions.sdkKey = SDK_KEY
vwoInitOptions.accountId = ACCOUNT_ID
vwoInitOptions.pollInterval = POLL_INTERVAL // in milliseconds

// Initialize VWO SDK
VWO.init(vwoInitOptions, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String) {
        // VWO SDK initialized
    }
 
    override fun vwoInitFailed(message: String) {
        // VWO SDK failed to initialize
    }
})
```
```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setSdkKey(SDK_KEY);
vwoInitOptions.setAccountId(ACCOUNT_ID);
vwoInitOptions.setPollInterval(POLL_INTERVAL); // in milliseconds

// Initialize VWO SDK
VWO.init(vwoInitOptions, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(@NonNull VWO vwo, @NonNull String message) {
        // VWO SDK Initialized  
    }
 
    @Override
    public void vwoInitFailed(@NonNull String message) {
        // VWO SDK failed to initialize
    }
});
```

### Logger

VWO by default logs all ERROR level messages to your device console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```kotlin
vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
  put("level", "INFO") // DEBUG, INFO, ERROR, TRACE, WARN
}
```
```java
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "INFO");  // DEBUG, INFO, ERROR, TRACE, WARN

vwoInitOptions.setLogger(loggerOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-android-logging) for more advanced logger options.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```kotlin
val vwoInitOptions = VWOInitOptions()

vwoInitOptions.sdkKey = SDK_KEY
vwoInitOptions.accountId = ACCOUNT_ID

val integrations = object : IntegrationCallback {
    override fun execute(properties: Map<String, Any>) {
        // your function definition 
    }
}
vwoInitOptions.integrations = integrations

// Initialize VWO SDK
VWO.init(vwoInitOptions, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwo: VWO, message: String) {
        // VWO SDK initialized
    }
 
    override fun vwoInitFailed(message: String) {
        // VWO SDK failed to initialize
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

VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setSdkKey("sdkKey");
vwoInitOptions.setAccountId(12345);
vwoInitOptions.setIntegrations(integrations);

// Initialize VWO SDK
VWO.init(vwoInitOptions, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(@NonNull VWO vwo, @NonNull String message) {
        // VWO SDK Initialized  
    }
 
    @Override
    public void vwoInitFailed(@NonNull String message) {
        // VWO SDK failed to initialize
    }
});
```

Please click [here](https://developers.vwo.com/v2/docs/fme-android-integrations) to learn more about Integrations,.