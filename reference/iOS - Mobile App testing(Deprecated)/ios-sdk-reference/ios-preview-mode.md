---
title: Preview Mode
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
The Preview mode is helpful when you make changes to your app code for a campaign. It is used to verify that a campaign is set up correctly.

### Enabling the Preview Mode

The Preview mode is automatically enabled when the application is running on simulator or if a test device is connected to Xcode. The Preview mode can also be enabled by **tapping with 5 fingers for 2 seconds** while the application is open. The Preview button appears in the Variations and Goals steps of campaign creation.\
As you can have multiple apps added to your account, make sure to select the app which you want to A/B test.

### Disabling the Preview Mode

You can disable the Preview mode from `VWOConfig`, and then pass that config during the SDK launch.

```objectivec
VWOConfig *config = [VWOConfig new];
config.disablePreview = YES;

[VWO launchForAPIKey:@"api_key" config:config completion:^{
    //completion code
} failure:^(NSString * _Nonnull error) {
    //error code
}];
```
```swift
let config = VWOConfig()
config.disablePreview = true

VWO.launch(apiKey: "api_key", config: config, completion: {
    //Completion code
}) { (errorString) in
    //Error code
}
```

> 📘 Skip socket library
>
> The Preview functionality is socket based, and the socket library is installed by default. While releasing, you can skip the socket library by adding pod `VWO/Core` to Podfile.
