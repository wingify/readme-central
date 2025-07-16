---
title: Segment
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Segment is a customer data platform that collects, cleans, and routes user data to multiple analytics tools and data warehouses. It acts as a single hub for all your customer data, allowing you to send information once and distribute it to multiple destinations like analytics tools, data warehouses, marketing platforms, and customer engagement tools.

Integrating FME with Segment offers significant benefits. FME sends feature flag and event data to Segment, which then routes this data to all connected destinations. This allows you to see which feature flag variations users are exposed to across your entire analytics stack. By correlating user behavior with specific experiments, you can gain deeper, data-driven insights into the real impact of your feature rollouts and campaigns.

## Prerequisites

### Segment Account Setup

* Create a Segment account at <Anchor label="segment.com" target="_blank" href="https://segment.com">segment.com</Anchor> if you don't already have one
* Create a new workspace and source in your Segment dashboard
* Create a Source in Segment and select "Kotlin (Android)" as your source type
* Obtain your Segment write key from the source settings
* Add your Segment write key to your application's constants or local.properties file:

```properties
SEGMENT_WRITE_KEY=your_segment_write_key
```

### VWO FME SDK Installation and Configuration

* Ensure you have the VWO Feature Management and Experimentation product enabled for your VWO account
* The VWO FME SDK should be properly installed in your project
* Set your VWO account ID and SDK key in your application's constants or local.properties file:

```properties
FME_ACCOUNT_ID=your_account_id // Replace with your actual VWO account ID
FME_SDK_KEY=your_sdk_key // Replace with your actual VWO sdk key
```

## Integration Steps

Integrating the VWO FME SDK with analytics platforms like Segment allows you to automatically send feature flag evaluation and event tracking data to your entire analytics stack. This integration enables automatic data collection and distribution to all your connected analytics tools.

> 📘 Note
>
> The example below shows an implementation with the `Android` SDK. Please note that any VWO FME SDK can be used.

### 1. Add Required Dependencies

Add the following dependencies to your app's `build.gradle` file:

```groovy
dependencies {
    // VWO FME SDK dependency
    implementation 'com.vwo.sdk:vwo-fme-android-sdk:<latest version>' // Replace with the latest version
    
    // Segment SDK dependency
    implementation 'com.segment.analytics.kotlin:android:1.19.2'
}
```

### 2. Add Permissions

Ensure your app has the following permissions in the `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 3. Create a dedicated class for Segment Integration:

Implement a class (e.g., `SegmentIntegration`) to handle the initialization of the Segment SDK and provide methods for tracking events and flag evaluations.

```kotlin
// Example SegmentIntegration class
import android.content.Context
import com.segment.analytics.kotlin.android.Analytics
import com.segment.analytics.kotlin.core.*

class SegmentIntegration private constructor(context: Context, writeKey: String) {

    private val analytics: Analytics = Analytics(writeKey, context.applicationContext) {
        trackApplicationLifecycleEvents = true
        flushAt = 3
        flushInterval = 10
    }

    companion object {
        @Volatile
        private var instance: SegmentIntegration? = null

        fun getInstance(context: Context, writeKey: String): SegmentIntegration {
            return instance ?: synchronized(this) {
                instance ?: SegmentIntegration(context, writeKey).also { instance = it }
            }
        }
    }

    fun trackEvent(properties: Map<String, Any>) {
        val segmentProperties = properties.toMutableMap()
        analytics.track("vwo_fme_track_event", segmentProperties)
    }

    fun trackFlagEvaluation(properties: Map<String, Any>) {
        analytics.track("vwo_fme_flag_evaluation", properties)
    }

    fun identify(userId: String, traits: Map<String, Any> = emptyMap()) {
        analytics.identify(userId, traits)
    }

    fun flush() {
        analytics.flush()
    }
}
```

### 4. Initialize Segment and set up the `IntegrationCallback`:

Initialize your `SegmentIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FME SDK. `IntegrationCallback` is a mechanism that automatically forwards FME SDK events (like flag evaluations) to the desired analytics platform for real-time tracking and analysis. Inside the `execute` method of the callback, check the properties to determine if it's a flag evaluation or an event tracking call and forward the data to your Segment instance.

```kotlin
// Example Integration Callback Setup
val segmentWriteKey = BuildConfig.SEGMENT_WRITE_KEY
segmentIntegration = SegmentIntegration.getInstance(context, segmentWriteKey)

val initOptions = VWOInitOptions().apply {
    sdkKey = FME_SDK_KEY // Replace with your actual VWO sdk key
    accountId = FME_ACCOUNT_ID // Replace with your actual VWO account ID
}

initOptions.integrations = object : IntegrationCallback {
    override fun execute(properties: Map<String, Any>) {
        // Check if this is a flag evaluation or event tracking
        if (properties["api"] == "track") {
            // This is event tracking
            segmentIntegration?.trackEvent(properties)
        } else if (properties.containsKey("featureName")) {
            // This is a flag evaluation
            segmentIntegration?.trackFlagEvaluation(properties)
            
            // Identify user in Segment
            val userId = properties["userId"] as? String
            if (!userId.isNullOrEmpty()) {
                segmentIntegration?.identify(userId, mapOf(
                    "featureName" to (properties["featureName"] ?: ""),
                    "variationId" to (properties["experimentVariationId"] ?: "")
                ))
            }
        }
    }
}

// Then initialize VWO SDK with initOptions
VWO.init(initOptions, object : IVwoInitCallback {
    // Implementation here
})
```

### Integration Data

The `execute` method of the `IntegrationCallback` receives a `Map<String, Any>` containing details about the VWO SDK action:

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

Ensure you have added your Segment write key to your constants or `local.properties` file as specified in the Prerequisites.

This setup ensures that every time a feature flag is evaluated or an event is tracked by the VWO SDK, the relevant data is automatically sent to your configured Segment source and then routed to all your connected destinations such as:

* Analytics tools (Google Analytics, Mixpanel, Amplitude)
* Data warehouses (Snowflake, BigQuery, Redshift)
* Marketing platforms (HubSpot, Salesforce)
* Customer engagement tools (Intercom, Zendesk)

### Sample Screenshot

<Image align="center" alt="Events in Segment" src="https://files.readme.io/6ba5bd04f25eda988ff7976045e1f48ba449d3b40a223f75a3a0560904b07b84-eventsInSegment.png" />

<br />

## How to see the data in Segment

After integrating Segment with your app, you can view the tracked data in the following ways:

1. **Access Segment Dashboard:**

   * Log in to your Segment account at [https://segment.com](https://segment.com)
   * Navigate to your workspace and select your Android source

2. **View Feature Flag Evaluations:**

   * Use Segment's "Live Events" feature to see real-time data
   * Look for events named `vwo_fme_flag_evaluation`
   * These events contain data about feature flag and User ID

3. **Track Custom Events:**

   * Find events named `vwo_fme_track_event`
   * These events include details about the event

4. **Analyze Data**: Use Segment's analytics tools to:
   * Route data to multiple destinations (Google Analytics, Mixpanel, Amplitude, etc.)
   * Create custom reports in your connected analytics tools
   * Track conversion rates across your entire analytics stack
   * Monitor feature flag performance in real-time

## GitHub Reference

The complete source code for this example is available on GitHub: [https://github.com/wingify/vwo-fme-examples/tree/master/android](https://github.com/wingify/vwo-fme-examples/tree/master/android).

This is an example of an implementation using the Android SDK. While this demonstrates the approach, you can utilize any of the VWO FME SDKs for your project.