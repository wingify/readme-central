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


**The below implementation is for Swift **


[block:code]
{
  "codes": [
    {
      "code": "var dict = Dictionary<String, Any>()\ndict[\"email\"] = \"abc@xyz.com\"\ndict[\"rollNumber\"] = 21\n     \nVWO.triggerSyncVisitorPropEvent(visitorData: dict)",
      "language": "swift"
    }
  ]
}
[/block]