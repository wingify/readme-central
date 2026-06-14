---
title: Quick Start Guide
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
To create and run A/B tests, sign in to the VWO dashboard, and then select [Mobile App A/B](https://app.vwo.com/#/test/mobile-ab) on the menu. If you are using the VWO A/B testing feature for the first time, click **Start Mobile App A/B Testing** to begin.

![348](https://files.readme.io/f96e934-MobileAppAB-title.png "MobileAppAB-title.png")

To create A/B tests for mobile apps:

Add the mobile app to be tested.

Define the variables you want to test.

Create A/B tests.

## Adding the Mobile App to Test

Go to the **Apps** section on the page.

![1566](https://files.readme.io/847d0ce-MobileAppAB-1.png "MobileAppAB-1.png")

On the upper-right side of the screen, click **Create App**.\
Type the name of the app you want to add, and then click **Create**.

![1206](https://files.readme.io/9dcd7bb-MobileAppAB-1.jpg "MobileAppAB-1.jpg")

As you add an app, VWO generates API keys for both the iOS and Android platforms. You can make a note of the API key under the **Settings** section and is used during app initialization.

## Installing SDK

You can use CocoaPods to install the VWO iOS SDK. For CocoaPods installation, add `pod 'VWO'` to your Pod file.\
Run the `pod install` command.

Click [here](ref:ios-sdk-installation) for detailed installation instructions.

## Initializing the SDK

After installing the SDK, you can initialize the app in the `AppDelegate` file by using the `didFinishLaunchingWithOptions ` method.

Import  `VWO`, and then call the `launchForAPIKey` method with your app key. Click [here](ref:ios-launching-sdk) for detailed instructions.

```objectivec
// importing the VWO module
@import VWO;

// initialising the SDK
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [VWO launchForAPIKey:@"<your-api-key>" config: nil
     completion:^{
  		  //Code executed after launch is complete
	   } failure:^(NSString * _Nonnull error) {
		    // Failure handling
	}];
  return YES;
}
```
```swift Swift
// importing the header file
import VWO

// initialising the SDK
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
VWO.launch(apiKey: "<your-api-key>", config: nil
  completion: {
	   //Code executed after launch is complete     
	}, failure: { error in
      print(error)
})
return true
}
```

## Defining the Variables You Want to Test

Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions on the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables.\
To add an element for testing, under the **Variables** section, click **Create Variable**.\
Assign a name to the variable, and then select its data type.\
Type **Default Value** (current value or a value if there is no A/B test).\
To add the variable, click **Create**. You can add multiple variables to an app.

![2528](https://files.readme.io/517c125-preview.png "preview.png")

You can view the relevant Java, Objective, or Swift code snippet in the right panel as you create the variable. You can use this code snippet to update the changes in your mobile app code.

```objectivec
int speed = [VWO intForKey:@"speed" defaultValue:5];
```
```swift
int speed = VWO.intFor(key: "speed", defaultValue: 5)
```

## Create a Campaign

On the **Mobile App A/B** testing screen, go to the Campaigns tab, and then click **Create**. 

Choose the App you want to test. All mobile apps you have added to VWO are listed here.

Select a platform where the app is running.

Enter a unique identifier in the **Name of your campaign key** field to filter your tests easily. The campaign key helps you execute the custom logic, as explained in this [Code Blocks](ref:code-blocks) section.

![1471](https://files.readme.io/2a18091-mobile-app-6.jpg "mobile-app-6.jpg")

Select **Next**, and then click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.

![1437](https://files.readme.io/80d0575-mobile-app-ab-7.jpg "mobile-app-ab-7.jpg")

Select the variable you want to test, and then enter the variation values. You can test multiple variables in one test. In the above example, we have added the speed variable, and then defined value as 20 for the variation. For control, the value is 10, which is the default value for the variable. 

Based on the campaign key and variation names, VWO generates the code snippet that you can use in the mobile app.

To continue, click **Next**.

```objectivec
NSString *variationName = [VWO variationNameForTestKey:@"campaign_key"];
if ([variationName isEqualToString:@"Control"]) {
    // Code for Control
} else if ([variationName isEqualToString:@"Variation 1"]) {
    // Code for Variation 1
} else {

}
```
```swift
if let variation = VWO.variationName(forTestKey: "campaign_key") {
    switch variation {
        case "Control":
            // Code for Control
            break
        case "Variation 1":
            // Code for Variation 1
            break
        default: break
    }
}
```

## Define Goals

In the next step, define at least one goal. A goal is a conversion matrix that we want to optimize.

```text Goal
conversionGoal
```

In the mobile app, use the following code to trigger this goal.

```objectivec
[VWO trackConversion:@"conversionGoal"];
```
```swift
VWO.trackConversion("conversionGoal")
```

## Finalize

In the **Finalize** step, we can set the percentage of users that we want to include in the campaign.\
Under the **Advanced** option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.

For quick setup, we can leave the settings in Advanced as default.

To run the campaign, select **Finish > Start Now**.

## Reports

In the mobile app A/B menu option, select your campaign, and then click **DETAILED REPORTS** to view the reports of your campaign.

## Source Code

VWO iOS SDK code is available on GitHub:\
[https://github.com/wingify/vwo-ios-sdk](https://github.com/wingify/vwo-ios-sdk)

## Next Steps

As the next step, look at [SDK Reference](ref:ios-sdk-reference)  to explore more advanced options of using the SDK.\
We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).
