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

## Increase in IPA file size

When an IOS app is integrated with the VWO SDK, the increase in the size of the IPA file is around ~850 KB.

| Installation Type         | Size (in KB) |
| :------------------------ | :----------- |
| VWO_insights              | ~800 KB      |
| VWO_insights/SSZipArchive | ~58 KB       |

## IOS Application Analysis

Here is a summary of the IOS application analysis. This analysis includes a sample IPA with and without the Insights SDK.

[block:parameters]
{
  "data": {
    "h-0": "",
    "h-1": "Size                                   ",
    "0-0": "                IPA Size  \n**(without SDK integration)**",
    "0-1": "5.5 MB",
    "1-0": "               IPA Size  \n**(with SDK integration)**",
    "1-1": "6.3 MB",
    "2-0": "    Increase in IPA size",
    "2-1": "~850KB"
  },
  "cols": 2,
  "rows": 3,
  "align": [
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