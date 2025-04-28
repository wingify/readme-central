---
title: Demo App
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
Using the VWO demo app, you can try Mobile App A/B testing.\
To try the demo app, you will need `ApiKey`.

## Running the Demo App

Clone the demo app from [https://github.com/wingify/vwo-ios-sdk](https://github.com/wingify/vwo-ios-sdk)\
Browse to `vwo-ios-sdk/Demo`\
Run `pod install`

## Enter ApiKey

You need to add an app to your VWO account. Please refer to [Adding an App](ref:ios-adding-an-app) for details.\
Copy your `ApiKey`.\
Run the app from Xcode. You can choose either a simulator or your iPhone.

When the app is running, click the **Menu** icon in the upper-left corner.

<Image className="border" border={true} src="https://files.readme.io/dd1edc7-Simulator_Screen_Shot_-_iPhone_7_-_2018-07-30_at_12.44.15.png" />

Select **Enter API Key** from the menu options, and then paste your api key.\
If you using a simulator, you can use  `Command ⌘ + Shift ⇧ + V` to paste your api key in the text box.

## Xcode launch parameters

Developers can use Xcode launch parameters to test the app.\
Step to launch:

1. Open Edit Scheme (Command ⌘ + Shift ⇧ + \<)
2. Run → Arguments → Arguments Passed on Launch
3. Click on + sign and add your API in format `-VWOApiKey <your-api-key>`
4. Close

![1794](https://files.readme.io/dfbd63d-Screen_Shot_2018-07-31_at_4.14.36_PM.png "Screen Shot 2018-07-31 at 4.14.36 PM.png")

When you run your app after setting launch argument, it should appear pre filled in launch alert

![750](https://files.readme.io/630406e-Simulator_Screen_Shot_-_iPhone_7_-_2018-07-30_at_15.07.31.png "Simulator Screen Shot - iPhone 7 - 2018-07-30 at 15.07.31.png")

> 🚧 APIKey in launch will not launch VWO
>
> Adding your API Key to the launch parameter will only make your work easy by automatically adding the API key to the input text field. Developer will have to manually launch the app separately.

# Sorting Campaign

Showing a list of items is a common requirement for many apps.\
How do you know what sequence is better? What better way to tell than to A/B test!

## Defining Variation

Steps to run Sorting Campaign:

1. Under Mobile App A/B, click **Create Menu** and then choose your App, platform, and set the campaign key to "sorting". Click Next for the Variations screen.
2. On the **Variations** screen, update the variation names as seen in the image below

![1368](https://files.readme.io/803d897-Screen_Shot_2018-08-03_at_12.00.45_PM.png "Screen Shot 2018-08-03 at 12.00.45 PM.png")

In your app, click the **Refresh** icon located in the upper-right corner of the navigation bar.\
This should change the sequence of items

<Image className="border" border={true} src="https://files.readme.io/82d51f9-Simulator_Screen_Shot_-_iPhone_7_-_2018-07-30_at_12.44.05.png" />

Following code handles the A/B testing for Sorting campaign

```swift
let variation = VWO.variationNameFor(campaignKey: "sorting")
switch variation {
case "Sort-Alphabetically":
    phoneList.sort(by: sortPhoneAlphabetically)
case "Sort-By-Price":
    phoneList.sort(by: sortPhoneByPrice)
default:
    print("Default")
    break
}
tableView.reloadData()
```

The code above does the following things

1. Get the variation name for a campaign whose campaign key is "sorting"
2. Depending on the variation name we decide if the sorting is to be done alphabetically or by price
3. Once the list is sorted we reload the table data

## Defining Goals

Click **Next**, and then define a goal using the following goal identifier.

We can see if the goals work correctly.\
Click **Verify**.

![1372](https://files.readme.io/2a0a3d2-Screenshot_2018-08-03_at_5.11.42_PM.png "Screenshot 2018-08-03 at 5.11.42 PM.png")

Select your device from the drop-down menu.

![1206](https://files.readme.io/d841c57-Screen_Shot_2018-07-30_at_2.45.53_PM.png "Screen Shot 2018-07-30 at 2.45.53 PM.png")

On selecting any product (phone) from the list, you can see the product details.

<Image className="border" border={true} src="https://files.readme.io/2fccc1f-Simulator_Screen_Shot_-_iPhone_7_-_2018-07-30_at_14.47.06.png" />

When you select the product, Goal 1 becomes Verified.

![1208](https://files.readme.io/b4b388e-Screen_Shot_2018-07-30_at_2.34.28_PM.png "Screen Shot 2018-07-30 at 2.34.28 PM.png")

This happens because, we have placed `VWO.trackConversion( "productView")` code upon selecting a product.

If you want to verify the goal for variation, select **Variation** from the drop-down menu, select refresh in the app, and then repeat the same process.

## Finalize Campaign

Click **Next** to move to the final stage of campaign creation. You can set percentage traffic allocation and then do advance targeting.

To start the campaign, click **Finish**.

# Variable Campaign

How do you know what content would appeal to your users\
This campaign helps us test various alerts by presenting various titles and content

## Defining Variation

Steps to run Layout Campaign:

1. Under Mobile App A/B, click **Create** and then choose your mobile app.
2. In the **Variations** screen, create variable named **heading** and **content** of String type
3. Set the values accordingly
4. You can use the code generated on right side

![1812](https://files.readme.io/db93159-Screenshot_2018-08-02_at_1.21.08_PM.png "Screenshot 2018-08-02 at 1.21.08 PM.png")

After creating the variables add them to your campaign and set values accordingly

![1364](https://files.readme.io/1539463-Screen_Shot_2018-07-30_at_2.38.04_PM.png "Screen Shot 2018-07-30 at 2.38.04 PM.png")

Select your device from the options(three dots), and then select **Preview on Device**.

![1208](https://files.readme.io/18e47f2-Screen_Shot_2018-07-30_at_2.56.21_PM.png "Screen Shot 2018-07-30 at 2.56.21 PM.png")

In your app, click on any house in the list and you can verify the look and feel of all the variation\
The variation section of the demo app will change.

<Image className="border" border={true} src="https://files.readme.io/f10027a-Simulator_Screen_Shot_-_iPhone_7_-_2018-07-30_at_12.52.58.png" />

## Defining Goals

Click **Next** and then define a goal using the following goal identifier.

We can see if goals work correctly.\
Click **Verify**.

<Image className="border" border={true} src="https://files.readme.io/fc19a58-Screen_Shot_2018-07-30_at_2.38.18_PM.png" />

From the device drop-down menu, select your device.

<Image className="border" border={true} src="https://files.readme.io/293d35b-Screen_Shot_2018-07-30_at_2.59.08_PM.png" />

When you tap on upgrade button in the alert, the goal will get verified

<Image className="border" border={true} src="https://files.readme.io/f099cd2-Screen_Shot_2018-07-30_at_2.38.43_PM.png" />

This happens because , we have placed `VWO.markConversionFor(goal: "upgrade-clicked")` code on tapping the upgrade button.

If you want to verify the goal for the variation, select **Variation** from the Control drop-down menu and then tap on Upgrade button in alert

## Finalize Campaign

To move to the final stage of campaign creation, click **Next**. Now, you can set percentage traffic allocation and perform advance targeting.

To start the campaign, click **Finish**.
