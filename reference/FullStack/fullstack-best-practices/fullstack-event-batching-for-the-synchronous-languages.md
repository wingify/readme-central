---
title: Event Batching for the synchronous languages
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
Programming languages that support asynchronous behavior like Node.js, .NET, Java, and Go, send asynchronous calls for tracking data to the VWO server. No latency is introduced in the API calls.

For programming languages that do not support asynchronous behavior like PHP, Python, and Ruby, add latency of approximately 150 ms in the overall API call. This is because a tracking call is sent from the SDK to the VWO server to track data that could be visualized in the campaigns' report.

Configuring event batching also helps in:

* **Fewer network requests** for the same number of impression events.
* **The total size of transmitted data is reduced** by extracting common properties in every event and sending them once per batch network request.

Without event batching, impression events are sent to VWO in real-time to be get reflected instantaneously in the campaign reports.

With [event batching](https://developers.vwo.com/reference#configure-event-batching), the campaign reports will only be updated once the batch-events request is sent from your server to the VWO's server.