---
title: Google Analytics
deprecated: false
hidden: true
metadata:
  robots: index
---
# Integration with Google Analytics iOS SDK

This integration enables seamless tracking of VWO feature flag events and custom metrics within Google Analytics for iOS. By connecting VWO with Google Analytics, you can analyze user behavior and feature performance in a unified analytics platform, enhancing your ability to make data-driven decisions.

## Prerequisite

* VWO Feature Management and Experimentation iOS SDK installed and configured in your project.
* Google Analytics for Firebase integrated and set up in your app. [Link](https://github.com/firebase/firebase-ios-sdk)
* Firebase project configured.

<br />

## Steps

1. Set up Analytics SDK. [Link](https://firebase.google.com/docs/ios/setup)
2. Implement VWO SDK with Integration Callback
   * Implement the `IntegrationCallback` protocol in your class to forward VWO events to Google Analytics.
3. Forward VWO Events to Google Analytics
   * In the `execute` method of the integration callback, map VWO event properties to Google Analytics event parameters and log events accordingly.

**Example Code:**

```swift Swift
import VWO_FME
import FirebaseAnalytics

class GoogleAnalyticsIntegration: IntegrationCallback {
    func execute(_ properties: [String: Any]) {
        // Extract event name and parameters from VWO properties
        if let api = properties["api"] as? String {
            switch api {
            case "getFlag":
                // Handle getFlag API
                if let featureName = properties["featureName"] as? String,
                   let userId = properties["userId"] as? String {
                    // Log a custom event for getFlag
                    Analytics.logEvent("getFlagEvent", parameters: [
                        "featureName": featureName,
                        "userId": userId
                    ])
                }
                
            case "track":
                // Handle track API
                if let eventName = properties["eventName"] as? String {
                    // Log the event to Google Analytics
                    Analytics.logEvent(eventName, parameters: nil)
                }
                
            default:
                break
            }
        }
    }
}


// Initialize VWO SDK with Google Analytics integration
let integration = GoogleAnalyticsIntegration()
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID, integrations: integration)

VWOFme.initialize(options: options) { result in
    switch result {
    case .success(_):
        print("VWO initialized with Google Analytics integration")
    case .failure(let error):
        print("VWO initialization failed: \(error.localizedDescription)")
    }
}

```