---
title: Android
deprecated: false
hidden: true
metadata:
  robots: index
---
# VWO Insights Android SDK - Survey Feature

The VWO Insights Android SDK enables you to deliver in-app surveys directly inside your Android application. By integrating the SDK, you can collect targeted user feedback at critical moments in the user journey.

## Key Features

* **Event-based Triggers** - Trigger surveys based on specific events in your app
* **User Identification** - Identify and track users to ensure proper survey targeting
* **Personalization** - Personalize surveys with user attributes
* **Localization** - Localize surveys by setting different languages

## Requirements

| Requirement     | Details                                            |
| --------------- | -------------------------------------------------- |
| Android Version | Android 5.0 (API level 21) and above               |
| VWO Dashboard   | Access required to retrieve Account ID and SDK Key |

***

# Getting Started

## Before You Begin

1. **Obtain Your API Key**  
   Log in to the VWO dashboard and navigate to:  
   `Configuration → Websites and apps → Default mobile app → SDK`  
   Retrieve your API key from this section.

2. **Confirm Minimum SDK**  
   The SDK officially supports API level 21 and above.

***

# Quick Start

## Step 1: SDK Installation

Add the SDK dependency to your `app/build.gradle`:

```groovy
dependencies {
    implementation 'com.vwo:insights:2.1.0'
}
```

## Step 2: Initialize the SDK

Initialize the SDK in your Application class's `onCreate()` method.

### Kotlin

```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val clientConfig = ClientConfiguration(
            "your_account_id",
            "your_sdk_key",
            "user_id"
        )

        val callback = object : IVwoInitCallback {
            override fun vwoInitSuccess(message: String) {
                // SDK initialized successfully
                // You can now trigger surveys
            }

            override fun vwoInitFailed(message: String) {
                // SDK initialization failed
                // Check network connectivity
            }
        }

        VWOInsights.init(this, callback, clientConfig)
    }
}
```

### Java

```java
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;
import com.vwo.insights.exposed.models.ClientConfiguration;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        ClientConfiguration clientConfig = new ClientConfiguration(
            "your_account_id",
            "your_sdk_key",
            "user_id"
        );

        IVwoInitCallback callback = new IVwoInitCallback() {
            @Override
            public void vwoInitSuccess(@NotNull String message) {
                // SDK initialized successfully
                // You can now trigger surveys
            }

            @Override
            public void vwoInitFailed(@NotNull String message) {
                // SDK initialization failed
                // Check network connectivity
            }
        };

        VWOInsights.init(this, callback, clientConfig);
    }
}
```

## Step 3: Register Application Class

Ensure your Application class is registered in `AndroidManifest.xml`:

```xml
<application
    android:name=".MyApplication"
    ... >
</application>
```

## Step 4: Trigger a Survey

Add a trigger event to display surveys at specific points in your app.

### Kotlin

```kotlin
val sdkManager = VWOInsights.getSurveySdkManager(context)
sdkManager.trackEvent("event_name")
```

### Java

```java
SdkManager sdkManager = VWOInsights.getSurveySdkManager(context);
sdkManager.trackEvent("event_name");
```

***

# Triggers and Event Properties

## What are Triggers?

**Triggers** are events in your app (e.g., button presses, screen loads, checkout completion) that prompt a survey if configured in the VWO dashboard.

## Triggering Surveys

You can trigger surveys using the `trackEvent` method:

### Kotlin

```kotlin
VWOInsights.getSurveySdkManager(context).trackEvent("event_name")
```

### Java

```java
VWOInsights.getSurveySdkManager(context).trackEvent("event_name");
```

***

# Personalizing and Localizing Surveys

## Setting User Properties

You can set profile attributes directly through VWOInsights using `setAttribute()`. This method supports different value types:

| Type    | Example                   |
| ------- | ------------------------- |
| String  | `"active"`                |
| Number  | `3`                       |
| Boolean | `true`                    |
| Date    | Timestamp in milliseconds |

### Kotlin

```kotlin
val attributes = mutableMapOf<String, Any>()
attributes["account_status"] = "active"
attributes["user_level"] = 3
attributes["user_email"] = "user@example.com"
attributes["user_name"] = "John Doe"

VWOInsights.setAttribute(attributes)
```

### Java

```java
Map<String, Object> attributes = new HashMap<>();
attributes.put("account_status", "active");
attributes.put("user_level", 3);
attributes.put("user_email", "user@example.com");
attributes.put("user_name", "John Doe");

VWOInsights.setAttribute(attributes);
```

## Setting Date Attributes

For date values, use timestamp in milliseconds.

### Kotlin

```kotlin
val attributes = mutableMapOf<String, Any>()
// Use System.currentTimeMillis() for current time
attributes["signup_date"] = System.currentTimeMillis()
// Or use a specific date in milliseconds
attributes["subscription_expiry"] = 1735689600000L  // Example: Jan 1, 2025

VWOInsights.setAttribute(attributes)
```

### Java

```java
Map<String, Object> attributes = new HashMap<>();
// Use System.currentTimeMillis() for current time
attributes.put("signup_date", System.currentTimeMillis());
// Or use a specific date in milliseconds
attributes.put("subscription_expiry", 1735689600000L);  // Example: Jan 1, 2025

VWOInsights.setAttribute(attributes);
```

> 📘 **Note:** Always use milliseconds for date values, not epoch seconds. You can convert a Date object using `date.getTime()` in Java or `date.time` in Kotlin.

## Setting Survey Language

To display surveys in the user's preferred language, set the survey language using an ISO 639-1 code.

### Kotlin

```kotlin
VWOInsights.getSurveySdkManager(context).setSurveyLanguage("en")
```

### Java

```java
VWOInsights.getSurveySdkManager(context).setSurveyLanguage("en");
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

* Improve user experience by displaying surveys in the user's native language
* Support better localization for global apps

***

# API Reference

## VWOInsights

| Method                                | Description                                           |
| ------------------------------------- | ----------------------------------------------------- |
| `init(application, callback, config)` | Initializes the VWO SDK                               |
| `getSurveySdkManager(context)`        | Returns the SdkManager instance for survey operations |
| `setAttribute(extras)`                | Sets custom profile attributes for surveys            |

## SdkManager

| Method                                      | Description                                |
| ------------------------------------------- | ------------------------------------------ |
| `trackEvent(trigger)`                       | Triggers a survey by trigger name          |
| `trackEvent(trigger, properties, listener)` | Triggers a survey with completion callback |
| `trackEventWithActivity(activity, trigger)` | Triggers a survey with activity reference  |
| `setUserProperties(properties)`             | Sets multiple user properties              |
| `setSurveyLanguage(languageCode)`           | Sets the preferred survey language         |

## ClientConfiguration

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| `accountId` | String | Yes      | Your VWO account ID             |
| `appId`     | String | Yes      | Your SDK key from VWO dashboard |
| `userId`    | String | Yes      | Unique identifier for the user  |

***

# FAQ and Troubleshooting

## Survey not showing up?

* Ensure VWO SDK is initialized successfully (check for `vwoInitSuccess` callback)
* Verify that the trigger name matches **exactly** what's configured in the VWO dashboard
* Check that surveys are active and properly configured in the dashboard

## Survey not showing on home screen or first app page?

This might be a **race condition**. The SDK may not be fully initialized before you trigger the survey.

**Solution:** Use the `vwoInitSuccess` callback to trigger surveys after successful initialization.

```kotlin
override fun vwoInitSuccess(message: String) {
    // Safe to trigger surveys here
    VWOInsights.getSurveySdkManager(context).trackEvent("home_screen_loaded")
}
```

## How to create events?

1. **Create in dashboard first:**  
   Navigate to `Data360 → Events → Create` and create an event with an `event_name`

2. **Configure in Surveys:**  
   Go to `Surveys → Custom Triggers` and configure the event

3. **Use in your app:**  
   Use the same `event_name` in your app code to launch the Survey

## Network connectivity issues?

* The SDK requires network connectivity for initialization
* If `vwoInitFailed` is called, check the device's network connection
* Surveys are fetched from the server when triggered

***

# Best Practices

| Practice                      | Description                                                               |
| ----------------------------- | ------------------------------------------------------------------------- |
| **Initialize early**          | Call `VWOInsights.init()` in your Application class's `onCreate()` method |
| **Wait for initialization**   | Always wait for the `vwoInitSuccess` callback before triggering surveys   |
| **Set user attributes early** | Configure user attributes before triggering surveys for better targeting  |

***

# Version Information

| Component           | Version          |
| ------------------- | ---------------- |
| SDK Version         | `2.1.0`          |
| Minimum Android SDK | 21 (Android 5.0) |
