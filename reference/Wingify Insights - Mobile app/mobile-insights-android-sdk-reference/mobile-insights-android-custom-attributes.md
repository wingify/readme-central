---
title: Custom Attributes
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Custom attributes can be created by creating a map that contains all the key and value pairs as follows:

```java
HashMap map = new HashMap<String, Object>();
map.put("email", "abc@xyz.com");
map.put("name", "VWO Insights");

VWOInsights.INSTANCE.sendCustomAttribute(map);
```
```kotlin
val map = mutableMapOf<String, Any>()
map["email"] = "abc@xyz.com"
map["name"] = "VWO Insights"
  
VWOInsights.sendCustomAttribute(map)
```
