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
To do this, under **Advanced Options**, select the **Finalize** step and then select **Enable campaign for a specific user group**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e033b7c-Screen_Shot_2017-07-11_at_6.25.27_PM.png",
        "Screen Shot 2017-07-11 at 6.25.27 PM.png",
        1386,
        782,
        "#318be6"
      ]
    }
  ]
}
[/block]
You can target the app according to the following options:
  * Phone Users
  * Tablet Users
  * New Users
  * Returning Users
  * App Version
  * Android Version
  * Day of Week
  * Hour of the Day
  * Country
  * Screen Width
  * Screen Height

Please note that all the above targeting options do not require any code changes.

If you want to do custom targeting such as running a campaign only for paid user of your app, then you can select **Custom Variable**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0075ba5-Screen_Shot_2017-12-12_at_12.37.22_PM.png",
        "Screen Shot 2017-12-12 at 12.37.22 PM.png",
        1360,
        810,
        "#ebebf3"
      ]
    }
  ]
}
[/block]
## Custom Variable
A custom variable is useful when you want to target a campaign on variables and conditions set by your code.
To use a custom variable, define a variable name and a corresponding value in the dashboard.
In your app code, call methods to set values for these custom variables using
```VWOConfig#setCustomVariables(Map<String, String>)```.
[block:code]
{
  "codes": [
    {
      "code": "Map<String, String> customKeys = new HashMap<>();\ncustomKeys.put(\"user_type\", \"paid\");\nVWOConfig vwoConfig = new VWOConfig\n  .Builder()\n  .setCustomVariables(customKeys)\n  .build();\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);",
      "language": "java",
      "name": "Java"
    },
    {
      "code": "val customKeys = HashMap<String, String>()\ncustomKeys[\"user_type\"] = \"paid\"\nval vwoConfig = VWOConfig.Builder()\n  .setCustomVariables(customKeys)\n  .build()\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
If you do not wish to pass the customVariables at the time of VWO launch, you can pass them using the ```setCustomVariable(String, String)``` method after the VWO SDK is initialized.
[block:code]
{
  "codes": [
    {
      "code": "VWOConfig vwoConfig = new VWOConfig.Builder().build();\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);\n\nVWO.setCustomVariable(\"user_type\", \"paid\");",
      "language": "java"
    },
    {
      "code": "val vwoConfig = VWOConfig.Builder()\n  .build()\n\nVWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)\n  \nVWO.setCustomVariable(\"user_type\", \"paid\");",
      "language": "kotlin"
    }
  ]
}
[/block]
### When to set custom variables
* If in the campaign, you have specified certain custom variables, their values have to be set in the code before calling the ```getObjectForKey(String key, Object defaultValue)``` method.

* If you have set **Make user part of the campaign on app launch**  in the VWO dashboard, then custom variables should be set before launching the SDK. This is required else SDK will try to make the user a part of the campaign on app launch.
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