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
import VWO_Insights
 
 
@main
class AppDelegate: UIResponder, UIApplicationDelegate {
     
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
         // Please make sure you pass isFlutter as true in config parameters from SDK version 2.2.0 and onwards
    VWO.configure(accountId: "", sdkKey: "", userId: "", isFlutter: true){ result in // where accountID and sdkKey are provided on the Wingify account
     		 switch result{
		     case .success(_):
    	 			print("VWO launched successfull")
		        VWO.startSessionRecording() // For starting recording, If you are using dart implementation to start stop recordings, Please do not call VWO.startSessionRecording() from here
		     case .failure(let error):
        		print("VWO launched failed \(error)")
		      }
		   }	
       return true
    }
}
```

<br />
