---
title: Configure Event Batching
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
All SDKs send impression events to VWO servers for visitors and conversions tracking. Events are tracked in real-time to i.e. as soon as tracking-data APIs are hit and the data could be seen in VWO Campaigns Reports.
There are scenarios, depending on the implementation and requirements, when a certain number of events need to be collected over a period of time, batched, and relayed to VWO server in a single request. In this case, VWO SDKs offer a way to configure event batching at the time of instantiating the SDK. 
[block:api-header]
{
  "title": "Benefits"
}
[/block]
1. **Less number of network requests** for the same number of impression events.
2. **Total size of transmitted data is reduced** by extracting common properties in every event and sending them once per batch network request.
[block:callout]
{
  "type": "info",
  "title": "Please Note:",
  "body": "Without event batching, impression events are sent to VWO in real-time to be get reflected instantaneously in the campaign reports.\n\nWith event batching, the campaign reports will only be updated once the batch events request is sent from your server to VWO."
}
[/block]

[block:api-header]
{
  "title": "Real-time(Serial) vs Batch Events"
}
[/block]
In a normal scenario, all events are dispatched as soon as the event happens.
In the case of Event Batching, impression events are collected over a period of time, combined, and sent in a single network request.
Event Batching, as opposed to real-time events, requires a setting to decide when the events should be flushed and sent via a network request.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/0f25b75-vwo_serial_vs_batched.png",
        "vwo_serial_vs_batched.png",
        2434,
        1682,
        "#f8f6fa"
      ],
      "caption": "VWO - Serial vs Batched Impression Events"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Configure Event Batching"
}
[/block]
VWO SDKs provide two ways to configure when events should be sent to VWO servers. This can be done only while instantiating the SDK by passing ***batchData*** key along with one or both of the following keys.

1. ***EventsPerRequest*** - number of events that should be batched together and sent to VWO server in a single network request. Until this number is not reached, all events will be queued.
2. *** RequestTimeInterval*** - Send a request to VWO server after batching events only when the oldest event in the queue has lived for the specified time interval.
[block:callout]
{
  "type": "info",
  "title": "Setting the options",
  "body": "If only *EventsPerRequest* is provided then *RequestTimeInterval* is set to a default value of 600(10 minutes).\n\nIf only *RequestTimeInterval* is provided then *RventsPerRequest* is set to a default value of 100 events\n\nIf both *EventsPerRequest* and *RequestTimeInterval* are specified, SDK will send a batch request based on which one happens first. For example, if the events count reaches the limit first then the batch request will be sent and the timer will reset whereas, if the time elapsed even before filling in the required events, a batch request will be sent, the queue will be emptied, and the timer will reset."
}
[/block]

[block:callout]
{
  "type": "success",
  "title": "Request Time Interval",
  "body": "If *RequestTimeInterval* is passed or the default value is used in case of not passing, the timer would only start when the first event would come. This is to ensure the time range is properly used with uneven distribution of events over a period of time. For example, the server starts at **X**th time and the first event occurs at **(X + 5)**th time, the timer will start from (X + 5)th time and will be cleared once the queue is flushed.\nAgain, when the new event will occur, then only the timer would be registered to prevent unnecessary processing and proper utilization of the time-interval window."
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Key",
    "h-1": "Type",
    "h-2": "Range",
    "h-3": "Value",
    "0-0": "EventsPerRequest",
    "1-0": "RequestTimeInterval\n(in seconds)",
    "0-1": "Number",
    "1-1": "Number",
    "h-4": "Value",
    "0-4": "Depending on the requirements",
    "1-4": "Depending on the requirements",
    "0-3": "Depending on the requirements",
    "1-3": "Depending on the requirements",
    "0-2": "Min - 1\nMax - 5000",
    "1-2": "Min - 1\nMax - as per requirements"
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "Either of *eventsPerRequest* or *requestTimeInterval* is required for event batching to work.\nOtherwise, an impression event would be sent in real-time."
}
[/block]

[block:api-header]
{
  "title": "Which events are batched?"
}
[/block]
Events that are responsible for tracking metrics for VWO application i.e. visitors, conversions, and custom dimensions.

Following are the APIs that will push an event into the batch queue:

1. Activate - tracking visitors for both A/B and Feature Test campaigns
2. Is Feature Enabled - tracking visitors for only for Feature Test campaign
3. Track - tracking conversions for A/B and Feature Test campaigns
4. Push - tracking custom dimensions being pushed for post-segmentation capabilities

[block:api-header]
{
  "title": "What happens when the limit is reached?"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "The maximum events that can be queued at a time is **5000**. The maximum payload size is **10 MB**.",
  "title": "Maximum Limits"
}
[/block]
If the above-mentioned limits exceed in any case, VWO server will reject the request responding with status code *413* and message *Payload size too large*. Try with a smaller events number by reducing *eventsPerRequest* or setting a smaller interval via *EventsPerRequest*.

VWO SDKs also provide a functionality to call a function upon successful/failure batch network request to VWO server. You can pass ***FlushCallback*** in *batchData* config at the time of launching the SDK.



[block:parameters]
{
  "data": {
    "h-0": "Key",
    "h-1": "Description",
    "h-2": "Default",
    "h-3": "First Argument",
    "0-2": "-",
    "0-0": "FlushCallback",
    "0-1": "Callback that gets executed when the batch network request is passed/failed",
    "0-3": "err - If the network request responds other than 200 status code, otherwise empty",
    "h-4": "Second Argument",
    "0-4": "events - list of queued events that were flushed"
  },
  "cols": 5,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "Settings settingsFile = VWO.GetSettingsFile(accountId, sdkKey);\n\nBatchEventData batchData = new BatchEventData();\n\nbatchData.EventsPerRequest = 100;\nbatchData.RequestTimeInterval = 86400;\nbatchData.FlushCallback = new FlushCallback();\n\nIVWOClient vwoClientInstance = VWO.Launch(settingsFile, batchData = batchData);",
      "language": "csharp",
      "name": ".NET"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Manually flush events"
}
[/block]
Since VWO SDKs queue the events and are sent in a network request only upon meeting the configurational options limit passed in **batchData** config, there might be cases when you would need to manually flush the queue so that data could be sync with VWO server to be reflected in the respective Campaigns' reports.

This is also helpful in cases where your server abruptly or gracefully gets closed. Ensure to flush the events to VWO so that there would be no data loss on server termination.

VWO SDKs have introduced a new API on the client's instance. The name of the API is ***FlushEvents*** .
It makes sure to flush the queue irrespective of the ***batchData*** configuration so that events could be successfully reached to VWO server without any data loss. Any timers associated would also be cleared.

**FlushEvents** API
[block:parameters]
{
  "data": {
    "h-0": "API name",
    "h-1": "Description",
    "0-0": "FlushEvents",
    "0-1": "Manually flush the batch events queue so that the queued data could be successfully sent to VWO server"
  },
  "cols": 2,
  "rows": 1
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "bool response = VWOClient.FlushEvents();",
      "language": "csharp",
      "name": ".NET"
    }
  ]
}
[/block]