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
You can identify a user in the VWO SDK by using a string that identifies that user.
User ID can be set in the VWO Launch config.

User ID helps VWO identify a user across multiple devices, and allows it to serve the same variation to a user thus keeping the experience consistent.

For example, you may run a campaign on both iPhone and iPad. If a user installs both the iPhone app and iPad app, setting the user ID will allow VWO to serve the same variation for a campaign.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig *config = [VWOConfig new];\nconfig.userID = @\"<uuid-for-the-user>\";\n\n[VWO launchForAPIKey:@\"<your-api-key>\" config:config completion:^{\n    //completion code\n} failure:^(NSString * _Nonnull error) {\n    //error code\n}];\n",
      "language": "objectivec"
    },
    {
      "code": "let config = VWOConfig()\nconfig.userID = \"<uuid-for-the-user>\"\n\nVWO.launch(apiKey: \"<your-api-key>\", config: config, completion: {\n    //Completion code\n}) { (errorString) in\n    //Error code\n}\n",
      "language": "swift"
    }
  ]
}
[/block]
Note that altering the traffic allocation among variations or total campaign traffic can break this. Also, changing targeting while the campaign is running is also not advisable.
[block:callout]
{
  "type": "info",
  "body": "User ID is used as hash and is not stored anywhere on the device or server.",
  "title": "Please note"
}
[/block]