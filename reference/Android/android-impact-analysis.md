---
title: Impact Analysis
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
This page tracks the impact of VWO SDK for different parameters on your app.
[block:api-header]
{
  "title": "Launch Time"
}
[/block]
The SDK can be initialized in two ways: synchronous and asynchronous.

  * Asynchronous Initialisation: has no impact on the launch time of your app, as SDK is launched in the background. Asynchronous initialisation is the recommended method.
  * Synchronous Initialisation: In Synchronous initialization, the SDK makes a networking call to fetch settings from VWO's CDN. This can block the main thread for a maximum of three seconds. The thread resumes to normal execution after the response from the CDN.
[block:api-header]
{
  "title": "API Calls"
}
[/block]
VWO SDK makes three types of API calls to VWO CDN. 
  * To fetch settings at the time of SDK initialization. The SDK makes only one call to fetch settings. If this call fails, the SDK does not retry to fetch settings during an ongoing app session. This is done to keep the app behaviour consistent during an ongoing session.
  * To inform VWO when a user becomes part of a campaign. If this call fails, the SDK keeps a track of it and try to send it again after some time.
  * To inform VWO when a user converts a goal in a campaign.  If this call fails, the SDK keeps a track of it and try to send it again after some time.
[block:api-header]
{
  "title": "Increase in APK file size"
}
[/block]
When an Android app is integrated with the VWO SDK, the increase in the size of APK file is around ```~300 KB``` without Proguard and ```~200 KB``` with Proguard.
[block:parameters]
{
  "data": {
    "h-0": "Dependencies",
    "h-1": "Uncompressed Size (in KB)(Without proguard)",
    "0-0": "com.vwo:mobile",
    "1-0": "io.socket:socket.io-client",
    "0-1": "98.1",
    "1-1": "392",
    "2-1": "385.4",
    "2-0": "com.android.support:support-core-utils",
    "h-2": "Uncompressed Size (in KB)(With proguard)",
    "1-2": "203",
    "2-2": "2.5",
    "0-2": "92.6"
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:api-header]
{
  "title": "Dex Method count"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Dependencies",
    "h-1": "Method count (Without Proguard)",
    "0-0": "com.vwo:mobile",
    "1-0": "io.socket:socket.io-client",
    "2-0": "com.android.support:support-core-utils",
    "2-1": "3390",
    "1-1": "2781",
    "0-1": "705",
    "h-2": "Method count (With Proguard)",
    "0-2": "705",
    "1-2": "2018",
    "2-2": "12"
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:api-header]
{
  "title": "RAM Usage"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Method",
    "h-1": "Memory usage(in KBs approx)",
    "h-2": "RAM usage",
    "0-0": "VWO.launch(VWOStatusListener listener)",
    "1-0": "VWO.launchSynchronously()",
    "2-0": "VWO.getObjectForKey(String key, Object defaultValue);",
    "8-0": "VWO.trackConversion()",
    "9-0": "VWO.trackConversion(double value)",
    "0-1": "55",
    "0-2": "2",
    "1-1": "560",
    "1-2": "2",
    "2-1": "< 1",
    "2-2": "2",
    "8-1": "< 1",
    "8-2": "2",
    "9-1": "< 1",
    "9-2": "2",
    "3-0": "VWO.getIntegerForKey(String key, int defaultValue);",
    "3-1": "< 1",
    "4-0": "VWO.getDoubleForKey(String key, double defaultValue);",
    "4-1": "< 1",
    "5-0": "VWO.getStringForKey(String key, String defaultValue);",
    "5-1": "< 1",
    "6-0": "VWO.getBooleanForKey(String key, boolean defaultValue);",
    "6-1": "< 1",
    "7-0": "VWO.getVariationNameForTestKey(String testKey)",
    "7-1": "< 1"
  },
  "cols": 2,
  "rows": 10
}
[/block]
If you want to know the impact of any other parameter or if you are interested in detail of any parameter, please reach out to us: support@vwo.com