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
## Create an Account

You can create a free account with us from the [signup page](https://vwo.com/free-trial/).

To create and run A/B tests, sign in to the VWO dashboard and then select [Mobile App A/B](https://app.vwo.com/#/test/mobile-ab) on the menu. If you are using the VWO A/B testing feature for the first time, click **Start Mobile App A/B Testing** to begin.

![348](https://files.readme.io/46bdbbb-Screen_Shot_2017-12-15_at_3.15.46_PM.png "Screen Shot 2017-12-15 at 3.15.46 PM.png")

To create A/B tests for mobile apps:

Add the mobile app to be tested.

Define the variables you want to test.

Create A/B tests

## Add the mobile app to be tested

To add a new app for A/B testing, go to the **Apps** section on the page.

![1566](https://files.readme.io/c06e7b4-7c4d57f-MobileAppAB-1.png "7c4d57f-MobileAppAB-1.png")

On the right side of the screen, click **Create App**.\
Type the name of the app you want to add, and then click **Create**.

![1206](https://files.readme.io/60d5d81-be06a8c-MobileAppAB-1.jpg "be06a8c-MobileAppAB-1.jpg")

As you add an app, VWO generates API Keys for both the iOS and Android platforms. You can make a note of the API Key under the Settings section and are used during app initialization.

## Defining the Variables You Want To Test

Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions in the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables.

To add an element for testing, under Variables section, click **Create** Variable.

Assign a name to the variable, and then select its data type. 

Type **Default Value** (current value or a value if there is no A/B test).

To add the variable, click Create. You can add multiple variables to an app.

![2528](https://files.readme.io/2420497-d03146b-517c125-preview.png "d03146b-517c125-preview.png")

## Creating A/B Tests for Mobile Apps

On the **Mobile App A/B** testing screen, go to the **Campaigns** tab, and then click **Create**. 

Choose the App you want to test. All mobile apps you have added to VWO are listed here.

Select a platform where the app is running.

Enter a unique identifier in the **Define a test key** field to filter your tests easily. The test key helps you execute custom logic, as explained in this [iOS Code Blocks](ref:ios-code-blocks)/[Android Code Blocks](ref:android-code-blocks) section.

![1471](https://files.readme.io/eb38a5c-0e3b074-mobile-app-6.jpg "0e3b074-mobile-app-6.jpg")

Select Next and click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.

![1437](https://files.readme.io/10410d2-b3b8c33-mobile-app-ab-7.jpg "b3b8c33-mobile-app-ab-7.jpg")

Select the variable you want to test, and then enter the variation values. You can test multiple variables in one test. In the example above, we have added speed variable, defined value as 20 for the variation. For control, the value is 10, which is the default value for the variable. 

Based on the test key and variation names, VWO generates the code snippet that you can use in the mobile app.

To continue, click **Next**

## Define Goals

In the next step, define at least one goal. Goal is a conversion matrix that we want to optimize.

```text
conversionGoal
```

## Finalize

At the **Finalize** step, we can set the percentage of users we want to include in the campaign.\
Under the Advanced option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.\
For quick setup, we can leave those settings to default.

Click **Finish** and then **Start Now** to run the campaign.

## Installing the Plug-In

The VWO Cordova plug-in can be installed using `Edge`.

```shell
cordova plugin add vwo-cordova-plugin

# Keys for Android and iOS would be different. 
# This plugin would facilitate platform specific initialization.
cordova plugin add cordova-plugin-device
```

Add the following permissions to your `AndroidManifest.xml` file in the `/platforms/android` folder.

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

## Code changes

## 1. Initializing the SDK

After installing the plug-in, you would want to start it.\
SDK can be initialized in the following ways:

#### I. Launching the VWO SDK in the Asynchronous mode

```javascript
var apiKey;
if (window.device.platform == "iOS") {
  apiKey = 'iOS_API_KEY'
}
if (window.device.platform == "Android") {
  apiKey = 'ANDROID_API_KEY';
}
var config = {optOut: false, disablePreview: true, customVariables: {user_type: "free"}}
// Start VWO SDK in Async mode with callback
window.VWOCordovaPlugin.launch(apiKey, config, function(result){
  // VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```
```javascript TypeScript
var apiKey;
if ((<any> window).device.platform == "iOS") {
  apiKey = 'ANDROID_API_KEY';
}
if ((<any> window).device.platform == "Android") {
  apiKey = 'iOS_API_KEY'
}
var config = {optOut: false, disablePreview: true, customVariables: {user_type: "free"}}

// Start VWO SDK in Async mode with callback
(<any> window).VWOCordovaPlugin.launchWithCallback(apiKey, config, function(result){
  // VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```

#### II. Launching the VWO SDK in the synchronous mode

```javascript
var apiKey;
if (window.device.platform == "iOS") {
    apiKey = 'iOS_API_KEY'
}
if (window.device.platform == "Android") {
    apiKey = 'ANDROID_API_KEY';
}
var config = {optOut: false, disablePreview: true, customVariables: {user_type: "free"}}

window.VWOCordovaPlugin.launchSynchronously(apiKey, timeout, config);
```
```javascript TypeScript
var apiKey;
if ((<any> window).device.platform == "iOS") {
    apiKey = 'ANDROID_API_KEY';
}
if ((<any> window).device.platform == "Android") {
    apiKey = 'iOS_API_KEY'
}
var config = {optOut: false, disablePreview: true, customVariables: {user_type: "free"}}
(<any> window).VWOCordovaPlugin.launchSynchronously(apiKey, timeout, config);
```

> 📘 NOTE
>
> Timeout must be specified in seconds.

#### Launch configuration

You can pass a `config` object during the launch of the VWO SDK. `Config` is a javascript object which can have following keys:

* `optOut`: it can have a boolean value which tells the VWO SDK whether to initialize the SDK or not. It defaults to false.

* `disablePreview`: Boolean value to turn on or off the preview mode. It defaults to false.

* `customVariables`: Takes in a javascript object as its value. Check [iOS Targeting Visitor Groups](ref:ios-targeting-visitor-groups) / [Android Targeting Visitor Groups](ref:android-targeting-visitor-groups) for more details. It defaults to an empty object.

If you do not wish to pass any `config` object, you can pass a `null`.

```javascript
var config = { optOut: false, 
              disablePreview: true, 
              customVariables: { user_type: "free" }
             }
```
```javascript TypeScript
var config = { optOut: false, 
              	disablePreview: true, 
              	customVariables: { user_type: "free" }
             }
```

You can set this config object as follows:

```javascript
window.VWOCordovaPlugin.launch(<YOUR_VWO_API_KEY>, config, function(result){
  // VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```
```javascript TypeScript
(<any> window).VWOCordovaPlugin.launchWithCallback(<YOUR_VWO_API_KEY>, config, function(result){
 	// VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```

## 2. Using campaign

To use the variation defined during campaign creation, use the following code to get value for the campaign keys:

> 📘 NOTE
>
> Can be called only after SDK initialization. Otherwise, a null value is returned.

```javascript
window.VWOCordovaPlugin.intForKey("<key>", 1, function(result){
  // Your code here
});

window.VWOCordovaPlugin.floatForKey("<key>", 0.0, function(result){
  // Your code here
});

window.VWOCordovaPlugin.boolForKey("<key>", false, function(result){
  // Your code here
});

window.VWOCordovaPlugin.stringForKey("<key>", "DEFAULT", function(result){
  // Your code here
});


window.VWOCordovaPlugin.objectForKey("<key>", "default_value", function(result){
  // display the result to user
});
```
```javascript TypeScript
(<any> window).VWOCordovaPlugin.intForKey("<key>", 123, function(result){
  // Your code here
});

(<any> window).VWOCordovaPlugin.floatForKey("<key>", 100.0, function(result){
  // Your code here
});

(<any> window).VWOCordovaPlugin.boolForKey("<key>", false, function(result){
  // Your code here
});

(<any> window).VWOCordovaPlugin.stringForKey("<key>", "DEFAULT", function(result){
  // Your code here
});


(<any> window).VWOCordovaPlugin.objectForKey("<key>", "default_value", function(result){
  // display the result to user
});
```

When the these methods are invoked, SDK checks if the targeting conditions hold true for the current user.\
If targeting/segmentation conditions hold true, the user is made part of the campaign and visitor counts in the report section increments by one (once per user).

Test can also be created without variables. Campaign test key can be used to fetch the variation name. This variation name can be used to execute custom logic.

```javascript
window.VWOCordovaPlugin.variationNameForTestKey("campaign_test_key", function(name) {
  console.log("Test key " + name);
  if (name == "Control") {
    // Control code
  } else if (name == "Variation-1") {
    // Variation 1 code
  }
});
```
```javascript
(<any> window).VWOCordovaPlugin.variationNameForTestKey("campaign_test_key", function(name) {
  console.log("Test key " + name);
  if (name == "Control") {
    // Control code
  } else if (name == "Variation-1") {
    // Variation 1 code
  }
});
```

## 3. Triggering goals

We would track the effect of this campaign on our conversion metric.\
Earlier, we defined ` conversionGoal` as a goal.\
We need to tell the VWO SDK when this conversion happens. Use the following code to trigger this goal.

> 📘 NOTE
>
> Can be called only after SDK initialization. Otherwise, the goal is not marked.

```javascript
var goal = "conversionGoal";
window.VWOCordovaPlugin.trackConversion(goal);
```
```javascript TypeScript
var goal = "conversionGoal";
(<any> window).VWOCordovaPlugin.trackConversion(goal);
```

For triggering the revenue goal, use the method trackConversionWithValue().

```javascript
var goal = "conversionGoal";
window.VWOCordovaPlugin.trackConversionWithValue(goal, 133.25);
```
```javascript TypeScript
var goal = "conversionGoal";
(<any> window).trackConversionWithValue(goal, 133.25);
```

## 4 Log level

To enable logging in SDK, use `window.VWOCordovaPlugin.setLogLevel`.\
You can set different log levels depending upon the priority of logging as follows:

* **logLevelDebug**: Gives detailed logs.
* **logLevelInfo**: Informational logs
* **logLevelWarning**: Warning is a message level indicating a potential problem.
* **logLevelError**: Indicates Error
* **logLevelOff**: No logs are printed

The different methods set the log level of the message. VWO will only print messages with a log level that is greater to or equal to it's current log level setting. So a logger with a level of Warning will only output log messages with a level of Warning, or Error.

```javascript
window.VWOCordovaPlugin.setLogLevel(window.VWOCordovaPlugin.logLevelDebug);
```
```text TypeScript
(<any> window).setLogLevel(<any>window.VWOCordovaPlugin.logLevelDebug);
```

## 5 Opt-out

To opt out of tracking by VWO, use `config` object to set OptOut to true or false. This `config` object is passed when `VWOCordovaPlugin.launch` or `VWOCordovaPlugin.launchSynchronously` function is called.

```javascript
var config = {optOut: false}
window.VWOCordovaPlugin.launch(apiKey, config, function(result){
  // VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```
```javascript TypeScript
VWOCordovaPlugin.setOptOut(true);
var config = {optOut: false}

(<any> window).VWOCordovaPlugin.launch(apiKey, config, function(result){
  // VWO Loaded Successfully
}, function(error){
  // VWO not loaded
});
```

## Reports

From the Mobile App A/B menu option, select your campaign and click **Detailed Reports** to see the reports of your campaign.

## Source Code

The VWO Cordova plug-in code is available on GitHub:\
[https://github.com/wingify/vwo-cordova-plugin](https://github.com/wingify/vwo-cordova-plugin) 

## Next Steps

As the next step, take a look at:\
Detailed iOS documentation: [SDK Reference](ref:ios-sdk-reference)\
Detailed Android documentation: [SDK Reference](ref:android-sdk-reference) 

We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).
