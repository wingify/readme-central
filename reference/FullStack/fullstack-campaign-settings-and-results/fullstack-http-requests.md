---
title: HTTP Requests
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
List of all HTTP requests that are made to VWO server for various purposes.

[block:parameters]
{
  "data": {
    "h-0": "Purpose",
    "h-1": "Endpoint",
    "h-2": "Required params",
    "h-3": "Description",
    "0-0": "Get settingsFile",
    "1-0": "Track visitor",
    "2-0": "Track Conversion",
    "0-1": "//dev.visualwebsiteoptimizer.com/server-side/settings",
    "1-1": "//dev.visualwebsiteoptimizer.com/server-side/track-user",
    "2-1": "//dev.visualwebsiteoptimizer.com/server-side/track-goal",
    "0-2": "accountId\nsdkKey",
    "0-3": "This is required for fetching the settingsFile required for [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK.",
    "h-4": "Response",
    "1-3": "To send an event to VWO server to track a visitor.",
    "2-3": "To send an event to VWO server to track a conversion. Various metrics are calculated and shown in campaign reports based on count of visitors and conversions.",
    "0-4": "Status Code: 200\nResponse: JSON - *settingsFile*\n\nIf sdkKey is not valid, then\n\nStatus Code: 400\nResponse: JSON -  {\"message\":\"Invalid api key\"}",
    "1-4": "Status Code: 200\nEmpty response",
    "2-4": "Status Code: 200\nEmpty response",
    "1-2": "VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, along with meta information like sdk-name, sdk-version, etc.",
    "2-2": "VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, goalId and revenue(if revenue goal), along with meta information like sdk-name, sdk-version, etc.",
    "3-0": "Custom Dimension",
    "3-1": "//dev.visualwebsiteoptimizer.com/server-side/push",
    "3-2": "VWO sends the essential params like accountId, current time, user ID, UUID of user, custom-dimension-key, custom-dimension-value, along with meta information like sdk-name, sdk-version, etc.",
    "3-3": "To categorize and differentiate user. Post-segmentation can be applied on this cutom-dimension to view segmented report data."
  },
  "cols": 5,
  "rows": 4
}
[/block]
If you enable the DEBUG or INFO logs, all such information can be seen there. Read more on [how to set log level and customize the logger](https://developers.vwo.com/reference#fullstack-sdk-customization-configure-the-logger).