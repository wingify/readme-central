---
title: Mixpanel
deprecated: false
hidden: true
metadata:
  robots: index
---
### Example code

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
                    Mixpanel.mainInstance().track(event: "getFlagEvent", properties: [
                        "featureName": featureName,
                        "userId": userId
                    ])
                }
                
            case "track":
                // Handle track API
                if let eventName = properties["eventName"] as? String {
                    // Log the event to Mixpanel
                    Mixpanel.mainInstance().track(event: eventName)
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