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
This page tracks the impact of VWO iOS SDK for different parameters on your app.
[block:api-header]
{
  "title": "Launch Time"
}
[/block]
The SDK can be initialised in two ways: synchronous and asynchronous.

  * Asynchronous Initialisation: has no impact on the launch time of your app, as SDK is launched in the background. Asynchronous initialisation is the recommended method.
  * Synchronous Initialisation: In Synchronous initialisation the SDK makes a networking call to fetch settings from VWO's CDN. This can block the main thread. The thread resumes to normal execution after response from the CDN.
[block:api-header]
{
  "title": "API Calls"
}
[/block]
VWO SDK makes three types of API calls to VWO CDN. 
  * To fetch settings at the time of SDK initialization. The SDK makes only one call to fetch settings. If this call fails, the SDK does not retry to fetch settings during an ongoing app session. This is done to keep the app behaviour consistent during an ongoing session.
  * To inform VWO when a user becomes part of a campaign. If this call fails, the SDK keeps a track of it and try to send it again after some time.
  * To inform VWO when a user converts a goal in a campaign.  If this call fails, the SDK keeps a track of it and try to send it again after some time.

The SDK makes call to CDN every 20 seconds.
[block:api-header]
{
  "title": "Disk Space"
}
[/block]
After adding VWO to you Xcode project the size of Xcode project changes as follows
[block:parameters]
{
  "data": {
    "h-0": "Installation type",
    "h-1": "Size",
    "0-0": "VWO/Core",
    "0-1": "~ 284 KB",
    "1-0": "VWO",
    "1-1": "~ 800 KB"
  },
  "cols": 2,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Increase in IPA file size"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Installation type",
    "h-1": "Size",
    "0-0": "VWO/Core",
    "0-1": "~ 100 KB",
    "1-0": "VWO",
    "1-1": "~ 700 KB"
  },
  "cols": 2,
  "rows": 2
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
    "h-1": "Memory usage (in KBs approx)",
    "h-2": "RAM usage",
    "0-0": "launchForAPIKey:config:completion:",
    "1-0": "launchSynchronouslyForAPIKey:config:timeout",
    "2-0": "objectForKey: defaultValue:\nintForKey:defaultValue:\nfloatForKey:defaultValue\nboolForKey:defaultValue",
    "3-0": "trackConversion",
    "4-0": "trackConversion: withValue:",
    "0-1": "300",
    "0-2": "2",
    "1-1": "350",
    "1-2": "2",
    "2-1": "less than 1",
    "2-2": "2",
    "3-1": "less than 1",
    "3-2": "2",
    "4-1": "less than 1",
    "4-2": "2"
  },
  "cols": 2,
  "rows": 5
}
[/block]
If you want to know the impact of any other parameter or if you want to understand anything around it, please reach out to us: support@vwo.com