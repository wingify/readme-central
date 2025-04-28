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

```objectivec
VWOConfig *config = [VWOConfig new];
config.optOut = YES;
config.customVariables = @{@"user" : @"free"};
config.disablePreview = YES;
config.userID = "jack@xyz.com"

[VWO launchForAPIKey:@"<your-api-key>" config:config completion:^{
  //Code executed after launch is complete
} failure:^(NSString * _Nonnull error) {
	// Failure handling
}];
```
```swift
let config = VWOConfig()
config.optOut = true;
config.customVariables = ["user" : "free"]
config.disablePreview = true;

VWO.launch(apiKey: "<your-api-key>", config: config
  completion: {
	   //Code executed after launch is complete     
	}, failure: { error in
      print(error)
})
```
