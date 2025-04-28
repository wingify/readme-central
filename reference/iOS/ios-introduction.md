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
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f96e934-MobileAppAB-title.png",
        "MobileAppAB-title.png",
        348,
        350,
        "#35424d"
      ]
    }
  ]
}
[/block]
To create A/B tests for mobile apps:
 
Add the mobile app to be tested.

Define the variables you want to test.

Create A/B tests.
[block:api-header]
{
  "title": "Adding the Mobile App to Test"
}
[/block]
Go to the **Apps** section on the page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/847d0ce-MobileAppAB-1.png",
        "MobileAppAB-1.png",
        1566,
        222,
        "#d4d5da"
      ]
    }
  ]
}
[/block]
On the upper-right side of the screen, click **Create App**.
Type the name of the app you want to add, and then click **Create**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/9dcd7bb-MobileAppAB-1.jpg",
        "MobileAppAB-1.jpg",
        1206,
        511,
        "#f1f3f6"
      ]
    }
  ]
}
[/block]
As you add an app, VWO generates API keys for both the iOS and Android platforms. You can make a note of the API key under the **Settings** section and is used during app initialization.
[block:api-header]
{
  "title": "Installing SDK"
}
[/block]
You can use CocoaPods to install the VWO iOS SDK. For CocoaPods installation, add ``` pod 'VWO' ``` to your Pod file.
Run the ``` pod install ``` command.

Click [here](ref:ios-sdk-installation) for detailed installation instructions.

## Initializing the SDK
After installing the SDK, you can initialize the app in the ``` AppDelegate ``` file by using the ```didFinishLaunchingWithOptions ``` method.

Import  ```VWO```, and then call the ```launchForAPIKey``` method with your app key. Click [here](ref:ios-launching-sdk) for detailed instructions.
[block:code]
{
  "codes": [
    {
      "code": "// importing the VWO module\n@import VWO;\n\n// initialising the SDK\n- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {\n  [VWO launchForAPIKey:@\"<your-api-key>\" config: nil\n     completion:^{\n  \t\t  //Code executed after launch is complete\n\t   } failure:^(NSString * _Nonnull error) {\n\t\t    // Failure handling\n\t}];\n  return YES;\n}",
      "language": "objectivec",
      "name": null
    },
    {
      "code": "// importing the header file\nimport VWO\n\n// initialising the SDK\nfunc application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {\nVWO.launch(apiKey: \"<your-api-key>\", config: nil\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n})\nreturn true\n}",
      "language": "swift",
      "name": "Swift"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Defining the Variables You Want to Test"
}
[/block]
Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions on the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables. 
To add an element for testing, under the **Variables** section, click **Create Variable**. 
Assign a name to the variable, and then select its data type. 
Type **Default Value **(current value or a value if there is no A/B test). 
To add the variable, click **Create**. You can add multiple variables to an app.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/517c125-preview.png",
        "preview.png",
        2528,
        1328,
        "#909192"
      ]
    }
  ]
}
[/block]
You can view the relevant Java, Objective, or Swift code snippet in the right panel as you create the variable. You can use this code snippet to update the changes in your mobile app code.
[block:code]
{
  "codes": [
    {
      "code": "int speed = [VWO intForKey:@\"speed\" defaultValue:5];\n",
      "language": "objectivec"
    },
    {
      "code": "int speed = VWO.intFor(key: \"speed\", defaultValue: 5)\n",
      "language": "swift"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Create a Campaign"
}
[/block]
On the **Mobile App A/B** testing screen, go to the Campaigns tab, and then click **Create**. 

Choose the App you want to test. All mobile apps you have added to VWO are listed here.

Select a platform where the app is running.

Enter a unique identifier in the **Name of your test key** field to filter your tests easily. The test key helps you execute the custom logic, as explained in this [Code Blocks](ref:code-blocks) section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2a18091-mobile-app-6.jpg",
        "mobile-app-6.jpg",
        1471,
        903,
        "#f1f3f4"
      ]
    }
  ]
}
[/block]
Select **Next**, and then click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/80d0575-mobile-app-ab-7.jpg",
        "mobile-app-ab-7.jpg",
        1437,
        879,
        "#eff2f4"
      ]
    }
  ]
}
[/block]
Select the variable you want to test, and then enter the variation values. You can test multiple variables in one test. In the above example, we have added the speed variable, and then defined value as 20 for the variation. For control, the value is 10, which is the default value for the variable. 

Based on the test key and variation names, VWO generates the code snippet that you can use in the mobile app.

To continue, click **Next**.
[block:code]
{
  "codes": [
    {
      "code": "NSString *variationName = [VWO variationNameForTestKey:@\"test_key\"];\nif ([variationName isEqualToString:@\"Control\"]) {\n        // Code for Control\n} else if ([variationName isEqualToString:@\"Variation 1\"]) {\n        // Code for Variation 1\n} else {\n\n}",
      "language": "objectivec"
    },
    {
      "code": "if let variation = VWO.variationName(forTestKey: \"test_key\") {\n    switch variation {\n        case \"Control\":\n            // Code for Control\n            break\n        case \"Variation 1\":\n            // Code for Variation 1\n            break\n        default: break\n    }\n}",
      "language": "swift"
    }
  ]
}
[/block]
## Define Goals
In the next step, define at least one goal. A goal is a conversion matrix that we want to optimize.
[block:code]
{
  "codes": [
    {
      "code": "conversionGoal",
      "language": "text",
      "name": "Goal"
    }
  ]
}
[/block]
In the mobile app, use the following code to trigger this goal.
[block:code]
{
  "codes": [
    {
      "code": "[VWO trackConversion:@\"conversionGoal\"];",
      "language": "objectivec"
    },
    {
      "code": "VWO.trackConversion(\"conversionGoal\")",
      "language": "swift"
    }
  ]
}
[/block]
## Finalize
In the **Finalize** step, we can set the percentage of users that we want to include in the campaign.
Under the **Advanced** option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.

For quick setup, we can leave the settings in Advanced as default.

To run the campaign, select **Finish > Start Now**.
[block:api-header]
{
  "title": "Reports"
}
[/block]
In the mobile app A/B menu option, select your campaign, and then click **DETAILED REPORTS** to view the reports of your campaign.
[block:api-header]
{
  "title": "Source Code"
}
[/block]
VWO iOS SDK code is available on GitHub:
https://github.com/wingify/vwo-ios-sdk
[block:api-header]
{
  "title": "Next Steps"
}
[/block]
As the next step, look at [SDK Reference](ref:ios-sdk-reference)  to explore more advanced options of using the SDK.
We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).