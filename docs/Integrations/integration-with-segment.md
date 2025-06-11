---
title: Segment
deprecated: false
hidden: true
metadata:
  robots: index
---
# Integration with Segment Analytics

## Overview

The VWO Feature Management and Experimentation (FME) SDK is a powerful tool that enables dynamic feature flag management and experimentation in your Android applications. It allows developers to:

* Implement user ID-based feature flag evaluation
* Track user interactions and events
* Manage user attributes for targeted experiences

## Benefits of using the Integration

* While feature flags provide the ability to control features dynamically, analytics integration adds the crucial layer of measurement and insight.
* Data-Driven Decisions: Move beyond simple feature toggling to making decisions based on actual user behavior and engagement metrics.
* Complete Feedback Loop: Create a closed loop between feature deployment and performance measurement, enabling continuous improvement.
* Unified Data View: Consolidate feature flag data with other analytics in a single platform, providing a holistic view of your application's performance.
* Real-Time Monitoring: Track the immediate impact of feature flag changes on user behavior and application performance.
* Customer Data Platform: Leverage Segment's powerful customer data infrastructure to route your feature flag data to multiple downstream tools.
* Data Warehouse Routing: Automatically send feature flag data to your data warehouse (Snowflake, BigQuery, Redshift)
* Data Governance: Implement data quality controls and validation rules
* Privacy Compliance: Leverage Segment's privacy controls for GDPR/CCPA compliance
* Cross-platform Tracking: Unify feature flag data with web and server-side events
* Custom Transformations: Apply data transformations before sending to destinations

## Prerequisites

#### VWO FME SDK Installation and Configuration

* Ensure you have the VWO Feature Management and Experimentation product enabled for your VWO account
* The VWO FME SDK should be properly installed in your Android project
* Set your VWO account ID and SDK key in your application's constants or local.properties file:

```properties
FME_ACCOUNT_ID=your_account_id
FME_SDK_KEY=your_sdk_key
```

#### Segment Account Setup

* Create a Segment account at segment.com if you don't already have one
* Create a new workspace and source in your Segment dashboard
* Create a Source in Segment and select "Kotlin (Android)" as your source type
* Obtain your Segment write key from the source settings
* Add your Segment write key to your application's constants or local.properties file:

```properties
SEGMENT_WRITE_KEY=your_segment_write_key
```

#### Development Environment

Android Studio: Latest stable version recommended\
Minimum SDK Requirements: Android API level 21 (Android 5.0 Lollipop) or higher

#### Required Dependencies

Add the following dependencies to your app's build.gradle file:

```groovy
dependencies {
    // VWO FME SDK dependency
    implementation 'com.vwo.sdk:vwo-fme-android-sdk:<latest version>' // Replace with the latest version
    
    // Segment SDK dependency
    implementation 'com.segment.analytics.kotlin:android:1.19.2'
}
```

#### Permissions

Ensure your app has the following permissions in the AndroidManifest.xml file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

## Integration Steps

Integrating the VWO FME SDK with analytics platforms like Segment allows you to automatically send feature flag evaluation and event tracking data to your analytics dashboard. This is achieved using the `IntegrationCallback` provided by the FME SDK.

#### 1. Create a dedicated class for Segment Integration:

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

#### 2. Create an Application class for proper initialization:

Create a custom Application class to ensure proper context handling for Segment initialization:

```kotlin
import android.app.Application

class FMEApplication : Application() {
    
    override fun onCreate() {
        super.onCreate()
        // Application initialization code can go here if needed
    }
}
```

Update your AndroidManifest.xml to use this Application class:

```xml
<application
    android:name=".FMEApplication"
    android:allowBackup="true"
    ...>
```

#### 3. Initialize Segment and set up the `IntegrationCallback`:

Initialize your `SegmentIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FME SDK. Inside the `execute` method of the callback, check the properties to determine if it's a flag evaluation or an event tracking call and forward the data to your Segment instance.

```kotlin
// Example Integration Callback Setup
val segmentWriteKey = BuildConfig.SEGMENT_WRITE_KEY
segmentIntegration = SegmentIntegration.getInstance(context, segmentWriteKey)

val initOptions = VWOInitOptions().apply {
    sdkKey = FME_SDK_KEY
    accountId = FME_ACCOUNT_ID
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

#### Integration Data

The `execute` method of the `IntegrationCallback` receives a `Map<String, Any>` containing details about the VWO SDK action:

* For flag evaluations (i.e. `getFlag`):

```json
{
    "featureName": "yourFlagName",
    "featureId": 5,
    "featureKey": "yourFlagKey",
    "userId": "UserId",
    "experimentVariationId": "variationId",
    ...
}
```

* For event tracking (`trackEvent`):

```json
{
    "eventName": "yourEventName",
    "api": "track"
}
```

Ensure you have added your Segment write key to your constants or `local.properties` file as specified in the Prerequisites.

This setup ensures that every time a feature flag is evaluated or an event is tracked by the VWO SDK, the relevant data is automatically sent to your configured Segment source. Additionally, user identification is automatically handled to maintain consistent user tracking across your analytics pipeline.

![Events in Segment](eventsInSegment.png)

#### Key Features of Segment Integration

* **Multiple Destinations**: Route data to multiple analytics tools through Segment's infrastructure
* **Event Batching**: Efficiently batches events (configurable: flushAt = 3, flushInterval = 10 seconds)

## How to see the data in the analytics tool

After integrating Segment with your app, you can view the tracked data in the following ways:

1. **Access Segment Dashboard:**
   * Log in to your Segment account at [https://segment.com](https://segment.com)
   * Navigate to your workspace and select your Android source

2. **View Live Events:**
   * Use Segment's "Live Events" feature to see real-time data
   * Look for events named `vwo_fme_flag_evaluation` and `vwo_fme_track_event`

3. **View Feature Flag Evaluations:**
   * Look for events named `vwo_fme_flag_evaluation`
   * These events contain data about:
     * Feature flag name and ID
     * User ID
     * Variation assigned
     * Evaluation timestamp

4. **Track Custom Events:**
   * Find events named `vwo_fme_track_event`
   * These events include:
     * Event name
     * Custom properties

5 **Analyze Data in Downstream Tools:**

* Connect destinations (Google Analytics, Mixpanel, Amplitude, etc.) to Segment
* View your VWO feature flag data in your preferred analytics tools
* Create custom reports and dashboards
* Track conversion rates and monitor feature flag performance

6 **Use Segment's Schema:**

* Utilize Segment's schema validation to ensure data quality
* Set up data governance rules for your feature flag events

## GitHub Reference

The complete source code for this example is available on GitHub: [https://github.com/wingify/vwo-fme-examples](https://github.com/wingify/vwo-fme-examples)

This repository includes a sample Android project demonstrating how to utilize the VWO SDK and the Segment SDK together. Developers can find implementation details and code snippets to understand and replicate the integration in their own Android applications. Examining the code in this repository will provide a comprehensive understanding of how to track VWO experiment data within Segment for detailed analytics and user behavior analysis. The examples showcase how to initialize both SDKs and send feature flag assignment and goal completion events to Segment, enabling businesses to measure the impact of their mobile A/B tests effectively across their entire analytics stack through Segment's customer data platform.