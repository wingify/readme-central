---
title: Surveys - iOS
deprecated: false
hidden: true
metadata:
  robots: index
---
# Wingify Pulse iOS SDK - Survey Feature

The Wingify Pulse iOS SDK enables you to deliver in-app surveys directly inside your iOS application. By integrating the SDK, you can collect targeted user feedback at critical moments in the user journey.

## Key Features

- **Event-based Triggers** - Trigger surveys based on specific events in your app
- **User Identification** - Identify and track users to ensure proper survey targeting
- **Personalization** - Personalize surveys with user attributes
- **Localization** - Localize surveys by setting different languages

## Requirements

| Requirement       | Details                                            |
| ----------------- | -------------------------------------------------- |
| iOS Version       | iOS 12.0 and above                                 |
| Swift Version     | 5.0+                                               |
| Wingify Dashboard | Access required to retrieve Account ID and SDK Key |

***

# Getting Started

## Before You Begin

1. **Obtain Your API Key**<br />Log in to the Wingify dashboard and navigate to:<br />`Configuration → Websites and apps → Default mobile app → SDK`<br />Retrieve your API key from this section.

2. **Confirm Minimum iOS Version**<br />The SDK officially supports iOS 12.0 and above.

***

# Quick Start

## Step 1: SDK Installation

Add the SDK dependency to your `Podfile`:

```ruby
# Podfile
pod 'VWO-Insights', '~> 2.1.0'
pod 'SwiftyJSON', '~> 5.0.2'
```

Then run:

```bash
pod install
```

## Step 2: Initialize the SDK

Initialize the SDK in your AppDelegate's `application(_:didFinishLaunchingWithOptions:)` method.

```swift
import VWO_Insights

class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, 
                    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        VWO.configure(
            accountId: "your_account_id",  // Account ID from Wingify dashboard
            sdkKey: "your_sdk_key",        // SDK Key from Wingify dashboard
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

## Step 3: Trigger a Survey

Add a trigger event to display surveys at specific points in your app:

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.trackEvent(
    eventName: "event_name",
    properties: nil,           // Optional event properties
    viewController: self       // Optional, for presentation context
)
```

***

# Triggers and Event Properties

## What are Triggers?

**Triggers** are events in your app (e.g., button presses, screen loads, checkout completion) that prompt a survey if configured in the Wingify dashboard.

## Triggering Surveys

You can trigger surveys using the `trackEvent` method:

### Basic Trigger

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.trackEvent(eventName: "event_name")
```

### Trigger with Properties

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.trackEvent(
    eventName: "purchase_completed",
    properties: [
        "product_id": "SKU123",
        "amount": 99.99
    ],
    viewController: self
)
```

***

# Personalizing and Localizing Surveys

## Setting User Properties

You can set profile attributes using `setAttribute()`. This method supports different value types:

| Type    | Example                   |
| ------- | ------------------------- |
| String  | `"active"`                |
| Number  | `3`                       |
| Boolean | `true`                    |
| Date    | Timestamp in milliseconds |

```swift
let surveySDK = VWO.getSurveyManager()

let attributes: [String: Any] = [
    "account_status": "active",
    "user_level": 3,
    "user_email": "user@example.com",
    "user_name": "John Doe"
]

surveySDK.setAttribute(attributes: attributes)
```

## Setting Email and Name

You can also use dedicated methods for email and name:

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.updateUserEmail("user@example.com")
surveySDK.updateUserName("John Doe")
```

## Setting Date Attributes

For date values, use timestamp in milliseconds:

```swift
let surveySDK = VWO.getSurveyManager()

let attributes: [String: Any] = [
    // Use current time in milliseconds
    "signup_date": Date().timeIntervalSince1970 * 1000,
    // Or use a specific date in milliseconds
    "subscription_expiry": 1735689600000  // Example: Jan 1, 2025
]

surveySDK.setAttribute(attributes: attributes)
```

> 📘 **Note:** Always use milliseconds for date values, not epoch seconds. You can convert a Date object using `date.timeIntervalSince1970 * 1000`.

## Setting Survey Language

To display surveys in the user's preferred language, set the survey language using an ISO 639-1 code.

```swift
let surveySDK = VWO.getSurveyManager()
surveySDK.setLanguageCode("en")
```

**Common Language Codes:**

| Code | Language |
| ---- | -------- |
| `en` | English  |
| `es` | Spanish  |
| `fr` | French   |
| `de` | German   |
| `ja` | Japanese |

**Why Set Survey Language?**

- Improve user experience by displaying surveys in the user's native language
- Support better localization for global apps

***

# Handling User Sessions

## User Logout

When a user logs out and a new user logs in, clear the survey data and re-initialize:

```swift
// When user logs out
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

***

# API Reference

## Wingify

| Method                                           | Description                             |
| ------------------------------------------------ | --------------------------------------- |
| `configure(accountId:sdkKey:userId:completion:)` | Initializes the Wingify SDK             |
| `getSurveyManager()`                             | Returns the Survey SDK manager instance |
| `startSessionRecording()`                        | Starts session recording                |

## SurveyManager

| Method                                             | Description                                   |
| -------------------------------------------------- | --------------------------------------------- |
| `trackEvent(eventName:)`                           | Triggers a survey by event name               |
| `trackEvent(eventName:properties:viewController:)` | Triggers a survey with properties and context |
| `setAttribute(attributes:)`                        | Sets custom user attributes                   |
| `updateUserEmail(_:)`                              | Sets the user's email                         |
| `updateUserName(_:)`                               | Sets the user's name                          |
| `setLanguageCode(_:)`                              | Sets the preferred survey language            |
| `logout()`                                         | Clears survey-related user data               |

## Configuration Parameters

| Parameter   | Type   | Required | Description                         |
| ----------- | ------ | -------- | ----------------------------------- |
| `accountId` | String | Yes      | Your Wingify account ID             |
| `sdkKey`    | String | Yes      | Your SDK key from Wingify dashboard |
| `userId`    | String | Yes      | Unique identifier for the user      |

***

# FAQ and Troubleshooting

## Survey not showing up?

- Ensure Wingify SDK is initialized successfully (check for success in the completion callback)
- Verify that the event name matches **exactly** what's configured in the Wingify dashboard
- Check that surveys are active and properly configured in the dashboard

## Survey not showing on home screen or first view?

This might be a **race condition**. The SDK may not be fully initialized before you trigger the survey.

**Solution:** Use the initialization callback to trigger surveys after successful initialization.

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
            surveySDK.trackEvent(eventName: "app_launched")
        }
    case .failure(let error):
        print("Initialization failed: \(error)")
    }
}
```

## How to create events?

1. **Create in dashboard first:**<br />Navigate to `Data360 → Events → Create` and create an event with an `event_name`

2. **Configure in Surveys:**<br />Go to `Surveys → Custom Triggers` and configure the event

3. **Use in your app:**<br />Use the same `event_name` in your app code to launch the Survey

## Network connectivity issues?

- The SDK requires network connectivity for initialization
- If the completion callback returns failure, check the device's network connection
- Surveys are fetched from the server when triggered

***

# Best Practices

| Practice                      | Description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| **Initialize early**          | Call `VWO.configure()` in your AppDelegate's `application(_:didFinishLaunchingWithOptions:)` method |
| **Wait for initialization**   | Always wait for the success callback before triggering surveys                                      |
| **Set user attributes early** | Configure user attributes before triggering surveys for better targeting                            |
| **Use main thread for UI**    | Wrap survey triggers in `DispatchQueue.main.async` when called from background threads              |

***

# Version Information

| Component           | Version |
| ------------------- | ------- |
| SDK Version         | `2.1.0` |
| Minimum iOS Version | 12.0    |
| Swift Version       | 5.0+    |

<br />
