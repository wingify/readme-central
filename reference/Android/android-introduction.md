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
To create and run A/B tests, sign in to the VWO dashboard and then select [Mobile App A/B](https://app.vwo.com/#/test/mobile-ab) on the menu. If you are using the VWO A/B testing feature for the first time, click **Start Mobile App A/B Testing** to begin.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/1ac220a-Screen_Shot_2017-12-15_at_3.15.46_PM.png",
        "Screen Shot 2017-12-15 at 3.15.46 PM.png",
        348,
        350,
        "#2d3d46"
      ],
      "border": true
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
  "title": "Add the mobile app to be tested"
}
[/block]
To add a new app for A/B testing, go to the **Apps** section on the page.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/7c4d57f-MobileAppAB-1.png",
        "MobileAppAB-1.png",
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
        "https://files.readme.io/be06a8c-MobileAppAB-1.jpg",
        "MobileAppAB-1.jpg",
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
  "title": "Installing SDK"
}
[/block]
You can use Gradle to install the VWO Android SDK by adding VWO SDK dependency in your ```build.gradle``` file. Click [here](ref:android-sdk-reference) for detailed installation instructions.
[block:code]
{
  "codes": [
    {
      "code": "repositories {\n    mavenCentral()\n}\n\ndependencies {\n    compile 'com.vwo:mobile:2.4.2@aar'\n    compile ('io.socket:socket.io-client:1.0.0') {\n        // excluding org.json which is provided by Android\n        exclude group: 'org.json', module: 'json'\n    }  \n  \t// Skip this if you are already including support library in your app.\n    compile 'com.android.support:support-core-utils:27.1.1'\n}\n",
      "language": "groovy",
      "name": "Dependencies"
    }
  ]
}
[/block]
Add following permissions to your ```AndroidManifest.xml``` file
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
After installing the SDK, you can initialize the app  in the ```onCreate``` function of the activity or the application. Click [here](ref:android-launching-sdk) for detailed instructions. 
[block:code]
{
  "codes": [
    {
      "code": "import android.support.v7.app.AppCompatActivity;\nimport android.os.Bundle;\nimport com.vwo.mobile.VWO;\n\npublic class MainActivity extends AppCompatActivity {\n  private static final String VWO_API_KEY = \"YOUR_VWO_API_KEY\";\n\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n\n    // Start VWO SDK in Async mode with callback\n    VWO.with(this, VWO_API_KEY).launch(new VWOStatusListener() {\n      @Override\n      public void onVWOLoaded() {\n        // VWO loaded successfully\n      }\n      @Override\n      public void onVWOLoadFailure(String reason) {\n        // VWO not loaded\n      }\n    });\n  }\n}",
      "language": "java"
    },
    {
      "code": "import android.support.v7.app.AppCompatActivity\nimport android.os.Bundle\nimport com.vwo.mobile.VWO\n  \nclass MainActivity : AppCompatActivity() {\n  private val VWO_API_KEY = \"YOUR_VWO_API_KEY\"\n\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n    // Start VWO SDK in Async mode with callback\n    VWO.with(this, VWO_API_KEY).launch(object : VWOStatusListener {\n      override fun onVWOLoaded() {\n        TODO(\"not implemented\")\n      }\n\n      override fun onVWOLoadFailure(error: String?) {\n        TODO(\"not implemented\")\n      }\n\n    })\n  }\n}",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]

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
        "https://files.readme.io/d03146b-517c125-preview.png",
        "517c125-preview.png",
        2528,
        1328,
        "#909192"
      ]
    }
  ]
}
[/block]
You can view the relevant Java, Objective, or Swift code snippet in the right panel as you create the variable. You can use this code snippet to update the changes in your mobile app code.

In your mobile app, use the code snippet for your app variables. For example, instead of using ```int speed = 5;``` use the below code.
[block:code]
{
  "codes": [
    {
      "code": "int speed = VWO.getIntegerForKey(\"speed\", 5);",
      "language": "java"
    },
    {
      "code": "val speed = VWO.getIntegerForKey(\"speed\", 5)",
      "language": "kotlin"
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

Enter a unique identifier in the **Define a test key **field to filter your tests easily. The test key helps you execute custom logic, as explained in this [Code Blocks](ref:code-blocks) section.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0e3b074-mobile-app-6.jpg",
        "mobile-app-6.jpg",
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
        "https://files.readme.io/b3b8c33-mobile-app-ab-7.jpg",
        "mobile-app-ab-7.jpg",
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

To continue, click **Next**.
[block:code]
{
  "codes": [
    {
      "code": "String variationName = VWO.getVariationNameForTestKey(\"test_key\");\nif (variationName != null && variationName.equals(\"Control\")) {\n   // TODO: code for Control variation\n} else if(variationName != null && variationName.equals(\"Variation 1\")) {\n   // TODO: code for Variation 1\n} else {\n   // TODO: default case\n}",
      "language": "java"
    },
    {
      "code": "val variationName = VWO.getVariationNameForTestKey(\"test_key\")\nif (variationName != null && variationName == \"Control\") {\n  // TODO: code for Control variation\n} else if (variationName != null && variationName == \"Variation 1\") {\n  // TODO: code for Variation 1\n} else {\n  // TODO: default case\n}",
      "language": "kotlin"
    }
  ]
}
[/block]
## Define Goals
In the next step, define at least one goal. Goal is a conversion matrix that we want to optimize.

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
In the mobile app, use the code below to trigger this goal.
[block:code]
{
  "codes": [
    {
      "code": "VWO.trackConversion(\"conversionGoal\");",
      "language": "java"
    },
    {
      "code": "VWO.trackConversion(\"conversionGoal\")",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
## Finalize
In the **Finalize** step, we can set the percentage of users that we want to include in the campaign.
Under the **Advanced** option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.
For quick setup, we can leave the settings in Advanced as default.

To run the campaign, click **Finish > Start Now**.
[block:api-header]
{
  "title": "Reports"
}
[/block]
From the Mobile App A/B menu option, select your campaign and click on **DETAILED REPORTS** to see reports of your campaign.
[block:api-header]
{
  "title": "Source Code"
}
[/block]
VWO Android SDK code is available on GitHub:
https://github.com/wingify/vwo-android
[block:api-header]
{
  "title": "Next Steps"
}
[/block]
As a next step, take a look at [SDK Reference](ref:android-sdk-reference)  to look at more advanced options of using the SDK.
We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).