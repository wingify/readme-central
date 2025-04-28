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
We can target a campaign for specific users of the app.\
To do this, under **Advanced Options**, select the **Finalize** step and then select **Enable campaign for a specific user group**.

![1386](https://files.readme.io/e033b7c-Screen_Shot_2017-07-11_at_6.25.27_PM.png "Screen Shot 2017-07-11 at 6.25.27 PM.png")

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

![1360](https://files.readme.io/0075ba5-Screen_Shot_2017-12-12_at_12.37.22_PM.png "Screen Shot 2017-12-12 at 12.37.22 PM.png")

## Custom Variable

A custom variable is useful when you want to target a campaign on variables and conditions set by your code.\
To use a custom variable, define a variable name and a corresponding value in the dashboard.\
In your app code, call methods to set values for these custom variables using\
`VWOConfig#setCustomVariables(Map<String, String>)`.

```java Java
Map<String, String> customKeys = new HashMap<>();
customKeys.put("user_type", "paid");
VWOConfig vwoConfig = new VWOConfig
  .Builder()
  .setCustomVariables(customKeys)
  .build();

VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);
```
```kotlin Kotlin
val customKeys = HashMap<String, String>()
customKeys["user_type"] = "paid"
val vwoConfig = VWOConfig.Builder()
  .setCustomVariables(customKeys)
  .build()

VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)
```

### When to set custom variables

* If in the campaign, you have specified certain custom variables, their values have to be set in the code before calling the `getObjectForKey(String key, Object defaultValue)` method.

* If you have set **Make user part of the campaign on app launch**  in the VWO dashboard, then custom variables should be set before launching the SDK. This is required else SDK will try to make the user a part of the campaign on app launch.

![1464](https://files.readme.io/9a7e58a-sc.png "sc.png")
