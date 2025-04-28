---
title: Custom Events
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
To transmit custom events to VWO via React Native, create key-value pairs using the subsequent code. The keys should correspond to the event properties of the custom event you intend to dispatch.

<br />

```javascript
import { customEvent } from 'vwo-insights-react-native-sdk';
  
<Button
            title="Event"
            color="#AE7827"
            click={() => {
		 
            eventName: “addToCart”,
              const addToCartEventData: { [key: string]: any } = {
                productName: 'VWO Insights',
                productQuantity: '1',
              }
              customEvent(eventName, addToCartEventData)
            }}
          />

```

<br />

<br />

This snippet dispatches a custom event named "addToCart" to VWO using the sendCustomEvent function.

<br />

Ensure that the event name (e.g., "addToCart") and the event property names (e.g., "productQuantity") are the same as defined by you in VWO under the [Data360](https://app.vwo.com/#/data360/events) module.