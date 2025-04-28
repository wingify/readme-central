---
title: Metrics Tracking
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-attributes
      title: Attributes
---
Metrics tracking allows you to measure the impact of your features and experiments. The VWO Go SDK provides a `TrackEvent()` method to log custom events.

## TrackEvent()

Use the `TrackEvent()` method to track custom events for a user:

```go
eventName := "purchase"
eventProperties := map[string]interface{}{
    "revenue": 100,
    "itemCount": 2,
}

response, err := vwoClient.TrackEvent(eventName, userContext, eventProperties)
if err != nil {
    // Handle error
}
fmt.Println("Event tracked:", response)
```

## Parameter Definitions

<br />

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**eventName**  \n_Required_",
    "0-1": "String",
    "0-2": "The unique event name you will see when creating the event in Data360. When the trackEvent() function is called, it will record a metric conversion in VWO for the given event name.",
    "1-0": "**userContext**  \n_Required_",
    "1-1": "map[string]interface{}",
    "1-2": "Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context) .",
    "2-0": "**eventProperties**  \n_Optional_",
    "2-1": "map[string]interface{}",
    "2-2": "any properties of this event that you wish to pass to VWO. E.g: for a \"purchase\" event, some properties could be \"cartValue\", \"currency\", \"shippingMethod\" etc. These must be passed as key-value pairs, and the property name should exactly match what you set while creating the event in VWO > Data360>Events."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]