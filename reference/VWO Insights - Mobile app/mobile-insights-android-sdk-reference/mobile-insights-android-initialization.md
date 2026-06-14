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
After installing the SDK, initialize the app in the *onCreate* function of the Application class. 

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
        **ACCOUNT\_ID**
        *Required* 
      </td>

      <td>
        VWO Account ID
      </td>
    </tr>

    <tr>
      <td>
        **SDK\_KEY**\
        *Required*
      </td>

      <td>
        SDK key
      </td>
    </tr>

    <tr>
      <td>
        **USER\_ID**\
        *Optional*
      </td>

      <td>
        Unique identifier for the user
      </td>
    </tr>

    <tr>
      <td>
        **IVwoInitCallback**\
        *Optional*
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
