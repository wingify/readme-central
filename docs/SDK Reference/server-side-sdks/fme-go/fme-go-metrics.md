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

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **eventName**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The unique event name you will see when creating the event in Data360. When the trackEvent() function is called, it will record a metric conversion in VWO for the given event name.
      </td>
    </tr>

    <tr>
      <td>
        **userContext**\
        *Required*
      </td>

      <td>
        map[string]interface\{}
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context) .
      </td>
    </tr>

    <tr>
      <td>
        **eventProperties**\
        *Optional*
      </td>

      <td>
        map[string]interface\{}
      </td>

      <td>
        any properties of this event that you wish to pass to VWO. E.g: for a "purchase" event, some properties could be "cartValue", "currency", "shippingMethod" etc. These must be passed as key-value pairs, and the property name should exactly match what you set while creating the event in VWO > Data360>Events.
      </td>
    </tr>
  </tbody>
</Table>
