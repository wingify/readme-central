---
title: Initialization
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
After installing the SDK, initialize the app in the _onCreate_ function of the Application class.

## Parameters

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Key
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **ACCOUNT_ID**
        _Required_
      </td>

      <td>
        Wingify Account ID
      </td>
    </tr>

    <tr>
      <td>
        **SDK_KEY**<br />_Required_
      </td>

      <td>
        SDK key
      </td>
    </tr>

    <tr>
      <td>
        **USER_ID**<br />_Optional_
      </td>

      <td>
        Unique identifier for the user
      </td>
    </tr>

    <tr>
      <td>
        **IVwoInitCallback**<br />_Optional_
      </td>

      <td>
        SDK Initialization callback
      </td>
    </tr>
  </tbody>
</Table>

```java
package com.wingify.screenshotsample

import android.app.Application
import com.vwo.insights.VWOInsights
import com.vwo.insights.core.models.ClientConfiguration
import com.vwo.insights.exposed.IVwoInitCallback

class VWOApplication : Application() {

    override fun onCreate() {
        super.onCreate()
          
        // From SDK version 2.6.0+ we have introduced a new highly optimized recording mechanism, you can enable it using "VWOInsights.enablePerformanceMode();"
        VWOInsights.enablePerformanceMode(); // This works best on API 26+ (Android 8.0+).

        ClientConfiguration configuration = new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID");
        VWOInsights.init(this, new IVwoInitCallback() { 
                @Override  
                public void vwoInitSuccess(@NonNull String s) {
                     // Insights SDK Initialized successfully 
                }
     
                @Override
                public void vwoInitFailed(@NonNull String s) {
                     // Insights SDK NOT Initialized successfully
                }
         }, configuration, null);
    
    }
}
```
```kotlin
package com.wingify.screenshotsample

import android.app.Application
import com.vwo.insights.VWOInsights
import com.vwo.insights.core.models.ClientConfiguration
import com.vwo.insights.exposed.IVwoInitCallback

class VWOApplication : Application() {

    override fun onCreate() {
      super.onCreate()
 
      // From SDK version 2.6.0+ we have introduced a new highly optimized recording mechanism, you can enable it using "VWOInsights.enablePerformanceMode();"
      VWOInsights.enablePerformanceMode() // This works best on API 26+ (Android 8.0+).

        val configuration = ClientConfiguration("ACCOUNT_ID","APPLICATION_ID", "USER_ID")

        VWOInsights.init(this, object : IVwoInitCallback {
              override fun vwoInitSuccess(message: String) {  
                    // Insights SDK Initialized successfully 
              }


              override fun vwoInitFailed(message: String) {
                    // Insights SDK NOT Initialized successfully
              }

        }, configuration)
    }

}
```

<br />