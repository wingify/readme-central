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
      slug: fme-java-flags
      title: Feature Flags
---
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **map**, the user context includes an _id_ key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various _**attributes**_ to support advanced targeting and segmentation strategies. These may include:

- **custom-variables**: User-specific data points for personalized experiences.
- **user-agent**: Information about the user's device, browser, or operating system.
- **ip-address**: Location-based data to enable geo-targeting.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
> 
> The **user context attributes** differ from the attributes set using the **_setAttribute_** API.
> 
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
> 
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```java
// Define the user context object to identify and provide user-specific details
VWOContext userContext = new VWOContext();

// Set User ID - mandatory
userContext.setId("user-id");

// Set IP Address
userContext.setIpAddress("1.1.1.1");

// Set User Agent
userContext.setUserAgent("visitor_user_agent");

// Set Custom Variables
Map<String, ?> customVariables = new HashMap<String, Object>() {
            {
                put("age", 25);
            }
        };
        
userContext.setCustomVariables(customVariables);

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
GetFlag flag = vwoClient.getFlag("feature_key", userContext);

# Track a metric conversion for the specified event-name
vwoClient.trackEvent("event_name", context);

# Send a user attribute to VWO
vwoClient.setAttribute("attribute_key", "attribute_value", context);
```

## User Context keys

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**id**  \n_Required_",
    "0-1": "String",
    "0-2": "Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management)  .",
    "1-0": "**userAgent**  \n_Optional_",
    "1-1": "String",
    "1-2": "The userAgent object for the current user, can be used for targeting & segmentation. ",
    "2-0": "**ipAddress**  \n_Optional_",
    "2-1": "String",
    "2-2": "IP Address of the current user, can be used for targeting & segmentation.",
    "3-0": "**customVariables**  \n_Optional_",
    "3-1": "Object",
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


> 📘 Note
> 
> You need to pass [Gateway Service](<>) configuration while initializing the SDK for targeting (pre-segmentation using user-agent or IP-address-related segments).