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

After installing the SDK, initialize it within the onCreate() function of the FlutterApplication class.

<br />

If your project doesn't already include a FlutterApplication class, create a file named MyApp.java inside the folder &lt;projectRoot&gt;/android/app/src/main/java/&lt;your package&gt;/. 

If you selected Kotlin when creating the project, the folder path will be &lt;projectRoot&gt;/android/app/src/main/kotlin/&lt;your package&gt;/. 

<br />

Then, copy the code below and replace the "ACCOUNT\_ID" and "SDK\_KEY" with the appropriate values from the dashboard.

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
        VWOLog.setLogLevel(VWOLog.ALL)
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
                VWOInsights.INSTANCE.startSessionRecording();
            }
      
...rest of the code
```
```kotlin
...rest of the code

    VWOInsights.init(this, object : IVwoInitCallback {
        override fun vwoInitSuccess(s: String) {
            VWOInsights.startSessionRecording()
        }
        
...rest of the code
```