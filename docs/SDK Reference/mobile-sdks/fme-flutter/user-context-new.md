---
title: User Context
deprecated: false
hidden: false
metadata:
  robots: index
---
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **object**, the user context includes an *id* key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various ***attributes*** to support advanced targeting and segmentation strategies. This includes **custom-variables** that are User-specific data points for personalized experiences.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
>
> The **user context attributes** differ from the attributes set using the ***setAttribute*** API.
>
> * **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> * ***setAttribute* API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
>
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the *setAttribute* API.

## Usage

```swift Dart
// Define the user context object to identify and provide user-specific details
final userContext = VWOUserContext(
    id: userId,
    customVariables: {
        "age": 24,
        "location": "US"
    }
);

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
final featureFlag = await vwoClient?.getFlag(
    featureKey: "feature_key",
    context: userContext,
);

// Track a metric conversion for the specified event-name
await vwoClient?.trackEvent(
    eventName: eventName,
    context: userContext,
    eventProperties: {"cartvalue": 10} // Optional properties if needed
);

// Send a user attribute to VWO
final attributes = {
    "userType": "paid"
};
await vwoClient?.setAttribute(
    attributes: attributes,
    context: userContext,
);
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
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management)  .
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Any additional details of the current user that you want to push to VWO can be added here as key-value pairs, can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>