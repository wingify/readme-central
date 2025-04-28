---
title: Installation
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
You can use Gradle to install the VWO Insights Android SDK by adding VWO Insights SDK dependency in your _build.gradle_ file. 

```java
repositories {
    mavenCentral()
}

dependencies {
      implementation 'com.vwo:insights:1.0.1'
}
```

Add the following permissions to your _AndroidManifest.xml_ file

```xml
<uses-permission android:name="android.permission.INTERNET"/>

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```