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
  pages:
    - type: basic
      slug: impression-events
      title: Impression Events
---
List of all HTTP requests that are made to VWO server for various purposes.

[block:parameters]
{
  "data": {
    "h-0": "Purpose",
    "h-1": "Endpoint",
    "h-2": "Required params",
    "h-3": "Description",
    "h-4": "Response",
    "0-0": "Get settingsFile",
    "0-1": "<https://dev.visualwebsiteoptimizer.com/server-side/settings>",
    "0-2": "accountId  \nsdkKey",
    "0-3": "This is required for fetching the settingsFile required for [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK.",
    "0-4": "Status Code: 200  \nResponse: JSON - _settingsFile_  \n  \nIf sdkKey is not valid, then  \n  \nStatus Code: 400  \nResponse: JSON -  {\"message\":\"Invalid api key\"}",
    "1-0": "Track visitor",
    "1-1": "<https://dev.visualwebsiteoptimizer.com/server-side/track-user>",
    "1-2": "VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, along with meta information like sdk-name, sdk-version, etc.",
    "1-3": "To send an event to VWO server to track a visitor.",
    "1-4": "Status Code: 200  \nEmpty response",
    "2-0": "Track Conversion",
    "2-1": "<https://dev.visualwebsiteoptimizer.com/server-side/track-goal>",
    "2-2": "VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, goalId and revenue(if revenue goal), along with meta information like sdk-name, sdk-version, etc.",
    "2-3": "To send an event to VWO server to track a conversion. Various metrics are calculated and shown in campaign reports based on count of visitors and conversions.",
    "2-4": "Status Code: 200  \nEmpty response",
    "3-0": "Custom Dimension",
    "3-1": "<https://dev.visualwebsiteoptimizer.com/server-side/push>",
    "3-2": "VWO sends the essential params like accountId, current time, user ID, UUID of user, custom-dimension-key, custom-dimension-value, along with meta information like sdk-name, sdk-version, etc.",
    "3-3": "To categorize and differentiate user. Post-segmentation can be applied on this cutom-dimension to view segmented report data.",
    "3-4": "",
    "4-0": "Batch Events",
    "4-1": "<https://dev.visualwebsiteoptimizer.com/server-side/batch-events>",
    "4-2": "VWO SDK batches different events like track-user, track-goal, and push and sends to VWO.",
    "4-3": "VWO SDK batches different events and sends them in a single POST call.",
    "4-4": ""
  },
  "cols": 5,
  "rows": 5,
  "align": [
    "left",
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]

If you enable the DEBUG or INFO logs, all such information can be seen there. Read more on how to set log level and customize the logger.

## Fetching Settings File

**URL** - GET <https://dev.visualwebsiteoptimizer.com/server-side/settings>

**Query Params** 

[block:parameters]
{
  "data": {
    "h-0": "Param",
    "h-1": "Description",
    "h-2": "Type",
    "h-3": "Example",
    "0-0": "**a**  \n(_Required_)",
    "0-1": "VWO Account ID",
    "0-2": "Number",
    "0-3": "12345",
    "1-0": "**i**  \n(_Required_)",
    "1-1": "SDK Key",
    "1-2": "Alphanumeric",
    "1-3": "aa87170ad94079aa190bc7c9b85d26zz"
  },
  "cols": 4,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]

**Response** - JSON - has the account and campaigns configuration. Otherwise the error message.

**Example**

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/settings?a=12345&i=aa87170ad94079aa190bc7c9b85d26zz
```



## Tracking a User in a Campaign

**URL** - GET <https://dev.visualwebsiteoptimizer.com/server-side/track-user>

**Query Params** 

[block:parameters]
{
  "data": {
    "h-0": "Param",
    "h-1": "Description",
    "h-2": "Type",
    "h-3": "Example",
    "0-0": "**account_id**  \n(_Required_)",
    "0-1": "VWO Account ID",
    "0-2": "Number",
    "0-3": "12345",
    "1-0": "**sId**  \n(_Required_)",
    "1-1": "Session ID / Current UTC Timestamp",
    "1-2": "Number",
    "1-3": "1641218854",
    "2-0": "**u**  \n(_Required_)",
    "2-1": "32 characters long UUID",
    "2-2": "Alphanumeric",
    "2-3": "O33C4BA1CB0C53CDB32B51AF403B344P",
    "3-0": "**experiment_id**  \n(_Required_)",
    "3-1": "VWO Experiment ID",
    "3-2": "Number",
    "3-3": "10",
    "4-0": "**combination**  \n(_Required_)",
    "4-1": "Variation ID in which User got bucketed",
    "4-2": "Number",
    "4-3": "2",
    "5-0": "**env**  \n(_Required_)",
    "5-1": "SDK/environment Key  \nThis is for viewing reports based on the project's environment",
    "5-2": "Alphanumeric",
    "5-3": "aa87170ad94079aa190bc7c9b85d26zz",
    "6-0": "**ap**  \n(_Required_)",
    "6-1": "Platform",
    "6-2": "String",
    "6-3": "server",
    "7-0": "**random**  \n(_Required_)",
    "7-1": "For cache busting",
    "7-2": "Float",
    "7-3": "0.6375406415765388",
    "8-0": "**sdk**  \n(_Optional_)",
    "8-1": "Name of SDK used",
    "8-2": "String",
    "8-3": "_vwo-node-sdk_ or  \n_vwo-java-sdk_ and so on",
    "9-0": "**sdk-v**  \n(_Optional_)",
    "9-1": "The version of SDK used",
    "9-2": "Semver",
    "9-3": "1.30.0"
  },
  "cols": 4,
  "rows": 10,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]

**Response** - JSON 

**Example** - 

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-user?experiment_id=480&combination=1&sId=1641218854&u=O33C4BA1CB0C53CDB32B51AF403B344P&sdk=vwo-node-sdk&sdk-v=1.28.0&account_id=60781&random=0.6375406415765388&ed=%7B%22p%22:%22server%22%7D&env=b243e464740be856d35d4da72c02a15d
```



## Tracking a User Conversion in a campaign

**URL** - GET <https://dev.visualwebsiteoptimizer.com/server-side/track-goal>

**Query Params** 

[block:parameters]
{
  "data": {
    "h-0": "Param",
    "h-1": "Description",
    "h-2": "Type",
    "h-3": "Example",
    "0-0": "**account_id**  \n(_Required_)",
    "0-1": "VWO Account ID",
    "0-2": "Number",
    "0-3": "12345",
    "1-0": "**sId**  \n(_Required_)",
    "1-1": "Session ID / Current UTC Timestamp",
    "1-2": "Number",
    "1-3": "1641218854",
    "2-0": "**u**  \n(_Required_)",
    "2-1": "32 characters long UUID",
    "2-2": "Alphanumeric",
    "2-3": "O33C4BA1CB0C53CDB32B51AF403B344P",
    "3-0": "**experiment_id**  \n(_Required_)",
    "3-1": "VWO Experiment ID",
    "3-2": "Number",
    "3-3": "10",
    "4-0": "**combination**  \n(_Required_)",
    "4-1": "Variation ID in which User got bucketed",
    "4-2": "Number",
    "4-3": "2",
    "5-0": "**goal_id**  \n(_Required_)",
    "5-1": "Goal ID of a campaign",
    "5-2": "Number",
    "5-3": "1",
    "6-0": "**env**  \n(_Required_)",
    "6-1": "SDK/environment Key  \nThis is for viewing reports based on the project's environment",
    "6-2": "Alphanumeric",
    "6-3": "aa87170ad94079aa190bc7c9b85d26zz",
    "7-0": "**ap**  \n(_Required_)",
    "7-1": "Platform",
    "7-2": "String",
    "7-3": "server",
    "8-0": "**random**  \n(_Required_)",
    "8-1": "For cache busting",
    "8-2": "Float",
    "8-3": "0.6375406415765388",
    "9-0": "**sdk**  \n(_Optional_)",
    "9-1": "Name of SDK used",
    "9-2": "String",
    "9-3": "_vwo-node-sdk_ or  \n_vwo-java-sdk_ and so on",
    "10-0": "**sdk-v**  \n(_Optional_)",
    "10-1": "The version of SDK used",
    "10-2": "Semver",
    "10-3": "1.31.0"
  },
  "cols": 4,
  "rows": 11,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]

**Response** - JSON 

**Example** 

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-goal?experiment_id=481&combination=1&sId=1643870500&u=C13C4BA1CB0C53CDB32B51AF403B3352&sdk=vwo-node-sdk&sdk-v=1.32.1&env=aa43e464740be856d35d4da72c02a15d&account_id=12345&random=0.38654106039749414&goal_id=343&ap=servevr
```



## Pushing a Custom Dimension

**URL** - GET <https://dev.visualwebsiteoptimizer.com/server-side/push>

**Query Params** 

[block:parameters]
{
  "data": {
    "h-0": "Param",
    "h-1": "Description",
    "h-2": "Type",
    "h-3": "Example",
    "0-0": "**account_id**  \n(_Required_)",
    "0-1": "VWO Account ID",
    "0-2": "Number",
    "0-3": "12345",
    "1-0": "**sId**  \n(_Required_)",
    "1-1": "Session ID / Current UtC Timestamp",
    "1-2": "Number",
    "1-3": "1641218854",
    "2-0": "**u**  \n(_Required_)",
    "2-1": "32 characters long UUID",
    "2-2": "Alphanumeric",
    "2-3": "O33C4BA1CB0C53CDB32B51AF403B344P",
    "3-0": "**env**  \n(_Required_)",
    "3-1": "SDK/environment Key  \nThis is for viewing reports based on the project's environment",
    "3-2": "Alphanumeric",
    "3-3": "aa87170ad94079aa190bc7c9b85d26zz",
    "4-0": "**tags**",
    "4-1": "Custom Dimension Data",
    "4-2": "JSON",
    "4-3": "{\"u\":{\"key\":\"value\"}}",
    "5-0": "**random**  \n(_Required_)",
    "5-1": "For cache busting",
    "5-2": "Float",
    "5-3": "0.6375406415765388",
    "6-0": "**ap**",
    "6-1": "Platform",
    "6-2": "String",
    "6-3": "server",
    "7-0": "**sdk**  \n(_Optional_)",
    "7-1": "Name of SDK used",
    "7-2": "String",
    "7-3": "_vwo-node-sdk_ or  \n_vwo-java-sdk_ and so on",
    "8-0": "**sdk-v**  \n(_Optional_)",
    "8-1": "The version of SDK used",
    "8-2": "Semver",
    "8-3": "1.30.0"
  },
  "cols": 4,
  "rows": 9,
  "align": [
    "left",
    "left",
    "left",
    "left"
  ]
}
[/block]

**Response** - JSON - have the account and campaigns configuration. Otherwise, the error message.

**Example**

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/push?sId=1643870764&u=4F3FE0FB2FF05CE19233BF181D81DE27&sdk=vwo-node-sdk&sdk-v=1.32.1&env=aa43e464740be856d35d4da72c02a15d&account_id=12345&random=0.1516327177576584&ap=server&tags={"u":{"browser":"chrome"}}&
```