---
title: Offline Conversions
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
VWO SDK allows you to track conversions using **_track_** API. There could be scenarios when you would like to track conversions without using the SDK.

To understand this in detail, let's take an example, where you have your own centralized data-storage service which stores the information of all the events.  Whenever a conversion happens at your application, you store the data in the storage service but the integrated tools like VWO do not know about this conversion. Let's assume you do not prefer real-time syncing of this data with VWO and therefore, you run a [cron job](https://en.wikipedia.org/wiki/Cron) at the end of the day to sync conversions data with VWO. To achieve this,  you would want an HTTP API to send the conversions data of all the users who became part of the campaign back to VWO.

VWO offers an endpoint that you can use to mark a conversion for a particular user who became part of the campaign earlier, by calling it with the required parameters.

## Endpoint Details

**Endpoint** - <https://dev.visualwebsiteoptimizer.com/server-side/track-goal>

**Query Parameters**

[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Description",
    "h-2": "Data Type",
    "0-0": "account_id  \n\\_Required_",
    "0-1": "VWO Account ID",
    "0-2": "Number  \nExample: 123456",
    "1-0": "experiment_id  \n\\_Required_",
    "1-1": "ID of the running Mobile campaign",
    "1-2": "Number  \nExample: 123",
    "2-0": "sId  \n_Required_",
    "2-1": "Session ID ie. current UNIX timestamp",
    "2-2": "Number  \nExample: 1626431681",
    "3-0": "u  \n_Required_",
    "3-1": "UUID v5",
    "3-2": "String  \nExample: 5d7c94a905a54ae0ab3d6221c8f76f1d",
    "4-0": "combination  \n_Required_",
    "4-1": "The variation ID assigned to the User which he became part of the campaign(can be extracted from the detailed report CSV)",
    "4-2": "Number  \nExample: 2(Variation-1), 1(Control), 10, etc.",
    "5-0": "goal_id  \n\\_Required_",
    "5-1": "The goal ID you want the conversion data to be associated with.",
    "5-2": "Number  \nExample: 201",
    "6-0": "env  \n_Required for env-level reporting_",
    "6-1": "SDK Key",
    "6-2": "Alphanumeric  \nExample: 11041d99974c0d637e603bbbcfe64c99",
    "7-0": "random  \n_Required_",
    "7-1": "A unique random number to bust the caching",
    "7-2": "Number | Double  \nExample: 0.25227311885823933",
    "8-0": "ap  \n_Required_",
    "8-1": "VWO Platform",
    "8-2": "server",
    "9-0": "sdk  \n_Optional_",
    "9-1": "Name of the SDK",
    "9-2": "Example: vwo-node-sdk",
    "10-0": "sdk-v  \n_Optional_",
    "10-1": "Version of the SDK used",
    "10-2": "Example: 1.18.0"
  },
  "cols": 3,
  "rows": 11,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 📘 Retrieving Data for the Endpoint
> 
> Please refer to the Integrations section inside the [SDK Reference](https://developers.vwo.com/docs/sdk-quickstart) to know how you can get **_u, combination_**, and **_experiment_id_**. For example: you can refer [Node.js Integrations](https://developers.vwo.com/docs/nodejs-integrations) section.

## Example Usage

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-goal?experiment_id=84&combination=1&sId=1626431508&u=4EB8C94E0DE95A609C5811B8A176F72E&sdk=vwo-node-sdk&sdk-v=1.17.2&env=11041d99974c0d637e603bbbcfe64c99&account_id=3000204&random=0.6871404163737733&ap=server&goal_id=242&
```

## References

1. [Download the detailed report of a campaign](https://help.vwo.com/hc/en-us/articles/360019594933-How-to-Email-or-Download-a-Test-Report-in-VWO-)
2. [Integrating VWO with Google Cloud Storage](https://help.vwo.com/hc/en-us/articles/900006484803-Integrating-VWO-with-Google-Cloud-Storage)
3. [Integrating VWO with Amazon S3](https://help.vwo.com/hc/en-us/articles/900006485423-Integrating-VWO-with-Amazon-S3)