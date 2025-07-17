---
title: Firebase Analytics
deprecated: false
hidden: true
metadata:
  robots: index
---
# Integration with Firebase Analytics iOS SDK

This integration enables seamless tracking of VWO feature flag events and custom metrics within Firebase Analytics for iOS. By connecting VWO with Firebase Analytics, you can analyze user behavior and feature performance in a unified analytics platform, enhancing your ability to make data-driven decisions.

## Prerequisite

* VWO Feature Management and Experimentation (FME) iOS SDK installed and configured in your project.
* Firebase Analytics integrated and set up in your app..
* Firebase project configured.

***

## Steps

1. Set up Analytics SDK.
   * Follow the setup guide: [Firebase iOS Setup](https://firebase.google.com/docs/ios/setup)
2. Implement VWO FME SDK with Integration Callback
   * Implement the `IntegrationCallback` protocol in your class to forward VWO events to Firebase Analytics.
3. Forward VWO Events to Firebase Analytics
   * In the `execute` method of the integration callback, map VWO event properties to Firebase Analytics event parameters and log events accordingly.

### Example Code

```swift Swift
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


// Initialize VWO SDK with Firebase Analytics integration
let integration = FirebaseAnalyticsIntegration()
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, integrations: integration)

VWOFme.initialize(options: options) { result in
    switch result {
    case .success(_):
        print("VWO initialized with Firebase Analytics integration")
    case .failure(let error):
        print("VWO initialization failed")
    }
}
```

### Screenshot

<Image align="center" src="https://files.readme.io/dcd4b3529ed8af388602433c2b7cbfa0d7984e8716070d4503e607efdca17737-dashboard_events.png" />

***

## How to see the data in Firebase Analytics

* Log in to your Firebase console.
* Navigate to the **Events** section to view custom events logged from VWO.
* Use event parameters to filter and analyze feature flag related user interactions and conversions.

***

## References

[Firebase iOS Setup](https://firebase.google.com/docs/ios/setup)

[Firebase iOS SDK Repo](https://github.com/firebase/firebase-ios-sdk)