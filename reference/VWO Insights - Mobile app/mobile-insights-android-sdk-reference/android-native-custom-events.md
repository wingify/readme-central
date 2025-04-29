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
To transmit custom events to VWO, create key-value pairs using the subsequent code. The keys should correspond to the event properties of the custom event you intend to dispatch.

<br />

```java
HashMap<String, String> addToCartEvent = new HashMap<>();
addToCartEvent.put("productName", "VWO Insights");
addToCartEvent.put("productQuantity", 1);

VWOInsights.INSTANCE.sendCustomEvent("addToCart", addToCartEvent);

```
```kotlin
val addToCartEvent = HashMap<String, String>()
addToCartEvent["productName"] = "VWO Insights"
addToCartEvent["productQuantity"] = 1

VWOInsights.sendCustomEvent("addToCart", addToCartEvent)

```

<br />

This snippet dispatches a custom event named "addToCart" to VWO using the sendCustomEvent function. 

Ensure that the event name (e.g., "addToCart") and the event property names (e.g., "productQuantity") are the same as defined by you in VWO under the [Data360](https://app.vwo.com/#/data360/events) module.
