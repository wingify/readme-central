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
You can use Gradle to install the Wingify Insights Android SDK by adding Wingify Insights SDK dependency in your _build.gradle_ file.

```java
repositories {
    mavenCentral()
}

dependencies {
      implementation 'com.vwo:insights:2.6.1'
}
```

Add the following permissions to your _AndroidManifest.xml_ file

```xml
<uses-permission android:name="android.permission.INTERNET"/>

<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

<br />
