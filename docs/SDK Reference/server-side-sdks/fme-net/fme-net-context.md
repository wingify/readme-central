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
---
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **dictionary**, the user context includes an _id_ key that uniquely identifies the user.

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

```node C#
// Define the user context object to identify and provide user-specific details
var userContext = new VWOContext
{
    Id = "unique_user_id",
    CustomVariables = new Dictionary<string, object> { { "age", 25 }, { "location", "US" } },
    UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    IpAddress = "1.1.1.1"
};
// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
var flag = vwoClient.GetFlag("feature_key", userContext);

// Track a metric conversion for the specified event-name
vwoClient.TrackEvent("event_name", userContext);

// Send a user attribute to VWO
vwoClient.SetAttribute("attribute_key", "attribute_value", userContext);

```

## User Context keys

[block:parameters]
{
  "data": {
    "h-0": "Paramter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**Id**  \n_Required_",
    "0-1": "string",
    "0-2": "Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management)  .",
    "1-0": "**UserAgent**  \n_Optional_",
    "1-1": "string",
    "1-2": "The userAgent object for the current user, can be used for targeting & segmentation. ",
    "2-0": "**IpAddress**  \n_Optional_",
    "2-1": "string",
    "2-2": "IP Address of the current user, can be used for targeting & segmentation.",
    "3-0": "**CustomVariables**  \n_Optional_",
    "3-1": "Dictionary\\<string, object>",
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