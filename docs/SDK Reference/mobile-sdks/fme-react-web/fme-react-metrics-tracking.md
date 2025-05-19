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

## ***useTrackEvent*** Hook

This hook sends data to VWO whenever a defined user action occurs. The captured event data can be used to:

* Measure the success of experiments (e.g., conversion rates).
* Track key performance indicators (KPIs), such as sign-ups or purchases.
* Analyze user engagement with new features or content.
* Trigger real-time personalization based on user behavior.

### How It Works:

When this hook is executed:

* The application sends the event name and user details to VWO’s platform.
* VWO logs the event and associates it with ongoing experiments or feature rollouts.
* The collected data is then available in VWO’s dashboard, where it can be analyzed to measure the effectiveness of tests, features, or campaigns.

### Why It’s Valuable:

* *Conversion Tracking*: Measure how many users complete desired actions, like purchases or sign-ups.
* *Experiment Analysis*: Evaluate the performance of different variations in A/B tests.
* *User Behavior Insights*: Understand how users interact with features and content.
* *Personalization Triggers*: Deliver dynamic content based on real-time user actions.
* *Performance Optimization*: Identify friction points in the user journey to improve the overall experience.

> 📘 Important Note
>
> * The event name and properties sent via the  ***trackEvent*** hook must correspond exactly to the custom events defined in VWO’s Data360 module.
> * If the event is not pre-registered in Data360, the conversion will not be recorded in the VWO dashboard.
> * Event properties should match the key names and data types defined in the event setup to ensure accurate metric tracking and reporting.
> * The trackEvent hook is primarily for conversion and behavioral tracking and should not be used to alter user targeting or feature rollout logic.

### Usage

```typescript TypeScript
import { useTrackEvent } from "vwo-fme-react-sdk";

const YourComponent = () => {
  const { trackEvent, isReady } = useTrackEvent();

  const handleClick = () => {
    if (isReady) {
      trackEvent("button_click", { userType: "premium" });
    }
  };

  return <button onClick={handleClick}>Track Click</button>;
};

export default YourComponent;

```

### Parameters Definition

The useTrackEvent hook returns an object containing a trackEvent function and an isReady boolean. The trackEvent function allows you to track custom events and conversions, while isReady indicates if the hook is ready to be used. The trackEvent function accepts the following parameters:

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
        **eventProperties**
        *Optional*
      </td>

      <td>
        object
      </td>

      <td>
        any properties of this event that you wish to pass to VWO. E.g: for a "purchase" event, some properties could be "cartValue", "currency", "shippingMethod" etc. These must be passed as key-value pairs, and the property name should exactly match what you set while creating the event in VWO > Data360>Events.
      </td>
    </tr>
  </tbody>
</Table>

### Hook Lifecycle & Side Effects

* On each render:
  * Initializes and returns a stable trackEvent function.
  * Pulls vwoClient, userContext, and isReady from useVWOContext.
* When the trackEvent() function is invoked:
  * Validates Inputs:
    * Ensures eventName is a non-empty string.
    * Checks if userContext exists and contains a valid id.
    * Verifies that vwoClient is initialized and SDK is ready.
  * If all validations pass:
    * Sends the event to VWO via vwoClient.trackEvent(), including eventProperties if provided.
    * Returns a Promise that resolves to \{ \[eventName]: true } on success.
  * If validations fail or tracking fails:
    * Logs detailed errors using the internal logger.
    * Gracefully resolves with an empty object {} to avoid app crashes.
* Side Effects:
  * Network call made to VWO’s event ingestion endpoint when trackEvent() is called.
  * Logs internal messages for missing inputs or runtime errors.
* Graceful Degradation:
  * The hook does not throw exceptions; it always returns a safe response.
  * Ensures predictable behavior even when VWO context is misconfigured or unavailable.

### Return Type

```typescript TypeScript
interface ITrackEvent {
  trackEvent: (
    eventName: string,
    eventProperties?: Record<string, string | number | boolean>,
  ) => Promise<Record<string, boolean>>;
  isReady: boolean;
}
```

The hook returns an object with the following structure:

* `trackEvent` : Sends the event to VWO and returns a Promise resolving to \{ \[eventName]: boolean }.
* `isReady` : Boolean indicating whether the VWO SDK and userContext are properly initialized and the application is ready to track events. Should always be checked before calling trackEvent.

> 🚧 Note
>
> Please note that the *Event* must already be defined in the VWO Application for this otherwise an unregistered won't get tracked in VWO application.