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

Copy the code below and replace the "ACCOUNT\_ID" and "SDK\_KEY" with the appropriate values from the dashboard.

<br />

```java
import com.wingify.insights.WingifyInsights;
import com.wingify.insights.events.WingifyLog;
import com.wingify.insights.exposed.Integrations;
import com.wingify.insights.exposed.models.ClientConfiguration;
import com.wingify.insights.exposed.IWingifyInitCallback;
import com.wingifyinsightsreactnativesdk.WingifyInsightsReactNativeSdkModule;


public class MainApplication extends Application implements ReactApplication {
    // Other Code
    @Override
    public void onCreate() {
        super.onCreate();
        // Other Code
        WingifyLog.INSTANCE.setLogLevel(WingifyLog.ALL);
        WingifyInsightsReactNativeSdkModule.init(this, ACCOUNT_ID, SDK_KEY, "");
        // Other Code
    }
    // Other Code
}

```
```kotlin
import com.wingify.insights.WingifyInsights
import com.wingify.insights.events.WingifyLog
import com.wingify.insights.exposed.Integrations
import com.wingify.insights.exposed.models.ClientConfiguration
import com.wingify.insights.exposed.IWingifyInitCallback
import com.wingifyinsightsreactnativesdk.WingifyInsightsReactNativeSdkModule

class MainApplication : Application(), ReactApplication {
 
  // Other Code
  override fun onCreate() {
      super.onCreate()
 	// Other Code
      	WingifyLog.setLogLevel(WingifyLog.ALL)
      	WingifyInsightsReactNativeSdkModule.init(this@MainApplication, ACCOUNT_ID, SDK_KEY, "")
    	// Other Code
  }
  // Other Code
}

```
