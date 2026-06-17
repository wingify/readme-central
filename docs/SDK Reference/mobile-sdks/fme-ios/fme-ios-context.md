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
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **object**, the user context includes an _id_ key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various **_attributes_** to support advanced targeting and segmentation strategies. This includes **custom-variables** that are User-specific data points for personalized experiences.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
>
> The **user context attributes** differ from the attributes set using the **_setAttribute_** API.
>
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
>
> Wingify **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of Wingify applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```swift
// Define the user context object to identify and provide user-specific details
let userId = "unique_user_id"
let customVariables: [String : Any] = ["age": 25, "location": "US"]

let userContext = WingifyUserContext(id: userId, customVariables: customVariables)

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
WingifyFme.getFlag(featureKey: "feature_key", context: userContext, completion: { flag in
      let isFlagEnabled = flag.isEnabled()     
})

// Track a metric conversion for the specified event-name
WingifyFme.trackEvent(eventName: "eventName", context: userContext)

// Send a user attribute to Wingify
let attributeMap: [String : Any] = ["userType": "paid"]

WingifyFme.setAttribute(
  attributeMap,
  context: userContext
)
```

## User Context keys

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        _Required_
      </td>

      <td>
        String
      </td>

      <td>
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to Wingify. [Read more here](https://developers.wingify.com/v3/docs/user-id-management)  .
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Any additional details of the current user that you want to push to Wingify can be added here as key-value pairs, can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>

<br />
