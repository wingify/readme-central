---
title: Integrations
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
Wingify FE SDKs help you integrate with several third-party tools, be it analytics, monitoring, customer data platforms, messaging, etc., by implementing a very basic and generic callback capable of receiving-specific properties that can then be pushed to any third-party tool.

## Usage

```kotlin
// Set SDK Key and Account ID
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

## Properties available to use for integrations

All Wingify SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever Wingify SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [getFlag](https://developers.wingify.com/v2/docs/fme-android-flags) and [trackEvent](https://developers.wingify.com/v2/docs/fme-android-metrics) APIs.

```json
{
  featureName: String,
  featureId: Number,
  featureKey: String,  // as passed to API
  userId: String,  // As passed to API
  api: String,   // API name which triggered the event: getFlag, getVariable, trackEvent
  customVariables: Object, //custom variables for targeting
  rolloutId: Number,
  rolloutKey: String,  // as passed to API
  rolloutVariationId: Number,  // Which variation was rolled out to the current user
  variationTargetingVariables: Object, //campaign whitelisting conditions
  experimentId: Number,
  experimentKey: String, // as passed to API
  experimentVariationId: Number
}

```

Different destinations have their own formats for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.

## Which platforms I can integrate with?

Since Wingify SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party tool capable of receiving it via APIs.

> 📘 Note
>
> Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the Wingify SDK.

<br />
