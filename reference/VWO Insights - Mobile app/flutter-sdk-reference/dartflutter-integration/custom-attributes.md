---
title: Custom Attributes
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
Custom attributes can be created by creating a map that contains key and value pairs as follows:

```javascript Dart
final Map<String, dynamic> attributes = {};
attributes["email"] = "abc@xyz.com";
attributes["name"] = "VWO Insights";
VwoFlutter.sendCustomAttribute(attributes);
```