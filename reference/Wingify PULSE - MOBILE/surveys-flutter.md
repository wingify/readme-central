---
title: Surveys - Flutter
deprecated: false
hidden: true
metadata:
  robots: index
---
# Wingify Pulse Flutter SDK - Survey Feature

The Wingify Pulse Flutter SDK allows you to deliver in-app surveys seamlessly within your Flutter application. Wingify's survey integration enables you to collect targeted user feedback during critical moments in the user journey.

## Key Features

- **Event-based Triggers** - Quickly embed surveys via configurable events
- **User Identification** - Identify and track users to avoid duplicate surveys
- **Personalization** - Personalize surveys using user attributes and event properties
- **Localization** - Localize surveys by setting preferred languages

## Requirements

| Requirement       | Details                                            |
| ----------------- | -------------------------------------------------- |
| Flutter           | 2.7+                                               |
| iOS               | 12.0+                                              |
| Android           | API level 21+ (Android 5.0)                        |
| Wingify Dashboard | Access required to retrieve Account ID and SDK Key |

***

# Getting Started

## Before You Begin

1. **Obtain Your API Key**<br />Log in to the Wingify dashboard and navigate to:<br />Configuration > Websites and apps > Default mobile app > SDK<br />Retrieve your API key from this section.

2. **Setup&#x20;**&#x57;ingif&#x79;**&#x20;Pulse**<br />Ensure you have the Wingify Pulse SDK integrated into your Flutter project.

***

# Quick Start

## Step 1: Add Dependency

Open your pubspec.yaml file and add the following dependency:

```yaml
dependencies:
  vwo_insights_flutter_sdk: ^2.1.0
```

## Step 2: Install Package

Run the command:

```bash
flutter pub get
```

## Step 3: Import VWO

Import VWO in your Dart code:

```dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
```

## Step 4: Native Configuration

### Android Initialization

Initialize the Wingify SDK in your Application class (e.g., FlutterVwoApp.kt):

```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration

class FlutterVwoApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        val configuration = ClientConfiguration(
            "YOUR_ACCOUNT_ID",
            "YOUR_SDK_KEY",
            "USER_ID"
        )
        
        VWOInsights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(s: String) {
                // VWO initialized successfully
                // Safe to trigger surveys now
            }

            override fun vwoInitFailed(s: String) {
                // VWO initialization failed
            }
        }, configuration)
    }
}
```

Register your Application class in AndroidManifest.xml:

```xml
<application
    android:name=".FlutterVwoApp"
    ... >
</application>
```

### iOS Initialization

Initialize the Wingify SDK in your AppDelegate.swift:

```swift
import VWO_Insights

@UIApplicationMain
class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        
        VWO.configure(
            accountId: "YOUR_ACCOUNT_ID",
            sdkKey: "YOUR_SDK_KEY",
            userId: "USER_ID"
        ) { result in
            switch result {
            case .success(_):
                print("VWO launch Success")
            case .failure(_):
                print("VWO launch Failure")
            }
        }
        
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

## Step 5: Trigger a Survey

```dart
VwoFlutter.trackEvent("event_name");
```

***

# Configuration Parameters

## ClientConfiguration

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| accountId | String | Yes      | Your Wingify account ID             |
| sdkKey    | String | Yes      | Your SDK key from Wingify dashboard |
| userId    | String | Yes      | Unique identifier for the user      |

***

# Triggering Surveys

Surveys can be triggered based on events that occur in your application.

## Basic Trigger

Add events to initiate surveys at key moments (e.g., button press or page load):

```dart
VwoFlutter.trackEvent("purchase_completed");
```

## Trigger with Event Properties

Attach properties to a trigger for advanced targeting. You can pass a map of key-value pairs as properties:

```dart
VwoFlutter.trackEvent("product_viewed", {
    "product_category": "electronics",
    "price_range": "high",
    "product_id": "SKU123"
});
```

## More Examples

```dart
// Purchase completed
VwoFlutter.trackEvent("purchase_completed", {
    "amount": 99.99,
    "currency": "USD",
    "payment_method": "credit_card"
});

// Feature usage
VwoFlutter.trackEvent("feature_used", {
    "feature_name": "dark_mode",
    "duration_seconds": 120
});

// Screen view
VwoFlutter.trackEvent("screen_viewed", {
    "screen_name": "checkout",
    "previous_screen": "cart"
});
```

These properties help segment and target users based on context, and they can be configured in the Wingify dashboard.

***

# Setting User Attributes

Add user attributes for targeting specific cohorts.

## Basic Usage

```dart
VwoFlutter.setAttribute({
    "user_type": "premium",
    "plan": "annual",
    "user_name": "John Doe",
    "user_email": "user@example.com"
});
```

## Supported Attribute Types

| Type    | Example                   |
| ------- | ------------------------- |
| String  | "premium"                 |
| Number  | 99.99                     |
| Boolean | true                      |
| Date    | Timestamp in milliseconds |

## Setting Date Attributes

For date attributes, use timestamp in milliseconds:

```dart
VwoFlutter.setAttribute({
    "signup_date": 1704067200000,
    "subscription_expiry": 1735689600000
});
```

**Note:** Always use milliseconds for date values, not epoch seconds.

***

# Language Settings

Define the preferred survey language using ISO 639-1 codes.

```dart
VwoFlutter.setSurveyLanguage("en");
```

**Common Language Codes:**

| Code | Language |
| ---- | -------- |
| en   | English  |
| es   | Spanish  |
| fr   | French   |
| de   | German   |
| ja   | Japanese |

***

# API Reference

## VwoFlutter Methods

**setAttribute(attributes)**

Sets custom profile attributes for survey targeting. Use timestamp in milliseconds for date values.

```dart
VwoFlutter.setAttribute({
    "user_type": "premium",
    "user_email": "user@example.com"
});
```

**setSurveyLanguage(languageCode)**

Sets the preferred survey language using ISO 639-1 code.

```dart
VwoFlutter.setSurveyLanguage("en");
```

**trackEvent(triggerName, eventProperties)**

Launches a survey based on the event name. Event properties are optional.

```dart
VwoFlutter.trackEvent("purchase_completed", {
    "amount": 99.99
});
```

***

# Best Practices

| Practice                | Description                                                              |
| ----------------------- | ------------------------------------------------------------------------ |
| Initialize early        | Initialize the SDK in Application class (Android) or AppDelegate (iOS)   |
| Wait for initialization | Ensure SDK is fully initialized before triggering surveys                |
| Set attributes first    | Configure user attributes before triggering surveys for better targeting |
| Use meaningful events   | Use descriptive event names that match Wingify dashboard configuration   |

## Recommended Flow

```dart
// 1. Set user attributes first
VwoFlutter.setAttribute({
    "user_type": "premium",
    "user_name": "John Doe",
    "user_email": "john@example.com"
});

// 2. Set language (optional)
VwoFlutter.setSurveyLanguage("en");

// 3. Then trigger events
VwoFlutter.trackEvent("home_screen_loaded");
```

***

# FAQ and Troubleshooting

## Survey not showing up?

1. **Check SDK Initialization**: Ensure the SDK is correctly initialized in your Application class (Android) or AppDelegate (iOS) with the correct Account ID, SDK Key, and User ID
2. **Verify Event Name**: Make sure the event name matches exactly with the Wingify dashboard configuration
3. **Check Targeting Rules**: Verify that targeting rules in the Wingify dashboard are satisfied

## Survey not appearing on app launch?

If you trigger an event on launch, ensure the SDK is fully initialized. You might need to add a slight delay or ensure attributes are set before tracking the event:

```dart
// Add a delay after initialization
Future.delayed(Duration(milliseconds: 500), () {
    VwoFlutter.trackEvent("app_launched");
});
```

## Switching users?

Re-initialize the SDK with the new user's credentials before tracking events for a new user session.

## How to create triggers?

1. **Create in dashboard first:** Navigate to Data360 > Events > Create and create an event

2. **Configure in Surveys:** Go to Surveys > Custom Triggers and configure the event

3. **Use in your app:** Use the same event name in your Flutter code

***

# Support

For additional support or questions:

- **Documentation**: [https://developers.wingify.com/reference/mobile-insights-introduction](https://developers.wingify.com/reference/mobile-insights-introduction)
- **Support Email**: [support@wingify.com](mailto:support@wingify.com)

***

# Version Information

| Component           | Version                         |
| ------------------- | ------------------------------- |
| Flutter Package     | vwo_insights_flutter_sdk ^2.1.0 |
| Native Android SDK  | 2.1.0                           |
| Native iOS SDK      | 2.1.0                           |
| Minimum iOS Version | 12.0                            |
| Minimum Android SDK | 21 (Android 5.0)                |

<br />
