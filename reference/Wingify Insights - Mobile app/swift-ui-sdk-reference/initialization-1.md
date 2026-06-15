---
title: Initialization
deprecated: false
hidden: false
metadata:
  robots: index
---
After installing the SDK, initialize Wingify Insights in your AppDelegate file by following the steps below:

<br />

**Step 1: Import the SDK**

```swift
import Wingify_Insights
```

<br />

**Step 2: Initialize the SDK**

```swift
func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
) -> Bool {

    Wingify.configure(
        accountId: "<YOUR_ACCOUNT_ID>",
        sdkKey: "<YOUR_SDK_KEY>",
        isSwiftUI: true, // Set to true if your app is fully built with SwiftUI
        userId: "<USER_ID>" // Optional: Pass a unique identifier if available
    ) { result in
        switch result {
        case .success(_):
            print("Wingify launched successfully")
            Wingify.startSessionRecording()
        case .failure(let error):
            print("Wingify launch failed: \(error)")
        }
    }

    return true
}
```

<br />

**Parameter Notes**

* **isSwiftUI →** Set this to true if your app supports SwiftUI.
* **userId →** Optional parameter; use it if you have a logged-in user or unique identifier.

<br />
