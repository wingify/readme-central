---
title: User ID
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
You can identify a user in the VWO SDK by using a string that identifies that user.\
User ID can be set in the VWO Launch config.

User ID helps VWO identify a user across multiple devices, and allows it to serve the same variation to a user thus keeping the experience consistent.

For example, you may run a campaign on both iPhone and iPad. If a user installs both the iPhone app and iPad app, setting the user ID will allow VWO to serve the same variation for a campaign.

```objectivec
VWOConfig *config = [VWOConfig new];
config.userID = @"<uuid-for-the-user>";

[VWO launchForAPIKey:@"<your-api-key>" config:config completion:^{
    //completion code
} failure:^(NSString * _Nonnull error) {
    //error code
}];
```
```swift
let config = VWOConfig()
config.userID = "<uuid-for-the-user>"

VWO.launch(apiKey: "<your-api-key>", config: config, completion: {
    //Completion code
}) { (errorString) in
    //Error code
}
```

Note that altering the traffic allocation among variations or total campaign traffic can break this. Also, changing targeting while the campaign is running is also not advisable.

> 📘 Please note
>
> User ID is used as hash and is not stored anywhere on the device or server.
