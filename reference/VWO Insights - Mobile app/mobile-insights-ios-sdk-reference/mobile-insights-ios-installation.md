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

Using _**Swift Package Manager (SPM)**_

**Step 1** - If the integration is being made with SPM (Swift Package Manager), please integrate VWO with the following:

URL: <https://github.com/wingify/ios-mobile-insights-artifacts.git>

<br />

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b9be778-Screenshot_2024-03-08_at_10.28.31_AM.png",
        "Screenshot 2023-02-27 at 8.05.00 PM.png",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


<br />

Using **_CocoaPods_**

**Step 1** - You can use CocoaPods to install the VWO Insights IOS SDK by adding the below pods to your Pod file.

```swift

pod 'VWO-Insights' 

```

Run the `pod install` command.

<br />

<br />

> 📘 NOTE - SDK version starting from _v0.4.13 _ and beyond, it is no longer necessary to include the _VWOPrincipleClass_ entry in the _Info.plist_ file.
> 
> This change simplifies the setup process and eliminates the need for this manual configuration. Please ensure you're using the latest version of the SDK for the best experience.