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
After installing the SDK, initialize the app inside your _Appdelegate_ file following the below-mentioned steps-

`Import VWO_Insights`

After, add the following Initialization code inside the function ->

_func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: \[UIApplication.LaunchOptionsKey: Any]?)\_

```swift
// From SDK version 2.2.0 and above, If your app is purely and fully written in SwiftUI, then feel free to pass isSwiftUI as true in the function below - 
//eg. VWO.configure(accountId: "", sdkKey: "", userId: "", isSwiftUI: true)

VWO.configure(accountId: "", sdkKey: "", userId: ""){ result in // where accountID and sdkKey are provided on the VWO account
      switch result{
      case .success(_):
        print("VWO launched successfull")
        VWO.startSessionRecording() // For starting recording
      case .failure(let error):
        print("VWO launched failed \(error)")
      }
   }					
```

## Parameters

| Key                          | Description                    |
| :--------------------------- | :----------------------------- |
| **ACCOUNT\_ID** _Required_   | Wingify Account ID             |
| **SDK\_KEY**<br />_Required_ | SDK Key                        |
| **USER\_ID**<br />_Optional_ | Unique identifier for the user |

An example implementation is for Swift

```swift
import UIKit
import VWO_Insights


@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        VWO.configure(accountId: "", sdkKey: "", userId: ""){ result in // where accountID and sdkKey are provided on the VWO account
      switch result{
      case .success(_):
        print("VWO launched successfull")
        VWO.startSessionRecording() // For starting recording
      case .failure(let error):
        print("VWO launched failed \(error)")
      }
   }		
        
        return true
    }
}
```

<br />
