---
title: Installation
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
The latest SDK version for IOS is **2.6.1** and you can view the changelog [here](https://github.com/wingify/wingify-mobile-insights-ios-artifacts/blob/main/CHANGELOG.md?plain=1).

<br />

Using _**Swift Package Manager (SPM)**_

**Step 1** - If the integration is being made with SPM (Swift Package Manager), please integrate Wingify with the following:

URL: [https://github.com/wingify/wingify-mobile-insights-ios-artifacts.git](https://github.com/wingify/wingify-mobile-insights-ios-artifacts.git)

<br />

<Image align="center" src="https://files.readme.io/b9be778-Screenshot_2024-03-08_at_10.28.31_AM.png" />

<br />

Using _**CocoaPods**_

**Step 1** - You can use CocoaPods to install the Wingify Insights IOS SDK by adding the below pods to your Pod file.

```swift

pod 'Wingify-Insights' 

```

Run the `pod install` command.

<br />

<br />

> 📘 NOTE - SDK version starting from _v0.4.13_ and beyond, it is no longer necessary to include the _WingifyPrincipleClass_ entry in the _Info.plist_ file.
>
> This change simplifies the setup process and eliminates the need for this manual configuration. Please ensure you're using the latest version of the SDK for the best experience.
