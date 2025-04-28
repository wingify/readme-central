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

[block:parameters]
{
  "data": {
    "h-0": "Key",
    "h-1": "Description",
    "0-0": "**ACCOUNT_ID**  \n_Required_ ",
    "0-1": "VWO Account ID",
    "1-0": "**SDK_KEY**  \n_Required_",
    "1-1": "SDK key",
    "2-0": "**USER_ID**  \n_Optional_",
    "2-1": "Unique identifier for the user",
    "3-0": "**IVwoInitCallback**  \n_Optional_",
    "3-1": "SDK Initialization callback"
  },
  "cols": 2,
  "rows": 4,
  "align": [
    "left",
    "left"
  ]
}
[/block]


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