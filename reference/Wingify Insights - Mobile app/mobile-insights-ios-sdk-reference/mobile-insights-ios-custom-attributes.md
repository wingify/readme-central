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

**The below implementation is for Swift**

```swift
var dict = Dictionary<String, Any>()
dict["email"] = "abc@xyz.com"
dict["rollNumber"] = 21
     
VWO.triggerSyncVisitorPropEvent(visitorData: dict)
```
