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
All SDKs send impression events to VWO servers for visitors and conversions tracking. Events are tracked in real-time to i.e. as soon as tracking-data APIs are hit and the data could be seen in VWO Campaigns Reports.\
There are scenarios, depending on the implementation and requirements, when a certain number of events need to be collected over a period of time, batched, and relayed to VWO server in a single request. In this case, VWO SDKs offer a way to configure event batching at the time of instantiating the SDK. 

## Benefits

1. **Less number of network requests** for the same number of impression events.
2. **Total size of transmitted data is reduced** by extracting common properties in every event and sending them once per batch network request.

> 📘 Please Note:
>
> Without event batching, impression events are sent to VWO in real-time to be get reflected instantaneously in the campaign reports.
>
> With event batching, the campaign reports will only be updated once the batch events request is sent from your server to VWO.

## Real-time(Serial) vs Batch Events

In a normal scenario, all events are dispatched as soon as the event happens.\
In the case of Event Batching, impression events are collected over a period of time, combined, and sent in a single network request.\
Event Batching, as opposed to real-time events, requires a setting to decide when the events should be flushed and sent via a network request.

<Image title="vwo_serial_vs_batched.png" alt={2434} src="https://files.readme.io/0f25b75-vwo_serial_vs_batched.png">
  VWO - Serial vs Batched Impression Events
</Image>

## Configure Event Batching

VWO SDKs provide two ways to configure when events should be sent to VWO servers. This can be done only while instantiating the SDK by passing ***batch\_events*** key along with one or both of the following keys.

1. ***events\_per\_request*** - number of events that should be batched together and sent to VWO server in a single network request. Until this number is not reached, all events will be queued.
2. ***request\_time\_interval*** - Send a request to VWO server after batching events only when the oldest event in the queue has lived for the specified time interval.

> 📘 Setting the options
>
> If only *events\_per\_request* is provided then *request\_time\_interval* is set to a default value of 600(10 minutes).
>
> If only *request\_time\_interval* is provided then *events\_per\_request* is set to a default value of 100 events
>
> If both *events\_per\_request* and *request\_time\_interval* are specified, SDK will send a batch request based on which one happens first. For example, if the events count reaches the limit first then the batch request will be sent and the timer will reset whereas, if the time elapsed even before filling in the required events, a batch request will be sent, the queue will be emptied, and the timer will reset.

> 👍 Request Time Interval
>
> If *request\_time\_interval* is passed or the default value is used in case of not passing, the timer would only start when the first event would come. This is to ensure the time range is properly used with uneven distribution of events over a period of time. For example, the server starts at **X**th time and the first event occurs at **(X + 5)**&#x74;h time, the timer will start from (X + 5)th time and will be cleared once the queue is flushed.\
> Again, when the new event will occur, then only the timer would be registered to prevent unnecessary processing and proper utilization of the time-interval window.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Key
      </th>

      <th>
        Type
      </th>

      <th>
        Range
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        events\_per\_request
      </td>

      <td>
        Number
      </td>

      <td>
        Min - 1\
        Max - 5000
      </td>
    </tr>

    <tr>
      <td>
        request\_time\_interval\
        (in seconds)
      </td>

      <td>
        Number
      </td>

      <td>
        Min - 1\
        Max - as per requirements
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Either of *events\_per\_request* or *request\_time\_interval* is required for event batching to work.\
> Otherwise, an impression event would be sent in real-time.

## Which events are batched?

Events that are responsible for tracking metrics for VWO application i.e. visitors, conversions, and custom dimensions.

Following are the APIs that will push an event into the batch queue:

1. Activate - tracking visitors for both A/B and Feature Test campaigns
2. Is Feature Enabled - tracking visitors for only for Feature Test campaign
3. Track - tracking conversions for A/B and Feature Test campaigns
4. Push - tracking custom dimensions being pushed for post-segmentation capabilities

## What happens when the limit is reached?

> 📘 Maximum Limits
>
> The maximum events that can be queued at a time is **5000**. The maximum payload size is **10 MB**.

If the above-mentioned limits exceed in any case, VWO server will reject the request responding with status code *413* and message *Payload size too large*. Try with a smaller events number by reducing *events\_per\_request* or setting a smaller interval via *request\_time\_interval* .

VWO SDKs also provide a functionality to call a function upon successful/failure batch network request to VWO server. You can pass ***flushCallback*** in *batch\_events* config at the time of launching the SDK.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Key
      </th>

      <th>
        Description
      </th>

      <th>
        Default
      </th>

      <th>
        First Argument
      </th>

      <th>
        Second Argument
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        flushCallback
      </td>

      <td>
        Callback that gets executed when the batch network request is passed/failed
      </td>

      <td>
        Anonymous empty function
      </td>

      <td>
        err - If the network request responds other than 200 status code, otherwise empty
      </td>

      <td>
        events - list of queued events that were flushed
      </td>
    </tr>
  </tbody>
</Table>

```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)

vwo.launch(settings_file,
            batch_events = {
              'events_per_request': 5, # specify the number of events
              'request_time_interval': 60, # time in seconds
              'flush_callback': flush_callback
            }
)
```

## Manually flush events

Since VWO SDKs queue the events and are sent in a network request only upon meeting the configurational options limit passed in **batch\_events** config, there might be cases when you would need to manually flush the queue so that data could be sync with VWO server to be reflected in the respective Campaigns' reports.

This is also helpful in cases where your server abruptly or gracefully gets closed. Ensure to flush the events to VWO so that there would be no data loss on server termination.

VWO SDKs have introduced a new API on the client's instance. The name of the API is ***flush\_events*** .\
It makes sure to flush the queue irrespective of the ***batch\_events*** configuration so that events could be successfully reached to VWO server without any data loss. Any timers associated would also be cleared.

**flush\_events** API

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        API name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        flush\_events
      </td>

      <td>
        Manually flush the batch events queue so that the queued data could be successfully sent to VWO server
      </td>
    </tr>
  </tbody>
</Table>

```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)

vwo.launch(settings_file,
            batch_events = {
              'events_per_request': 5, # specify the number of events
              'request_time_interval': 60, # time in seconds
              'flush_callback': flush_callback
            }
)

@app.route("/flush-events")
def flush_events():
    # mode is used to specify the nature of batch call.
    # Can be 'sync' or 'async', defaults to 'sync'
    mode = request.args.get("mode")
    vwo_client_instance.flush_events(mode = mode)
    return jsonify({'success': True})
```
