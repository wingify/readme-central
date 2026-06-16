---
title: Mixpanel
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

Mixpanel is an analytics tool that helps businesses understand how users interact with their websites and apps. It tracks specific actions, showing what features are popular and where users face issues. This insight helps to make informed decisions for product improvement.

Integrating FE, with Mixpanel offers significant benefits. FE sends feature flag and event data to Mixpanel. This allows you to see which feature flag variations users are exposed to directly within your Mixpanel reports. By correlating user behavior with specific experiments, you can gain deeper, data-driven insights into the real impact of your feature rollouts and campaigns.

<br />

## Prerequisites

### Mixpanel Account Setup

* Create a Mixpanel account at <Anchor label="mixpanel.com" target="_blank" href="https://mixpanel.com">mixpanel.com</Anchor> if you don't already have one
* Create a new project in your Mixpanel dashboard
* Obtain your Mixpanel project token from the project settings
* Add your Mixpanel project token to your application's constants or local.properties file:

```properties
MIXPANEL_PROJECT_TOKEN=your_mixpanel_project_token
```

### Wingify FE SDK Installation and Configuration

* Ensure you have the Wingify Feature Experimentation product enabled for your Wingify account
* The Wingify FE SDK should be properly installed in your project
* Set your Wingify account ID and SDK key in your application's constants or local.properties file:

```properties
FME_ACCOUNT_ID=your_account_id // Replace with your actual VWO account ID
FME_SDK_KEY=your_sdk_key // Replace with your actual VWO sdk key
```

<br />

## Integration Steps

Integrating the Wingify FE SDK with analytics platforms like Mixpanel allows you to automatically send feature flag evaluation and event tracking data to your analytics dashboard.

> 📘 Note
>
> The example below shows an implementation with the `Android` SDK. Please note that any Wingify FE SDK can be used.

### 1. Add Required Dependencies

Add the following dependencies to your app's `build.gradle` file:

```groovy
dependencies {
    // VWO FE SDK dependency
    implementation 'com.vwo.sdk:vwo-fme-android-sdk:<latest version>' // Replace with the latest version

    // Mixpanel SDK dependency
    implementation 'com.mixpanel.android:mixpanel-android:7.+'
}
```

### 2. Add Permissions

Ensure your app has the following permissions in the `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

### 3. Create a dedicated class for Mixpanel Integration:

Implement a class (e.g., `MixpanelIntegration`) to handle the initialization of the Mixpanel SDK and provide methods for tracking events and flag evaluations.

```kotlin
// Example MixpanelIntegration class
import android.content.Context
import com.mixpanel.android.mpmetrics.MixpanelAPI
import org.json.JSONObject

class MixpanelIntegration private constructor(context: Context, projectToken: String) {
    private val mixpanel: MixpanelAPI = MixpanelAPI.getInstance(context, projectToken, true)

    companion object {
        private var instance: MixpanelIntegration? = null

        fun getInstance(context: Context, projectToken: String): MixpanelIntegration {
            return instance ?: synchronized(this) {
                instance ?: MixpanelIntegration(context, projectToken).also { instance = it }
            }
        }
    }

    fun trackEvent(eventName: String, properties: Map<String, Any>) {
        val props = JSONObject()
        properties.forEach { (key, value) ->
            props.put(key, value)
        }
        mixpanel.track("vwo_fme_track_event", props)
    }

    fun trackFlagEvaluation(properties: Map<String, Any>) {
        mixpanel.trackMap("vwo_fme_flag_evaluation", properties)
    }
}
```

### 4. Initialize Mixpanel and set up the `IntegrationCallback`:

Initialize your `MixpanelIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FE SDK. `IntegrationCallback` is a mechanism that automatically forwards FE SDK events (like flag evaluations) to desired analytics platform for real-time tracking and analysis. Inside the `execute` method of the callback, check the properties to determine if it's a flag evaluation or an event tracking call and forward the data to your Mixpanel instance.

```kotlin
// Example Integration Callback Setup
val mixpanelToken = BuildConfig.MIXPANEL_PROJECT_TOKEN
mixpanelIntegration = MixpanelIntegration.getInstance(context, mixpanelToken)
val initOptions = VWOInitOptions().apply {
    sdkKey = FME_SDK_KEY // Replace with your actual VWO sdk key
    accountId = FME_ACCOUNT_ID // Replace with your actual VWO account ID
}
initOptions.integrations = object : IntegrationCallback {
    override fun execute(properties: Map<String, Any>) {
        // Check if this is a flag evaluation or event tracking
        if (properties["api"] == "track") {
            // This is event tracking
            val eventName = properties["eventName"] as String
            mixpanelIntegration?.trackEvent(eventName, properties)
        } else if (properties.containsKey("featureName")) {
            // This is a flag evaluation
            mixpanelIntegration?.trackFlagEvaluation(properties)
        }
    }
}
// Then initialize VWO SDK with initOptions
VWO.init(initOptions, object : IVwoInitCallback {
    // Implementation here
})
```

### Integration Data

The `execute` method of the `IntegrationCallback` receives a `Map<String, Any>` containing details about the Wingify SDK action:

* **For flag evaluations** (i.e. `getFlag`):

```json
{
    "featureName": "yourFlagName",
    "featureId": 5,
    "featureKey": "yourFlagKey",
    "userId": "UserId",
    "rolloutId": 789,
    "rolloutKey": "rollout_checkout",
    "rolloutVariationId": 1,
    "experimentId": 321,
    "experimentKey": "exp_checkout_test",
    "experimentVariationId": 2
}
```

* **For event tracking** (`trackEvent`):

```json
{
    "eventName": "yourEventName",
    "api": "track"
}
```

<br />

Ensure you have added your Mixpanel project token to your constants or `local.properties` file as specified in the Prerequisites.

This setup ensures that every time a feature flag is evaluated or an event is tracked by the Wingify SDK, the relevant data is automatically sent to your configured Mixpanel project.

### Sample Screenshot

<Image align="center" src="https://files.readme.io/526d3490d1e374ec65fed2fc8a720a8ea22c4485ab46c9b237420b7022f2310a-mixPanelSS.png" />

<br />

## How to see the data in the analytics tool

After integrating Mixpanel with your app, you can view the tracked data in the following ways:

1. **Access Mixpanel Dashboard:**

   * Log in to your Mixpanel account at <Anchor label="mixpanel.com" target="_blank" href="https://mixpanel.com">mixpanel.com</Anchor>
   * Navigate to your project dashboard

2. **View Feature Flag Evaluations:**

   * Look for events named `vwo_fme_flag_evaluation`
   * These events contain data about feature flag and User ID

3. **Track Custom Events:**

   * Find events named `vwo_fme_track_event`
   * These events include details about the event.

4. **Analyze Data**: Use Mixpanel's analytics tools to:
   * Create custom reports
   * View user flows
   * Track conversion rates
   * Monitor feature flag performance

<br />

## GitHub Reference

The complete source code for this example is available on [GitHub](https://github.com/wingify/vwo-fme-examples/tree/master/android).

This is an example of an implementation using the Android SDK. While this demonstrates the approach, you can utilize any of the Wingify FE SDKs for your project.
