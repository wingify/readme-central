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
[block:api-header]
{
  "title": "Gradle Installation"
}
[/block]
To integrate your mobile application using Gradle:

**1.** Add the VWO Android SDK dependency to your ```build.gradle``` file.

[block:code]
{
  "codes": [
    {
      "code": "repositories {\n    mavenCentral()\n}\n\ndependencies {\n    compile 'com.vwo:mobile:2.5.0@aar'\n    compile ('io.socket:socket.io-client:1.0.0') {\n        // excluding org.json which is provided by Android\n        exclude group: 'org.json', module: 'json'\n    }  \n  \t// Skip this if you are already including support library in your app.\n    compile 'com.android.support:support-core-utils:27.1.1'\n}\n",
      "language": "groovy",
      "name": "Dependencies"
    }
  ]
}
[/block]
**2.** Update your project AndroidManifest.xml file to add the INTERNET and ACCESS_NETWORK_STATE permissions.
[block:code]
{
  "codes": [
    {
      "code": "<uses-permission android:name=\"android.permission.INTERNET\"/>\n<uses-permission android:name=\"android.permission.ACCESS_NETWORK_STATE\"/>",
      "language": "xml",
      "name": "AndroidManifest.xml"
    }
  ]
}
[/block]
## ProGuard Configuration to work with VWO
If you are using Proguard for building Android projects, it may cause an error while compiling the build. To avoid such errors, you can add the following code snippet to the proguard-rules.pro file:
[block:code]
{
  "codes": [
    {
      "code": "# Preserve the line number information for debugging stack traces.\n-keepattributes SourceFile,LineNumberTable\n\n# Hide the original source file name.\n-renamesourcefileattribute SourceFile\n\n# Support libraries\n-keep class android.support.v4.content.LocalBroadcastManager\n\n# VWO module\n-keep public class * extends com.vwo.mobile.models.Entry\n\n-keepclassmembers class * extends com.vwo.mobile.models.Entry{\npublic <init>(android.os.Parcel);\n}\n\n# Socket.io\n-dontwarn io.socket.**",
      "language": "shell",
      "name": "proguard.cfg"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Source Code"
}
[/block]
The VWO Android SDK code is available on GitHub:
https://github.com/wingify/vwo-android
[block:api-header]
{
  "title": ""
}
[/block]