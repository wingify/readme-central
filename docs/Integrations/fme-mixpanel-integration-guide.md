---
title: Mixpanel
deprecated: false
hidden: true
metadata:
  robots: index
---
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

## Prerequisites

#### VWO FME SDK Installation and Configuration

* Ensure you have the VWO Feature Management and Experimentation product enabled for your VWO account  
* The VWO FME SDK should be properly installed in your Android project  
* Set your VWO account ID and SDK key in your application's constants or local.properties file:

```properties
FME_ACCOUNT_ID=your_account_id
FME_SDK_KEY=your_sdk_key
```

#### Mixpanel Account Setup

* Create a Mixpanel account at mixpanel.com if you don't already have one  
* Create a new project in your Mixpanel dashboard  
* Obtain your Mixpanel project token from the project settings  
* Add your Mixpanel project token to your application's constants or local.properties file:

```properties
MIXPANEL_PROJECT_TOKEN=your_mixpanel_project_token
```

#### Development Environment

Android Studio: Latest stable version recommended  
Minimum SDK Requirements: Android API level 21 (Android 5.0 Lollipop) or higher  
Target SDK: Latest Android SDK version recommended

#### Required Dependencies

Add the following dependencies to your app's build.gradle file:

```groovy
dependencies {
    // VWO FME SDK dependency
    implementation 'com.vwo.sdk:vwo-fme-android-sdk:<latest version>' // Replace with the latest version
    
    // Mixpanel SDK dependency
    implementation 'com.mixpanel.android:mixpanel-android:7.+'
}
```

#### Permissions

Ensure your app has the following permissions in the AndroidManifest.xml file:

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Integration Steps

Integrating the VWO FME SDK with analytics platforms like Mixpanel allows you to automatically send feature flag evaluation and event tracking data to your analytics dashboard. This is achieved using the `IntegrationCallback` provided by the FME SDK.

#### 1. Create a dedicated class for Mixpanel Integration:

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

#### 2. Initialize Mixpanel and set up the `IntegrationCallback`:

Initialize your `MixpanelIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FME SDK. Inside the `execute` method of the callback, check the properties to determine if it's a flag evaluation or an event tracking call and forward the data to your Mixpanel instance.

```kotlin
// Example Integration Callback Setup
val mixpanelToken = BuildConfig.MIXPANEL_PROJECT_TOKEN
mixpanelIntegration = MixpanelIntegration.getInstance(context, mixpanelToken)
val initOptions = VWOInitOptions().apply {
    sdkKey = FME_SDK_KEY
    accountId = FME_ACCOUNT_ID
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

#### Integration Data

The `execute` method of the `IntegrationCallback` receives a `Map<String, Any>` containing details about the VWO SDK action:

- For flag evaluations (i.e. `getFlag`):   

```json
{
    "featureName": "yourFlagName",
    "featureId": 5,
    "featureKey": "yourFlagKey",
    "userId": "UserId",
    ...
}
```

- For event tracking (`trackEvent`): 

```json
{
    "eventName": "yourEventName",
    "api": "track"
}
```

Ensure you have added your Mixpanel project token to your constants or `local.properties` file as specified in the Prerequisites.

This setup ensures that every time a feature flag is evaluated or an event is tracked by the VWO SDK, the relevant data is automatically sent to your configured Mixpanel project.

#### Screenshot

<Image align="center" src="https://files.readme.io/526d3490d1e374ec65fed2fc8a720a8ea22c4485ab46c9b237420b7022f2310a-mixPanelSS.png" />

## How to see the data in the analytics tool

After integrating Mixpanel with your app, you can view the tracked data in the following ways:

1. Access Mixpanel Dashboard:  
   - Log in to your Mixpanel account at [https://mixpanel.com](https://mixpanel.com)  
   - Navigate to your project dashboard

2. View Feature Flag Evaluations:  
   - Look for events named `vwo_fme_flag_evaluation`  
   - These events contain data about feature flag and User ID

3. Track Custom Events  
   - Find events named `vwo_fme_track_event`  
   - These events include details about the event.

4. Analyze Data  
   - Use Mixpanel's analytics tools to:  
     - Create custom reports  
     - View user flows  
     - Track conversion rates  
     - Monitor feature flag performance

## GitHub Reference

The complete source code for this example is available on GitHub: [https://github.com/wingify/vwo-fme-examples](https://github.com/wingify/vwo-fme-examples)

This repository includes a sample Android project demonstrating how to utilize the VWO SDK and the Mixpanel SDK together. Developers can find implementation details and code snippets to understand and replicate the integration in their own Android applications. Examining the code in this repository will provide a comprehensive understanding of how to track VWO experiment data within Mixpanel for detailed analytics and user behavior analysis. The examples showcase how to initialize both SDKs and send experiment assignment and goal completion events to Mixpanel, enabling businesses to measure the impact of their mobile A/B tests effectively.