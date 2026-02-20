---
title: Android Integration
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Application class

After installing the SDK, initialize it within the `onCreate()` function of the **FlutterApplication** class (not `Application`).

<br />

If your project doesn't already include a FlutterApplication class, create a file named MyApp.java inside the folder \<projectRoot>/android/app/src/main/java/\<your package>/.

If you selected Kotlin when creating the project, the folder path will be \<projectRoot>/android/app/src/main/kotlin/\<your package>/.

<br />

Then, copy the code below and replace the "ACCOUNT_ID" and "SDK_KEY" with the appropriate values from the dashboard.

<br />

```java
import android.util.Log;
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;
import com.vwo.insights.exposed.models.ClientConfiguration;
import io.flutter.app.FlutterApplication;
 
public class MyApp extends FlutterApplication {

    @Override
    public void onCreate() {
        super.onCreate();

        initVWO();
    }

    private void initVWO() {
      ClientConfiguration config = new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", null);

        // Required for Flutter Impeller (default from Flutter 3.27 on Android). Call before init().
        VWOInsights.enableFlutterPerformanceMode();

        VWOInsights.init(this, new IVwoInitCallback() {
 
          @Override
            public void vwoInitSuccess(String message) {
                //Insights SDK Initialized successfully, log it as desired
            }
          
            @Override
            public void vwoInitFailed(String message) {
                //Could not initialise VWO, log it as desired
            }
          
        }, config);
    }
}
```
```kotlin
import android.util.Log
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwo.insights.exposed.models.ClientConfiguration
import io.flutter.app.FlutterApplication
 
class MyApp : FlutterApplication() {
    override fun onCreate() {
        super.onCreate()

        initVwo()
    }

    fun initVwo() {
        val configuration = ClientConfiguration("ACCOUNT_ID", "SDK_KEY", null);
        // Required for Flutter Impeller (default from Flutter 3.27 on Android). Call before init().
        VWOInsights.enableFlutterPerformanceMode()

        VWOInsights.init(this, object : IVwoInitCallback {
            override fun vwoInitSuccess(s: String) {
                //Insights SDK Initialized successfully, log it as desired
            }
 
            override fun vwoInitFailed(s: String) {
                //Could not initialise VWO, log it as desired
            }
        }, configuration)
    }
}
```

<br />

If you want to start recording as soon as the application launches, add the following code snippet in the init block as shown below:

```java
...rest of the code

    VWOInsights.init(this, new IVwoInitCallback() {
            @Override
            public void vwoInitSuccess(String message) {
                //Insights SDK Initialized successfully, log it as desired
                VWOInsights.INSTANCE.startSessionRecording(); // If you have enabled performance mode and face any crash / issue with this, Please call startSession() from Dart Method, refer https://developers.vwo.com/reference/startstop-recording
            }
      
...rest of the code
```
```kotlin
...rest of the code

    VWOInsights.init(this, object : IVwoInitCallback {
        override fun vwoInitSuccess(s: String) {
            VWOInsights.startSessionRecording() // If you have enabled performance mode and face any crash / issue with this, Please call startSession() from Dart Method, refer https://developers.vwo.com/reference/startstop-recording
        }
        
...rest of the code
```

<br />

***

## ProGuard (release builds)

When building a **release** (or **profile**) Android app, ProGuard/R8 can strip or obfuscate classes needed by Flutter and the VWO Insights SDK. Add the following rules to your app’s ProGuard file (e.g. `android/app/proguard-rules.pro`) and ensure that file is referenced from `build.gradle` (e.g. `proguardFiles` in the release buildType).

```proguard
# Flutter
-keep class io.flutter.embedding.** { *; }
-keep class io.flutter.plugin.** { *; }

# VWO Insights SDK
-keep class com.vwo.** { *; }
-keep interface com.vwo.** { *; }
```

**Steps:**

1. Open or create `android/app/proguard-rules.pro`.
2. Paste the rules above into that file.
3. In `android/app/build.gradle`, under `buildTypes` → `release`, confirm you have something like:
   ```gradle
   proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
   ```
4. Rebuild the release app (e.g. `flutter build apk` or `flutter build appbundle`).
