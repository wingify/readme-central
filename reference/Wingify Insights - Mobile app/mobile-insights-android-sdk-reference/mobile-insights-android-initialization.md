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
        Wingify Account ID
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
        **IWingifyInitCallback**\
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
import com.wingify.insights.WingifyInsights
import com.wingify.insights.core.models.ClientConfiguration
import com.wingify.insights.exposed.IWingifyInitCallback

class WingifyApplication : Application() {

    override fun onCreate() {
        super.onCreate()


        ClientConfiguration configuration = new ClientConfiguration("ACCOUNT_ID", "SDK_KEY", "USER_ID");
        WingifyInsights.init(this, new IWingifyInitCallback() { 
                @Override  
                public void wingifyInitSuccess(@NonNull String s) {
                     // Insights SDK Initialized successfully 
                }
     
                @Override
                public void wingifyInitFailed(@NonNull String s) {
                     // Insights SDK NOT Initialized successfully
                }
         }, configuration, null);
    
    }
}
```
```kotlin
package com.wingify.screenshotsample

import android.app.Application
import com.wingify.insights.WingifyInsights
import com.wingify.insights.core.models.ClientConfiguration
import com.wingify.insights.exposed.IWingifyInitCallback

class WingifyApplication : Application() {

    override fun onCreate() {
        super.onCreate()

        val configuration = ClientConfiguration("ACCOUNT_ID","APPLICATION_ID", "USER_ID")

        WingifyInsights.init(this, object : IWingifyInitCallback {
              override fun wingifyInitSuccess(message: String) {  
                    // Insights SDK Initialized successfully 
              }


              override fun wingifyInitFailed(message: String) {
                    // Insights SDK NOT Initialized successfully
              }

        }, configuration)
    }

}
```
