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

 *  [Target Visitor Groups](ref:ios-targeting-visitor-groups)
 *  [Opt Out](ref:ios-opt-out) 
 *  [View Preview Mode](ref:ios-preview-mode) 
 *  [User ID](ref:user-id)
 *  [Push Custom Dimension](ref:ios-custom-dimension) 
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig *config = [VWOConfig new];\nconfig.optOut = YES;\nconfig.customVariables = @{@\"user\" : @\"free\"};\nconfig.disablePreview = YES;\nconfig.userID = \"jack@xyz.com\";\n[config setCustomDimension:@\"key\" withCustomDimensionValue:@\"value\"];\n\n[VWO launchForAPIKey:@\"<your-api-key>\" config:config completion:^{\n  //Code executed after launch is complete\n} failure:^(NSString * _Nonnull error) {\n\t// Failure handling\n}];",
      "language": "objectivec"
    },
    {
      "code": "let config = VWOConfig();\nconfig.optOut = true;\nconfig.customVariables = [\"user\" : \"free\"];\nconfig.disablePreview = true;\nconfig.setCustomDimension(customDimensionKey: \"VWO_CD_KEY\", customDimensionValue: \"CD_VALUE\");\n\nVWO.launch(apiKey: \"<your-api-key>\", config: config\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n});",
      "language": "swift"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Configure VWO CDN for China"
}
[/block]
VWO initialization supports VWO Chinese CDN in order to prevent tracking calls being getting blocked in China. This can be achieved by configuring the SDK at the time of instantiating it.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig *config = [VWOConfig new];\nconfig.isChinaCDN = YES\nconfig.userID = \"jack@xyz.com\";\n\n[VWO launchForAPIKey:@\"<your-api-key>\" config:config completion:^{\n  //Code executed after launch is complete\n} failure:^(NSString * _Nonnull error) {\n\t// Failure handling\n}];",
      "language": "objectivec"
    },
    {
      "code": "let config = VWOConfig();\nconfig.isChinaCDN = true;\n\nVWO.launch(apiKey: \"<your-api-key>\", config: config\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n});",
      "language": "swift"
    }
  ]
}
[/block]