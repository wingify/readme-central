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

## CocoaPods Installation

To integrate your mobile application by using CocoaPods, first create a **Podfile**.\
If you are new to CocoaPods, refer to the CocoaPods [instruction guide](https://guides.cocoapods.org/using/getting-started.html).

**1.** Add the following line to the **Podfile**.

```text Podfile
target 'Your App' do
     pod 'VWO'
 end
```

**2.** Run the following command.

```shell
pod install
```

`pod install` installs the SDK on your project.

## VWO/Core

To reduce the size of SDK, `pod 'VWO/Core'` can be added to the Podfile.\
This will make sure that all extra code is required only while development; therefore, it is not shipped with the app.

## Source Code

The VWO iOS SDK code is available on GitHub:\
[https://github.com/wingify/vwo-ios-sdk](https://github.com/wingify/vwo-ios-sdk)
