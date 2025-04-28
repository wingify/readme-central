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

Metrics in FME are based on "Custom Events" that you can create inside the VWO Application under Data360 product - `Data360 > Events`. All the custom events created in Data360 will be available to be used as metrics in your feature flags. 

Once you have configured custom events as metrics for your feature flag, you can then trigger a conversion for each metric using the following code snippet: 

## _**useTrackEvent**_ Hook

This hook sends data to VWO whenever a defined user action occurs. The captured event data can be used to:

- Measure the success of experiments (e.g., conversion rates).
- Track key performance indicators (KPIs), such as sign-ups or purchases.
- Analyze user engagement with new features or content.
- Trigger real-time personalization based on user behavior.

### How It Works:

When this hook is executed:

- The application sends the event name and user details to VWO’s platform.
- VWO logs the event and associates it with ongoing experiments or feature rollouts.
- The collected data is then available in VWO’s dashboard, where it can be analyzed to measure the effectiveness of tests, features, or campaigns.

### Why It’s Valuable:

- _Conversion Tracking_: Measure how many users complete desired actions, like purchases or sign-ups.
- _Experiment Analysis_: Evaluate the performance of different variations in A/B tests.
- _User Behavior Insights_: Understand how users interact with features and content.
- _Personalization Triggers_: Deliver dynamic content based on real-time user actions.
- _Performance Optimization_: Identify friction points in the user journey to improve the overall experience.

### Usage

```javascript JavaScript
import { useTrackEvent } from "vwo-fme-react-sdk"; // Import the hook

const YourComponent = () => {
  // Track an event when a button is clicked, the second parameter for useTrackEvent is optional.
  useTrackEvent("button_click", { userType: "premium" });
};

export default YourComponent;
```

### Parameters Definition

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**eventName**  \n_Required_",
    "0-1": "String",
    "0-2": "The unique event name you will see when creating the event in Data360. When the trackEvent() function is called, it will record a metric conversion in VWO for the given event name.",
    "1-0": "**eventProperties**  \n_Optional_",
    "1-1": "object",
    "1-2": "any properties of this event that you wish to pass to VWO. E.g: for a \"purchase\" event, some properties could be \"cartValue\", \"currency\", \"shippingMethod\" etc. These must be passed as key-value pairs, and the property name should exactly match what you set while creating the event in VWO > Data360>Events."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


<br />

> 🚧 Note
> 
> Please note that the _Event_ must already be defined in the VWO Application for this otherwise an unregistered won't get tracked in VWO application.