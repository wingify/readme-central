---
title: Targeting Visitor Groups
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
We can target a campaign for specific users of the app.
To do this, under **Advanced Options** of the **Finalize** step of campaign creation, select **Enable campaign for a specific user group**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5e70393-Screen_Shot_2017-08-02_at_10.22.05_AM.png",
        "Screen Shot 2017-08-02 at 10.22.05 AM.png",
        1352,
        794,
        "#318be6"
      ]
    }
  ]
}
[/block]
You can target the app according to the following options:
  * iPhone Users
  * iPad Users
  * New Users
  * Returning Users
  * App Version
  * iOS Version
  * Day of Week
  * Hour of the Day
  * Country
  * Screen Width
  * Screen Height

Please note that all the above targeting options do not require any code changes.

If you want to do custom targeting such as running a campaign only for paid users of your app, then select **Custom Variable**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/a56ce2a-Screen_Shot_2017-12-12_at_12.37.14_PM.png",
        "Screen Shot 2017-12-12 at 12.37.14 PM.png",
        1376,
        812,
        "#ebebf3"
      ]
    }
  ]
}
[/block]
## Custom Variable
The Custom Variable field is useful when you want to target the campaign on the variables and conditions set by your code.
To use a custom variable, define a variable name and a corresponding value in the dashboard.
In your app code, set ```customVariables``` in VWOConfig before launching.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig *config = [VWOConfig new];\nconfig.customVariables = @{@\"user\" : @\"paid\"};\n\n[VWO launchForAPIKey:@\"<your-api-key>\" config:config completion:^{\n  //Code executed after launch is complete\n} failure:^(NSString * _Nonnull error) {\n\t// Failure handling\n}];",
      "language": "objectivec",
      "name": "Objective-C"
    },
    {
      "code": "let config = VWOConfig()\nconfig.customVariables = [\"user\" : \"paid\"]\n\nVWO.launch(apiKey: \"<your-api-key>\", config: config\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n})",
      "language": "swift"
    }
  ]
}
[/block]
### When to set custom variables
* If you have specified certain custom variables in the campaign, those values must be set in the code before calling the ```objectForKey:defaultValue:``` method.

* If you have selected **Make user part of the campaign on app launch**  in the VWO dashboard, then custom variables should be set before launching the SDK. This is required, because the SDK will try to make the user a part of the campaign on the app launch.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9a7e58a-sc.png",
        "sc.png",
        1464,
        946,
        "#ebebf3"
      ],
      "border": false
    }
  ]
}
[/block]