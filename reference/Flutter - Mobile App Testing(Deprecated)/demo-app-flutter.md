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
Using the VWO demo app, you can try Mobile App A/B testing.
To try the demo app, you will need ```ApiKey```.

### Installation
[block:code]
{
  "codes": [
    {
      "code": "git clone https://github.com/wingify/vwo-flutter-sdk\ncd vwo-flutter-sdk/example\nflutter pub get",
      "language": "shell"
    }
  ]
}
[/block]
### iOS/Android
[block:code]
{
  "codes": [
    {
      "code": "flutter run",
      "language": "shell"
    }
  ]
}
[/block]
## Enter ApiKey
You need to add an app to your VWO account. Please refer to [Adding an App](ref:android-adding-an-app) for details.
Copy your ```ApiKey```.
Run the app from Android Studio/Xcode.

After the app is running, click the **Menu** icon in the upper-left corner.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ec9233c-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_10.59.48.png",
        "Simulator Screen Shot - iPhone 7 - 2018-08-08 at 10.59.48.png",
        750,
        1334,
        "#e9eaeb"
      ],
      "border": true
    }
  ]
}
[/block]
Select **Enter API Key** from the menu options and then type your API key.

# Sorting Campaign
Showing a list of items is a common requirement for many apps.
How do you know what sequence is better? What better way to tell than to A/B test!
## Defining Variation
Steps to run Sorting Campaign:
1. Under Mobile App A/B, click **Create Menu** and then choose your App, platform and set test key to "sorting". Click Next for Variations screen.
2. On the **Variations** screen, update the variation names as seen in the image below

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/10d0c04-Screen_Shot_2018-08-08_at_11.07.39_AM.png",
        "Screen Shot 2018-08-08 at 11.07.39 AM.png",
        1364,
        564,
        "#f9fafa"
      ],
      "border": true
    }
  ]
}
[/block]
In your app, click the **Refresh** icon located in the upper-right corner of the navigation bar.
This should change the sequence of items. Items are now sorted by price
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e8b348d-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.00.10.png",
        "Simulator Screen Shot - iPhone 7 - 2018-08-08 at 11.00.10.png",
        750,
        1334,
        "#ebe8ea"
      ]
    }
  ]
}
[/block]
Following code handles the A/B testing for Sorting campaign


[block:code]
{
  "codes": [
    {
      "code": "String variationName =\n      await VWO.getVariationNameForTestKey(Constants.TEST_KEY_SORTING);\n   if (variationName != null) {\n     switch (variationName) {\n       case Constants.TEST_KEY_VALUE_SORT_BY_NAME:\n         mobileList.sort((a, b) => a.name.compareTo(b.name));\n         break;\n       case Constants.TEST_KEY_VALUE_SORT_BY_PRICE:\n         mobileList.sort((a, b) => a.price.compareTo(b.price));\n         break;\n       default:\n         mobileList.sort((a, b) => a.id.compareTo(b.id));\n         break;\n  }\n}\n",
      "language": "typescript",
      "name": "Dart"
    }
  ]
}
[/block]
The code above does following things
1. Get the variation name for campaign whose test key is "sorting"
2. Depending on the variation name we decide if the sorting is to be done alphabetically or by price
3. Once the list is sorted we reload the table data

## Defining Goals
Click **Next**, and then define a goal using the following goal identifier.

We can see if the goals work correctly.
Click **Verify**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/b409d3d-Screen_Shot_2018-08-08_at_11.03.32_AM.png",
        "Screen Shot 2018-08-08 at 11.03.32 AM.png",
        1292,
        374,
        "#e9ebec"
      ]
    }
  ]
}
[/block]
Select your device from the drop-down menu.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/15dcd27-Screen_Shot_2018-08-08_at_11.03.41_AM.png",
        "Screen Shot 2018-08-08 at 11.03.41 AM.png",
        1230,
        774,
        "#ebecec"
      ]
    }
  ]
}
[/block]
On selecting any product (phone) from the list, you can see the product details.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/126db34-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.12.52.png",
        "Simulator Screen Shot - iPhone 7 - 2018-08-08 at 11.12.52.png",
        750,
        1334,
        "#efebe2"
      ],
      "border": true
    }
  ]
}
[/block]
When you select the product, Goal 1 becomes Verified.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/97c359e-Screen_Shot_2018-08-08_at_11.03.52_AM.png",
        "Screen Shot 2018-08-08 at 11.03.52 AM.png",
        1224,
        764,
        "#edefef"
      ]
    }
  ]
}
[/block]
This happens because, we have placed ```VWO.trackConversion( "productView")``` code upon selecting a product.

If you want to verify the goal for variation, select **Variation** from the drop-down menu, select refresh in the app, and then repeat the same process.

## Finalize Campaign
Click **Next** to move to the final stage of campaign creation. You can set percentage traffic allocation and then do advance targeting.

To start the campaign, click **Finish**.

# Variable Campaign
How do you know what content would appeal to your users
This campaign helps us test various alerts by presenting various titles and content

## Defining Variation
Steps to run Layout Campaign:
1. Under Mobile App A/B, click **Create** and then choose your mobile app.
2. In the **Variations** screen, create variable named **heading** and **content** of String type
3. Set the values accordingly
4. You can use the code generated on right side
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7eed8c5-db93159-Screenshot_2018-08-02_at_1.21.08_PM.png",
        "db93159-Screenshot_2018-08-02_at_1.21.08_PM.png",
        1812,
        874,
        "#f2f4f4"
      ],
      "border": true
    }
  ]
}
[/block]
After creating the variables add them to your campaign and set values accordingly
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8494c84-1539463-Screen_Shot_2018-07-30_at_2.38.04_PM.png",
        "1539463-Screen_Shot_2018-07-30_at_2.38.04_PM.png",
        1364,
        614,
        "#f7f8f9"
      ]
    }
  ]
}
[/block]
Select your device from the options(three dots), and then select **Preview on Device**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f86490d-Screen_Shot_2018-08-08_at_11.01.38_AM.png",
        "Screen Shot 2018-08-08 at 11.01.38 AM.png",
        1232,
        718,
        "#e7eaed"
      ]
    }
  ]
}
[/block]
In your app, click on any house in the list and you can verify the look and feel of all the variation
The variation section of the demo app will change.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8b989c2-Simulator_Screen_Shot_-_iPhone_7_-_2018-08-08_at_11.01.21.png",
        "Simulator Screen Shot - iPhone 7 - 2018-08-08 at 11.01.21.png",
        750,
        1334,
        "#797d80"
      ],
      "border": true
    }
  ]
}
[/block]
## Defining Goals
Click **Next** and then define a goal using the following goal identifier.

We can see if goals work correctly.
Click **Verify**.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bf12f96-Screen_Shot_2018-08-08_at_11.01.56_AM.png",
        "Screen Shot 2018-08-08 at 11.01.56 AM.png",
        1330,
        478,
        "#ebecee"
      ],
      "border": true
    }
  ]
}
[/block]
From the device drop-down menu, select your device.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7e072d8-Screen_Shot_2018-08-08_at_11.02.10_AM.png",
        "Screen Shot 2018-08-08 at 11.02.10 AM.png",
        1228,
        764,
        "#edeeef"
      ],
      "border": true
    }
  ]
}
[/block]
When you tap on upgrade button in the alert, the goal will get verified
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5f31bc1-Screen_Shot_2018-08-08_at_11.02.20_AM.png",
        "Screen Shot 2018-08-08 at 11.02.20 AM.png",
        1228,
        766,
        "#edeeef"
      ],
      "border": true
    }
  ]
}
[/block]
This happens because , we have placed ```VWO.markConversionFor(goal: "upgrade-clicked")``` code on tapping the upgrade button.

If you want to verify the goal for the variation, select **Variation** from the Control drop-down menu and then tap on Upgrade button in alert

## Finalize Campaign
To move to the final stage of campaign creation, click **Next**. Now, you can set percentage traffic allocation and perform advance targeting.

To start the campaign, click **Finish**.