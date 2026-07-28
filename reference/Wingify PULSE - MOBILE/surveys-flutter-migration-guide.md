---
title: Surveys - Flutter - Migration Guide
excerpt: Latest SDK version is 2.6.1
deprecated: false
hidden: true
metadata:
  robots: index
---
# Migration Guide: Blitzllama to Wingify Pulse Flutter SDK

This guide provides step-by-step instructions for migrating your Flutter application from Blitzllama's Survey SDK to Wingify Pulse Survey SDK.

***

## Overview

Wingify Pulse SDK provides the same core functionality as Blitzllama with some key architectural differences. The most significant change is that SDK initialization now happens in native code (Android/iOS) rather than in Dart.

### Key Differences at a Glance

| Aspect          | Blitzllama              | Wingify Pulse                                                    |
| --------------- | ----------------------- | ---------------------------------------------------------------- |
| Package         | blitzllama_flutter      | vwo_insights_flutter_sdk                                         |
| Class Name      | BlitzllamaFlutter       | VwoFlutter                                                       |
| Initialization  | Dart code               | Native code (Android/iOS)                                        |
| User Creation   | createUser() in Dart    | userId in native initialization (optional), then use setUserId() |
| User Switching  | logout()                | setUserId(newUserId)                                             |
| Trigger Method  | triggerEvent()          | trackEvent()                                                     |
| User Attributes | Individual method calls | Single map-based method                                          |
| User Email/Name | Dedicated methods       | Use setAttribute()                                               |

***

# Step 1: Update Dependencies

## Remove Blitzllama

In your pubspec.yaml, remove the Blitzllama dependency:

```yaml
dependencies:
  blitzllama_flutter: ^0.6.3
```

## Add Wingify Pulse SDK

Add the Wingify Pulse Flutter SDK:

```yaml
dependencies:
  vwo_insights_flutter_sdk: ^2.6.1
```

Run the following command to update dependencies:

```bash
flutter pub get
```

***

# Step 2: Update Imports

Replace Blitzllama imports with Wingify imports in your Dart files.

**Before (Blitzllama):**

```dart
import 'package:blitzllama_flutter/blitzllama_flutter.dart';
```

**After (Wingify Pulse):**

```dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
```

***

# Step 3: Update Initialization

This is the most significant change. Wingify SDK requires native initialization instead of Dart initialization.

**Key Points:**

- User ID can be passed during native initialization (optional)
- Use `setUserId()` later to switch users or identify users after they log in
- For anonymous users, you can pass an empty string or `null` during initialization, or use a random string with `setUserId()`

## Remove Blitzllama Dart Initialization

Remove the following from your Dart code:

```dart
// Remove this
BlitzllamaFlutter.init("<api_key>");
```

## Add Wingify Native Initialization

### Android

1. Create an Application class (e.g., FlutterVwoApp.kt) in your Android project:

```kotlin
package com.your.package.name

import android.util.Log
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration
import io.flutter.app.FlutterApplication

class FlutterVwoApp : FlutterApplication() {
    override fun onCreate() {
        super.onCreate()

        // User ID is optional - use "" for anonymous users
        val configuration = ClientConfiguration(
            "YOUR_ACCOUNT_ID",
            "YOUR_SDK_KEY",
            ""  // User ID (optional) - use "" for anonymous, or "user_id" if known
        )
        
        VWOInsights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(s: String) {
                Log.d("VWO", "VWO initialized successfully")
                // Safe to trigger surveys now
                
                // If user logs in later in Flutter, use setUserId():
                // VwoFlutter.setUserId("user_id");
            }

            override fun vwoInitFailed(s: String) {
                Log.e("VWO", "VWO initialization failed: $s")
            }
        }, configuration)
    }
}
```

2. Register your Application class in AndroidManifest.xml:

```xml
<application
    android:name=".FlutterVwoApp"
    ... >
</application>
```

### iOS

Update your AppDelegate.swift:

```swift
import UIKit
import Flutter
import vwo_insights_ios_flutter_sdk

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        
        // User ID is optional - use nil for anonymous users
        VWO.configure(
            accountId: "YOUR_ACCOUNT_ID",
            sdkKey: "YOUR_SDK_KEY",
            userId: nil  // User ID (optional) - use nil for anonymous, or "user_id" if known
        ) { result in
            switch result {
            case .success(_):
                print("VWO launch Success")
                // If user logs in later in Flutter, use setUserId():
                // VwoFlutter.setUserId("user_id");
            case .failure(_):
                print("VWO launch Failure")
            }
        }
        
        GeneratedPluginRegistrant.register(with: self)
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }
}
```

## Configuration Parameters

| Parameter | Type   | Required | Description                                                  |
| --------- | ------ | -------- | ------------------------------------------------------------ |
| accountId | String | Yes      | Your Wingify account ID                                      |
| sdkKey    | String | Yes      | Your SDK key from Wingify dashboard                          |
| userId    | String | Optional | Unique identifier for the user (use "" or nil for anonymous) |

***

# Step 4: Update User Management

## User Creation

Blitzllama's createUser() is no longer needed. The user ID can be passed during native initialization (optional), or set later using `setUserId()`.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.createUser(user_id);
```

**After (**&#x57;ingif&#x79;**&#x20;Pulse):**

User ID is passed in native initialization (optional), or use `setUserId()` in Dart:

```dart
// When user logs in
final success = await VwoFlutter.setUserId('user_123');
if (success) {
  print('User identified successfully');
}
```

## User Attributes

The method for setting user attributes has changed from individual calls to a single map-based approach.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setUserAttribute("plan", "premium", "string");
BlitzllamaFlutter.setUserAttribute("age", "25", "number");
BlitzllamaFlutter.setUserAttribute("is_active", "true", "boolean");
```

**After (Wingify Pulse):**

```dart
VwoFlutter.setAttribute({
    "plan": "premium",
    "age": 25,
    "is_active": true
});
```

<Callout icon="📘" theme="info">
  ### **Note:** You don't need to include `user_id` in `setAttribute()` — the SDK automatically uses the current user ID set via initialization or `setUserId()`.
</Callout>

## User Email and User Name

Use setAttribute to set user email and user name instead of dedicated methods.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setUserEmail(email);
BlitzllamaFlutter.setUserName(username);
```

**After (Wingify Pulse):**

```dart
VwoFlutter.setAttribute({
    "user_email": "user@example.com",
    "user_name": "John Doe"
});
```

## Survey Language

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setSurveyLanguage("en");
```

**After (Wingify Pulse):**

```dart
VwoFlutter.setSurveyLanguage("en");
```

***

# Step 5: Update Event Triggers

The method name for triggering surveys has changed from triggerEvent to trackEvent.

## Basic Trigger

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.triggerEvent("purchase_completed");
```

**After (Wingify Pulse):**

```dart
VwoFlutter.trackEvent("purchase_completed");
```

## Trigger with Event Properties

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.triggerEvent("HomeActivity", {
    "age": 10,
    "name": "John"
});
```

**After (Wingify Pulse):**

```dart
VwoFlutter.trackEvent("HomeActivity", {
    "age": 10,
    "name": "John"
});
```

***

# Step 6: Handle Removed Features

## Custom Fonts

The setCustomFont() method is not available in Wingify SDK.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setCustomFont("Roboto-Regular", "Roboto-Bold");
```

**After (Wingify Pulse):**

Not available - remove this call.

## User Switching

Wingify Pulse does **not have a&#x20;**`logout()`**&#x20;method**. Instead, use `setUserId()` to switch between users. To create anonymous sessions (equivalent to logout), pass a random string as the user ID.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.logout();
```

**After (Wingify Pulse):**

### Switching to a New User

```dart
// When user logs in or switches account
final success = await VwoFlutter.setUserId('new_user_id');
if (success) {
  print('User switch complete');
  // Recording resumes automatically if it was active before
}
```

### Switching to Anonymous User (Logout)

```dart
import 'dart:math';

// When user logs out - generate random ID for anonymous tracking
final randomUserId = 'anon_${Random().nextInt(999999)}';
final success = await VwoFlutter.setUserId(randomUserId);
if (success) {
  print('Now tracking as anonymous user');
}
```

<Callout icon="📘" theme="info">
  ### **Note:** `setUserId()` automatically stops the current session, refreshes configuration, and resumes recording if it was active before the switch.
</Callout>

***

# API Reference Mapping

| Blitzllama Method         | Wingify Pulse Equivalent | Notes                           |
| ------------------------- | ------------------------ | ------------------------------- |
| init(apiKey)              | Native initialization    | See Step 3                      |
| createUser(userId)        | setUserId(userId)        | Use after initialization        |
| setUserEmail(email)       | setAttribute()           | Pass user_email in map          |
| setUserName(name)         | setAttribute()           | Pass user_name in map           |
| setUserAttribute()        | setAttribute()           | Now accepts a map               |
| setSurveyLanguage(code)   | setSurveyLanguage(code)  | Same signature                  |
| triggerEvent(name)        | trackEvent(name)         | Method renamed                  |
| triggerEvent(name, props) | trackEvent(name, props)  | Method renamed                  |
| logout()                  | setUserId(randomString)  | Use random string for anonymous |
| setCustomFont()           | Not available            | Feature removed                 |

***

# Migration Checklist

- [ ] Update pubspec.yaml to use vwo_insights_flutter_sdk ^2.6.1
- [ ] Run flutter pub get
- [ ] Update all import statements
- [ ] Remove Dart-based init() calls
- [ ] Add native initialization for Android (FlutterVwoApp.kt)
- [ ] Register Application class in AndroidManifest.xml
- [ ] Add native initialization for iOS (AppDelegate.swift)
- [ ] Replace createUser() with setUserId() for user identification
- [ ] Replace BlitzllamaFlutter with VwoFlutter
- [ ] Replace triggerEvent() with trackEvent()
- [ ] Update setUserAttribute() to use setAttribute() with a map
- [ ] Replace setUserEmail() and setUserName() with setAttribute()
- [ ] Remove setCustomFont() calls if present
- [ ] Replace logout() with setUserId() for user switching
- [ ] Test survey triggering in the app

***

# Troubleshooting

## Survey not showing after migration?

1. Verify Account ID and SDK Key are correct in native initialization
2. Ensure the Application class is registered in AndroidManifest.xml
3. Check that event names match those configured in the Wingify dashboard
4. Verify the SDK initialization completes successfully before triggering events

## Build errors on iOS?

Ensure you have imported the Wingify SDK in your AppDelegate.swift:

```swift
import vwo_insights_ios_flutter_sdk
```

## Build errors on Android?

Verify your Application class extends FlutterApplication and imports the correct packages:

```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration
import io.flutter.app.FlutterApplication
```

***

# Support

For additional support or questions:

- Documentation: [https://developers.wingify.com/reference/mobile-insights-introduction](https://developers.wingify.com/reference/mobile-insights-introduction)
- Support Email: [support@wingify.com](mailto:support@wingify.com)

***

# Version Information

| Component                       | Version          |
| ------------------------------- | ---------------- |
| Wingify Pulse Flutter SDK       | ^2.6.1           |
| Native Android SDK              | 2.6.1            |
| Native iOS SDK                  | 2.6.1            |
| Minimum iOS Version             | 12.0             |
| Minimum Android SDK             | 21 (Android 5.0) |
| Blitzllama SDK (migrating from) | 0.6.3            |

<br />
