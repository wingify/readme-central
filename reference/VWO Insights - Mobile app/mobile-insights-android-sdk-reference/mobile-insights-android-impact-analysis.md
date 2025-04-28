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
This page tracks the impact of VWO SDK on different parameters for an app.

## **Launch Time**

The SDK is designed to be launched in the background, ensuring that it does not impact the launch time of your app. Asynchronous initialization is the recommended approach for optimal performance.

## Increase in APK file size

When an Android app is integrated with the VWO SDK, the increase in the size of the APK file is around ~800 KB without Proguard and **~300 KB with Proguard**.

[block:parameters]
{
  "data": {
    "h-0": "Dependencies",
    "h-1": "Uncompressed Size (in KB)  \n(Without proguard)",
    "h-2": "Uncompressed Size (in KB)  \n(With proguard)",
    "0-0": "[com.vwo.insights](https://mvnrepository.com/artifact/com.vwo/insights)",
    "0-1": "~500 KB",
    "0-2": "~260 KB",
    "1-0": "[net.lingala.zip4j.zip4j](https://mvnrepository.com/artifact/net.lingala.zip4j/zip4j)",
    "1-1": "~92 KB",
    "1-2": "~27 KB",
    "2-0": "[com.squareup.okhttp3.okhttp](https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp)",
    "2-1": "~550 KB",
    "2-2": "~140 KB"
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]

## Dex Method count

[block:parameters]
{
  "data": {
    "h-0": "Dependencies",
    "h-1": "Method count  \n(With Proguard)",
    "0-0": "[com.vwo.insights](https://mvnrepository.com/artifact/com.vwo/insights)",
    "0-1": "~1200",
    "1-0": "[net.lingala.zip4j.zip4j](https://mvnrepository.com/artifact/net.lingala.zip4j/zip4j)",
    "1-1": "~310",
    "2-0": "[com.squareup.okhttp3.okhttp](https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp)",
    "2-1": "~750"
  },
  "cols": 2,
  "rows": 3,
  "align": [
    "left",
    "left"
  ]
}
[/block]

## Android Application Analysis

Here is a summary of the Android application analysis. This analysis includes a sample APK with and without the Insights SDK.

[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "Proguard Disabled",
    "h-2": "Proguard Enabled",
    "0-0": "                APK Size  \n**(without SDK integration)**",
    "0-1": "5.5 MB",
    "0-2": "2.1 MB",
    "1-0": "               APK Size  \n**(with SDK integration)**",
    "1-1": "6.3 MB",
    "1-2": "2.4 MegaBytes",
    "2-0": "Increase in APK size",
    "2-1": "~700KB",
    "2-2": "~300KB"
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]

## API Calls

VWO SDK makes two types of API calls to VWO CDN.

1. _**AppSettings**_-  During SDK initialization, a single request is made to fetch settings, with two retry attempts. If this initial request fails, the SDK does not make any further attempts to fetch settings. This approach ensures consistent app behavior throughout an ongoing session.
2. _**DataSync**_ - Data synchronization for session recording and heatmaps is facilitated through a dedicated request. In the event of a failure, the SDK keeps track of the issue and will attempt to resend the data after a specified interval.

Please note that these mechanisms are implemented to maintain the stability and reliability of the SDK's functionality.

## Network Usage & Response time

[block:parameters]
{
  "data": {
    "h-0": "API",
    "h-1": "Network Type",
    "h-2": "Bandwidth(Usage)",
    "h-3": "Time Taken",
    "0-0": "AppSettings",
    "0-1": "3G",
    "0-2": "~1KB",
    "0-3": "\\< 0.5 sec",
    "1-0": "AppSettings",
    "1-1": "4G / 5G",
    "1-2": "~1KB",
    "1-3": "\\< 0.5 sec",
    "2-0": "AppSettings",
    "2-1": "WiFi",
    "2-2": "~1KB",
    "2-3": "\\< 0.5 sec",
    "3-0": "DataSync(per API-request)",
    "3-1": "3G",
    "3-2": "min:- ~50KB  \naverage:- ~130KB  \nmax:- ~180KB",
    "3-3": "\\< 2 sec",
    "4-0": "DataSync(per API-request)",
    "4-1": "4G / 5G",
    "4-2": "min:- ~50KB  \naverage:- ~130KB  \nmax:- ~180KB",
    "4-3": "\\< 1 sec",
    "5-0": "DataSync(per API-request)",
    "5-1": "WiFi",
    "5-2": "min:- ~50KB  \naverage:- ~130KB  \nmax:- ~180KB",
    "5-3": "\\< 1 sec"
  },
  "cols": 4,
  "rows": 6,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]