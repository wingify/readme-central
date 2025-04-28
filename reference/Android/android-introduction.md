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

<Image className="border" border={true} src="https://files.readme.io/1ac220a-Screen_Shot_2017-12-15_at_3.15.46_PM.png" />

To create A/B tests for mobile apps:

Add the mobile app to be tested.

Define the variables you want to test.

Create A/B tests.

## Add the mobile app to be tested

To add a new app for A/B testing, go to the **Apps** section on the page.

![1566](https://files.readme.io/7c4d57f-MobileAppAB-1.png "MobileAppAB-1.png")

On the right side of the screen, click **Create App**.\
Type the name of the app you want to add, and then click **Create**.

![1206](https://files.readme.io/be06a8c-MobileAppAB-1.jpg "MobileAppAB-1.jpg")

As you add an app, VWO generates API Keys for both the iOS and Android platforms. You can make a note of the API Key under the Settings section and are used during app initialization.

## Installing SDK

You can use Gradle to install the VWO Android SDK by adding VWO SDK dependency in your `build.gradle` file. Click [here](ref:android-sdk-reference) for detailed installation instructions.

```groovy Dependencies
repositories {
    mavenCentral()
}

dependencies {
    compile 'com.vwo:mobile:2.4.2@aar'
    compile ('io.socket:socket.io-client:1.0.0') {
        // excluding org.json which is provided by Android
        exclude group: 'org.json', module: 'json'
    }  
  	// Skip this if you are already including support library in your app.
    compile 'com.android.support:support-core-utils:27.1.1'
}
```

Add following permissions to your `AndroidManifest.xml` file

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

After installing the SDK, you can initialize the app  in the `onCreate` function of the activity or the application. Click [here](ref:android-launching-sdk) for detailed instructions. 

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import com.vwo.mobile.VWO;

public class MainActivity extends AppCompatActivity {
  private static final String VWO_API_KEY = "YOUR_VWO_API_KEY";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Start VWO SDK in Async mode with callback
    VWO.with(this, VWO_API_KEY).launch(new VWOStatusListener() {
      @Override
      public void onVWOLoaded() {
        // VWO loaded successfully
      }
      @Override
      public void onVWOLoadFailure(String reason) {
        // VWO not loaded
      }
    });
  }
}
```
```kotlin Kotlin
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.vwo.mobile.VWO
  
class MainActivity : AppCompatActivity() {
  private val VWO_API_KEY = "YOUR_VWO_API_KEY"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    // Start VWO SDK in Async mode with callback
    VWO.with(this, VWO_API_KEY).launch(object : VWOStatusListener {
      override fun onVWOLoaded() {
        TODO("not implemented")
      }

      override fun onVWOLoadFailure(error: String?) {
        TODO("not implemented")
      }

    })
  }
}
```

## Defining the Variables You Want To Test

Test variables are elements or parameters of your mobile app. After you define a variable, you can run an unlimited number of A/B tests on the variable, without doing any code changes or redeployment. For example, you can create a string-type variable for testing different text versions in the app screen.

Under the **Apps** tab, select the mobile app for which you want to create test variables.

To add an element for testing, under Variables section, click **Create** Variable.

Assign a name to the variable, and then select its data type. 

Type **Default Value** (current value or a value if there is no A/B test).

To add the variable, click Create. You can add multiple variables to an app.

![2528](https://files.readme.io/d03146b-517c125-preview.png "517c125-preview.png")

You can view the relevant Java, Objective, or Swift code snippet in the right panel as you create the variable. You can use this code snippet to update the changes in your mobile app code.

In your mobile app, use the code snippet for your app variables. For example, instead of using `int speed = 5;` use the below code.

```java
int speed = VWO.getIntegerForKey("speed", 5);
```
```kotlin
val speed = VWO.getIntegerForKey("speed", 5)
```

## Creating A/B Tests for Mobile Apps

On the **Mobile App A/B** testing screen, go to the **Campaigns** tab, and then click **Create**. 

Choose the App you want to test. All mobile apps you have added to VWO are listed here.

Select a platform where the app is running.

Enter a unique identifier in the **Define a test key** field to filter your tests easily. The test key helps you execute custom logic, as explained in this [Code Blocks](ref:code-blocks) section.

![1471](https://files.readme.io/0e3b074-mobile-app-6.jpg "mobile-app-6.jpg")

Select Next and click **Add Variable**. All the variables you have created for the test are displayed here. You can choose to Create Variable by adding a new test variable.

![1437](https://files.readme.io/b3b8c33-mobile-app-ab-7.jpg "mobile-app-ab-7.jpg")

Select the variable you want to test, and then enter the variation values. You can test multiple variables in one test. In the example above, we have added speed variable, defined value as 20 for the variation. For control, the value is 10, which is the default value for the variable. 

Based on the test key and variation names, VWO generates the code snippet that you can use in the mobile app.

To continue, click **Next**.

```java
String variationName = VWO.getVariationNameForTestKey("test_key");
if (variationName != null && variationName.equals("Control")) {
   // TODO: code for Control variation
} else if(variationName != null && variationName.equals("Variation 1")) {
   // TODO: code for Variation 1
} else {
   // TODO: default case
}
```
```kotlin
val variationName = VWO.getVariationNameForTestKey("test_key")
if (variationName != null && variationName == "Control") {
  // TODO: code for Control variation
} else if (variationName != null && variationName == "Variation 1") {
  // TODO: code for Variation 1
} else {
  // TODO: default case
}
```

## Define Goals

In the next step, define at least one goal. Goal is a conversion matrix that we want to optimize.

```text Goal
conversionGoal
```

In the mobile app, use the code below to trigger this goal.

```java
VWO.trackConversion("conversionGoal");
```
```kotlin Kotlin
VWO.trackConversion("conversionGoal")
```

## Finalize

In the **Finalize** step, we can set the percentage of users that we want to include in the campaign.\
Under the **Advanced** option, we can also target the campaign for specific user types, enable scheduling, or change traffic allocation for each variation.\
For quick setup, we can leave the settings in Advanced as default.

To run the campaign, click **Finish > Start Now**.

## Reports

From the Mobile App A/B menu option, select your campaign and click on **DETAILED REPORTS** to see reports of your campaign.

## Source Code

VWO Android SDK code is available on GitHub:\
[https://github.com/wingify/vwo-android](https://github.com/wingify/vwo-android)

## Next Steps

As a next step, take a look at [SDK Reference](ref:android-sdk-reference)  to look at more advanced options of using the SDK.\
We would look forward to hear from you about any question or feedback at [support@vwo.com](mailto:support@vwo.com).
