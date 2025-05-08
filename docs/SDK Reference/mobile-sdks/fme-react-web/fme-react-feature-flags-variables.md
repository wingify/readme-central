---
title: Feature Flags & Variables
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
A **feature flag** is a tool that allows teams to control the visibility and behavior of features without deploying new code. It enables **dynamic feature rollouts**, targeted testing, and quick rollbacks if needed.

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME. To implement a feature flag, first use the useGetFlag() hook to retrieve the flag configuration. The *useGetFlag()* hook provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns an object that you can pass to other hooks, like *useGetFlagVariable()* and *useGetFlagVariables()* to fetch value for a specific *variableKey* and also to fetch all variables respectively.

**Key Benefits:**

* Granular Feature Control: Roll out features to specific user segments.
* A/B Testing: Seamlessly test different feature variations.
* Real-Time Personalization: Adjust feature behavior based on user attributes dynamically.
* Reduced Deployment Risk: Enable/disable features without code deployments, minimizing potential issues.

**Returns**

The returned `flag` object allows you to:

1. Check if the feature is enabled for the user:\
   `isFeatureEnabled = flag.isEnabled()`
2. Retrieve associated feature variables (if configured):\
   `variableValue = useGetFlagVariable(flag, 'variableKey', 'defaultValue')
     allVariables = useGetFlagVariables(flag)`
   These variables can define UI elements, feature limits, or configuration settings, enabling personalized experiences without changing the codebase.

## ***useGetFlag*** Hook

This hook connects the application to VWO’s feature management system to determine:

* Whether a feature should be active for a specific user.
* What configuration or variation of the feature should be presented to that user.

**Key Component Involved:**

1. **Feature Key:**\
   This acts as a **unique identifier** for the feature you want to manage. It could represent anything from a new dashboard, a beta feature, to a limited-time promotional banner.

### How It Works:

When this Hook is triggered:

* VWO checks its rules and targeting conditions associated with the feature.
* It evaluates the provided user context to see if the user meets the conditions for accessing the feature.
* Based on this evaluation, it returns information about the feature’s status (enabled/disabled) and any additional settings configured for the feature.

### Usage without UserContext (If provided in VWOProvider)

```javascript JavaScript
import { useGetFlag } from "vwo-fme-react-sdk"; // Import the hook

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key');
  
  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Check if the flag is enabled
  const isFeatureEnabled = flag?.isEnabled();

  return (
    <div>
      {/* Display the status of the feature flag */}
      <p>Feature Flag Status: {isFeatureEnabled ? "Enabled" : "Disabled"}</p>
    </div>
  );
};

export default YourComponent;
```

### Usage With UserContext

```javascript JavaScript
import { useGetFlag } from "vwo-fme-react-sdk"; // Import the hook

const YourComponent = () => {
  const userContext = { id : 'unique_user_id' }
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag('feature_key', userContext);
  
  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Check if the flag is enabled
  const isFeatureEnabled = flag?.isEnabled();

  return (
    <div>
      {/* Display the status of the feature flag */}
      <p>Feature Flag Status: {isFeatureEnabled ? "Enabled" : "Disabled"}</p>
    </div>
  );
};

export default YourComponent;
```

<br />

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
        Object
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-react-user-context) .
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note
>
> Please note that the flag must already be defined in the VWO Application for this otherwise False will be returned.

### Returns

| Return Parameter | Type     | Description                                                                                                                                                                                                                           |
| :--------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **flag**         | Object   | Represents the feature flag and provides methods to interact with the flag’s state and its associated variables. For example, `flag.isEnabled()`, `flag.getVariables()`, and `flag.getVariable('variable\_value', 'default\_value')`. |
| **isReady**      | Function | A function that checks whether the hook has finished initializing and is ready for use. Returns a boolean (`true` or `false`).                                                                                                        |

## Usage of Flag and isReady

After fetching the `flag` object, you can call `flag.isEnabled()`, which checks if the particular feature flag is enabled for the current user. This is evaluated based on the rules and targeting conditions configured with your feature flag. If the current user satisfies the conditions for any rollout, testing, or personalization rule associated with a specific feature flag, `isEnabled()` will return true; otherwise, it will return false.

The `flag.getVariable()` function retrieves the value of a specific variable associated with the feature flag. If the variable is found, it returns its assigned value; otherwise, it returns the provided default value.

The `flag.getVariables()` function returns an object containing all variables associated with the feature flag.

The `isReady()` function checks if the useGetFlag hook is initialized and the feature flag data is ready to be used. `isReady()` returns a boolean value:

### Usage

```javascript JavaScript
import { useGetFlag } from "vwo-fme-react-sdk"; // Import the hook

const { flag, isReady } = useGetFlag("feature_key");

// check if the feature flag data is ready to be used
if (!isReady()) {
    return <div>Default/Zero state</div>;
 }
// To check if the flag is enabled or disabled, use isEnabled method
const isFeatureEnabled = flag.isEnabled();
// get value of a specific variable
const variableValue = flag.getVariable('variable_value', 'default_value');
// get all variables value
const allVariables = flag.getVariables();
```

## ***useGetFlagVariable*** Hook

If a particular feature flag is enabled for a user, you can then fetch the required variables corresponding to that feature flag. These variables need to be configured in VWO, which can then be fetched at your server and used to control the user's experience in your codebase.

The *useGetFlagVariable()* hook retrieves the value of a specific variable associated with a feature flag. If the variable is found, it returns the assigned value; otherwise, it returns the provided default\_value. This ensures that your application has a fallback value in case the variable is undefined or unavailable.

### Usage

```javascript
import { useGetFlag, useGetFlagVariable } from "vwo-fme-react-sdk"; // Import hooks

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag("feature-key");
  
  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Use the flag object returned by useGetFlag to retrieve a specific variable
  // Replace 'variableKey' with the actual key for the variable you want to retrieve
  const variableKey = "variable-name"; // Replace with actual variable key
  const variableValue = useGetFlagVariable(flag, variableKey, "variable-default-value");

  return (
    <div>
      {/* Display the feature flag variable value */}
      <p>Feature Flag Variable Value: {variableValue}</p>
    </div>
  );
};

export default YourComponent;

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

### Returns

The value of a specific variable associated with the feature flag. If the variable is found, it returns its assigned value; otherwise, it returns the provided default value.

## ***useGetFlagVariables*** Hook

The *useGetFlagVariables()* hook returns all variables associated with the feature flag as a dictionary.

### Usage

```javascript
import { useGetFlag, useGetFlagVariables } from "vwo-fme-react-sdk"; // Import hooks

const YourComponent = () => {
  // Retrieve the flag using the feature key
  const { flag, isReady } = useGetFlag("feature-key");
  
  if (!isReady()) {
    return <div>Default/Zero state</div>;
  }
  // Use the flag object returned by useGetFlag to retrieve all variables associated with the flag
  const flagVariables = useGetFlagVariables(flag);
  
  return (
    <div>
      <p>Variables; {JSON.stringify(flagVariables)}</p>
    </div>
  );
};

export default YourComponent;
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

### Returns

Returns an array of objects containing the variables in the flag.