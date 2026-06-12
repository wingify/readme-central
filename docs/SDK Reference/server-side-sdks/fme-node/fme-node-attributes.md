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
      slug: fme-node-logging
      title: Error Logging
---
User attributes are specific characteristics or properties assigned to users that help define who they are or how they interact with an application. These attributes can include demographic information (like age, location), behavioral data (such as past purchases), or custom-defined properties relevant to business goals.

For any additional parameters or information about the current user, you can use attributes to pass that data to.

These attributes would typically be any additional user info that you'd like to use in Wingify for post-segmentation (filtering, slicing and dicing of reports).

For example, you might want to analyze the performance of a test based on the user type to see which user type converted better or worse than the other. For this, you can pass on the "user type" as an attribute to, with the relevant values for each user, ie "free", "paid" or whatever internal parameters you'd like to use for post-segmentation.

## _Set Attribute_ API

This API allows you to assign a specific attribute key-value pair to a user. By doing so, Wingify can:

- Segment users based on defined attributes.
- Deliver personalized experiences tailored to individual user preferences.
- Enable targeted feature rollouts to specific user groups.
- Improve the accuracy of experiments by analyzing results across different audience segments.

### How It Works:

When this API is executed:

- The application assigns the specified attribute (attribute\_key and attribute\_value) to the user defined in the user\_context.
- Wingify stores this attribute information and uses it to influence feature flag decisions, experiment variations, and targeting rules.
- This data is then factored into real-time decision-making, allowing Wingify to determine which features, content, or experiments are relevant to the user.

> 📘 Important Note
>
> The attributes set using the **_setAttribute_** API differ from the **User Context attributes**
>
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.

> 🚧 Current Limitation
>
> Wingify **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of Wingify applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```node
// Set a custom user attribute in Wingify for the specified user context.
// 'attribute_key' is the name of the attribute (e.g., 'subscription_status').
// 'attribute_value' is the value to assign to the attribute (e.g., 'premium').
const attributeMap = {attributeKey: 'attributeValue'};
wingifyClient.setAttribute(attributeMap, userContext);
```

### Parameters Definition

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
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
        **attributeMap**
        _Required_
      </td>

      <td>
        object
      </td>

      <td>
        Multiple attributes you want to set for a user.
      </td>
    </tr>

    <tr>
      <td>
        **userContext**
        _Required_
      </td>

      <td>
        object
      </td>

      <td>
        Object containing user identification and other contextual information
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note
>
> Please note that the _Attribute_ must already be defined in the Wingify Application for this, otherwise an unregistered attribute won't get tracked in Wingify application.

<br />
