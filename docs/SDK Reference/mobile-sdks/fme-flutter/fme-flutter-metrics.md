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
---
Every feature flag that you create can have connected metrics that can be used to track strategic KPIs relating to the feature. These metrics can be used to track the performance of control vs variation in the case of testing rules, and can also be used to measure the impact of personalize and rollout campaigns.

For each feature flag, you need to define at least one "Primary Metric", and you can set up as many secondary metrics as you'd like. 

Metrics in FME are based on "Custom Events" that you can create in VWO > Data360>Events. All the custom events created in Data360 will be available to be used as metrics in your feature flags. 

Once you have configured custom events as metrics for your feature flag, you can then trigger a conversion for each metric using the following code snippet: 

## ***Track Event*** API

This API sends data to VWO whenever a defined user action occurs. The captured event data can be used to:

* Measure the success of experiments (e.g., conversion rates).
* Track key performance indicators (KPIs), such as sign-ups or purchases.
* Analyze user engagement with new features or content.
* Trigger real-time personalization based on user behavior.

### How It Works:

When this API is executed:

* The application sends the event name and user details to VWO’s platform.
* VWO logs the event and associates it with ongoing experiments or feature rollouts.
* The collected data is then available in VWO’s dashboard, where it can be analyzed to measure the effectiveness of tests, features, or campaigns.

### Why It’s Valuable:

* *Conversion Tracking*: Measure how many users complete desired actions, like purchases or sign-ups.
* *Experiment Analysis*: Evaluate the performance of different variations in A/B tests.
* *User Behavior Insights*: Understand how users interact with features and content.
* *Personalization Triggers*: Deliver dynamic content based on real-time user actions.
* *Performance Optimization*: Identify friction points in the user journey to improve the overall experience.

## Usage

```swift Dart
// Record a metric conversion for the specified event without any additional properties.
// 'event_name' is the name of the event to be tracked.
// The 'user_context' ensures the event is associated with the correct user.
final trackingResult = await vwoClient?.trackEvent(
  eventName: eventName,
  context: userContext
);

// Record a metric conversion for the specified event with additional properties.
// Set 'eventProperties' to provide custom attributes for the event (e.g., 'category' to specify category type).
var eventProperties = {
    "category": "electronics",
    "isWishlisted":false,
    "price": 21,
    "productId":1,
};

final trackingResult = await vwoClient?.trackEvent(
  eventName: eventName,
  context: userContext,
  eventProperties: eventProperties
);
```

## Parameters Definition

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
        **context**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-flutter-context) .
      </td>
    </tr>

    <tr>
      <td>
        **eventProperties**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        any properties of this event that you wish to pass to VWO. E.g: for a "purchase" event, some properties could be "cartValue", "currency", "shippingMethod" etc. These must be passed as key-value pairs, and the property name should exactly match what you set while creating the event in VWO > Data360>Events.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note
>
> Please note that the *Event* must already be defined in the VWO Application for this otherwise an unregistered won't get tracked in VWO application.
