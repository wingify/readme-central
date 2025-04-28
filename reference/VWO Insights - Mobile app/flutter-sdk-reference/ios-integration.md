---
title: IOS Integration
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
## Initialize the SDK

After installing the SDK, initialize the app inside your Appdelegate file following the below-mentioned steps.

<br />

```swift
import UIKit
import VWO_Insights_ios_flutter_sdk
 
 
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
