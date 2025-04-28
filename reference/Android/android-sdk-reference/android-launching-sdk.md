---
title: Launching the SDK
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
After installing the SDK, we will initialize the VWO SDK in our mobile app.
[block:api-header]
{
  "title": "API Key"
}
[/block]
To initialize the SDK, we will use the API key generated while [Adding an App](ref:android-adding-an-app). 

Initialization of the SDK is to be done in the ```onCreate(Bundle)```  function of the Activity or the Application.

Import VWO in your class first.
[block:code]
{
  "codes": [
    {
      "code": "import com.vwo.mobile.VWO;",
      "language": "java"
    },
    {
      "code": "import com.vwo.mobile.VWO",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
After importing VWO class, we can initialize the SDK. 
It can be done in two ways, **asynchronous** and **synchronous**.

Asynchronous initialization does NOT block code execution while SDK fetches settings from the VWO content distribution network, but synchronous call blocks main thread execution. We recommend asynchronous initialization, as it does not affect the UI of your app.
[block:api-header]
{
  "title": "Asynchronous Initialization"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "import android.support.v7.app.AppCompatActivity;\nimport android.os.Bundle;\nimport android.view.Menu;\nimport android.view.MenuItem;\nimport com.vwo.mobile.VWO;\n\npublic class MainActivity extends AppCompatActivity {\n  private static final String VWO_API_KEY = \"<YOUR_VWO_API_KEY>\";\n\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n\n    // Start VWO SDK in Async mode with callback\n    VWO.with(this, VWO_APP_KEY)\n      .launch(new VWOStatusListener() {\n        @Override\n        public void onVWOLoaded() {\n          // VWO loaded successfully\n        }\n\n        @Override\n        public void onVWOLoadFailure(String reason) {\n          // VWO not loaded\n        }\n      });\n  }\n}",
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
The callback method is called after the SDK fetches settings from the VWO content distribution network and processes those settings.
Callback is used when you want to get notified as soon as the SDK is ready.
[block:api-header]
{
  "title": "Synchronous Initialization"
}
[/block]
Launching VWO in Synchronous mode requires you to pass a timeout in milliseconds as a parameter.
[block:code]
{
  "codes": [
    {
      "code": "import android.support.v7.app.AppCompatActivity;\nimport android.os.Bundle;\nimport android.view.Menu;\nimport android.view.MenuItem;\nimport com.vwo.mobile.VWO;\n\npublic class MainActivity extends AppCompatActivity {\n  private static final String VWO_API_KEY = \"<YOUR_VWO_API_KEY>\";\n\n  @Override\n  protected void onCreate(Bundle savedInstanceState) {\n    super.onCreate(savedInstanceState);\n    setContentView(R.layout.activity_main);\n\n    // Start VWO SDK in synchronous mode\n    VWO.with(this, VWO_API_KEY).launchSynchronously(3000);\n  }\n}",
      "language": "java",
      "name": "Java"
    },
    {
      "code": "import android.support.v7.app.AppCompatActivity\nimport android.os.Bundle\nimport com.vwo.mobile.VWO\n  \nclass MainActivity : AppCompatActivity() {\n  private val VWO_API_KEY = \"YOUR_VWO_API_KEY\"\n\n  override fun onCreate(savedInstanceState: Bundle?) {\n    super.onCreate(savedInstanceState)\n    setContentView(R.layout.activity_main)\n    // Start VWO SDK in Async mode with callback\n    VWO.with(this, VWO_API_KEY).launchSynchronously(3000)\n  }\n}",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
Synchronous initialization blocks main thread. If settings couldn't be fetched in given timeout, the SDK uses old settings for already saved campaigns and fallbacks to ```defaultValue``` or ```null``` for new campaign keys.
[block:callout]
{
  "type": "danger",
  "body": "This request should be used carefully as it executes on UI thread and may lead to Application Not Responding(ANR) dialog.",
  "title": "Warning:"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "For the ```launch(VWOStatusListener listener)``` and ```launchSynchronously(Long timeout)``` calls, the SDK fetches campaign settings from the VWO content distribution network.\nIf the settings cannot be fetched, SDK doesn't retry to fetch the settings during the ongoing app session.\nThis is done to keep the app behaviour consistent during an app session.",
  "title": "Launch the SDK Once"
}
[/block]