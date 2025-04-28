---
title: Integrations
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
VWO FME SDKs help you integrate with several third-party tools, be it analytics, monitoring, customer data platforms, messaging, etc., by implementing a very basic and generic callback capable of receiving VWO-specific properties that can then be pushed to any third-party tool.

## Usage

```javascript
import { VWOProvider } from 'vwo-fme-react-sdk';

const options = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug', // Optional: Log level for debugging
  },
  integrations: {
    callback (properties) {
      console.log('Integrations callback', properties); // list of keys
    }
  }
};

function App() {
  return (
    <VWOProvider config={options}>
      {/* Your application components */}
    </VWOProvider>
  );
}

export default App;
```

## Properties available to use for integrations

All VWO SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever VWO SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [getFlag](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables) and [trackEvent](https://developers.vwo.com/v2/docs/fme-react-metrics-tracking) APIs.

```json
{
  featureName: String,
  featureId: Number,
  featureKey: String,  // as passed to API
  userId: String,  // As passed to API
  api: String,   // API name which triggered the event: getFlag, getVariable, trackMetric
  customVariables: Object, //custom variables for targeting
  rolloutId: Number,
  rolloutKey: String,  // as passed to API
  rolloutVariationId: Number,  // Which variation was rolled out to the current user
  variationTargetingVariables: Object, //campaign whitelisting conditions
  experimentId: Number,
  experimentKey: String, // as passed to API
  experimentVariationId: Number
}

```

<br />

Different destinations have their own formats for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.

## Which platforms I can integrate with?

Since VWO SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party tool capable of receiving it via APIs. 

> 📘 Note
> 
> Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the VWO SDK.