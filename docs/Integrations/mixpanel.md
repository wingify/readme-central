---
title: Mixpanel(iOS)
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

The VWO Feature Management and Experimentation (FME) SDK is a powerful tool that enables dynamic feature flag management and experimentation in your iOS applications. It allows developers to:

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
* The VWO FME SDK should be properly installed in your iOS project

#### Mixpanel Account Setup

* Create a Mixpanel account at mixpanel.com if you don't already have one
* Create a new project in your Mixpanel dashboard
* Obtain your Mixpanel project token from the project settings
* Install Mixpanel iOS SDK [Reference](https://docs.mixpanel.com/docs/quickstart/install-mixpanel?sdk=swift)

## Integration Steps

Integrating the VWO FME SDK with analytics platforms like Mixpanel allows you to automatically send feature flag evaluation and event tracking data to your analytics dashboard. This is achieved using the `IntegrationCallback` provided by the FME SDK.

Initialize your `MixpanelIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FME SDK. Inside the `execute` method of the callback, check the properties to determine if it's a flag evaluation or an event tracking call and forward the data to your Mixpanel instance.

```swift
import VWO_FME
import Mixpanel

class MixpanelIntegration: IntegrationCallback {
    func execute(_ properties: [String: Any]) {
        // Extract API type and handle accordingly
        if let api = properties["api"] as? String {
            switch api {
            case "getFlag":
                // Handle getFlag API
                if let featureName = properties["featureName"] as? String,
                   let userId = properties["userId"] as? String {
                    // Log a custom event for getFlag
                    Mixpanel.mainInstance().track(event: "vwo_fme_flag_evaluation", properties: [
                        "featureName": featureName,
                        "userId": userId,
                        ...
                    ])
                }
                
            case "track":
                // Handle track API
                if let eventName = properties["eventName"] as? String {
                    // Log the event to Mixpanel
                    Mixpanel.mainInstance().track(event: "vwo_fme_track_event", properties:		                               ["eventName":eventName])
                }
                
            default:
                break
            }
        }
    }
}

// Initialize VWO SDK with Mixpanel integration
let integration = MixpanelIntegration()
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, integrations: integration)

VWOFme.initialize(options: options) { result in
    switch result {
    case .success(_):
        print("VWO initialized with Mixpanel integration")
    case .failure(let error):
        print("VWO initialization failed")
    }
}
```

#### Integration Data

The `execute` method of the `IntegrationCallback` receives a dictionary `[String: Any]` containing details about the VWO SDK action:

* For flag evaluations (i.e. `getFlag`):

```json
{
    "featureName": "yourFlagName",
    "featureId": 5,
    "featureKey": "yourFlagKey",
    "userId": "UserId",
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

This setup ensures that every time a feature flag is evaluated or an event is tracked by the VWO SDK, the relevant data is automatically sent to your configured Mixpanel project.

## How to see the data in the analytics tool

After integrating Mixpanel with your app, you can view the tracked data in the following ways:

1. Access Mixpanel Dashboard:
   * Log in to your Mixpanel account at [https://mixpanel.com](https://mixpanel.com)
   * Navigate to your project dashboard

2. View Feature Flag Evaluations:
   * Look for events named `vwo_fme_flag_evaluation`
   * These events contain data about feature flag and User ID

3. Track Custom Events
   * Find events named `vwo_fme_track_event`
   * These events include details about the event.

4. Analyze Data
   * Use Mixpanel's analytics tools to:
     * Create custom reports
     * View user flows
     * Track conversion rates
     * Monitor feature flag performance

## References

[Mixpanel quick start guide ](https://docs.mixpanel.com/docs/quickstart/install-mixpanel?sdk=swift)

[Mixpanel iOS SDK tracking methods](https://docs.mixpanel.com/docs/tracking-methods/sdks/swift)