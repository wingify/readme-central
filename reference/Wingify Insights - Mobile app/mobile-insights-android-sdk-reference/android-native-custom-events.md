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
To transmit custom events to Wingify, create key-value pairs using the subsequent code. The keys should correspond to the event properties of the custom event you intend to dispatch.

<br />

```java
HashMap<String, Object> addToCartEvent = new HashMap<>();
addToCartEvent.put("productName", "Wingify Insights");
addToCartEvent.put("productQuantity", 1);

WingifyInsights.sendCustomEvent("addToCart", addToCartEvent);

```
```kotlin
val addToCartEvent = HashMap<String, Any>()
addToCartEvent["productName"] = "VWO Insights"
addToCartEvent["productQuantity"] = 1

WingifyInsights.sendCustomEvent("addToCart", addToCartEvent)

```

<br />

This snippet dispatches a custom event named "addToCart" to Wingify using the sendCustomEvent function. Event property values may be `Int`, `String`, or `Boolean`; other value types are ignored.

Ensure that the event name (e.g., "addToCart") and the event property names (e.g., "productQuantity") are the same as defined by you in Wingify under the [Data360](https://app.vwo.com/#/data360/events) module.