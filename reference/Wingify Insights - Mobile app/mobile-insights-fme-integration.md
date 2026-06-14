---
title: Integrating with Wingify FE SDK
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
# Introduction

This guide outlines the integration process for the **[Wingify Insights Mobile SDK](https://developers.wingify.com/reference/mobile-insights-introduction) and [Wingify Feature Experimentation(FE) SDK](https://developers.wingify.com/v2/docs/fme-overview)** to ensure seamless session data synchronization.

With this integration, customers can **link session data** between Wingify Insights Mobile SDK and Wingify FE SDK, enabling **post-segmentation of session data** based on various attributes. This empowers them to analyze user behavior more effectively, identify friction points, and optimize user experiences with precise insights.

Benefits of Integrating Both SDKs:

* Seamlessly link user sessions between Wingify Insights Mobile SDK and Wingify FE SDK.
* Post-segment session data based on specific attributes or flags.
* Ensure session consistency when sessions are renewed in the Wingify Insights Mobile SDK.
* Enhance tracking, analysis, and insights across both platforms.

# Prerequisites

Before integrating, ensure the following:

* You have access to the latest versions of both SDKs.
* You have already added **Wingify Insights Mobile SDK** and **Wingify FE SDK** separately in your application.
* You have your **Wingify Insights Mobile SDK API key** and **Wingify FE SDK credentials** along with the **AccountId** and unique **USER\_ID**

## Integration

While integrating both SDKs, ensure the following:

* Implement the **Session Callback** as shown and pass the received session data to the **Wingify FE SDK** for session validation.

```kotlin
private fun getSessionCallback(): IWingifySessionCallback {
    return IWingifySessionCallback { sessionData ->
        FMEConfig.setSessionData(sessionData)
    }
}
```
```swift
func wingifyScreenCaptureSessionDidUpdate(sessionData: [String : Any]) {
    FmeConfig.setSessionData(sessionData)
}
```

* **USER\_ID** is mandatory to link both SDKs and ensure session continuity by passing the session callback.

```kotlin
val sessionCallback = getSessionCallback()

WingifyInsights.linkFME(sessionCallback, USER_ID)
```
```swift
Wingify.linkFme(sessionCallback: self, userId: "")
```

* **Initialize the Wingify Insights Mobile SDK first**, as it handles session recording and tracking.
* **Wait for a successful initialization callback** from Wingify Insights before starting the **Wingify FE SDK** to avoid misalignment in session data.
* **Start session recording before initializing the Wingify FE SDK** to ensure all interactions are captured correctly.

## Step 1: Configure and Initialize the Wingify Insights Mobile SDK

```kotlin
class WingifyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        initWingifyInsights()
    }

    private fun initWingifyInsights() {
        val config = ClientConfiguration(ACCOUNT_ID, SDK_KEY, null)

        /* Below two lines are extra code needed to link both the SDKs.*/

        // SessionCallback to revalidate sessions
        val sessionCallback = getSessionCallback()
        // USER_ID is mandatory to link between both the SDKs
        WingifyInsights.linkFME(sessionCallback, USER_ID)

        // Initialize Wingify Insights Mobile SDK
        WingifyInsights.init(this, object : IWingifyInitCallback {
            override fun wingifyInitSuccess(message: String) {
							  // Wingify Mobile Insights SDK initializated successfully
                WingifyInsights.startSessionRecording()

                // Init Wingify FE SDK
                initWingifyFME()
            }

            override fun wingifyInitFailed(message: String) {
                WingifyLog.i(WingifyLog.INITIALIZATION_LOGS, "wingifyInitFailed: $message", false)
            }
        }, config)
    }
}
```
```swift
import Wingify_FME
import Wingify_Insights

@main
class AppDelegate: UIResponder, UIApplicationDelegate, WingifySessionCallback {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.initMiSDK()
        return true
    }

    func initMiSDK() {
				// SessionCallback to revalidate sessions and userId is mandatory
        Wingify.linkFme(sessionCallback: self, userId: "")

        Wingify.configure(accountId: "", sdkKey: "", userId: "", completion: { result in
            switch result {
            case .success(_):
                // Wingify Mobile Insights SDK initializated successfully
                Wingify.startSessionRecording()

                // Init Wingify FE SDK
                self.initWingifyFME()
            case .failure(_):
                print("Wingify Insights initialization failed")
            }
        })
    }
}
```

## Step 2: Initialize the Wingify FE SDK

```kotlin
private fun initWingifyFME() {
    val wingifyInitOptions = WingifyInitOptions()
    wingifyInitOptions.sdkKey = FME_SDK_KEY
    wingifyInitOptions.accountId = Wingify_ACCOUNT_ID
    wingifyInitOptions.context = this@WingifyApplication.applicationContext

    Wingify.init(wingifyInitOptions, object : com.wingify.interfaces.IWingifyInitCallback {
        override fun wingifyInitSuccess(wingifyClient: Wingify, message: String) {
            // use wingifyClient to invoke Wingify FE SDK APIs
        }

        override fun wingifyInitFailed(message: String) {
            Log.i("WingifySession", "SessionId Uuid FE Init failed: $message")
        }
    })
}
```
```swift
private fun initWingifyFME() {
    val wingifyInitOptions = WingifyInitOptions()

    wingifyInitOptions.sdkKey = FME_SDK_KEY
    wingifyInitOptions.accountId = Wingify_ACCOUNT_ID
    wingifyInitOptions.context = this@WingifyApplication.applicationContext

    Wingify.init(wingifyInitOptions, object : com.wingify.interfaces.IWingifyInitCallback {
        override fun wingifyInitSuccess(wingifyClient: Wingify, message: String) {
            // use wingifyClient to invoke Wingify FE SDK APIs
        }

        override fun wingifyInitFailed(message: String) {
            Log.i("WingifySession", "SessionId Uuid FE Init failed: $message")
        }
    })
}
```

## Step 3: Implement Session Callback

```kotlin
private fun getSessionCallback(): IWingifySessionCallback {
    return IWingifySessionCallback { sessionDetails ->
        // Pass the received session data to the FE SDK for session validation
        FMEConfig.setSessionData(sessionDetails)
    }
}
```
```swift
func wingifyScreenCaptureSessionDidUpdate(sessionDetails: [String : Any]) {
    // Pass the received session data to the FE SDK for session validation
    FmeConfig.setSessionData(sessionDetails)
}
```

## Sequence Diagram

<Image align="center" src="https://files.readme.io/9934d795f79209e4d2c39261460b85ffe673cf8fdb50040514cba8af13f280ad-Screenshot_2025-04-03_at_1.21.19_PM.png" />

# Summary

This document outlines integrating the **Wingify Insights Mobile SDK** and **Wingify FE SDK** in both **Android** and **iOS** applications. Developers can ensure accurate tracking and analysis for experiments and feature rollouts by linking the session data between both SDKs.
