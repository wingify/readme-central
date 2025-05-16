---
title: Attributes (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
User attributes are specific characteristics or properties assigned to users that help define who they are or how they interact with an application. These attributes can include demographic information (like age, location), behavioral data (such as past purchases), or custom-defined properties relevant to business goals.

For any additional parameters or information about the current user, you can use attributes to pass that data to VWO.

These attributes would typically be any additional user info that you'd like to use in VWO for post-segmentation (filtering, slicing and dicing of reports).

For example, you might want to analyze the performance of a test based on the user type to see which user type converted better or worse than the other. For this, you can pass on the "user type" as an attribute to VWO, with the relevant values for each user, ie "free", "paid" or whatever internal parameters you'd like to use for post-segmentation.

## ***useSetAttribute*** Hook

This hook allows you to assign attributes' key-value pairs to a user. By doing so, VWO can:

* Segment users based on defined attributes.
* Deliver personalized experiences tailored to individual user preferences.
* Enable targeted feature rollouts to specific user groups.
* Improve the accuracy of experiments by analyzing results across different audience segments.

When this hook is executed, the application assigns the specified attribute (attribute\_key and attribute\_value) to the user defined in the userContext.

### Why It’s Valuable:

* *Audience Segmentation*: Create dynamic user segments based on attributes like location, membership status, or behavior.
* *Advanced Experimentation*: Analyze A/B test results across different user segments for deeper insights.

> 📘 Important Note
>
> The attributes set using the ***setAttribute*** API differ from the **User Context attributes**
>
> * ***setAttribute* API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.
> * **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.

> 🚧 Current Limitation
>
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the *setAttribute* API.

### Usage

```typescript
import { useSetAttribute } from 'vwo-fme-react-sdk';

function YourComponent() {
  const { setAttribute, isReady } = useSetAttribute();

  return <button onClick={() => setAttribute({ age: 25, location: 'US' })}>Click Me</button>;
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
        *Required*
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
> Please note that the *Attribute* must already be defined in the VWO Application for this, otherwise an unregistered attribute won't get tracked in VWO application.