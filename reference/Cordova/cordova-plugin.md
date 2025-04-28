---
title: Cordova Guide
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
[block:api-header]
{
  "title": "Create an Account"
}
[/block]
You can create a free account with us from the [signup page](https://vwo.com/free-trial/).


To create and run A/B tests, sign in to the VWO dashboard and then select [Mobile App A/B](https://app.vwo.com/#/test/mobile-ab) on the menu. If you are using the VWO A/B testing feature for the first time, click **Start Mobile App A/B Testing** to begin.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/46bdbbb-Screen_Shot_2017-12-15_at_3.15.46_PM.png",
        "Screen Shot 2017-12-15 at 3.15.46 PM.png",
        348,
        350,
        "#2d3d46"
      ]
    }
  ]
}
[/block]
To create A/B tests for mobile apps:
 
Add the mobile app to be tested.

Define the variables you want to test.

Create A/B tests
[block:api-header]
{
  "title": "Add the mobile app to be tested"
}
[/block]
To add a new app for A/B testing, go to the **Apps** section on the page.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c06e7b4-7c4d57f-MobileAppAB-1.png",
        "7c4d57f-MobileAppAB-1.png",
        1566,
        222,
        "#d4d5da"
      ]
    }
  ]
}
[/block]
On the right side of the screen, click **Create App**.
Type the name of the app you want to add, and then click **Create**.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/60d5d81-be06a8c-MobileAppAB-1.jpg",
        "be06a8c-MobileAppAB-1.jpg",
        1206,
        511,
        "#f1f3f6"
      ]
    }
  ]
}
[/block]
As you add an app, VWO generates API Keys for both the iOS and Android platforms. You can make a note of the API Key under the Settings section and are used during app initialization.
[block:api-header]
{
  "title": "Defining the Variables You Want To Test"
}
[/block]
Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions in the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables.

To add an element for testing, under Variables section, click **Create **Variable.

Assign a name to the variable, and then select its data type. 

Type **Default Value** (current value or a value if there is no A/B test).

To add the variable, click Create. You can add multiple variables to an app.



[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2420497-d03146b-517c125-preview.png",
        "d03146b-517c125-preview.png",
        2528,
        1328,
        "#909192"
      ]
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Creating A/B Tests for Mobile Apps"
}
[/block]
On the **Mobile App A/B** testing screen, go to the **Campaigns **tab, and then click **Create**. 

Choose the App you want to test. All mobile apps you have added to VWO are listed here.

Select a platform where the app is running.

Enter a unique identifier in the **Define a test key **field to filter your tests easily. The test key helps you execute custom logic, as explained in this [iOS Code Blocks](ref:ios-code-blocks)/[Android Code Blocks](ref:android-code-blocks) section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/eb38a5c-0e3b074-mobile-app-6.jpg",
        "0e3b074-mobile-app-6.jpg",
        1471,
        903,
        "#f1f3f4"
      ]
    }
  ]
}
[/block]
Select Next and click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.


[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/10410d2-b3b8c33-mobile-app-ab-7.jpg",
        "b3b8c33-mobile-app-ab-7.jpg",
        1437,
        879,
        "#eff2f4"
      ]
    }
  ]
}
[/block]
Select the variable you want to test, and then enter the variation values. You can test multiple variables in one test. In the example above, we have added speed variable, defined value as 20 for the variation. For control, the value is 10, which is the default value for the variable. 

Based on the test key and variation names, VWO generates the code snippet that you can use in the mobile app.

To continue, click **Next**

## Define Goals
In the next step, define at least one goal. Goal is a conversion matrix that we want to optimize.
[block:code]
{
  "codes": [
    {
      "code": "conversionGoal",
      "language": "text"
    }
  ]
}
[/block]
## Finalize
At the **Finalize** step, we can set the percentage of users we want to include in the campaign.
Under the Advanced option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.
For quick setup, we can leave those settings to default.

Click **Finish** and then **Start Now** to run the campaign.
[block:api-header]
{
  "title": "Installing the Plug-In"
}
[/block]
The VWO Cordova plug-in can be installed using ```Edge```.
[block:code]
{
  "codes": [
    {
      "code": "cordova plugin add vwo-cordova-plugin\n\n# Keys for Android and iOS would be different. \n# This plugin would facilitate platform specific initialization.\ncordova plugin add cordova-plugin-device",
      "language": "shell"
    }
  ]
}
[/block]
Add the following permissions to your ```AndroidManifest.xml``` file in the ```/platforms/android``` folder.
[block:code]
{
  "codes": [
    {
      "code": "<uses-permission android:name=\"android.permission.INTERNET\"/>\n<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
      "language": "xml"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Code changes"
}
[/block]
## 1. Initializing the SDK
After installing the plug-in, you would want to start it. 
SDK can be initialized in the following ways:

#### I. Launching the VWO SDK in the Asynchronous mode
[block:code]
{
  "codes": [
    {
      "code": "var apiKey;\nif (window.device.platform == \"iOS\") {\n  apiKey = 'iOS_API_KEY'\n}\nif (window.device.platform == \"Android\") {\n  apiKey = 'ANDROID_API_KEY';\n}\nvar config = {optOut: false, disablePreview: true, customVariables: {user_type: \"free\"}}\n// Start VWO SDK in Async mode with callback\nwindow.VWOCordovaPlugin.launch(apiKey, config, function(result){\n  // VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript"
    },
    {
      "code": "var apiKey;\nif ((<any> window).device.platform == \"iOS\") {\n  apiKey = 'ANDROID_API_KEY';\n}\nif ((<any> window).device.platform == \"Android\") {\n  apiKey = 'iOS_API_KEY'\n}\nvar config = {optOut: false, disablePreview: true, customVariables: {user_type: \"free\"}}\n\n// Start VWO SDK in Async mode with callback\n(<any> window).VWOCordovaPlugin.launchWithCallback(apiKey, config, function(result){\n  // VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
#### II. Launching the VWO SDK in the synchronous mode
[block:code]
{
  "codes": [
    {
      "code": "var apiKey;\nif (window.device.platform == \"iOS\") {\n    apiKey = 'iOS_API_KEY'\n}\nif (window.device.platform == \"Android\") {\n    apiKey = 'ANDROID_API_KEY';\n}\nvar config = {optOut: false, disablePreview: true, customVariables: {user_type: \"free\"}}\n\nwindow.VWOCordovaPlugin.launchSynchronously(apiKey, timeout, config);",
      "language": "javascript"
    },
    {
      "code": "var apiKey;\nif ((<any> window).device.platform == \"iOS\") {\n    apiKey = 'ANDROID_API_KEY';\n}\nif ((<any> window).device.platform == \"Android\") {\n    apiKey = 'iOS_API_KEY'\n}\nvar config = {optOut: false, disablePreview: true, customVariables: {user_type: \"free\"}}\n(<any> window).VWOCordovaPlugin.launchSynchronously(apiKey, timeout, config);",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "NOTE",
  "body": "Timeout must be specified in seconds."
}
[/block]
#### Launch configuration
You can pass a `config` object during the launch of the VWO SDK. `Config` is a javascript object which can have following keys:

  *  `optOut`: it can have a boolean value which tells the VWO SDK whether to initialize the SDK or not. It defaults to false.

  *  `disablePreview`: Boolean value to turn on or off the preview mode. It defaults to false.

  *  `customVariables`: Takes in a javascript object as its value. Check [iOS Targeting Visitor Groups](ref:ios-targeting-visitor-groups) / [Android Targeting Visitor Groups](ref:android-targeting-visitor-groups) for more details. It defaults to an empty object.

If you do not wish to pass any `config` object, you can pass a `null`.
[block:code]
{
  "codes": [
    {
      "code": "var config = { optOut: false, \n              disablePreview: true, \n              customVariables: { user_type: \"free\" }\n             }",
      "language": "javascript"
    },
    {
      "code": "var config = { optOut: false, \n              \tdisablePreview: true, \n              \tcustomVariables: { user_type: \"free\" }\n             }",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
You can set this config object as follows:
[block:code]
{
  "codes": [
    {
      "code": "window.VWOCordovaPlugin.launch(<YOUR_VWO_API_KEY>, config, function(result){\n  // VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript"
    },
    {
      "code": "(<any> window).VWOCordovaPlugin.launchWithCallback(<YOUR_VWO_API_KEY>, config, function(result){\n \t// VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
## 2. Using campaign
To use the variation defined during campaign creation, use the following code to get value for the campaign keys:
[block:callout]
{
  "type": "info",
  "body": "Can be called only after SDK initialization. Otherwise, a null value is returned.",
  "title": "NOTE"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "window.VWOCordovaPlugin.intForKey(\"<key>\", 1, function(result){\n  // Your code here\n});\n\nwindow.VWOCordovaPlugin.floatForKey(\"<key>\", 0.0, function(result){\n  // Your code here\n});\n\nwindow.VWOCordovaPlugin.boolForKey(\"<key>\", false, function(result){\n  // Your code here\n});\n\nwindow.VWOCordovaPlugin.stringForKey(\"<key>\", \"DEFAULT\", function(result){\n  // Your code here\n});\n\n\nwindow.VWOCordovaPlugin.objectForKey(\"<key>\", \"default_value\", function(result){\n  // display the result to user\n});",
      "language": "javascript"
    },
    {
      "code": "(<any> window).VWOCordovaPlugin.intForKey(\"<key>\", 123, function(result){\n  // Your code here\n});\n\n(<any> window).VWOCordovaPlugin.floatForKey(\"<key>\", 100.0, function(result){\n  // Your code here\n});\n\n(<any> window).VWOCordovaPlugin.boolForKey(\"<key>\", false, function(result){\n  // Your code here\n});\n\n(<any> window).VWOCordovaPlugin.stringForKey(\"<key>\", \"DEFAULT\", function(result){\n  // Your code here\n});\n\n\n(<any> window).VWOCordovaPlugin.objectForKey(\"<key>\", \"default_value\", function(result){\n  // display the result to user\n});",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
When the these methods are invoked, SDK checks if the targeting conditions hold true for the current user.
If targeting/segmentation conditions hold true, the user is made part of the campaign and visitor counts in the report section increments by one (once per user).

Test can also be created without variables. Campaign test key can be used to fetch the variation name. This variation name can be used to execute custom logic.
[block:code]
{
  "codes": [
    {
      "code": "window.VWOCordovaPlugin.variationNameForTestKey(\"campaign_test_key\", function(name) {\n  console.log(\"Test key \" + name);\n  if (name == \"Control\") {\n    // Control code\n  } else if (name == \"Variation-1\") {\n    // Variation 1 code\n  }\n});\n",
      "language": "javascript"
    },
    {
      "code": "(<any> window).VWOCordovaPlugin.variationNameForTestKey(\"campaign_test_key\", function(name) {\n  console.log(\"Test key \" + name);\n  if (name == \"Control\") {\n    // Control code\n  } else if (name == \"Variation-1\") {\n    // Variation 1 code\n  }\n});",
      "language": "javascript"
    }
  ]
}
[/block]
## 3. Triggering goals
We would track the effect of this campaign on our conversion metric.
Earlier, we defined ``` conversionGoal``` as a goal.
We need to tell the VWO SDK when this conversion happens. Use the following code to trigger this goal.
[block:callout]
{
  "type": "info",
  "body": "Can be called only after SDK initialization. Otherwise, the goal is not marked.",
  "title": "NOTE"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "var goal = \"conversionGoal\";\nwindow.VWOCordovaPlugin.trackConversion(goal);",
      "language": "javascript"
    },
    {
      "code": "var goal = \"conversionGoal\";\n(<any> window).VWOCordovaPlugin.trackConversion(goal);",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
For triggering the revenue goal, use the method trackConversionWithValue().
[block:code]
{
  "codes": [
    {
      "code": "var goal = \"conversionGoal\";\nwindow.VWOCordovaPlugin.trackConversionWithValue(goal, 133.25);",
      "language": "javascript"
    },
    {
      "code": "var goal = \"conversionGoal\";\n(<any> window).trackConversionWithValue(goal, 133.25);",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]
## 4 Log level

To enable logging in SDK, use ```window.VWOCordovaPlugin.setLogLevel```.
You can set different log levels depending upon the priority of logging as follows:

* **logLevelDebug**: Gives detailed logs.
* **logLevelInfo**: Informational logs
* **logLevelWarning**: Warning is a message level indicating a potential problem.
* **logLevelError**: Indicates Error
* **logLevelOff**: No logs are printed

The different methods set the log level of the message. VWO will only print messages with a log level that is greater to or equal to it's current log level setting. So a logger with a level of Warning will only output log messages with a level of Warning, or Error.
[block:code]
{
  "codes": [
    {
      "code": "window.VWOCordovaPlugin.setLogLevel(window.VWOCordovaPlugin.logLevelDebug);",
      "language": "javascript"
    },
    {
      "code": "(<any> window).setLogLevel(<any>window.VWOCordovaPlugin.logLevelDebug);",
      "language": "text",
      "name": "TypeScript"
    }
  ]
}
[/block]
## 5 Opt-out
To opt out of tracking by VWO, use `config` object to set OptOut to true or false. This `config` object is passed when `VWOCordovaPlugin.launch` or `VWOCordovaPlugin.launchSynchronously` function is called.
[block:code]
{
  "codes": [
    {
      "code": "var config = {optOut: false}\nwindow.VWOCordovaPlugin.launch(apiKey, config, function(result){\n  // VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript"
    },
    {
      "code": "VWOCordovaPlugin.setOptOut(true);\nvar config = {optOut: false}\n\n(<any> window).VWOCordovaPlugin.launch(apiKey, config, function(result){\n  // VWO Loaded Successfully\n}, function(error){\n  // VWO not loaded\n});",
      "language": "javascript",
      "name": "TypeScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Reports"
}
[/block]
From the Mobile App A/B menu option, select your campaign and click **Detailed Reports** to see the reports of your campaign.
[block:api-header]
{
  "title": "Source Code"
}
[/block]
The VWO Cordova plug-in code is available on GitHub:
https://github.com/wingify/vwo-cordova-plugin 
[block:api-header]
{
  "title": "Next Steps"
}
[/block]
As the next step, take a look at: 
Detailed iOS documentation: [SDK Reference](ref:ios-sdk-reference) 
Detailed Android documentation: [SDK Reference](ref:android-sdk-reference) 

We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).