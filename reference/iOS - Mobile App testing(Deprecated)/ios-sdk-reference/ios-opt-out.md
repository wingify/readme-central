---
title: Opt Out
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
To opt out of tracking by VWO, use `setOptOut:YES` method on users you don’t want to be tracked.

```objectivec
VWOConfig *config = [VWOConfig new];
config.optOut = YES;

[VWO launchForAPIKey:@"<your-api-key>" config:config completion:^{
  //Code executed after launch is complete
} failure:^(NSString * _Nonnull error) {
	// Failure handling
}];
```
```swift
let config = VWOConfig()
config.optOut = true;

VWO.launch(apiKey: "<your-api-key>", config: config
  completion: {
	   //Code executed after launch is complete     
	}, failure: { error in
      print(error)
})
```

A user by default will be tracked by VWO.
