---
title: Event Batching (Node sdk)
deprecated: false
hidden: true
metadata:
  robots: index
---
## Configuring Event Batching in VWO FME Node SDK

VWO FME Node SDK introduces a powerful mechanism to manage event batching for tracking visitors and conversions. Event Batching optimizes the way data is sent to VWO servers, allowing multiple events to be queued and dispatched together in a single network request. This leads to better performance and more efficient tracking, especially when handling a high volume of events.

<br />

### What is Event Batching?

Event Batching enables the SDK to collect events over a period of time, place them in a queue, and send them to the VWO servers in one batch. For example, if there are 4,000 events, the SDK will queue these events and dispatch them in a single network request, significantly reducing the overhead caused by sending individual requests for each event.

* Key Points:
  * Event Batching tracks multiple events for a single user session, sending them together in a single request.
  * Events are queued and dispatched when a threshold is met in terms of the number of events or the time interval.
  * Batch processing helps optimise network usage and server load.