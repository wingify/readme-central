---
title: Launch Configuration
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
You can set up VWO Config while initializing your VWO SDK. This is helpful if you want to perform the following tasks:

* [Target Visitor Groups](ref:ios-targeting-visitor-groups)
* [Opt Out](ref:ios-opt-out) 
* [View Preview Mode](ref:ios-preview-mode) 
* [User ID](ref:user-id)
* [Push Custom Dimension](ref:ios-custom-dimension) 

```objectivec
VWOConfig *config = [VWOConfig new];
config.optOut = YES;
config.customVariables = @{@"user" : @"free"};
config.disablePreview = YES;
config.userID = "jack@xyz.com";
[config setCustomDimension:@"key" withCustomDimensionValue:@"value"];

[VWO launchForAPIKey:@"<your-api-key>" config:config completion:^{
  //Code executed after launch is complete
} failure:^(NSString * _Nonnull error) {
	// Failure handling
}];
```
```swift
let config = VWOConfig();
config.optOut = true;
config.customVariables = ["user" : "free"];
config.disablePreview = true;
config.setCustomDimension(customDimensionKey: "VWO_CD_KEY", customDimensionValue: "CD_VALUE");

VWO.launch(apiKey: "<your-api-key>", config: config
  completion: {
	   //Code executed after launch is complete     
	}, failure: { error in
      print(error)
});
```

## Configure VWO CDN for China

VWO initialization supports VWO Chinese CDN in order to prevent tracking calls being getting blocked in China. This can be achieved by configuring the SDK at the time of instantiating it.

```objectivec
VWOConfig *config = [VWOConfig new];
config.isChinaCDN = YES
config.userID = "jack@xyz.com";

[VWO launchForAPIKey:@"<your-api-key>" config:config completion:^{
  //Code executed after launch is complete
} failure:^(NSString * _Nonnull error) {
	// Failure handling
}];
```
```swift
let config = VWOConfig();
config.isChinaCDN = true;

VWO.launch(apiKey: "<your-api-key>", config: config
  completion: {
	   //Code executed after launch is complete     
	}, failure: { error in
      print(error)
});
```
