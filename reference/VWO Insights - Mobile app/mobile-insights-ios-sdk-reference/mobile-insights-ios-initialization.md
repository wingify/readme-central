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
After installing the SDK, initialize the app inside your *Appdelegate* file following the below-mentioned steps-

`Import VWO_Insights`

After, add the following Initialization code inside the function -> 

*func application(* application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?)\_ 

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
        **ACCOUNT\_ID**
        *Required*
      </td>

      <td>
        VWO Account ID
      </td>
    </tr>

    <tr>
      <td>
        **SDK\_KEY**\
        *Required*
      </td>

      <td>
        SDK Key
      </td>
    </tr>

    <tr>
      <td>
        **USER\_ID**\
        *Optional*
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
