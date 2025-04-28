---
title: Attributes
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-storage
      title: Storage Service
---
Attributes allow you to update user properties dynamically. These can be used for user segmentation and targeting in your VWO campaigns.

## SetAttribute()

Use the `SetAttribute()` method to set a custom attribute for a user:

```go
err := vwoClient.SetAttribute("attribute-key", "attribute-value", userContext)
if err != nil {
    // Handle error
}
```

<br />

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**attributeKey**  \n_Required_",
    "0-1": "String",
    "0-2": "The key of the attribute to set",
    "1-0": "**attributeValue**  \n_Required_",
    "1-1": "interface{}",
    "1-2": "The value of the attribute.",
    "2-0": "**userContext**  \n_Required_",
    "2-1": "map[string]interface{}",
    "2-2": "Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context)  ."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]