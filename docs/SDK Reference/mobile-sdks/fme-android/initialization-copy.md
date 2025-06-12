---
title: Initialization (COPY)
deprecated: false
hidden: false
metadata:
  robots: index
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
        Integer
      </td>

      <td>
        VWO Account ID for authentication.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under **Default Project**.
      </td>
    </tr>

    <tr>
      <td>
        **pollInterval**
        *Optional*
      </td>

      <td>
        Integer
      </td>

      <td>
        Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **storage**
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Custom storage connector for persisting user decisions and campaign data.
      </td>
    </tr>

    <tr>
      <td>
        **logger**
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-android-logging)
      </td>
    </tr>
<tr>
      <td>
        **integrations**
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-android-integrations)
      </td>
    </tr>
    <tr>
      <td>
        **cachedSettingsExpiryTime**
        *Optional*
      </td>

      <td>
        Integer
      </td>

      <td>
        Controls the duration (in milliseconds) the SDK uses cached settings before fetching new ones.
      </td>
    </tr>

    <tr>
      <td>
        **batchMinSize**
        *Optional*
      </td>

      <td>
        Integer
      </td>

      <td>
        Uploads are triggered when the batch reaches this minimum size.
      </td>
    </tr>

    <tr>
      <td>
        **batchUploadTimeInterval**
        *Optional*
      </td>

      <td>
        Integer
      </td>

      <td>
        Specifies the time interval (in milliseconds) for periodic batch uploads.
      </td>
    </tr>

    <tr>
      <td>
        **context**
        *Optional*
      </td>

      <td>
        Context
      </td>

      <td>
        Android application context. When provided, SDK will use internal storage for persisting user decisions and campaign data.
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the *vwoClient* on your mobile, it pulls the latest configurations you've done in the VWO application.\
If/when you make any changes to the feature flags or rules within VWO after the *vwoClient* has been initialized on your mobile, there needs to be some way to update your *vwoClient* with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

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

Please click [here](https://developers.vwo.com/v2/docs/fme-android-integrations) to learn more about Integrations.