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
The latest SDK version for IOS is **v1.0.5** and you can view the changelog [here](https://github.com/wingify/ios-mobile-insights-artifacts/blob/main/CHANGELOG.md?plain=1). 

<br />

Using ***Swift Package Manager (SPM)***

**Step 1** - If the integration is being made with SPM (Swift Package Manager), please integrate VWO with the following:

URL: [https://github.com/wingify/ios-mobile-insights-artifacts.git](https://github.com/wingify/ios-mobile-insights-artifacts.git)

<br />

<Image align="center" src="https://files.readme.io/b9be778-Screenshot_2024-03-08_at_10.28.31_AM.png" />

<br />

Using ***CocoaPods***

**Step 1** - You can use CocoaPods to install the VWO Insights IOS SDK by adding the below pods to your Pod file.

```swift

pod 'VWO-Insights' 

```

Run the `pod install` command.

<br />

<br />

> 📘 NOTE - SDK version starting from *v0.4.13* and beyond, it is no longer necessary to include the *VWOPrincipleClass* entry in the *Info.plist* file.
>
> This change simplifies the setup process and eliminates the need for this manual configuration. Please ensure you're using the latest version of the SDK for the best experience.
