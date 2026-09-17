---
title: Performance Mode
deprecated: false
hidden: true
metadata:
  robots: index
---
From SDK version 2.6.0+, Mobile Insights provides an optional performance mode that uses a highly optimized recording mechanism for Android native apps.

Call `enablePerformanceMode()` before `init()`, typically in your `Application.onCreate()`.

> **Scope:** Android native (including Jetpack Compose) only.<br />Flutter apps should use `enableFlutterPerformanceMode()` instead — see the Flutter SDK documentation.

***

## API level

| Requirement                | Value                                       |
| -------------------------- | ------------------------------------------- |
| Minimum for optimized path | Android 8.0 (API 26).                       |
| Call on API \< 26          | Safe — SDK uses the standard recording path |

***

## Guidelines

- Enable performance mode if you want the optimized recording path introduced in 2.6.0+.
- Always call it before SDK initialization.
- If you observe unexpected behavior after enabling it, remove the call and verify again.

***

> **Brand**: Mobile Insights is offered under two brands — VWO (VWOInsights / com.vwo:insights) and Wingify (WingifyInsights / com.wingify:insights). Use only one brand in your app; do not mix VWO and Wingify APIs or dependencies.

## VWO brand

**For dependency:** `com.vwo:insights:<version>`<br />**Entry point:** `VWOInsights`

### Example

```kotlin
package com.example.myapp

import android.app.Application
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration

class MyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        // From SDK version 2.6.0+ we have introduced a new highly optimized recording
        // mechanism. You can enable it using VWOInsights.enablePerformanceMode().
        // Call this before init(). Takes effect on Android 8.0 (API 26) and above.
        VWOInsights.enablePerformanceMode()

        val configuration = ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID")

        VWOInsights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(message: String) {
                // Insights SDK initialized successfully
            }

            override fun vwoInitFailed(message: String) {
                // Insights SDK failed to initialize
            }
        }, configuration)
    }
}
```
```java
package com.example.myapp;

import android.app.Application;
import androidx.annotation.NonNull;
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;
import com.vwo.insights.exposed.models.ClientConfiguration;

public class MyApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // From SDK version 2.6.0+ we have introduced a new highly optimized recording
        // mechanism. You can enable it using VWOInsights.enablePerformanceMode();
        // Call this before init(). Takes effect on Android 8.0 (API 26) and above.
        VWOInsights.enablePerformanceMode(); // Android 8.0 (API 26)+

        ClientConfiguration configuration =
                new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID");

        VWOInsights.init(this, new IVwoInitCallback() {
            @Override
            public void vwoInitSuccess(@NonNull String message) {
                // Insights SDK initialized successfully
            }

            @Override
            public void vwoInitFailed(@NonNull String message) {
                // Insights SDK failed to initialize
            }
        }, configuration);
    }
}
```

***

## Wingify brand

**For dependency:** `com.wingify:insights:<version>`<br />**Entry point:** `WingifyInsights`

### Example

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

***

## Recommended initialization order

1. `enablePerformanceMode()` (optional)
2. `init(...)`
3. After a successful init callback, start session recording as needed