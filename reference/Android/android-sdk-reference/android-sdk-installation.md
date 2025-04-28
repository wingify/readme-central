---
title: SDK Installation
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
The SDK can be installed by using Gradle.

## Gradle Installation

To integrate your mobile application using Gradle:

**1.** Add the VWO Android SDK dependency to your `build.gradle` file.

```groovy Dependencies
repositories {
    mavenCentral()
}

dependencies {
    compile 'com.vwo:mobile:2.5.0@aar'
    compile ('io.socket:socket.io-client:1.0.0') {
        // excluding org.json which is provided by Android
        exclude group: 'org.json', module: 'json'
    }  
  	// Skip this if you are already including support library in your app.
    compile 'com.android.support:support-core-utils:27.1.1'
}
```

**2.** Update your project AndroidManifest.xml file to add the INTERNET and ACCESS\_NETWORK\_STATE permissions.

```xml AndroidManifest.xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

## ProGuard Configuration to work with VWO

If you are using Proguard for building Android projects, it may cause an error while compiling the build. To avoid such errors, you can add the following code snippet to the proguard-rules.pro file:

```shell proguard.cfg
# Preserve the line number information for debugging stack traces.
-keepattributes SourceFile,LineNumberTable

# Hide the original source file name.
-renamesourcefileattribute SourceFile

# Support libraries
-keep class android.support.v4.content.LocalBroadcastManager

# VWO module
-keep public class * extends com.vwo.mobile.models.Entry

-keepclassmembers class * extends com.vwo.mobile.models.Entry{
public <init>(android.os.Parcel);
}

# Socket.io
-dontwarn io.socket.**
```

## Source Code

The VWO Android SDK code is available on GitHub:\
[https://github.com/wingify/vwo-android](https://github.com/wingify/vwo-android)

##
