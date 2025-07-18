---
title: Firebase Analytics
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Firebase Analytics is a free, comprehensive analytics solution that provides detailed insights into app usage and user engagement. It offers automatic event tracking, reporting, audience segmentation, and seamless integration with other Firebase services, making it a powerful tool for understanding your app's performance and user behavior.

Integrating FME with Firebase Analytics offers significant benefits. FME sends feature flag and event data to Firebase Analytics, allowing you to see which feature flag variations users are exposed to directly within your Firebase dashboard. By correlating user behavior with specific experiments, you can gain deeper, data-driven insights into the real impact of your feature rollouts and campaigns.

## Prerequisites

### Firebase Analytics Setup

* Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com) if you don't already have one
* Add your iOS app to the Firebase project
* Download the `GoogleService-Info.plist` configuration file
* Add the configuration file to your Xcode project
* Follow the detailed setup instructions mentioned at [Firebase iOS Setup Guide](https://firebase.google.com/docs/ios/setup)

### VWO FME SDK Installation and Configuration

* Ensure you have the VWO Feature Management and Experimentation product enabled for your VWO account
* The VWO FME SDK should be properly installed in your project
* Set your VWO account ID and SDK key in your application's configuration:

```swift
let FME_ACCOUNT_ID = "your_account_id" // Replace with your actual VWO account ID
let FME_SDK_KEY = "your_sdk_key" // Replace with your actual VWO sdk key
```

## Integration Steps

Firebase Analytics SDK integration enables automatic collection of feature flag data and user events. The example below shows an implementation with the iOS SDK.

> 📘 Note
>
> The example below shows an implementation with the `iOS` SDK. Please note that any VWO FME SDK can be used.

### 1. Add Required Dependencies

Add the following to your Podfile:

```ruby
pod 'Firebase/Analytics'
pod 'VWO-FME-iOS'
```

### 2. Create Firebase Analytics Integration Class

Implement a class to handle Firebase Analytics integration and provide methods for tracking events and flag evaluations.

```swift
import VWO_FME
import FirebaseAnalytics

class FirebaseAnalyticsIntegration: IntegrationCallback {
    func execute(_ properties: [String: Any]) {
        // Extract event name and parameters from VWO properties
        if let api = properties["api"] as? String {
            switch api {
            case "getFlag":
                // Handle getFlag API
                if let featureName = properties["featureName"] as? String,
                   let userId = properties["userId"] as? String {
                   
                     // Log the event to Firebase Analytics
                    Analytics.logEvent("vwo_fme_flag_evaluation", parameters: [
                        "featureName": featureName,
                        "userId": userId
                    ])
                }
                
            case "track":
                // Handle track API
                if let eventName = properties["eventName"] as? String {
                    // Log the event to Firebase Analytics
                    Analytics.logEvent("vwo_fme_track_event", parameters: ["name": eventName])
                }
                
            default:
                break
            }
        }
    }
}
```

### 3. Initialize Firebase Analytics and set up the `IntegrationCallback`:

Initialize your `FirebaseAnalyticsIntegration` instance and provide an implementation of the `IntegrationCallback` when initializing the FME SDK. `IntegrationCallback` is a mechanism that automatically forwards FME SDK events (like flag evaluations) to desired analytics platform for real-time tracking and analysis.

```swift
// Example Integration Callback Setup
let integration = FirebaseAnalyticsIntegration()
let options = VWOInitOptions(sdkKey: FME_SDK_KEY, // Replace with your actual VWO sdk key
                           accountId: FME_ACCOUNT_ID, // Replace with your actual VWO account ID
                           integrations: integration)

VWOFme.initialize(options: options) { result in
    switch result {
    case .success:
        print("VWO-FME initialized successfully")
    case .failure(let error):
        print("VWO-FME initialization failed: \(error)")
    }
}
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

Ensure you have added your Firebase configuration to your project as specified in the Prerequisites.

This setup ensures that every time a feature flag is evaluated or an event is tracked by the VWO SDK, the relevant data is automatically sent to your Firebase Analytics dashboard.

### Sample Screenshot

<Image align="center" src="https://files.readme.io/dcd4b3529ed8af388602433c2b7cbfa0d7984e8716070d4503e607efdca17737-dashboard_events.png" />

## How to see the data in Firebase Analytics

After integrating Firebase Analytics with your app, you can view the tracked data in the following ways:

1. **Access Firebase Console:**

   * Log in to [Firebase Console](https://console.firebase.google.com)
   * Select your project
   * Navigate to Analytics section

2. **View Feature Flag Evaluations:**

   * Look for events named `vwo_fme_flag_evaluation`
   * These events contain data about feature flag and User ID

3. **Track Custom Events:**

   * Find events named `vwo_fme_track_event`
   * These events include details about the event

4. **Analyze Data**: Use Firebase Analytics tools to:
   * Create audience segments based on feature flag exposure
   * Monitor user engagement and retention metrics
   * Track conversion rates and monitor feature flag performance
   * Export data to BigQuery for advanced analysis
   * Set up automated insights and anomaly detection

## GitHub Reference

The complete source code for this example is available on [GitHub](https://github.com/wingify/vwo-fme-examples/tree/master/ios).

This is an example of an implementation using the iOS SDK. While this demonstrates the approach, you can utilize any of the VWO FME SDKs for your project.