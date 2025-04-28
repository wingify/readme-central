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
To transmit custom events to VWO via Flutter, create key-value pairs using the subsequent code. The keys should correspond to the event properties of the custom event you intend to dispatch.

<br />

```javascript Dart
final Map<String, dynamic> addToCartEvent = Map();
addToCartEvent["productName"]="VWO Insights";
addToCartEvent["productQuantity"]=1;

VwoFlutter.sendCustomEvent("addToCart", addToCartEvent);

```

<br />

This Dart snippet dispatches a custom event named "addToCart" to VWO using the sendCustomEvent function. 

Ensure that the event name (e.g., "addToCart") and the event property names (e.g., "productQuantity") are the same as defined by you in VWO under the [Data360](https://app.vwo.com/#/data360/events) module.