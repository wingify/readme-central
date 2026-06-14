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

Clone the demo app from [https://github.com/wingify/vwo-android](https://github.com/wingify/vwo-android).\
You can find the demo app inside the `demo/` subdirectory\
OR\
You can download the APK [here](https://github.com/wingify/vwo-android/releases/download/v2.4.2/demo-release.apk). 

## Enter ApiKey

You need to add an app to your VWO account. Please refer to [Adding an App](ref:android-adding-an-app) for details.\
Copy your `ApiKey`.\
Run the app from Android Studio. You can choose either a simulator or your USB Android device.

After the app is running, click the **Menu** icon in the upper-left corner.

<Image className="border" border={true} src="https://files.readme.io/460df16-Screenshot_2018-08-02_at_12.26.23_PM.png" />

Select **Enter API Key** from the menu options and then type your API key.

![382](https://files.readme.io/24e445c-Screenshot_2018-08-02_at_12.35.27_PM.png "Screenshot 2018-08-02 at 12.35.27 PM.png")

# Sorting Campaign

Showing a list of items is a common requirement for many apps.\
How do you know what sequence is better? What better way to tell them to A/B test!

## Defining Variation

Steps to run Sorting Campaign:

1. Under Mobile App A/B, click **Create Menu** and then choose your App, platform and set campaign key to "sorting". Click Next for Variations screen.

![1416](https://files.readme.io/d7e3993-Screenshot_2018-08-02_at_5.00.48_PM.png "Screenshot 2018-08-02 at 5.00.48 PM.png")

2. On the **Variations** screen we don't add anything as this is a campaign key based A/B testing

![1368](https://files.readme.io/2c43147-803d897-Screen_Shot_2018-08-03_at_12.00.45_PM.png "803d897-Screen_Shot_2018-08-03_at_12.00.45_PM.png")

After launching VWO SDK in your app, click the **Refresh** icon located in the upper-right corner of the navigation bar.\
This should change the sequence of items

![764](https://files.readme.io/3dd7d0f-Screenshot_2018-08-02_at_5.09.07_PM.png "Screenshot 2018-08-02 at 5.09.07 PM.png")

Following code handles the A/B testing for Sorting campaign

```java
String variationName = VWO.getVariationNameForTestKey("sorting");
if (variationName != null) {
  switch (variationName) {
    case "Sort-Alphabetically":
      sortByName();
      break;
    case "upgrade-clicked":
      sortByPrice();
      break;
    default:
      shuffle();
      break;
  }
}
```
```kotlin
val variationName = VWO.getVariationNameForTestKey("sorting")
variationName.let {
  when (it) {
    "Sort-Alphabetically" -> sortByName()
    "upgrade-clicked" -> sortByPrice()
    else -> shuffle()
  }
}
```

The code above does the following things

1. Get the variation name for the campaign whose campaign key is "sorting"
2. Depending on the variation name we decide if the sorting is to be done alphabetically or by price
3. Once the list is sorted we reload the list data

## Defining Goals

Click **NEXT**, and then define a goal using the below goal identifier.

```text Goal Identifier
productView
```

We can see if the goals work fine.\
Click **Verify**.

![1364](https://files.readme.io/1a1051f-Screenshot_2018-08-03_at_2.23.48_PM.png "Screenshot 2018-08-03 at 2.23.48 PM.png")

Select your device from the menu.

![603](https://files.readme.io/c10e5b7-Screenshot_2018-08-02_at_5.27.57_PM.png "Screenshot 2018-08-02 at 5.27.57 PM.png")

On selecting any product (phone) from the variation list, you can see the product details.

When you select the product, Goal 1 becomes VERIFIED.

<Image className="border" border={true} src="https://files.readme.io/555e983-Screenshot_2018-08-02_at_5.29.25_PM.png" />

![604](https://files.readme.io/352e2b6-Screenshot_2018-08-02_at_5.29.59_PM.png "Screenshot 2018-08-02 at 5.29.59 PM.png")

This happens because we have placed `VWO.trackConversion("productView")` code upon selecting a product.

If you want to verify the goal for variation, select Variation from the dropdown and hit refresh in the app, and repeat the same process.

## Finalise Campaign

Click on NEXT button to move to the final stage of campaign creation. You can set the percentage traffic allocation and do advanced targeting.

Click on FINISH to start the campaign.

# Variable Campaign

How do you know what content would appeal to your users\
This campaign helps us test various alerts by presenting various titles and content

## Defining Variation

Steps to run Layout Campaign:

1. Under Mobile App A/B, click **Create** and then choose your mobile app.
2. In the **Variations** screen, create variable named **heading** and **content** of String type
3. Set the values accordingly
4. You can use the code generated on the right side

![1808](https://files.readme.io/287c8fe-Screenshot_2018-08-02_at_1.20.54_PM.png "Screenshot 2018-08-02 at 1.20.54 PM.png")

After creating the variables add them to your campaign and set values accordingly

![1490](https://files.readme.io/40eddfa-Screenshot_2018-08-02_at_1.17.58_PM.png "Screenshot 2018-08-02 at 1.17.58 PM.png")

Select your device from the options(three dots), and then select **Preview on Device**.

![1326](https://files.readme.io/cf0a334-Screen_Shot_2018-06-01_at_7.30.43_PM.png "Screen Shot 2018-06-01 at 7.30.43 PM.png")

In your app, click on any house in the list and you can verify the look and feel of all the variation\
The variation section of the demo app will change.

![762](https://files.readme.io/b71c158-Screenshot_2018-08-02_at_5.36.47_PM.png "Screenshot 2018-08-02 at 5.36.47 PM.png")

## Defining Goals

Click **Next** and then define a goal using the following goal identifier.

We can see if goals work correctly.\
Click **Verify**.

```text Goal Identifier
upgrade-clicked
```

<Image className="border" border={true} src="https://files.readme.io/74a7bc8-Screenshot_2018-08-02_at_5.40.21_PM.png" />

Select your device from the menu.

<Image className="border" border={true} src="https://files.readme.io/608716a-Screenshot_2018-08-02_at_5.39.50_PM.png" />

When you tap on upgrade button in the alert, the goal will get verified

<Image className="border" border={true} src="https://files.readme.io/354bb03-Screenshot_2018-08-02_at_5.43.40_PM.png" />

This happens because we have placed `VWO.trackConversion("upgrade-clicked")` code on tapping the upgrade button.

If you want to verify the goal for the variation, select **Variation** from the Control drop-down menu and then tap on Upgrade button in the alert

## Finalize Campaign

To move to the final stage of campaign creation, click **Next**. Now, you can set the percentage traffic allocation and perform advanced targeting.

To start the campaign, click **Finish**.\
Click on FINISH to start the campaign.
