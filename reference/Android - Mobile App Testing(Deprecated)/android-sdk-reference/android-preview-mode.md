---
title: Preview Mode
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
The preview functionality is helpful while you make changes in your app code for a campaign. It is used to verify that a campaign is set up correctly.

### Enabling the preview mode

Add the following dependency to your build.gradle file:

```groovy build.gradle
dependencies {
	    ...
        compile ('io.socket:socket.io-client:1.0.0') {
            // excluding org.json which is provided by Android
            exclude group: 'org.json', module: 'json'
        }
	    ...
}
```

The preview option is automatically enabled when the application is running in debugging mode, either on a device or a simulator. To enable the debugging in release mode, with the application open, **shake the device for three or four times**. The preview button appears on the VARIATIONS and GOALS step of campaign creation.\
As you can have multiple apps added to your account, make sure to select the app which you want to A/B test.

### Disabling the preview mode

Preview mode can be disabled by removing the above dependency from your `build.gradle` file.\
OR\
You can disable the preview mode by creating `VWOConfig` object and pass that `VWOConfig` object during SDK Launch.

```java
VWOConfig vwoConfig = new VWOConfig.Builder()
                             .disablePreview()     // To disable preview mode
                             .build();
                             
VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);
```
```kotlin kotlin
val vwoConfig = VWOConfig.Builder()
                .disablePreview()    // To disable preview mode
                .build()

VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)
```
