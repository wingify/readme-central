---
title: Surveys - iOS - Migration Guide
deprecated: false
hidden: false
metadata:
  robots: index
---
# Migration Guide: Blitzllama to VWO Pulse iOS SDK

## Overview

This guide helps you migrate your application from the **Blitzllama SDK** to the **VWO Pulse SDK** for in-app surveys. Both SDKs provide similar functionality, but there are key differences in initialization, configuration, and API methods.

**Minimum Requirements:**
- iOS 12.0 and above
- VWO dashboard access (to obtain Account ID and SDK Key)

---

## Migration Summary

| Feature | Blitzllama SDK | VWO Pulse SDK |
|---------|----------------|---------------|
| Dependency | `BlitzLlamaSDK` | `VWO_Insights` |
| API Key Location | AppDelegate.swift | AppDelegate.swift |
| User Creation | Separate `createUser()` call | Passed during initialization |
| Trigger Method | `triggerEvent()` | `trackEvent()` |
| SDK Manager | `BlitzLlamaSDK.getSdkManager()` | `VWO.getSurveyManager()` |
| User Attributes | `setUserAttribute()` | `setAttribute()` |

---

# Step 1: Update Dependencies

## Remove Blitzllama Dependency

**Before (Blitzllama):**

```ruby
# Podfile
pod 'Blitzllama-ios', '1.6.29'
```

## Add VWO Pulse Dependency

**After (VWO Pulse):**

```ruby
# Podfile
pod 'VWO-Insights', '~> 2.1.0'
```

---

# Step 2: Update Configuration

## Remove Blitzllama Configuration

Blitzllama does not use Info.plist for API keys. The API key is set programmatically via `setBlitzLlamaAPIKey()`. VWO Pulse also uses programmatic configuration but passes credentials during initialization.

## VWO Configuration

The most significant change is in how the SDK is initialized and how users are identified using `VWO.configure()`.

---

# Step 3: Update SDK Initialization

The most significant change is in how the SDK is initialized and how users are identified.

## Blitzllama Approach (Before)

```swift
import BlitzLlamaSDK
import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize Blitzllama SDK with API key
        BlitzLlamaSDKController.getSDKManager.setBlitzLlamaAPIKey("API_KEY")
        
        // Create user separately
        BlitzLlamaSDKController.getSDKManager.createUser("user_id")
        
        return true
    }
}
```

## VWO Pulse Approach (After)

```swift
import VWO_Insights

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // User ID is now part of initialization
        VWO.configure(
            accountId: "your_account_id",  // Account ID from VWO dashboard
            sdkKey: "your_sdk_key",        // SDK Key from VWO dashboard
            userId: "user_id"              // Unique user identifier
        ) { result in
            switch result {
            case .success(_):
                print("VWO SDK initialized successfully")
                // Safe to trigger surveys now
                VWO.startSessionRecording()
            case .failure(let error):
                print("VWO SDK initialization failed: \(error)")
            }
        }
        
        return true
    }
}
```

## Key Changes

1. **No longer extend SDK class** - Your Application class extends Application instead of BlitzLlamaSDK
2. **User ID at initialization** - User identifier is passed in ClientConfiguration, not via separate `createUser()` call
3. **Callback-based initialization** - VWO uses explicit success/failure callbacks

---

# Step 4: Update Survey Triggers

## Blitzllama (Before)

```swift
// Trigger survey without properties
BlitzLlamaSDKController.getSDKManager.fetchSurvey(triggerName: "trigger_name")

// Trigger survey with properties
let eventProperties: [String: Any] = [
    "eventKey1": "eventValue1",
    "eventKey2": "eventValue2"
]
BlitzLlamaSDKController.getSDKManager().fetchSurvey(triggerName: "trigger_name", properties: eventProperties)
```

## VWO Pulse (After)

```swift
// Get Survey SDK manager
let surveySDK = VWO.getSurveyManager()

// Track event (trigger survey)
surveySDK.trackEvent(
    eventName: "trigger_name",
    properties: ["key": "value"],  // Optional
    viewController: self           // Optional, for presentation context
)
```

## Method Mapping

| Blitzllama | VWO Pulse |
|------------|-----------|
| `triggerEvent("name")` | `trackEvent("name")` |
| `triggerEvent("name", properties)` | `trackEvent("name", properties)` |
| `triggerEvent("name", properties, listener)` | `trackEvent("name", properties, listener)` |

---

# Step 5: Update User Attributes

## Setting Email and Name

**Blitzllama (Before):**

```swift
BlitzLlamaSDKController.getSDKManager.updateUserEmail("user@example.com")
BlitzLlamaSDKController.getSDKManager.updateUserName("user_name")
```

**VWO Pulse (After):**

In VWO, use `setAttribute()` to set user email and name:

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.updateUserEmail("user@example.com")
surveySDK.updateUserName("John Doe")
```

## Setting Custom User Attributes

**Blitzllama (Before):**

```swift
// Set individual attributes with data type
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("plan_type", attributeValue: "premium", dataType: "string")
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("user_level", attributeValue: "5", dataType: "number")
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("is_active", attributeValue: "true", dataType: "boolean")
```

**VWO Pulse (After):**

```swift
let surveySDK = VWO.getSurveyManager()

// Supports different value types (String, Int, Bool, etc.)
let attributes: [String: Any] = [
    "plan_type": "premium",
    "user_level": 5,        // Can use actual number type
    "is_active": true       // Can use boolean
]

surveySDK.setAttribute(attributes: attributes)
```

> 📘 **Note:** VWO uses `setAttribute()` instead of `updateUserAttributes()`. Data types are automatically inferred, so you don't need to specify them explicitly. You can pass multiple attributes in a single dictionary.

---

# Step 6: Update Survey Language Setting

**Blitzllama (Before):**

```swift
BlitzLlamaSDKController.getSDKManager.setLanguageCode("en")
```

**VWO Pulse (After):**

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.setLanguageCode("en")
```

This API remains largely the same.

---

# Step 7: Handle User Logout (If Applicable)

## Blitzllama (Before)

```swift
BlitzLlamaSDK.logout()
```

## VWO Pulse (After)

VWO Pulse handles user sessions differently. To switch users, re-initialize the SDK with a new ClientConfiguration containing the new user's ID:

```swift
// When user logs out and a new user logs in
let surveySDK = VWO.getSurveyManager()
surveySDK.logout()  // Clears survey-related data

// Re-initialize with new user
VWO.configure(
    accountId: "your_account_id",
    sdkKey: "your_sdk_key",
    userId: "new_user_id"
) { result in
    switch result {
    case .success(_):
        VWO.startSessionRecording()
    case .failure(let error):
        print("Re-initialization failed: \(error)")
    }
}
```

---

# Step 8: Update Event/Trigger Names in VWO Dashboard

If you're using triggers configured in the Blitzllama dashboard, you may need to recreate them in the VWO dashboard:

1. Log in to your VWO dashboard
2. Navigate to **Data360 → Events → Create**
3. Create events with the same names you used as trigger names in Blitzllama
4. Configure these events in **Surveys → Custom Triggers**

> ⚠️ **Important:** Ensure event names match exactly between your code and the VWO dashboard.

---

# Import Statement Changes

Update all your import statements:

| Before | After |
|--------|-------|
| `import BlitzLlamaSDK` | `import VWO_Insights` |
| `BlitzLlamaSDKController.getSDKManager` | `VWO.getSurveyManager()` |

---

# Complete Migration Example

## Before (Blitzllama)

```swift
import UIKit
import BlitzLlamaSDK

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize SDK with API key
        BlitzLlamaSDKController.getSDKManager.setBlitzLlamaAPIKey("API_KEY")
        
        // Create user
        BlitzLlamaSDKController.getSDKManager.createUser("user_123")
        
        // Set user attributes
        BlitzLlamaSDKController.getSDKManager.updateUserEmail("user@example.com")
        BlitzLlamaSDKController.getSDKManager.updateUserAttributes("plan", attributeValue: "premium", dataType: "string")
        BlitzLlamaSDKController.getSDKManager.setLanguageCode("en")
        
        return true
    }
}

// In your ViewController
class ViewController: UIViewController {
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // Trigger survey with properties
        let eventProperties: [String: Any] = [
            "screen": "home"
        ]
        BlitzLlamaSDKController.getSDKManager().fetchSurvey(triggerName: "home_screen_loaded", properties: eventProperties)
    }
}
```

## After (VWO Pulse)

```swift
import UIKit
import VWO_Insights

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize SDK with user ID
        VWO.configure(
            accountId: "your_account_id",
            sdkKey: "your_sdk_key",
            userId: "user_123"  // User ID now here
        ) { result in
            switch result {
            case .success(_):
                print("VWO SDK initialized")
                VWO.startSessionRecording()
                
                // Set attributes after initialization
                let surveySDK = VWO.getSurveyManager()
                surveySDK.updateUserEmail("user@example.com")
                surveySDK.setAttribute(attributes: ["plan": "premium"])
                surveySDK.setLanguageCode("en")
                
            case .failure(let error):
                print("Initialization failed: \(error)")
            }
        }
        
        return true
    }
}

// In your ViewController
class ViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Wait for SDK initialization before triggering
        // Best practice: Trigger in viewDidAppear or after initialization callback
    }
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        // Trigger survey
        let surveySDK = VWO.getSurveyManager()
        surveySDK.trackEvent(
            triggerName: "home_screen_loaded",
            properties: ["screen": "home"],
            viewController: self
        )
    }
}
```

---

# Troubleshooting

## Survey not showing after migration?

1. **Verify initialization**: Ensure the success callback is received before triggering surveys
2. **Check event names**: Event names must match exactly with VWO dashboard configuration
3. **Verify credentials**: Confirm Account ID and SDK Key are correct from VWO dashboard
4. **Check initialization timing**: Wait for the initialization callback before calling survey methods

## Race condition on first screen?

Use the initialization callback to trigger surveys:

```swift
VWO.configure(
    accountId: "your_account_id",
    sdkKey: "your_sdk_key",
    userId: "user_id"
) { result in
    switch result {
    case .success(_):
        // Safe to trigger survey here
        DispatchQueue.main.async {
            let surveySDK = VWO.getSurveyManager()
            surveySDK.trackEvent(triggerName: "app_launched")
        }
    case .failure(let error):
        print("Initialization failed: \(error)")
    }
}
```

---

# Migration Checklist

- [ ] Updated Podfile dependency from `Blitzllama-ios` to `VWO-Insights`
- [ ] Updated Application class initialization
- [ ] Replaced `createUser()` with user ID in ClientConfiguration
- [ ] Changed `triggerEvent()` calls to `trackEvent()`
- [ ] Updated `setUserAttribute()` to `setAttribute()`
- [ ] Updated import statements
- [ ] Configured events in VWO dashboard
- [ ] Tested survey triggering in the app

---

# Version Information

| Component | Version |
|-----------|---------|
| VWO Pulse SDK Version | 2.1.0+ |
| Minimum iOS Version | 12.0 |
| Swift Version | 5.0+ |
| Blitzllama SDK Version (migrating from) | 1.6.29 |

