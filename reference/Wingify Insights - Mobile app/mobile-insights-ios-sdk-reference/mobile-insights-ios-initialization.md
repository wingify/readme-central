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

`Import Wingify_Insights`

After, add the following Initialization code inside the function ->

_func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)_

```swift
// From SDK version 2.2.0 and above, If your app is purely and fully written in SwiftUI, then feel free to pass isSwiftUI as true in the function below - 
//eg. Wingify.configure(accountId: "", sdkKey: "", userId: "", isSwiftUI: true)

Wingify.configure(accountId: "", sdkKey: "", userId: ""){ result in // where accountID and sdkKey are provided on the Wingify account
      switch result{
      case .success(_):
        print("Wingify launched successfull")
        Wingify.startSessionRecording() // For starting recording
      case .failure(let error):
        print("Wingify launched failed \(error)")
      }
   }					
```

## Parameters

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Key
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **ACCOUNT_ID** _Required_
      </td>

      <td>
        Wingify Account ID
      </td>
    </tr>

    <tr>
      <td>
        **SDK_KEY**  
        _Required_
      </td>

      <td>
        SDK Key
      </td>
    </tr>

    <tr>
      <td>
        **USER_ID**  
        _Optional_
      </td>

      <td>
        Unique identifier for the user
      </td>
    </tr>
  </tbody>
</Table>

An example implementation is for Swift

```swift
import UIKit
import Wingify_Insights


@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        
        Wingify.configure(accountId: "", sdkKey: "", userId: ""){ result in // where accountID and sdkKey are provided on the Wingify account
      switch result{
      case .success(_):
        print("Wingify launched successfull")
        Wingify.startSessionRecording() // For starting recording
      case .failure(let error):
        print("Wingify launched failed \(error)")
      }
   }		
        
        return true
    }
}
```
