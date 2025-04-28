---
title: Event Batching for Synchronous Langauges
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: event-batching-for-the-asynchronous-languages
      title: Event Batching for the Asynchronous languages
---
Languages that support asynchronous behavior like Node.js, .NET, Java, and Go, send tracking calls without adding any significant impact in the API call in terms of latency.

With languages that do not support asynchronous behavior like PHP, Python, and Ruby, add latency to the overall API call in order to track the data from the server to the VWO. In order to reduce the latency, event-batching could be used which groups event and send a single call once the events per request or time interval to send a call is reached.

Configuring event batching also helps in the following:

* **Fewer network requests** for the same number of impression events.
* **The total size of transmitted data is reduced** by extracting common properties from every event, grouping events, and sending them once per network request.

Without event batching, impression events are sent to VWO in real-time to be get reflected instantaneously in the campaign reports.

With [event batching](https://developers.vwo.com/reference#configure-event-batching), the campaign reports will only be updated once the batch-events request is sent from your server to the VWO's server.