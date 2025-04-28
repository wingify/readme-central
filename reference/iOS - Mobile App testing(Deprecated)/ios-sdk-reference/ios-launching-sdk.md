---
title: Launching the SDK
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
After installing the SDK, you can initialize the VWO SDK in your mobile app.
[block:api-header]
{
  "title": "API Key"
}
[/block]
To initialize the SDK, we will use the API key generated while [Adding an App](ref:ios-adding-an-app).

Initialization of the SDK is done in the ```AppDelegate``` file.
[block:code]
{
  "codes": [
    {
      "code": "@import \"VWO\";",
      "language": "objectivec"
    },
    {
      "code": "import VWO",
      "language": "swift"
    }
  ]
}
[/block]
SDK can be launched in two ways:
**asynchronous** and **synchronous**.

Asynchronous initialization does NOT block code execution while SDK fetches settings from the VWO content distribution network, but a synchronous call blocks code execution.
We recommend asynchronous initialization, because it does not affect the UI of your app.
[block:api-header]
{
  "title": "Asynchronous Initialization"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[VWO launchForAPIKey:@\"<your-api-key>\" config:nil completion:^{\n  //Code executed after launch is complete\n} failure:^(NSString * _Nonnull error) {\n\t// Failure handling\n}];",
      "language": "objectivec"
    },
    {
      "code": "\nVWO.launch(apiKey: \"<your-api-key>\", config: nil\n  completion: {\n\t   //Code executed after launch is complete     \n\t}, failure: { error in\n      print(error)\n})",
      "language": "swift"
    }
  ]
}
[/block]
Launch configuration can be passed while launching the SDK. To learn more, click [here](ref:launch-configuration). 
The completion callback method is used after the SDK fetches settings from the VWO content distribution network and processes these settings.
Use callback when you want to get notified that the SDK is ready.

The following is a use case for using the callback method:
You are testing whether showing a pop-up of a discounted in-app purchase on the first screen of your app leads to increase in the number of purchases.
It would be best to show this user on the first screen of the app, as soon as the app loads. In this A/B test, your code would want to know whether this user should see a pop-up or not.
You can use the callback method, and then show the first screen on completion. You are now confident that when you ask the SDK for the settings of this campaign, the SDK will have the updated data.

[block:api-header]
{
  "title": "Synchronous Initialization"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "[VWO launchSynchronouslyForAPIKey:@\"your-api-key\" config: nil timeout:3.0];",
      "language": "objectivec"
    },
    {
      "code": "VWO.launchSynchronously(apiKey: \"your-api-key\", config: nil, timeout: 3.0)",
      "language": "swift"
    }
  ]
}
[/block]
If settings cannot be fetched in the given time, the SDK uses old settings for already saved campaigns and falls back to the ```defaultValue``` or ```nil``` for new campaign keys.
[block:callout]
{
  "type": "info",
  "title": "Synchronous Initialization",
  "body": "In synchronous initialization, a network call is done on the main thread.\nWe do not recommend using the synchronous mode of initialization. The synchronous method of initialization can lead to freezing of UI."
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "On ```launchForAPIKey``` or ```launchSynchronouslyForAPIKey``` calls, the SDK fetches campaign settings from the VWO content distribution network.\nIn case the settings cannot be fetched, the SDK doesn't retry to fetch the settings during an ongoing app session.\nThis is done to keep the app behavior consistent during an app session.\n\nYou should launch the SDK only by using the ```appDidFinishLaunchingWithOptions``` method.",
  "title": "Launch the SDK Once"
}
[/block]