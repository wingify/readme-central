---
title: Adding the Mobile App to Test
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Go to the **Apps** section on the page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/91a3b15-MobileAppAB-1.png",
        "MobileAppAB-1.png",
        1566,
        222,
        "#d4d5da"
      ]
    }
  ]
}
[/block]
On the right side of the screen, click **Create App**.
Type the name of the app you want to add, and then click **Create**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/30b2785-MobileAppAB-1.jpg",
        "MobileAppAB-1.jpg",
        1206,
        511,
        "#f1f3f6"
      ]
    }
  ]
}
[/block]
As you add an app, VWO generates API Keys for both the iOS and Android platforms. You can make a note of the ```API Key``` under the **Settings** section which is used during app initialization.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/53f3009-MobileAppAB-2.jpg",
        "MobileAppAB-2.jpg",
        1894,
        1292,
        "#d0d2d6"
      ]
    }
  ]
}
[/block]
##   Installing the SDK
**For iOS App**
You can use Cocoapods to install the VWO iOS SDK.
For Cocoapod installation, add the ```VWO ``` pod to your Pod file. 
Run the ```pod install ``` command. Click [here](https://developers.vwo.com/reference#ios-sdk-installation) for detailed installation instructions.

##  Initializing the SDK
**For iOS App**
After installing the SDK, you can initialize the app in the ```AppDelegate``` file by using the ```didFinishLaunchingWithOptions``` method.
Import VWO, and then call the ```launchForAPIKey``` method by using your App Key.
Click [here](https://developers.vwo.com/reference#ios-launching-sdk) for detailed instructions.