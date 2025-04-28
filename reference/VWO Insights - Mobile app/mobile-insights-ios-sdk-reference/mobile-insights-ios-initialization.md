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

_func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)\_ 

```swift
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

[block:parameters]
{
  "data": {
    "h-0": "Key",
    "h-1": "Description",
    "0-0": "**ACCOUNT_ID**  \n_Required_",
    "0-1": "VWO Account ID",
    "1-0": "**SDK_KEY**  \n_Required_",
    "1-1": "SDK Key",
    "2-0": "**USER_ID**  \n_Optional_",
    "2-1": "Unique identifier for the user"
  },
  "cols": 2,
  "rows": 3,
  "align": [
    "left",
    "left"
  ]
}
[/block]


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