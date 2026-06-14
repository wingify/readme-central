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

### Installation

```shell
git clone https://github.com/wingify/vwo-react-native-demo
cd vwo-react-native-demo
npm install
```

### iOS

```shell
cd iOS
pod install
react-native run-ios
```

### Android

```shell
react-native run-android
```

## Enter ApiKey

You need to add an app to your VWO account. Please refer to [Adding an App](ref:android-adding-an-app) for details.\
Copy your `ApiKey`.\
Run the app from Android Studio/Xcode.

After the app is running, click the **Menu** icon in the upper-left corner.

<Image className="border" border={true} src="https://files.readme.io/ec9233c-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_10.59.48.png" />

Select **Enter API Key** from the menu options and then type your API key.

# Sorting Campaign

Showing a list of items is a common requirement for many apps.\
How do you know what sequence is better? What better way to tell than to A/B test!

## Defining Variation

Steps to run Sorting Campaign:

1. Under Mobile App A/B, click **Create Menu** and then choose your App, platform and set test key to "sorting". Click Next for Variations screen.
2. On the **Variations** screen, update the variation names as seen in the image below

<Image className="border" border={true} src="https://files.readme.io/10d0c04-Screen_Shot_2018-08-08_at_11.07.39_AM.png" />

In your app, click the **Refresh** icon located in the upper-right corner of the navigation bar.\
This should change the sequence of items. Items are now sorted by price

![750](https://files.readme.io/e8b348d-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.00.10.png "Simulator Screen Shot - iPhone 7 - 2018-08-08 at 11.00.10.png")

Following code handles the A/B testing for Sorting campaign

```javascript
sortPhoneList = async () => {
  var newList = phoneList
  const variation = await VWO.variationNameForTestKey("sorting")
  if (variation == "Sort-Alphabetically") {
    newList.sort(function(a,b) {
      return ((a.name > b.name) ? 0 : -1 );
    });
  } else if (variation == "Sort-By-Price") {
    newList.sort(function(a,b) {
      return ((a.price > b.price) ? 0 : -1 );
    });      
  }
  this.setState({ phones: newList })
}
```

The code above does following things

1. Get the variation name for campaign whose test key is "sorting"
2. Depending on the variation name we decide if the sorting is to be done alphabetically or by price
3. Once the list is sorted we reload the table data

## Defining Goals

Click **Next**, and then define a goal using the following goal identifier.

We can see if the goals work correctly.\
Click **Verify**.

![1292](https://files.readme.io/b409d3d-Screen_Shot_2018-08-08_at_11.03.32_AM.png "Screen Shot 2018-08-08 at 11.03.32 AM.png")

Select your device from the drop-down menu.

![1230](https://files.readme.io/15dcd27-Screen_Shot_2018-08-08_at_11.03.41_AM.png "Screen Shot 2018-08-08 at 11.03.41 AM.png")

On selecting any product (phone) from the list, you can see the product details.

<Image className="border" border={true} src="https://files.readme.io/126db34-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.12.52.png" />

When you select the product, Goal 1 becomes Verified.

![1224](https://files.readme.io/97c359e-Screen_Shot_2018-08-08_at_11.03.52_AM.png "Screen Shot 2018-08-08 at 11.03.52 AM.png")

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

<Image className="border" border={true} src="https://files.readme.io/7eed8c5-db93159-Screenshot_2018-08-02_at_1.21.08_PM.png" />

After creating the variables add them to your campaign and set values accordingly

![1364](https://files.readme.io/8494c84-1539463-Screen_Shot_2018-07-30_at_2.38.04_PM.png "1539463-Screen_Shot_2018-07-30_at_2.38.04_PM.png")

Select your device from the options(three dots), and then select **Preview on Device**.

![1232](https://files.readme.io/f86490d-Screen_Shot_2018-08-08_at_11.01.38_AM.png "Screen Shot 2018-08-08 at 11.01.38 AM.png")

In your app, click on any house in the list and you can verify the look and feel of all the variation\
The variation section of the demo app will change.

<Image className="border" border={true} src="https://files.readme.io/8b989c2-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.01.21.png" />

## Defining Goals

Click **Next** and then define a goal using the following goal identifier.

We can see if goals work correctly.\
Click **Verify**.

<Image className="border" border={true} src="https://files.readme.io/bf12f96-Screen_Shot_2018-08-08_at_11.01.56_AM.png" />

From the device drop-down menu, select your device.

<Image className="border" border={true} src="https://files.readme.io/7e072d8-Screen_Shot_2018-08-08_at_11.02.10_AM.png" />

When you tap on upgrade button in the alert, the goal will get verified

<Image className="border" border={true} src="https://files.readme.io/5f31bc1-Screen_Shot_2018-08-08_at_11.02.20_AM.png" />

This happens because , we have placed `VWO.markConversionFor(goal: "upgrade-clicked")` code on tapping the upgrade button.

If you want to verify the goal for the variation, select **Variation** from the Control drop-down menu and then tap on Upgrade button in alert

## Finalize Campaign

To move to the final stage of campaign creation, click **Next**. Now, you can set percentage traffic allocation and perform advance targeting.

To start the campaign, click **Finish**.
