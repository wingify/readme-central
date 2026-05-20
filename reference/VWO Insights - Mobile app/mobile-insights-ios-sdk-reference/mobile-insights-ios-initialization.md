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

_func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)_

```swift
// If your app is purely written in SwiftUI only, then feel free to pass isSwiftUI as true in the function below - eg. VWO.configure(accountId: "", sdkKey: "", userId: "", isSwiftUI: true)

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
        VWO Account ID
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
