---
title: Feature Flags & Variables (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
A **feature flag** is a tool that allows teams to control the visibility and behavior of features without deploying new code. It enables **dynamic feature rollouts**, targeted testing, and quick rollbacks if needed.

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME. To implement a feature flag, first use the useGetFlag() hook to retrieve the flag configuration. The *useGetFlag()* hook provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns an object that you can pass to other hooks, like *useGetFlagVariable()* and *useGetFlagVariables()* to fetch the value for a specific *variableKey* and also to fetch all variables respectively.

**Key Benefits:**

* Granular Feature Control: Roll out features to specific user segments.
* A/B Testing: Seamlessly test different feature variations.
* Real-Time Personalization: Adjust feature behavior based on user attributes dynamically.
* Reduced Deployment Risk: Enable/disable features without code deployments, minimizing potential issues.

## ***useGetFlag*** Hook

useGetFlag is a custom React hook to fetch and manage the state of a specific feature flag from the VWO SDK. It allows components to retrieve the current status and variables of a feature flag based on a feature key and optional user context.

### Usage without UserContext (If provided in VWOProvider)

```typescript TypeScript
import React from 'react';
import { useGetFlag, useGetFlagVariable, useGetFlagVariables } from 'vwo-fme-react-sdk'; // Import hooks

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key');

  // Use the flag object returned by useGetFlag to retrieve a specific variable
  const variableValue = useGetFlagVariable(flag, "variable-value", "default-value");
  return (
    <div>
      {/* Display the feature flag variable value */}
      <p>Feature Flag Variable Value: {variableValue}</p>
    </div>
  );
};

export default YourComponent;
```

### Usage With UserContext

```typescript TypeScript
import React from 'react';
import { useGetFlag, useGetFlagVariable, IVWOContextModel } from 'vwo-fme-react-sdk'; // Import hooks

const YourComponent = () => {

  const userContext: IVWOContextModel = {
    id: 'unique_user_id',
    customVariables: { age: 25, location: 'US' },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    ipAddress: '1.1.1.1',
  };
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key', userContext);

  // Use the flag object returned by useGetFlag to retrieve a specific variable
  const variableValue = useGetFlagVariable(flag, "variable-value", "default-value");

  return (
    <div>
      {/* Display the feature flag variable value */}
      <p>Feature Flag Variable Value: {variableValue}</p>
    </div>
  );
};

export default YourComponent;
```

> 📘 When to Use `isReady`
>
> 1. When `VWOProvider` and the `useGetFlag` hook are used together on the same page without providing a `fallbackComponent` in `VWOProvider`.
> 2. When performing pre-segmentation based on user-agent or IP address, to ensure the VWO client and flags are fully available before using flag data.

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
        **featureKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique identifier for the particular feature flag that you're implementing. You will see this while creating a feature flag, and you can also find it under 'Settings' for the Feature Flag after creating it.
      </td>
    </tr>

    <tr>
      <td>
        **UserContext**
        *Optional*
      </td>

      <td>
        IVWOContextModel
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-react-user-context).
      </td>
    </tr>
  </tbody>
</Table>

### Hook Lifecycle & Side Effects

* \`On mount and whenever featureKey, context (deep compared), or readiness changes, the hook:
  * `Validates inputs (`featureKey\` and user context).
  * If valid and the VWO client is ready, asynchronously fetches the feature flag using `vwoClient.getFlag()`.
  * Updates local state with the fetched flag instance.
  * Updates the user context in the global VWO context via `setUserContext`.
  * Manages a loading state (`isLoading`) to track readiness.
* Errors during flag fetch are caught and logged without crashing the app.
* Uses `useMemo` to memoize user context and avoid unnecessary refetches on stable inputs.
* Uses `useCallback` to memoize the flag fetch function.
* Returns a fallback flag object when not ready or on errors, to ensure safe usage in components.

### Return Type

```typescript
interface IFlag {
  flag: Flag;       // flag details and variables
  isReady: boolean; // Indicates if the flag has been successfully fetched and is ready for use
}
```

* `flag`: The VWO feature flag instance or a default fallback flag if not ready or errors occur.
* `isReady`: Becomes true once the flag data is loaded and available.

## ***useGetFlagVariable*** Hook

If a particular feature flag is enabled for a user, you can then fetch the required variables corresponding to that feature flag. These variables need to be configured in VWO, which can then be fetched at your server and used to control the user's experience in your codebase.

The *useGetFlagVariable()* hook retrieves the value of a specific variable associated with a feature flag. If the variable is found, it returns the assigned value; otherwise, it returns the provided default value. This ensures that your application has a fallback value in case the variable is undefined or unavailable.

### Usage

```typescript
// Retrieve the flag using the feature key
const { flag, isReady } = useGetFlag('feature_key', userContext);

// Use the flag object returned by useGetFlag to retrieve a specific variable
const variableValue = useGetFlagVariable(flag, "variable-value", "default-value");
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
        **flag**
        *Required*
      </td>

      <td>
        object
      </td>

      <td>
        flag object returned by useGetFlag hook.
      </td>
    </tr>

    <tr>
      <td>
        **variableKey**
        *Required*
      </td>

      <td>
        string
      </td>

      <td>
        The unique key of the variable as defined in the VWO application. This key is used to retrieve the corresponding variable value.
      </td>
    </tr>

    <tr>
      <td>
        **defaultValue**
        *Optional*
      </td>

      <td>
        any
      </td>

      <td>
        The fallback value returns if the useGetFlagVariable hook encounters an error or the specified variable key does not exist.
      </td>
    </tr>
  </tbody>
</Table>

### Return Type

Returns the value of a specific variable associated with the feature flag. If the variable is found, it returns its assigned value; otherwise, it returns the provided default value.

## ***useGetFlagVariables*** Hook

The *useGetFlagVariables()* hook returns all variables associated with the feature flag as a dictionary.

### Usage

```typescript
// Retrieve the flag using the feature key
const { flag, isReady } = useGetFlag('feature_key', userContext);

// Use the flag object returned by useGetFlag to retrieve all variables
const allFlagVariables = useGetFlagVariables(flag);
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
        **flag**
        *Required*
      </td>

      <td>
        object
      </td>

      <td>
        flag object returned by useGetFlag hook.
      </td>
    </tr>
  </tbody>
</Table>

### Return Type

Returns an array of objects containing the variables in the flag.