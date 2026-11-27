---
title: Manual Screen Set
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
Use `setScreenViewed` to report a screen viewed or screen change event with a custom screen name. This page uses the **VWO** (`VWOInsights`) APIs for existing VWO integrations.

Automatic Activity-based screen detection remains unchanged. Call this API when the SDK cannot infer the logical screen from Activity transitions alone.

<br />

## When to use

Call `setScreenViewed` when:

* You navigate between multiple logical screens inside the **same Activity** (for example Fragments or Jetpack Compose Navigation).
* You use a **single-Activity** app and need each destination reported as its own screen.
* You want a **custom screen name** instead of the Activity class name.

You typically do **not** need this API for simple multi-Activity apps where each screen is a separate Activity—the SDK already records those transitions automatically.

Trigger the call when the screen becomes active (for example in `onResume()` for Fragments/Activities, or when the Compose destination changes).

<br />

## Usage

**Method:** `VWOInsights.setScreenViewed(String screenName)`

```java
// For Fragments or Activities, call this in onResume()
VWOInsights.setScreenViewed("CheckoutScreen");
```
```kotlin
// For Fragments or Activities, call this in onResume()
VWOInsights.setScreenViewed("CheckoutScreen")
```

<br />

## Jetpack Compose

In a single-Activity Compose app, call `setScreenViewed` whenever the active destination changes.

```kotlin
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import com.vwo.insights.VWOInsights

@Composable
fun AppNavHost(currentScreen: String) {
    LaunchedEffect(currentScreen) {
        VWOInsights.setScreenViewed(currentScreen)
    }
}
```

> **Note:** The screen name you set here is also used for screen masking rules.