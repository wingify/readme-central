---
title: User Context
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
      slug: fme-go-flags
      title: Feature Flags
---
The user context is a crucial component in VWO's Feature Management and Experimentation SDK. It provides information about the current user, which is used for targeting and segmentation.

## Usage

When calling methods like `GetFlag()`, you need to provide a user context:

```go
userContext := map[string]interface{}{
    "userId":          "user123",
    "customVariables": map[string]interface{}{
        "age":    25,
        "country": "US",
    },
    "userAgent": "Mozilla/5.0...",
    "ipAddress": "127.0.0.1",
}

flag, err := vwoClient.GetFlag("feature_key", userContext)
if err != nil {
    // Handle error
}

 
```

<br />

[block:parameters]
{
  "data": {
    "h-0": "Paramter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**userId**  \n_Required_",
    "0-1": "String",
    "0-2": "Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management)  .",
    "1-0": "**userAgent**  \n_Optional_",
    "1-1": "String",
    "1-2": "The userAgent object for the current user, can be used for targeting & segmentation. ",
    "2-0": "**ipAddress**  \n_Optional_",
    "2-1": "String",
    "2-2": "IP Address of the current user, can be used for targeting & segmentation.",
    "3-0": "**customVariables**  \n_Optional_",
    "3-1": "map[string]interface{}",
    "3-2": "Any additional details of the current user that you want to push to VWO can be added here as key-value pairs, can be used for targeting & pre-segmentation."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


The userId is required for all SDK calls. Other properties are optional but can be used for more precise targeting and segmentation.