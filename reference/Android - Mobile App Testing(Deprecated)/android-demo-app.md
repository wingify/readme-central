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

## Running the Demo App
Clone the demo app from https://github.com/wingify/vwo-android.
You can find the demo app inside the ``demo/`` subdirectory
OR
You can download the APK [here](https://github.com/wingify/vwo-android/releases/download/v2.4.2/demo-release.apk). 


## Enter ApiKey
You need to add an app to your VWO account. Please refer to [Adding an App](ref:android-adding-an-app) for details.
Copy your ```ApiKey```.
Run the app from Android Studio. You can choose either a simulator or your USB Android device.

After the app is running, click the **Menu** icon in the upper-left corner.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/460df16-Screenshot_2018-08-02_at_12.26.23_PM.png",
        "Screenshot 2018-08-02 at 12.26.23 PM.png",
        382,
        636,
        "#bebebf"
      ],
      "border": true
    }
  ]
}
[/block]
Select **Enter API Key** from the menu options and then type your API key.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/24e445c-Screenshot_2018-08-02_at_12.35.27_PM.png",
        "Screenshot 2018-08-02 at 12.35.27 PM.png",
        382,
        633,
        "#7d7d7e"
      ]
    }
  ]
}
[/block]
# Sorting Campaign
Showing a list of items is a common requirement for many apps.
How do you know what sequence is better? What better way to tell them to A/B test!

## Defining Variation
Steps to run Sorting Campaign:
1. Under Mobile App A/B, click **Create Menu** and then choose your App, platform and set campaign key to "sorting". Click Next for Variations screen.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/d7e3993-Screenshot_2018-08-02_at_5.00.48_PM.png",
        "Screenshot 2018-08-02 at 5.00.48 PM.png",
        1416,
        942,
        "#f9fafa"
      ]
    }
  ]
}
[/block]
2. On the **Variations** screen we don't add anything as this is a campaign key based A/B testing
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/2c43147-803d897-Screen_Shot_2018-08-03_at_12.00.45_PM.png",
        "803d897-Screen_Shot_2018-08-03_at_12.00.45_PM.png",
        1368,
        612,
        "#f9fafa"
      ]
    }
  ]
}
[/block]
After launching VWO SDK in your app, click the **Refresh** icon located in the upper-right corner of the navigation bar.
This should change the sequence of items

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3dd7d0f-Screenshot_2018-08-02_at_5.09.07_PM.png",
        "Screenshot 2018-08-02 at 5.09.07 PM.png",
        764,
        1268,
        "#d5d5d8"
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
      "code": "String variationName = VWO.getVariationNameForTestKey(\"sorting\");\nif (variationName != null) {\n  switch (variationName) {\n    case \"Sort-Alphabetically\":\n      sortByName();\n      break;\n    case \"upgrade-clicked\":\n      sortByPrice();\n      break;\n    default:\n      shuffle();\n      break;\n  }\n}",
      "language": "java"
    },
    {
      "code": "val variationName = VWO.getVariationNameForTestKey(\"sorting\")\nvariationName.let {\n  when (it) {\n    \"Sort-Alphabetically\" -> sortByName()\n    \"upgrade-clicked\" -> sortByPrice()\n    else -> shuffle()\n  }\n}",
      "language": "kotlin",
      "name": null
    }
  ]
}
[/block]
The code above does the following things
1. Get the variation name for the campaign whose campaign key is "sorting"
2. Depending on the variation name we decide if the sorting is to be done alphabetically or by price
3. Once the list is sorted we reload the list data

## Defining Goals
Click **NEXT**, and then define a goal using the below goal identifier.
[block:code]
{
  "codes": [
    {
      "code": "productView",
      "language": "text",
      "name": "Goal Identifier"
    }
  ]
}
[/block]
We can see if the goals work fine.
Click **Verify**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1a1051f-Screenshot_2018-08-03_at_2.23.48_PM.png",
        "Screenshot 2018-08-03 at 2.23.48 PM.png",
        1364,
        400,
        "#eaeced"
      ]
    }
  ]
}
[/block]
Select your device from the menu.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c10e5b7-Screenshot_2018-08-02_at_5.27.57_PM.png",
        "Screenshot 2018-08-02 at 5.27.57 PM.png",
        603,
        371,
        "#f5f6f7"
      ]
    }
  ]
}
[/block]
On selecting any product (phone) from the variation list, you can see the product details.

When you select the product, Goal 1 becomes VERIFIED.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/555e983-Screenshot_2018-08-02_at_5.29.25_PM.png",
        "Screenshot 2018-08-02 at 5.29.25 PM.png",
        764,
        1266,
        "#d4d2cb"
      ],
      "border": true
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/352e2b6-Screenshot_2018-08-02_at_5.29.59_PM.png",
        "Screenshot 2018-08-02 at 5.29.59 PM.png",
        604,
        371,
        "#f4f6f7"
      ]
    }
  ]
}
[/block]
This happens because we have placed ```VWO.trackConversion("productView")``` code upon selecting a product.

If you want to verify the goal for variation, select Variation from the dropdown and hit refresh in the app, and repeat the same process.

## Finalise Campaign
Click on NEXT button to move to the final stage of campaign creation. You can set the percentage traffic allocation and do advanced targeting.

Click on FINISH to start the campaign.

# Variable Campaign
How do you know what content would appeal to your users
This campaign helps us test various alerts by presenting various titles and content

## Defining Variation
Steps to run Layout Campaign:
1. Under Mobile App A/B, click **Create** and then choose your mobile app.
2. In the **Variations** screen, create variable named **heading** and **content** of String type
3. Set the values accordingly
4. You can use the code generated on the right side
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/287c8fe-Screenshot_2018-08-02_at_1.20.54_PM.png",
        "Screenshot 2018-08-02 at 1.20.54 PM.png",
        1808,
        878,
        "#f2f3f4"
      ]
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
        "https://files.readme.io/40eddfa-Screenshot_2018-08-02_at_1.17.58_PM.png",
        "Screenshot 2018-08-02 at 1.17.58 PM.png",
        1490,
        1182,
        "#f3f4f5"
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
        "https://files.readme.io/cf0a334-Screen_Shot_2018-06-01_at_7.30.43_PM.png",
        "Screen Shot 2018-06-01 at 7.30.43 PM.png",
        1326,
        726,
        "#d2d5d8"
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
        "https://files.readme.io/b71c158-Screenshot_2018-08-02_at_5.36.47_PM.png",
        "Screenshot 2018-08-02 at 5.36.47 PM.png",
        762,
        1268,
        "#777377"
      ]
    }
  ]
}
[/block]
## Defining Goals
Click **Next** and then define a goal using the following goal identifier.

We can see if goals work correctly.
Click **Verify**.
[block:code]
{
  "codes": [
    {
      "code": "upgrade-clicked",
      "language": "text",
      "name": "Goal Identifier"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/74a7bc8-Screenshot_2018-08-02_at_5.40.21_PM.png",
        "Screenshot 2018-08-02 at 5.40.21 PM.png",
        1319,
        184,
        "#eaecee"
      ],
      "border": true
    }
  ]
}
[/block]
Select your device from the menu.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/608716a-Screenshot_2018-08-02_at_5.39.50_PM.png",
        "Screenshot 2018-08-02 at 5.39.50 PM.png",
        604,
        371,
        "#f4f6f7"
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
        "https://files.readme.io/354bb03-Screenshot_2018-08-02_at_5.43.40_PM.png",
        "Screenshot 2018-08-02 at 5.43.40 PM.png",
        607,
        374,
        "#f2f3f4"
      ],
      "border": true
    }
  ]
}
[/block]
This happens because we have placed ```VWO.trackConversion("upgrade-clicked")``` code on tapping the upgrade button.

If you want to verify the goal for the variation, select **Variation** from the Control drop-down menu and then tap on Upgrade button in the alert

## Finalize Campaign
To move to the final stage of campaign creation, click **Next**. Now, you can set the percentage traffic allocation and perform advanced targeting.

To start the campaign, click **Finish**.
Click on FINISH to start the campaign.