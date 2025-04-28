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
[block:code]
{
  "codes": [
    {
      "code": "HashMap map = new HashMap<String, Object>();\nmap.put(\"email\", \"abc@xyz.com\");\nmap.put(\"name\", \"VWO Insights\");\n\nVWOInsights.INSTANCE.sendCustomAttribute(map);",
      "language": "java"
    },
    {
      "code": "val map = mutableMapOf<String, Any>()\nmap[\"email\"] = \"abc@xyz.com\"\nmap[\"name\"] = \"VWO Insights\"\n  \nVWOInsights.sendCustomAttribute(map)",
      "language": "kotlin"
    }
  ]
}
[/block]