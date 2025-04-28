---
title: SDK Installation
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
The iOS SDK can be installed by using CocoaPods.
[block:api-header]
{
  "title": "CocoaPods Installation"
}
[/block]
To integrate your mobile application by using CocoaPods, first create a **Podfile**. 
If you are new to CocoaPods, refer to the CocoaPods [instruction guide](https://guides.cocoapods.org/using/getting-started.html).

**1.** Add the following line to the **Podfile**.

[block:code]
{
  "codes": [
    {
      "code": " target 'Your App' do\n     pod 'VWO'\n end",
      "language": "text",
      "name": "Podfile"
    }
  ]
}
[/block]
**2.** Run the following command.

[block:code]
{
  "codes": [
    {
      "code": "pod install",
      "language": "shell"
    }
  ]
}
[/block]
``` pod install ``` installs the SDK on your project.
[block:api-header]
{
  "title": "VWO/Core"
}
[/block]
To reduce the size of SDK, ```pod 'VWO/Core'``` can be added to the Podfile.
This will make sure that all extra code is required only while development; therefore, it is not shipped with the app.
[block:api-header]
{
  "title": "Source Code"
}
[/block]
The VWO iOS SDK code is available on GitHub:
https://github.com/wingify/vwo-ios-sdk