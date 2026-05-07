---
title: Surveys - Flutter - Migration Guide
excerpt: Latest SDK version is 2.2.1
deprecated: false
hidden: true
metadata:
  robots: index
---
# Migration Guide: Blitzllama to VWO Pulse Flutter SDK

This guide provides step-by-step instructions for migrating your Flutter application from Blitzllama's Survey SDK to VWO Pulse Survey SDK.

***

## Overview

VWO Pulse SDK provides the same core functionality as Blitzllama with some key architectural differences. The most significant change is that SDK initialization now happens in native code (Android/iOS) rather than in Dart.

### Key Differences at a Glance

| Aspect          | Blitzllama              | VWO Pulse                       |
| --------------- | ----------------------- | ------------------------------- |
| Package         | blitzllama_flutter      | vwo_insights_flutter_sdk        |
| Class Name      | BlitzllamaFlutter       | VwoFlutter                      |
| Initialization  | Dart code               | Native code (Android/iOS)       |
| User Creation   | createUser() in Dart    | userId in native initialization |
| Trigger Method  | triggerEvent()          | trackEvent()                    |
| User Attributes | Individual method calls | Single map-based method         |
| User Email/Name | Dedicated methods       | Use setAttribute()              |

***

# Step 1: Update Dependencies

## Remove Blitzllama

In your pubspec.yaml, remove the Blitzllama dependency:

```yaml
dependencies:
  blitzllama_flutter: ^0.6.3
```

## Add VWO Pulse SDK

Add the VWO Pulse Flutter SDK:

```yaml
dependencies:
  vwo_insights_flutter_sdk: ^2.2.1
```

Run the following command to update dependencies:

```bash
flutter pub get
```

***

# Step 2: Update Imports

Replace Blitzllama imports with VWO imports in your Dart files.

**Before (Blitzllama):**

```dart
import 'package:blitzllama_flutter/blitzllama_flutter.dart';
```

**After (VWO Pulse):**

```dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
```

***

# Step 3: Update Initialization

This is the most significant change. VWO SDK requires native initialization instead of Dart initialization.

## Remove Blitzllama Dart Initialization

Remove the following from your Dart code:

```dart
// Remove this
BlitzllamaFlutter.init("<api_key>");
```

## Add VWO Native Initialization

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

        val configuration = ClientConfiguration(
            "YOUR_ACCOUNT_ID",
            "YOUR_SDK_KEY",
            "USER_ID"
        )
        
        VWOInsights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(s: String) {
                Log.d("VWO", "VWO initialized successfully")
                // Safe to trigger surveys now
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

## Configuration Parameters

| Parameter | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| accountId | String | Yes      | Your VWO account ID             |
| sdkKey    | String | Yes      | Your SDK key from VWO dashboard |
| userId    | String | Yes      | Unique identifier for the user  |

***

# Step 4: Update User Management

## User Creation

Blitzllama's createUser() is no longer needed. The user ID is now passed during native initialization.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.createUser(user_id);
```

**After (VWO Pulse):**

User ID is passed in native ClientConfiguration or VWO.configure().

## User Attributes

The method for setting user attributes has changed from individual calls to a single map-based approach.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setUserAttribute("plan", "premium", "string");
BlitzllamaFlutter.setUserAttribute("age", "25", "number");
BlitzllamaFlutter.setUserAttribute("is_active", "true", "boolean");
```

**After (VWO Pulse):**

```dart
VwoFlutter.setAttribute({
    "user_id": "user_123", // Please make sure you add user_id in every setAttribute call you make
    "plan": "premium",
    "age": 25,
    "is_active": true
});
```

## User Email and User Name

Use setAttribute to set user email and user name instead of dedicated methods.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setUserEmail(email);
BlitzllamaFlutter.setUserName(username);
```

**After (VWO Pulse):**

```dart
VwoFlutter.setAttribute({
    "user_id": "user_123", // Please make sure you add user_id in every setAttribute call you make
    "user_email": "user@example.com",
    "user_name": "John Doe"
});
```

## Survey Language

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setSurveyLanguage("en");
```

**After (VWO Pulse):**

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

**After (VWO Pulse):**

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

**After (VWO Pulse):**

```dart
VwoFlutter.trackEvent("HomeActivity", {
    "age": 10,
    "name": "John"
});
```

***

# Step 6: Handle Removed Features

## Custom Fonts

The setCustomFont() method is not available in VWO SDK.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.setCustomFont("Roboto-Regular", "Roboto-Bold");
```

**After (VWO Pulse):**

Not available - remove this call.

## Logout

The logout() method behavior has changed. In VWO, switching users requires re-initializing the SDK with a new user ID.

**Before (Blitzllama):**

```dart
BlitzllamaFlutter.logout();
```

**After (VWO Pulse):**

Re-initialize SDK with new user ID in native code.

***

# API Reference Mapping

| Blitzllama Method         | VWO Pulse Equivalent    | Notes                          |
| ------------------------- | ----------------------- | ------------------------------ |
| init(apiKey)              | Native initialization   | See Step 3                     |
| createUser(userId)        | Native initialization   | User ID in ClientConfiguration |
| setUserEmail(email)       | setAttribute()          | Pass user_email in map         |
| setUserName(name)         | setAttribute()          | Pass user_name in map          |
| setUserAttribute()        | setAttribute()          | Now accepts a map              |
| setSurveyLanguage(code)   | setSurveyLanguage(code) | Same signature                 |
| triggerEvent(name)        | trackEvent(name)        | Method renamed                 |
| triggerEvent(name, props) | trackEvent(name, props) | Method renamed                 |
| logout()                  | Re-initialize SDK       | Different approach             |
| setCustomFont()           | Not available           | Feature removed                |

***

# Migration Checklist

* [ ] Update pubspec.yaml to use vwo_insights_flutter_sdk ^2.1.0
* [ ] Run flutter pub get
* [ ] Update all import statements
* [ ] Remove Dart-based init() calls
* [ ] Add native initialization for Android (FlutterVwoApp.kt)
* [ ] Register Application class in AndroidManifest.xml
* [ ] Add native initialization for iOS (AppDelegate.swift)
* [ ] Remove createUser() calls (handled in native init)
* [ ] Replace BlitzllamaFlutter with VwoFlutter
* [ ] Replace triggerEvent() with trackEvent()
* [ ] Update setUserAttribute() to use setAttribute() with a map
* [ ] Replace setUserEmail() and setUserName() with setAttribute()
* [ ] Remove setCustomFont() calls if present
* [ ] Update logout handling if applicable
* [ ] Test survey triggering in the app

***

# Troubleshooting

## Survey not showing after migration?

1. Verify Account ID and SDK Key are correct in native initialization
2. Ensure the Application class is registered in AndroidManifest.xml
3. Check that event names match those configured in the VWO dashboard
4. Verify the SDK initialization completes successfully before triggering events

## Build errors on iOS?

Ensure you have imported the VWO SDK in your AppDelegate.swift:

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

* Documentation: [https://developers.vwo.com/reference/mobile-insights-introduction](https://developers.vwo.com/reference/mobile-insights-introduction)
* Support Email: [support@vwo.com](mailto:support@vwo.com)

***

# Version Information

| Component                       | Version          |
| ------------------------------- | ---------------- |
| VWO Pulse Flutter SDK           | ^2.1.0           |
| Native Android SDK              | 2.1.0            |
| Native iOS SDK                  | 2.1.0            |
| Minimum iOS Version             | 12.0             |
| Minimum Android SDK             | 21 (Android 5.0) |
| Blitzllama SDK (migrating from) | 0.6.3            |
