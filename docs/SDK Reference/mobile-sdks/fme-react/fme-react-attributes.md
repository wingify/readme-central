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
---
User attributes are specific characteristics or properties assigned to users that help define who they are or how they interact with an application. These attributes can include demographic information (like age, location), behavioral data (such as past purchases), or custom-defined properties relevant to business goals.

For any additional parameters or information about the current user, you can use attributes to pass that data to Wingify.

These attributes would typically be any additional user info that you'd like to use in Wingify for post-segmentation (filtering, slicing and dicing of reports).

For example, you might want to analyze the performance of a test based on the user type to see which user type converted better or worse than the other. For this, you can pass on the "user type" as an attribute to Wingify, with the relevant values for each user, ie "free", "paid" or whatever internal parameters you'd like to use for post-segmentation.

## **_useSetAttribute_** Hook

This hook allows you to assign attributes' key-value pairs to a user. By doing so, Wingify can:

- Segment users based on defined attributes.
- Deliver personalized experiences tailored to individual user preferences.
- Enable targeted feature rollouts to specific user groups.
- Improve the accuracy of experiments by analyzing results across different audience segments.

When this hook is executed, the application assigns the specified attribute (attribute\_key and attribute\_value) to the user defined in the userContext.

> 📘 Important Note
>
> The attributes set using the **_setAttribute_** API differ from the **User Context attributes**
>
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.

> 🚧 Current Limitation
>
> Wingify **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of Wingify applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

### Usage

```typescript
import { useSetAttribute } from 'wingify-fme-react-sdk';

function YourComponent() {
  const { setAttribute, isReady } = useSetAttribute();

  return <button onClick={() => setAttribute({ planId: 2, plan: 'premium' })}>Click Me</button>;
}
```

The `useSetAttribute` hook returns an object containing a `setAttribute` function and an `isReady` boolean. The `setAttribute` allows you to set user attribute, while `isReady` indicates if the hook is ready to be used. This setAttribute function accepts the following parameters:

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
        A key-value object of attributes of the user. The keys are attribute names and values are the corresponding attribute values.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note
>
> Please note that the _Attribute_ must already be defined in the Wingify Application for this, otherwise an unregistered attribute won't get tracked in Wingify application.

<br />
