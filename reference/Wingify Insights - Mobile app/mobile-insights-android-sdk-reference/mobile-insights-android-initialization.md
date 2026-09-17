---
title: Initialization
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
After installing the SDK, initialize the app in the _onCreate_ function of the Application class.

## Parameters

| Key                                      | Description                    |
| :--------------------------------------- | :----------------------------- |
| **ACCOUNT_ID**<br />_Required_           | Wingify Account ID             |
| **SDK_KEY**<br />_Required_              | SDK key                        |
| **USER_ID**<br />_Optional_              | Unique identifier for the user |
| **IWingifyInitCallback**<br />_Optional_ | SDK Initialization callback    |

### Example

```java
package com.wingify.screenshotsample

import android.app.Application
import com.wingify.insights.WingifyInsights
import com.wingify.insights.core.models.ClientConfiguration
import com.wingify.insights.exposed.IWingifyInitCallback

class WingifyApplication : Application() {

    override fun onCreate() {
        super.onCreate()


        ClientConfiguration configuration = new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID");
        WingifyInsights.init(this, new IWingifyInitCallback() { 
                @Override  
                public void wingifyInitSuccess(@NonNull String s) {
                     // Insights SDK Initialized successfully 
                }
     
                @Override
                public void wingifyInitFailed(@NonNull String s) {
                     // Insights SDK NOT Initialized successfully
                }
         }, configuration, null);
    
    }
}
```
```kotlin
package com.wingify.screenshotsample

import android.app.Application
import com.wingify.insights.WingifyInsights
import com.wingify.insights.core.models.ClientConfiguration
import com.wingify.insights.exposed.IWingifyInitCallback

class WingifyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        val configuration = ClientConfiguration("ACCOUNT_ID","APPLICATION_ID", "USER_ID")

        WingifyInsights.init(this, object : IWingifyInitCallback {
              override fun wingifyInitSuccess(message: String) {  
                    // Insights SDK Initialized successfully 
              }


              override fun wingifyInitFailed(message: String) {
                    // Insights SDK NOT Initialized successfully
              }

        }, configuration)
    }

}
```

## Enable Performance Mode

From SDK version 2.6.0+, Mobile Insights provides an optional performance mode that uses a highly optimized recording mechanism for Android native apps.

Call `enablePerformanceMode()` before `init()`, typically in your `Application.onCreate()`.

> **Scope:** Android native (including Jetpack Compose) only.<br />Flutter apps should use `enableFlutterPerformanceMode()` instead.

***

### API level

| Requirement                | Value                                       |
| -------------------------- | ------------------------------------------- |
| Minimum for optimized path | Android 8.0 (API 26).                       |
| Call on API \< 26          | Safe — SDK uses the standard recording path |

***

### Guidelines

- Enable performance mode if you want the optimized recording path introduced in 2.6.0+.
- Always call it before SDK initialization.
- If you observe unexpected behavior after enabling it, remove the call and verify again.

***

### Example

```java
package com.example.myapp;

import android.app.Application;
import androidx.annotation.NonNull;
import com.wingify.insights.WingifyInsights;
import com.wingify.insights.exposed.IWingifyInitCallback;
import com.wingify.insights.exposed.models.ClientConfiguration;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // From SDK version 2.6.0+ we have introduced a new highly optimized recording
        // mechanism. You can enable it using WingifyInsights.enablePerformanceMode();
        // Call this before init(). Takes effect on Android 8.0 (API 26) and above.
        WingifyInsights.enablePerformanceMode(); // Android 8.0 (API 26)+

        ClientConfiguration configuration =
                new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID");

        WingifyInsights.init(this, new IWingifyInitCallback() {
            @Override
            public void wingifyInitSuccess(@NonNull String message) {
                // Insights SDK initialized successfully
            }

            @Override
            public void wingifyInitFailed(@NonNull String message) {
                // Insights SDK failed to initialize
            }
        }, configuration);
    }
}
```
```kotlin
package com.example.myapp

import android.app.Application
import com.wingify.insights.WingifyInsights
import com.wingify.insights.exposed.IWingifyInitCallback
import com.wingify.insights.exposed.models.ClientConfiguration

class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // From SDK version 2.6.0+ we have introduced a new highly optimized recording
        // mechanism. You can enable it using WingifyInsights.enablePerformanceMode().
        // Call this before init(). Takes effect on Android 8.0 (API 26) and above.
        WingifyInsights.enablePerformanceMode()

        val configuration = ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID")

        WingifyInsights.init(this, object : IWingifyInitCallback {
            override fun wingifyInitSuccess(message: String) {
                // Insights SDK initialized successfully
            }

            override fun wingifyInitFailed(message: String) {
                // Insights SDK failed to initialize
            }
        }, configuration)
    }
}
```

***

### Recommended initialization order

1. `enablePerformanceMode()` (optional)
2. `init(...)`
3. After a successful init callback, start session recording as needed
