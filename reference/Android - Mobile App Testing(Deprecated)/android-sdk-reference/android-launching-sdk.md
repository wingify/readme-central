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

## API Key

To initialize the SDK, we will use the API key generated while [Adding an App](ref:android-adding-an-app). 

Initialization of the SDK is to be done in the `onCreate(Bundle)`  function of the Activity or the Application.

Import VWO in your class first.

```java
import com.vwo.mobile.VWO;
```
```kotlin Kotlin
import com.vwo.mobile.VWO
```

After importing VWO class, we can initialize the SDK.\
It can be done in two ways, **asynchronous** and **synchronous**.

Asynchronous initialization does NOT block code execution while SDK fetches settings from the VWO content distribution network, but synchronous call blocks main thread execution. We recommend asynchronous initialization, as it does not affect the UI of your app.

## Asynchronous Initialization

```java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import com.vwo.mobile.VWO;

public class MainActivity extends AppCompatActivity {
  private static final String VWO_API_KEY = "<YOUR_VWO_API_KEY>";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Start VWO SDK in Async mode with callback
    VWO.with(this, VWO_APP_KEY)
      .launch(new VWOStatusListener() {
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

The callback method is called after the SDK fetches settings from the VWO content distribution network and processes those settings.\
Callback is used when you want to get notified as soon as the SDK is ready.

## Synchronous Initialization

Launching VWO in Synchronous mode requires you to pass a timeout in milliseconds as a parameter.

```java Java
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import com.vwo.mobile.VWO;

public class MainActivity extends AppCompatActivity {
  private static final String VWO_API_KEY = "<YOUR_VWO_API_KEY>";

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Start VWO SDK in synchronous mode
    VWO.with(this, VWO_API_KEY).launchSynchronously(3000);
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
    VWO.with(this, VWO_API_KEY).launchSynchronously(3000)
  }
}
```

Synchronous initialization blocks main thread. If settings couldn't be fetched in given timeout, the SDK uses old settings for already saved campaigns and fallbacks to `defaultValue` or `null` for new campaign keys.

> ❗️ Warning:
>
> This request should be used carefully as it executes on UI thread and may lead to Application Not Responding(ANR) dialog.

> 📘 Launch the SDK Once
>
> For the `launch(VWOStatusListener listener)` and `launchSynchronously(Long timeout)` calls, the SDK fetches campaign settings from the VWO content distribution network.\
> If the settings cannot be fetched, SDK doesn't retry to fetch the settings during the ongoing app session.\
> This is done to keep the app behaviour consistent during an app session.
