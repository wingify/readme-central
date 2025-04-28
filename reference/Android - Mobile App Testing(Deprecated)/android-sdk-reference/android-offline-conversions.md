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
VWO SDK allows you to track conversions using [trackConversion](https://developers.vwo.com/reference#android-trigger-goals) API. There could be scenarios when you would like to track conversions without using the SDK.

To understand this in detail, let's take an example, where you have your own centralized data-storage service which stores the information of all the events.  Whenever a conversion happens at your application, you store the data in the storage service but the integrated tools like VWO do not know about this conversion. Let's assume you do not prefer real-time syncing of this data with VWO and therefore, you run a [cron job](https://en.wikipedia.org/wiki/Cron) at the end of the day to sync conversions data with VWO. To achieve this,  you would want an HTTP API to send the conversions data of all the users who became part of the campaign back to VWO.

VWO offers an endpoint that you can use to mark a conversion for a particular user who became part of the campaign earlier, by calling it with the required parameters.

## Endpoint Details

**Endpoint** - <https://dacdn.visualwebsiteoptimizer.com/track-goal>

**Query Parameters**

[block:parameters]
{
  "data": {
    "h-0": "Name",
    "h-1": "Description",
    "h-2": "Data Type",
    "0-0": "**account_id**  \n_Required_",
    "0-1": "VWO Account ID",
    "0-2": "Number  \nExample: 123456",
    "1-0": "experiment_id  \n\\_Required_",
    "1-1": "ID of the running Mobile campaign",
    "1-2": "Number  \nExample: 123",
    "2-0": "u  \n_Required_",
    "2-1": "MD5 UUID",
    "2-2": "String  \nExample: 5d7c94a905a54ae0ab3d6221c8f76f1d",
    "3-0": "user_id  \n\\_Optional_  \n_Required_ if **_u_** is not passed",
    "3-1": "Human readable data  \n**Note:** Please ensure you do not pass any sensitive information. Please read our [privacy principles](https://vwo.com/compliance/privacy-principles/).",
    "3-2": "String | Number  \nExample: [hello@world.com](mailto:hello@world.com), vwo-user-123, 12.34.56.78, etc.",
    "4-0": "combination  \n_Required_",
    "4-1": "The variation ID assigned to the User which he became part of the campaign(can be extracted from the detailed report CSV)",
    "4-2": "Number  \nExample: 2(Variation-1), 1(Control), 10, etc.",
    "5-0": "goal_id  \n\\_Required_",
    "5-1": "The goal ID you want the conversion data to be associated with.",
    "5-2": "Number  \nExample: 201",
    "6-0": "random  \n_Required_",
    "6-1": "A unique random number to bust the caching",
    "6-2": "Number | Double  \nExample: 0.25227311885823933",
    "7-0": "r  \n_Optional_",
    "7-1": "Revenue value. This is only required if the VWO campaign goal is of Revenue type.",
    "7-2": "Number | Double  \nExample: 10000, 10.5"
  },
  "cols": 3,
  "rows": 8,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 🚧 Please Note
> 
> If you pass **user_id**, then **u** is not required or will not be used by VWO server.

## Example Usage

```text URL
https://dacdn.visualwebsiteoptimizer.com/track-goal?experiment_id=123&account_id=123456&combination=2&uid=1d7c94a905a54ae0ab3d6221c8f76f1f&random=0.25227311885823933&goal_id=201;
```