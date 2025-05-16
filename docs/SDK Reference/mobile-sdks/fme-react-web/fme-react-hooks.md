---
title: Hooks
excerpt: Available Hooks in VWO FME React SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
The `VWO FME React SDK` provides a set of hooks to help you seamlessly integrate feature flagging, experimentation, and event tracking into your React application. These hooks are designed to provide an easy and flexible way to interact with the VWO SDK.

Here are the available hooks:

## useVWOClient

`useVWOClient` is a custom React hook that provides access to the initialized VWO SDK client instance within components wrapped by `VWOProvider`. It enables interaction with the VWO platform for experiments, feature flags, and tracking.

### Usage with getFlag

```javascript
const { vwoClient, isReady } = useVWOClient();

if (isReady && vwoClient) {
  // Using vwoClient, you can run experiments, track events, and manage feature flags.
	// For example, call methods like vwoClient.getFlag(), vwoClient.trackEvent(), etc.
}
```

[Learn more about feature flagging](https://developers.vwo.com/v2/docs/fme-javascript-flags#/)

Similarly, for `trackEvent` function, please check the example below

```javascript
import { useVWOClient } from 'vwo-fme-react-sdk';

const vwoClient = useVWOClient();

// Record a metric conversion for the specified event 
vwoClient.trackEvent('event-name', userContext);
```

[Learn more about metric conversion](https://developers.vwo.com/v2/docs/fme-javascript-metrics#/)

Similarly, for `setAttribute` function, please check the example below

```javascript
import { useVWOClient } from 'vwo-fme-react-sdk';

const vwoClient = useVWOClient();

// Record a metric conversion for the specified event 
vwoClient.setAttribute('attributeKey', 'attributeValue', userContext);
```

[Learn more about Set Attribute](https://developers.vwo.com/v2/docs/fme-javascript-attributes#/)

## useGetFlag

The `useGetFlag` hook is used to retrieve a feature flag and check its status. It also provides access to associated variables.

* **Usage**: Retrieve the flag and check if it is enabled for the current user.
* **More Info**: [Learn more about useGetFlag](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflag-hook)

## useGetFlagVariable

The `useGetFlagVariable` hook allows you to fetch a specific variable associated with a feature flag.

* **Usage**: Retrieve the value of a specific feature flag variable.
* **More Info**: [Learn more about useGetFlagVariable](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflagvariable-hook)

## useGetFlagVariables

The `useGetFlagVariable` hook allows you to fetch all variables associated with a feature flag.

* **Usage**: Retrieve all feature flag variables.
* **More Info**: [Learn more about useGetFlagVariables](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflagvariables-hook)

## useTrackEvent

The `useTrackEvent` hook allows you to track custom events within your app, such as user actions or conversions.

* **Usage**: Track important metrics, such as button clicks or completed purchases.
* **More Info**: [Learn more about useTrackEvent](https://developers.vwo.com/v2/docs/fme-react-metrics-tracking#usetrackevent-hook)

## useSetAttribute

The `useSetAttribute` hook provides a simple way to associate these attributes with users in VWO for advanced segmentation.

* **Usage**: Assign user attributes to help with segmentation and personalization.
* **More Info**: [Learn more about useSetAttribute](https://developers.vwo.com/v2/docs/fme-react-attributes#usesetattribute-hook)