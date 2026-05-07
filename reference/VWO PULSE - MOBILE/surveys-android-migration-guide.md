---
title: Surveys - Android - Migration Guide
deprecated: false
hidden: true
metadata:
  robots: index
---
# Migration Guide: Blitzllama to VWO Pulse Android SDK

## Overview

This guide helps you migrate your Android application from the **Blitzllama SDK** to the **VWO Pulse SDK** for in-app surveys. Both SDKs provide similar functionality, but there are key differences in initialization, configuration, and API methods.

**Minimum Requirements:**

* Android 5.0 (API level 21) and above
* VWO dashboard access (to obtain Account ID and SDK Key)

***

## Migration Summary

| Feature          | Blitzllama SDK                    | VWO Pulse SDK                                                                   |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Dependency       | `com.blitzllama:Blitzllama:1.9.1` | `com.vwo:insights:2.2.0`                                                        |
| API Key Location | AndroidManifest.xml               | ClientConfiguration object                                                      |
| User Creation    | Separate `createUser()` call      | Passed during initialization (optional), then use `setUserId()` to switch users |
| User Switching   | `logout()`                        | `setUserId(randomString, callback)`                                             |
| Trigger Method   | `triggerEvent()`                  | `trackEvent()`                                                                  |
| SDK Manager      | `BlitzLlamaSDK.getSdkManager()`   | `VWOInsights.getSurveySdkManager()`                                             |
| User Attributes  | `setUserAttribute()`              | `setAttribute()`                                                                |

***

# Step 1: Update Dependencies

## Remove Blitzllama Dependency

**Before (Blitzllama):**

```groovy
// app/build.gradle
dependencies {
    implementation 'com.blitzllama:Blitzllama:1.9.1'
}
```

## Add VWO Pulse Dependency

**After (VWO Pulse):**

```groovy
// app/build.gradle
dependencies {
    implementation 'com.vwo:insights:2.2.0'
}
```

***

# Step 2: Update AndroidManifest.xml

## Remove Blitzllama Configuration

Remove the following from `AndroidManifest.xml`:

```xml
<!-- REMOVE THIS -->
<meta-data 
    android:name="blitz_api_key"   
    android:value="YOUR_BLITZLLAMA_API_KEY" />
```

## VWO Configuration

VWO Pulse does not require manifest configuration. Credentials are passed programmatically during SDK initialization.

> 📘 **Note:** If you had `<uses-sdk tools:overrideLibrary="com.blitzllama.androidSDK" />`, you can remove it as well.

***

# Step 3: Update SDK Initialization

The most significant change is in how the SDK is initialized and how users are identified.

**Key Points:**

* User ID can be passed during initialization in `ClientConfiguration` (optional)
* Use `setUserId()` later to switch users or identify users after they log in
* For anonymous users, you can pass an empty string (`""`) during initialization or use a random string with `setUserId()`

## Blitzllama Approach (Before)

### Java

```java
// Application class extending BlitzLlamaSDK
public class MyApplication extends BlitzLlamaSDK {
    @Override
    public void onCreate() {
        super.onCreate();
        BlitzLlamaSDK.init(this);
    }
}

// In your Activity - Create user separately
BlitzLlamaSDK.getSdkManager(this).createUser("user_id");
```

### Kotlin

```kotlin
class MyApplication : BlitzLlamaSDK() {
    override fun onCreate() {
        super.onCreate()
        BlitzLlamaSDK.init(this)
    }
}

// In your Activity - Create user separately
BlitzLlamaSDK.getSdkManager(this).createUser("user_id")
```

## VWO Pulse Approach (After)

### Java

```java
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;
import com.vwo.insights.exposed.models.ClientConfiguration;

public class MyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        // User ID is optional during initialization
        // Pass empty string ("") for anonymous users, or actual user ID if known
        ClientConfiguration clientConfig = new ClientConfiguration(
            "your_account_id",    // Account ID from VWO dashboard
            "your_sdk_key",       // SDK Key from VWO dashboard
            ""                    // User ID (optional) - use "" for anonymous, or "user_id" if known
        );

        IVwoInitCallback callback = new IVwoInitCallback() {
            @Override
            public void vwoInitSuccess(@NotNull String message) {
                // SDK initialized successfully
                // Safe to trigger surveys now
                
                // If user logs in later, use setUserId() to identify them:
                // VWOInsights.setUserId("user_id", callback);
            }

            @Override
            public void vwoInitFailed(@NotNull String message) {
                // Handle initialization failure
            }
        };

        VWOInsights.init(this, callback, clientConfig);
    }
}
```

### Kotlin

```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        // User ID is optional during initialization
        // Pass empty string ("") for anonymous users, or actual user ID if known
        val clientConfig = ClientConfiguration(
            "your_account_id",    // Account ID from VWO dashboard
            "your_sdk_key",       // SDK Key (App ID) from VWO dashboard
            ""                    // User ID (optional) - use "" for anonymous, or "user_id" if known
        )

        val callback = object : IVwoInitCallback {
            override fun vwoInitSuccess(message: String) {
                // SDK initialized successfully
                // Safe to trigger surveys now
                
                // If user logs in later, use setUserId() to identify them:
                // VWOInsights.setUserId("user_id", callback)
            }

            override fun vwoInitFailed(message: String) {
                // Handle initialization failure
            }
        }

        VWOInsights.init(this, callback, clientConfig)
    }
}
```

## Key Changes

1. **No longer extend SDK class** - Your Application class extends `Application` instead of `BlitzLlamaSDK`
2. **User ID is optional at initialization** - User identifier can be passed in `ClientConfiguration` (use `""` for anonymous users), or set later using `setUserId()`
3. **Use `setUserId()` to switch users** - Call `setUserId()` when user logs in or switches accounts (no separate `createUser()` or `logout()` methods)
4. **Callback-based initialization** - VWO uses explicit success/failure callbacks

***

# Step 4: Update Survey Triggers

## Basic Trigger

**Blitzllama (Before):**

### Java

```java
BlitzLlamaSDK.getSdkManager(context).triggerEvent("trigger_name");
```

### Kotlin

```kotlin
BlitzLlamaSDK.getSdkManager(context).triggerEvent("trigger_name")
```

**VWO Pulse (After):**

### Java

```java
SdkManager sdkManager = VWOInsights.getSurveySdkManager(context);
sdkManager.trackEvent("event_name");
```

### Kotlin

```kotlin
val sdkManager = VWOInsights.getSurveySdkManager(context)
sdkManager.trackEvent("event_name")
```

## Trigger with Event Properties

**Blitzllama (Before):**

### Java

```java
Map<String, Object> properties = new HashMap<>();
properties.put("product_id", "SKU123");
properties.put("amount", 99.99);

BlitzLlamaSDK.getSdkManager(context).triggerEvent("purchase_completed", properties);
```

### Kotlin

```kotlin
val properties = mapOf(
    "product_id" to "SKU123",
    "amount" to 99.99
)

BlitzLlamaSDK.getSdkManager(context).triggerEvent("purchase_completed", properties)
```

**VWO Pulse (After):**

### Java

```java
SdkManager sdkManager = VWOInsights.getSurveySdkManager(context);

Map<String, Object> properties = new HashMap<>();
properties.put("product_id", "SKU123");
properties.put("amount", 99.99);
properties.put("category", "electronics");

sdkManager.trackEvent("purchase_completed", properties);
```

### Kotlin

```kotlin
val sdkManager = VWOInsights.getSurveySdkManager(context)

val properties = mapOf(
    "product_id" to "SKU123",
    "amount" to 99.99,
    "category" to "electronics"
)

sdkManager.trackEvent("purchase_completed", properties)
```

## Trigger with Completion Callback

**Blitzllama (Before):**

### Java

```java
BlitzLlamaSDK.getSdkManager(context).triggerEvent("event_name", properties, new SurveyListener() {
    @Override
    public void onSurveyComplete() {
        // Survey completed
    }
});
```

**VWO Pulse (After):**

### Java

```java
SdkManager sdkManager = VWOInsights.getSurveySdkManager(context);

Map<String, Object> properties = new HashMap<>();
properties.put("screen", "home");

sdkManager.trackEvent("home_screen_loaded", properties, result -> {
    // Survey interaction completed
    System.out.println("Survey completed with result: " + result);
});
```

### Kotlin

```kotlin
val sdkManager = VWOInsights.getSurveySdkManager(context)

val properties = mapOf("screen" to "home")

sdkManager.trackEvent("home_screen_loaded", properties) { result ->
    // Survey interaction completed
    println("Survey completed with result: $result")
}
```

## Trigger with Activity Reference

For better context when displaying surveys, you can pass an Activity reference:

### Java

```java
SdkManager sdkManager = VWOInsights.getSurveySdkManager(context);
sdkManager.trackEventWithActivity(this, "checkout_screen");
```

### Kotlin

```kotlin
val sdkManager = VWOInsights.getSurveySdkManager(context)
sdkManager.trackEventWithActivity(this, "checkout_screen")
```

## Method Mapping

| Blitzllama                                   | VWO Pulse                                  |
| -------------------------------------------- | ------------------------------------------ |
| `triggerEvent("name")`                       | `trackEvent("name")`                       |
| `triggerEvent("name", properties)`           | `trackEvent("name", properties)`           |
| `triggerEvent("name", properties, listener)` | `trackEvent("name", properties, listener)` |
| N/A                                          | `trackEventWithActivity(activity, "name")` |

***

# Step 5: Update User Attributes

## Setting Email and Name

**Blitzllama (Before):**

```java
BlitzLlamaSDK.getSdkManager(context).setUserEmail("user@example.com");
BlitzLlamaSDK.getSdkManager(context).setUserName("John Doe");
```

**VWO Pulse (After):**

In VWO, use `setAttribute()` to set user email and name:

### Java

```java
Map<String, Object> attributes = new HashMap<>();
attributes.put("user_email", "user@example.com");
attributes.put("user_name", "John Doe");

VWOInsights.setAttribute(attributes);
```

### Kotlin

```kotlin
val attributes = mapOf(
    "user_email" to "user@example.com",
    "user_name" to "John Doe"
)

VWOInsights.setAttribute(attributes)
```

> 📘 **Note:** You don't need to include `user_id` in `setAttribute()` — the SDK automatically uses the current user ID set via initialization or `setUserId()`.

## Setting Custom User Attributes

**Blitzllama (Before):**

```java
// Set individual attributes with data type
BlitzLlamaSDK.getSdkManager(context).setUserAttribute("plan_type", "premium", "string");
BlitzLlamaSDK.getSdkManager(context).setUserAttribute("user_level", "5", "number");
```

**VWO Pulse (After):**

### Java

```java
// Supports different value types (String, Number, Boolean)
Map<String, Object> attributes = new HashMap<>();
attributes.put("plan_type", "premium");
attributes.put("user_level", 5);      // Can use actual number type
attributes.put("is_active", true);    // Can use boolean

VWOInsights.setAttribute(attributes);
```

### Kotlin

```kotlin
val attributes = mapOf(
    "plan_type" to "premium",
    "user_level" to 5,
    "is_active" to true
)

VWOInsights.setAttribute(attributes)
```

> 📘 **Note:** VWO uses `setAttribute()` instead of `setUserAttribute()`. Data types are automatically inferred, so you don't need to specify them explicitly. The SDK automatically associates attributes with the current user ID.

***

# Step 6: Update Survey Language Setting

**Blitzllama (Before):**

```java
BlitzLlamaSDK.getSdkManager(context).setSurveyLanguage("en");
```

**VWO Pulse (After):**

```java
VWOInsights.getSurveySdkManager(context).setSurveyLanguage("en");
```

This API remains largely the same.

***

# Step 7: Handle User Switching

## Blitzllama (Before)

```java
BlitzLlamaSDK.logout();
```

## VWO Pulse (After)

VWO Pulse does **not have a `logout()` method**. Instead, use `setUserId()` to switch between users. To create anonymous sessions (equivalent to logout), pass a random string as the user ID.

### Switching to a New User

Use `setUserId()` when your user logs in or switches accounts:

```java
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;

// When user logs in or switches account
VWOInsights.setUserId("new_user_id", new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(String message) {
        // User switch complete
        // Recording resumes automatically if it was active before
    }

    @Override
    public void vwoInitFailed(String message) {
        // Handle failure
    }
});
```
```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback

// When user logs in or switches account
VWOInsights.setUserId("new_user_id", object : IVwoInitCallback {
    override fun vwoInitSuccess(message: String) {
        // User switch complete
        // Recording resumes automatically if it was active before
    }

    override fun vwoInitFailed(message: String) {
        // Handle failure
    }
})
```

### Switching to Anonymous User (Logout)

If your user logs out and you want to track them as anonymous, generate a random user ID:

**Java:**

```java
import java.util.UUID;

// When user logs out
String randomUserId = UUID.randomUUID().toString();
VWOInsights.setUserId(randomUserId, new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(String message) {
        // Now tracking as anonymous user
    }

    @Override
    public void vwoInitFailed(String message) {
        // Handle failure
    }
});
```

**Kotlin:**

```kotlin
import java.util.UUID

// When user logs out
val randomUserId = UUID.randomUUID().toString()
VWOInsights.setUserId(randomUserId, object : IVwoInitCallback {
    override fun vwoInitSuccess(message: String) {
        // Now tracking as anonymous user
    }

    override fun vwoInitFailed(message: String) {
        // Handle failure
    }
})
```

### Key Differences

| Blitzllama                 | VWO Pulse                                        |
| -------------------------- | ------------------------------------------------ |
| `BlitzLlamaSDK.logout()`   | No direct logout method                          |
| N/A                        | `VWOInsights.setUserId(userId, callback)`        |
| Logout clears session      | Use random string for anonymous tracking         |
| Requires re-initialization | `setUserId()` handles session refresh internally |

> 📘 **Note:** `setUserId()` automatically stops the current session, refreshes configuration, and resumes recording if it was active before the switch.

***

# Step 8: Update Event/Trigger Names in VWO Dashboard

If you're using triggers configured in the Blitzllama dashboard, you may need to recreate them in the VWO dashboard:

1. Log in to your VWO dashboard
2. Navigate to **Data360 → Events → Create**
3. Create events with the same names you used as trigger names in Blitzllama
4. Configure these events in **Surveys → Custom Triggers**

> ⚠️ **Important:** Ensure event names match exactly between your code and the VWO dashboard.

***

# Import Statement Changes

Update all your import statements:

| Blitzllama Import                                            | VWO Pulse Import                            |
| ------------------------------------------------------------ | ------------------------------------------- |
| `com.blitzllama.androidSDK.*`                                | `com.vwo.insights.*`                        |
| `com.blitzllama.androidSDK.BlitzLlamaSDK`                    | `com.vwo.insights.VWOInsights`              |
| `com.blitzllama.androidSDK.SdkInitialisationSuccessCallback` | `com.vwo.insights.exposed.IVwoInitCallback` |

***

# Complete Migration Example

## Before (Blitzllama)

```kotlin
// MyApplication.kt
class MyApplication : BlitzLlamaSDK() {
    override fun onCreate() {
        super.onCreate()
        BlitzLlamaSDK.init(this)
    }
}

// MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Create user
        BlitzLlamaSDK.getSdkManager(this).createUser("user_123")
        
        // Set attributes
        BlitzLlamaSDK.getSdkManager(this).setUserEmail("user@example.com")
        BlitzLlamaSDK.getSdkManager(this).setUserAttribute("plan", "premium", "string")
        BlitzLlamaSDK.getSdkManager(this).setSurveyLanguage("en")
        
        // Trigger survey
        BlitzLlamaSDK.getSdkManager(this).triggerEvent("home_screen_loaded")
    }
}
```

## After (VWO Pulse)

```kotlin
// MyApplication.kt
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration

class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        
        val clientConfig = ClientConfiguration(
            "your_account_id",
            "your_sdk_key",
            "user_123"  // User ID now here
        )
        
        val callback = object : IVwoInitCallback {
            override fun vwoInitSuccess(message: String) {
                // SDK ready
            }
            override fun vwoInitFailed(message: String) {
                // Handle failure
            }
        }
        
        VWOInsights.init(this, callback, clientConfig)
    }
}

// MainActivity.kt
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // SDK must be initialized before calling these methods
        val sdkManager = VWOInsights.getSurveySdkManager(this)
        
        // Set attributes (including email and name)
        VWOInsights.setAttribute(mapOf(
            "user_email" to "user@example.com",
            "user_name" to "John Doe",
            "plan" to "premium"
        ))
        sdkManager.setSurveyLanguage("en")
        
        // Trigger survey
        sdkManager.trackEvent("home_screen_loaded")
    }
}
```

***

# Troubleshooting

## Survey not showing after migration?

1. **Verify initialization**: Ensure `vwoInitSuccess` callback is received before triggering surveys
2. **Check event names**: Event names must match exactly with VWO dashboard configuration
3. **Verify credentials**: Confirm Account ID and SDK Key are correct from VWO dashboard

## Race condition on first screen?

Use the `vwoInitSuccess` callback to trigger surveys:

```kotlin
val callback = object : IVwoInitCallback {
    override fun vwoInitSuccess(message: String) {
        // Safe to trigger survey here
        VWOInsights.getSurveySdkManager(context).trackEvent("app_launched")
    }
    override fun vwoInitFailed(message: String) { }
}
```

***

# Migration Checklist

* [ ] Updated `build.gradle` dependency from Blitzllama to VWO Pulse
* [ ] Removed Blitzllama meta-data from `AndroidManifest.xml`
* [ ] Updated Application class initialization
* [ ] Replaced `createUser()` with `setUserId()` for user identification
* [ ] Changed `triggerEvent()` calls to `trackEvent()`
* [ ] Updated `setUserAttribute()` to `setAttribute()`
* [ ] Updated import statements
* [ ] Configured events in VWO dashboard
* [ ] Tested survey triggering in the app

***

# Version Information

| Component                               | Version          |
| --------------------------------------- | ---------------- |
| VWO Pulse SDK Version                   | `2.2.0`          |
| Minimum Android SDK                     | 21 (Android 5.0) |
| Blitzllama SDK Version (migrating from) | `1.9.1`          |
