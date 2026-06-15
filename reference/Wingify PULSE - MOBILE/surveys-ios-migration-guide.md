---
title: Surveys - iOS - Migration Guide
deprecated: false
hidden: true
metadata:
  robots: index
---
# Migration Guide: Blitzllama to Wingify Pulse iOS SDK

## Overview

This guide helps you migrate your application from the **Blitzllama SDK** to the **Wingify Pulse SDK** for in-app surveys. Both SDKs provide similar functionality, but there are key differences in initialization, configuration, and API methods.

**Minimum Requirements:**

* iOS 12.0 and above
* Wingify dashboard access (to obtain Account ID and SDK Key)

***

## Migration Summary

| Feature          | Blitzllama SDK                  | Wingify Pulse SDK                                                                   |
| ---------------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Dependency       | `BlitzLlamaSDK`                 | `Wingify_Insights`                                                                  |
| API Key Location | AppDelegate.swift               | AppDelegate.swift                                                               |
| User Creation    | Separate `createUser()` call    | Passed during initialization (optional), then use `setUserId()` to switch users |
| User Switching   | `logout()`                      | `setUserId(randomString, completion)`                                           |
| Trigger Method   | `triggerEvent()`                | `trackEvent()`                                                                  |
| SDK Manager      | `BlitzLlamaSDK.getSdkManager()` | `Wingify.getSurveyManager()`                                                        |
| User Attributes  | `setUserAttribute()`            | `setAttribute()`                                                                |

***

# Step 1: Update Dependencies

## Remove Blitzllama Dependency

**Before (Blitzllama):**

```ruby
# Podfile
pod 'Blitzllama-ios', '1.6.29'
```

## Add Wingify Pulse Dependency

**After (Wingify Pulse):**

```ruby
# Podfile
pod 'Wingify-Insights', '~> 2.5.0'
```

***

# Step 2: Update Configuration

## Remove Blitzllama Configuration

Blitzllama does not use Info.plist for API keys. The API key is set programmatically via `setBlitzLlamaAPIKey()`. Wingify Pulse also uses programmatic configuration but passes credentials during initialization.

## Wingify Configuration

The most significant change is in how the SDK is initialized and how users are identified using `Wingify.configure()`.

***

# Step 3: Update SDK Initialization

The most significant change is in how the SDK is initialized and how users are identified.

**Key Points:**

* User ID can be passed during initialization in `Wingify.configure()` (optional)
* Use `setUserId()` later to switch users or identify users after they log in
* For anonymous users, you can pass nil, or "" or a random string with `setUserId()`

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

## Wingify Pulse Approach (After)

```swift
import Wingify_Insights

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // User ID is optional during initialization
        // Pass nil or "" for anonymous users, or actual user ID if known
        Wingify.configure(
            accountId: "your_account_id",  // Account ID from Wingify dashboard
            sdkKey: "your_sdk_key",        // SDK Key from Wingify dashboard
            userId: nil                    // User ID (optional) - use nil for anonymous, or "user_id" if known
        ) { result in
            switch result {
            case .success(_):
                print("Wingify SDK initialized successfully")
                // Safe to trigger surveys now
                Wingify.startSessionRecording()
                
                // If user logs in later, use setUserId() to identify them:
                // Wingify.setUserId("user_id") { result in ... }
            case .failure(let error):
                print("Wingify SDK initialization failed: \(error)")
            }
        }
        
        return true
    }
}
```

## Key Changes

1. **No longer extend SDK class** - Your Application class extends `UIResponder` and `UIApplicationDelegate` instead of extending Blitzllama SDK
2. **User ID is optional at initialization** - User identifier can be passed in `Wingify.configure()` (use `nil` or `""` for anonymous users), or set later using `setUserId()`
3. **Use `setUserId()` to switch users** - Call `setUserId()` when user logs in or switches accounts (no separate `createUser()` or `logout()` methods)
4. **Callback-based initialization** - Wingify uses explicit success/failure callbacks

***

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

## Wingify Pulse (After)

```swift
// Get Survey SDK manager
let surveySDK = Wingify.getSurveyManager()

// Track event (trigger survey)
surveySDK.trackEvent(
    eventName: "trigger_name",
    properties: ["key": "value"],  // Optional
    viewController: self           // Optional, for presentation context
)
```

## Method Mapping

| Blitzllama                                   | Wingify Pulse                                  |
| -------------------------------------------- | ------------------------------------------ |
| `triggerEvent("name")`                       | `trackEvent("name")`                       |
| `triggerEvent("name", properties)`           | `trackEvent("name", properties)`           |
| `triggerEvent("name", properties, listener)` | `trackEvent("name", properties, listener)` |

***

# Step 5: Update User Attributes

## Setting Email and Name

**Blitzllama (Before):**

```swift
BlitzLlamaSDKController.getSDKManager.updateUserEmail("user@example.com")
BlitzLlamaSDKController.getSDKManager.updateUserName("user_name")
```

**Wingify Pulse (After):**

In Wingify, use `setAttribute()` to set user email and name:

```swift
let surveySDK = Wingify.getSurveyManager()

// Supports different value types (String, Int, Bool, etc.)
let attributes: [String: Any] = [
    "user_email": "user@example.com",
    "user_name": "John Doe"
]

surveySDK.setAttribute(attributes: attributes)
```

> 📘 **Note:** You don't need to include `user_id` in `setAttribute()` — the SDK automatically uses the current user ID set via initialization or `setUserId()`.

## Setting Custom User Attributes

**Blitzllama (Before):**

```swift
// Set individual attributes with data type
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("plan_type", attributeValue: "premium", dataType: "string")
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("user_level", attributeValue: "5", dataType: "number")
BlitzLlamaSDKController.getSDKManager.updateUserAttributes("is_active", attributeValue: "true", dataType: "boolean")
```

**Wingify Pulse (After):**

```swift
let surveySDK = Wingify.getSurveyManager()

// Supports different value types (String, Int, Bool, etc.)
let attributes: [String: Any] = [
    "plan_type": "premium",
    "user_level": 5,        // Can use actual number type
    "is_active": true       // Can use boolean
]

surveySDK.setAttribute(attributes: attributes)
```

> 📘 **Note:** Wingify uses `setAttribute()` instead of `updateUserAttributes()`. Data types are automatically inferred, so you don't need to specify them explicitly. You can pass multiple attributes in a single dictionary. The SDK automatically associates attributes with the current user ID.

***

# Step 6: Update Survey Language Setting

**Blitzllama (Before):**

```swift
BlitzLlamaSDKController.getSDKManager.setLanguageCode("en")
```

**Wingify Pulse (After):**

```swift
let surveySDK = Wingify.getSurveyManager()
surveySDK.setLanguageCode("en")
```

This API remains largely the same.

***

# Step 7: Handle User Switching

## Blitzllama (Before)

```swift
BlitzLlamaSDK.logout()
```

## Wingify Pulse (After)

Wingify Pulse does **not have a `logout()` method**. Instead, use `setUserId()` to switch between users. To create anonymous sessions (equivalent to logout), pass a random string as the user ID.

### Switching to a New User

Use `setUserId()` when your user logs in or switches accounts:

```swift
import Wingify_Insights

// When user logs in or switches account
Wingify.setUserId("new_user_id") { result in
    switch result {
    case .success(let message):
        print("User switch complete: \(message)")
        // Recording resumes automatically if it was active before
        
    case .failure(let error):
        print("User switch failed: \(error.localizedDescription)")
    }
}
```

### Switching to Anonymous User (Logout)

If your user logs out and you want to track them as anonymous, generate a random user ID:

```swift
import Foundation

// When user logs out
let randomUserId = UUID().uuidString
Wingify.setUserId(randomUserId) { result in
    switch result {
    case .success(let message):
        print("Now tracking as anonymous user")
        
    case .failure(let error):
        print("Failed to switch to anonymous: \(error.localizedDescription)")
    }
}
```

### Key Differences

| Blitzllama                 | Wingify Pulse                                        |
| -------------------------- | ------------------------------------------------ |
| `BlitzLlamaSDK.logout()`   | No direct logout method                          |
| N/A                        | `Wingify.setUserId(userId, completion)`              |
| Logout clears session      | Use random string for anonymous tracking         |
| Requires re-initialization | `setUserId()` handles session refresh internally |

> 📘 **Note:** `setUserId()` automatically stops the current session, refreshes configuration, and resumes recording if it was active before the switch.

***

# Step 8: Update Event/Trigger Names in Wingify Dashboard

If you're using triggers configured in the Blitzllama dashboard, you may need to recreate them in the Wingify dashboard:

1. Log in to your Wingify dashboard
2. Navigate to **Data360 → Events → Create**
3. Create events with the same names you used as trigger names in Blitzllama
4. Configure these events in **Surveys → Custom Triggers**

> ⚠️ **Important:** Ensure event names match exactly between your code and the Wingify dashboard.

***

# Import Statement Changes

Update all your import statements:

| Before                                  | After                    |
| --------------------------------------- | ------------------------ |
| `import BlitzLlamaSDK`                  | `import Wingify_Insights`    |
| `BlitzLlamaSDKController.getSDKManager` | `Wingify.getSurveyManager()` |

***

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

## After (Wingify Pulse)

```swift
import UIKit
import Wingify_Insights

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        // Initialize SDK with user ID
        Wingify.configure(
            accountId: "your_account_id",
            sdkKey: "your_sdk_key",
            userId: "user_123"  // User ID now here
        ) { result in
            switch result {
            case .success(_):
                print("Wingify SDK initialized")
                Wingify.startSessionRecording()
                
                // Set attributes after initialization
                let surveySDK = Wingify.getSurveyManager()
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
        let surveySDK = Wingify.getSurveyManager()
        surveySDK.trackEvent(
            triggerName: "home_screen_loaded",
            properties: ["screen": "home"],
            viewController: self
        )
    }
}
```

***

# Troubleshooting

## Survey not showing after migration?

1. **Verify initialization**: Ensure the success callback is received before triggering surveys
2. **Check event names**: Event names must match exactly with Wingify dashboard configuration
3. **Verify credentials**: Confirm Account ID and SDK Key are correct from Wingify dashboard
4. **Check initialization timing**: Wait for the initialization callback before calling survey methods

## Race condition on first screen?

Use the initialization callback to trigger surveys:

```swift
Wingify.configure(
    accountId: "your_account_id",
    sdkKey: "your_sdk_key",
    userId: "user_id"
) { result in
    switch result {
    case .success(_):
        // Safe to trigger survey here
        DispatchQueue.main.async {
            let surveySDK = Wingify.getSurveyManager()
            surveySDK.trackEvent(triggerName: "app_launched")
        }
    case .failure(let error):
        print("Initialization failed: \(error)")
    }
}
```

***

# Migration Checklist

* [ ] Updated Podfile dependency from `Blitzllama-ios` to `Wingify-Insights`
* [ ] Updated Application class initialization
* [ ] Replaced `createUser()` with `setUserId()` for user identification
* [ ] Changed `triggerEvent()` calls to `trackEvent()`
* [ ] Updated `setUserAttribute()` to `setAttribute()`
* [ ] Updated import statements
* [ ] Configured events in Wingify dashboard
* [ ] Tested survey triggering in the app

***

# Version Information

| Component                               | Version |
| --------------------------------------- | ------- |
| Wingify Pulse SDK Version                   | 2.5.0+  |
| Minimum iOS Version                     | 12.0    |
| Swift Version                           | 5.0+    |
| Blitzllama SDK Version (migrating from) | 1.6.29  |
