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
# Application class

After installing the SDK, initialize it within the onCreate() function of the MainApplication.java class or MainApplication.kt class if you use Kotlin.

Copy the code below and replace the "ACCOUNT_ID" and "SDK_KEY" with the appropriate values from the dashboard.

<br />

```java
import com.vwo.insights.VWOInsights;
import com.vwo.insights.events.VWOLog;
import com.vwo.insights.exposed.Integrations;
import com.vwo.insights.exposed.models.ClientConfiguration;
import com.vwo.insights.exposed.IVwoInitCallback;
import com.vwoinsightsreactnativesdk.VwoInsightsReactNativeSdkModule;


public class MainApplication extends Application implements ReactApplication {
    // Other Code
    @Override
    public void onCreate() {
        super.onCreate();
        // Other Code
        VWOLog.INSTANCE.setLogLevel(VWOLog.ALL);
        VwoInsightsReactNativeSdkModule.init(this, ACCOUNT_ID, SDK_KEY, "");
        // Other Code
    }
    // Other Code
}

```
```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.events.VWOLog
import com.vwo.insights.exposed.Integrations
import com.vwo.insights.exposed.models.ClientConfiguration
import com.vwo.insights.exposed.IVwoInitCallback
import com.vwoinsightsreactnativesdk.VwoInsightsReactNativeSdkModule

class MainApplication : Application(), ReactApplication {
 
  // Other Code
  override fun onCreate() {
      super.onCreate()
 	// Other Code
      	VWOLog.setLogLevel(VWOLog.ALL)
      	VwoInsightsReactNativeSdkModule.init(this@MainApplication, ACCOUNT_ID, SDK_KEY, "")
    	// Other Code
  }
  // Other Code
}

```