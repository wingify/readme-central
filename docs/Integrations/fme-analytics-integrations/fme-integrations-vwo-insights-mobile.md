---
title: Wingify Insights Mobile
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

This guide outlines the integration process for the **[Wingify Feature Experimentation(FE) SDK](https://developers.wingify.com/v2/docs/fme-overview) and [Wingify Insights Mobile SDK](https://developers.wingify.com/reference/mobile-insights-introduction)** to ensure seamless session data synchronization.

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
private fun getSessionCallback(): IVwoSessionCallback {
    return IVwoSessionCallback { sessionData ->
        FMEConfig.setSessionData(sessionData)
    }
}
```
```swift
func vwoScreenCaptureSessionDidUpdate(sessionData: [String : Any]) {
    FmeConfig.setSessionData(sessionData)
}
```

* **USER\_ID** is mandatory to link both SDKs and ensure session continuity by passing the session callback.

```kotlin
val sessionCallback = getSessionCallback()

VWOInsights.linkFME(sessionCallback, USER_ID)
```
```swift
VWO.linkFme(sessionCallback: self, userId: "")
```

* **Initialize the Wingify Insights Mobile SDK first**, as it handles session recording and tracking.
* **Wait for a successful initialization callback** from Wingify Insights before starting the **Wingify FE SDK** to avoid misalignment in session data.
* **Start session recording before initializing the Wingify FE SDK** to ensure all interactions are captured correctly.

## Step 1: Configure and Initialize the Wingify Insights Mobile SDK

```kotlin
classApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        initVWOInsights()
    }

    private fun initVWOInsights() {
        val config = ClientConfiguration(ACCOUNT_ID, SDK_KEY, null)

        /* Below two lines are extra code needed to link both the SDKs.*/

        // SessionCallback to revalidate sessions
        val sessionCallback = getSessionCallback()
        // USER_ID is mandatory to link between both the SDKs
       Insights.linkFME(sessionCallback, USER_ID)

        // Initialize Wingify Insights Mobile SDK
       Insights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(message: String) {
							  // Mobile Insights SDK initializated successfully
               Insights.startSessionRecording()

                // Init Wingify FE SDK
                initVWOFME()
            }

            override fun vwoInitFailed(message: String) {
               Log.i(VWOLog.INITIALIZATION_LOGS, "vwoInitFailed: $message", false)
            }
        }, config)
    }
}
```
```swift
import_FME
import_Insights

@main
class AppDelegate: UIResponder, UIApplicationDelegate,SessionCallback {
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        self.initMiSDK()
        return true
    }

    func initMiSDK() {
				// SessionCallback to revalidate sessions and userId is mandatory
       .linkFme(sessionCallback: self, userId: "")

       .configure(accountId: "", sdkKey: "", userId: "", completion: { result in
            switch result {
            case .success(_):
                // Mobile Insights SDK initializated successfully
               .startSessionRecording()

                // Init Wingify FE SDK
                self.initVWOFME()
            case .failure(_):
                print("Wingify Insights initialization failed")
            }
        })
    }
}
```

## Step 2: Initialize the Wingify FE SDK

```kotlin
private fun initVWOFME() {
    val wingifyInitOptions =InitOptions()
    wingifyInitOptions.sdkKey = FME_SDK_KEY
    wingifyInitOptions.accountId = WINGIFY_ACCOUNT_ID
    wingifyInitOptions.context = this@VWOApplication.applicationContext

   .init(wingifyInitOptions, object : com.vwo.interfaces.IVwoInitCallback {
        override fun vwoInitSuccess(wingifyClient:, message: String) {
            // use wingifyClient to invoke Wingify FE SDK APIs
        }

        override fun vwoInitFailed(message: String) {
            Log.i("VWOSession", "SessionId Uuid FE Init failed: $message")
        }
    })
}
```
```swift
private fun initVWOFME() {
    val wingifyInitOptions =InitOptions()

    wingifyInitOptions.sdkKey = FME_SDK_KEY
    wingifyInitOptions.accountId = WINGIFY_ACCOUNT_ID
    wingifyInitOptions.context = this@VWOApplication.applicationContext

   .init(wingifyInitOptions, object : com.vwo.interfaces.IVwoInitCallback {
        override fun vwoInitSuccess(wingifyClient:, message: String) {
            // use wingifyClient to invoke Wingify FE SDK APIs
        }

        override fun vwoInitFailed(message: String) {
            Log.i("VWOSession", "SessionId Uuid FE Init failed: $message")
        }
    })
}
```

## Step 3: Implement Session Callback

```kotlin
private fun getSessionCallback(): IVwoSessionCallback {
    return IVwoSessionCallback { sessionDetails ->
        // Pass the received session data to the FE SDK for session validation
        FMEConfig.setSessionData(sessionDetails)
    }
}
```
```swift
func vwoScreenCaptureSessionDidUpdate(sessionDetails: [String : Any]) {
    // Pass the received session data to the FE SDK for session validation
    FmeConfig.setSessionData(sessionDetails)
}
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant App as Application / AppDelegate Class
    participant Wingify as Wingify Insights Mobile SDK
    participant FE as Wingify FE SDK

    App->>Wingify:Insights.linkFME(sessionCallback, USER_ID)
    App->>Wingify:.configure(accountId, sdkKey, userId, callback)
   -->>App: IVwoSessionCallback()
    App->>FE: FMEConfig.setSessionData(sessionMap)
   -->>App: vwoInitSuccess()
    App->>Wingify:Insights.startSessionRecording()
    App->>FE: initVWOFME()
    FE-->>App: FE SDK initialised successfully

```

<br />

# Summary

This document outlines integrating the **Wingify Insights Mobile SDK** and **Wingify FE SDK** in both **Android** and **iOS** applications. Developers can ensure accurate tracking and analysis for experiments and feature rollouts by linking the session data between both SDKs.
