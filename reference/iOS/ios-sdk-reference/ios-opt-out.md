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
To opt out of tracking by VWO, use ```setOptOut:YES``` method on users you don’t want to be tracked.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig *config = [VWOConfig new];\nconfig.optOut = YES;\n\n[VWO launchForAPIKey:@\"<your-api-key>\" config:config completion:^{\n  //Code executed after launch is complete\n} failure:^(NSString * _Nonnull error) {\n\t// Failure handling\n}];",
      "language": "objectivec"
    },
    {
      "code": "let config = VWOConfig()\nconfig.optOut = true;\n\nVWO.launch(apiKey: \"<your-api-key>\", config: config\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n})",
      "language": "swift"
    }
  ]
}
[/block]

A user by default will be tracked by VWO.