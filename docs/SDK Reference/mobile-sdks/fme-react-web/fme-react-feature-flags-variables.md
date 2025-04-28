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

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME. To implement a feature flag, first use the useGetFlag() hook to retrieve the flag configuration. The _useGetFlag()_ hook provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns an object that you can pass to other hooks, like _useGetFlagVariable()_ and _useGetFlagVariables()_ to fetch value for a specific _variableKey_ and also to fetch all variables respectively.

**Key Benefits:**

- Granular Feature Control: Roll out features to specific user segments.
- A/B Testing: Seamlessly test different feature variations.
- Real-Time Personalization: Adjust feature behavior based on user attributes dynamically.
- Reduced Deployment Risk: Enable/disable features without code deployments, minimizing potential issues.

**Returns**

The returned `flag` object allows you to:

1. Check if the feature is enabled for the user:  
   `isFeatureEnabled = flag.isEnabled()`
2. Retrieve associated feature variables (if configured):  
   `variableValue = useGetFlagVariable(flag, 'variableKey', 'defaultValue')
     allVariables = useGetFlagVariables(flag)`  
   These variables can define UI elements, feature limits, or configuration settings, enabling personalized experiences without changing the codebase.

## **_useGetFlag_** Hook

This hook connects the application to VWO’s feature management system to determine:

- Whether a feature should be active for a specific user.
- What configuration or variation of the feature should be presented to that user.

**Key Component Involved:**

1. **Feature Key:**  
   This acts as a **unique identifier** for the feature you want to manage. It could represent anything from a new dashboard, a beta feature, to a limited-time promotional banner.

### How It Works:

When this Hook is triggered:

- VWO checks its rules and targeting conditions associated with the feature.
- It evaluates the provided user context to see if the user meets the conditions for accessing the feature.
- Based on this evaluation, it returns information about the feature’s status (enabled/disabled) and any additional settings configured for the feature.

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

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**featureKey**  \n_Required_",
    "0-1": "String",
    "0-2": "Unique identifier for the particular feature flag that you're implementing. You will see this while creating a feature flag, and you can also find it under 'Settings' for the Feature Flag after creating it.",
    "1-0": "**UserContext**  \n_Optional_",
    "1-1": "Object",
    "1-2": "Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-react-user-context) ."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


> 🚧 Note
> 
> Please note that the flag must already be defined in the VWO Application for this otherwise False will be returned.

## _**Is Enabled**_

After fetching the flag object, you can call the _isEnabled()_ function, which checks if that particular feature flag is enabled for the current user.

This is evaluated based on the rules and targeting conditions configured with your feature flag.

If the current user satisfies the conditions for any rollout, testing, or personalize rule connected to a specific feature flag, _isEnabled()_ will return 'true'; otherwise, it will return 'false'.

### Usage

```javascript JavaScript
import { useGetFlag } from "vwo-fme-react-sdk"; // Import the hook

const { flag, isReady } = useGetFlag("feature_key");

if (!isReady()) {
    return <div>Default/Zero state</div>;
 }
// To check if the flag is enabled or disabled, use isEnabled method
const isFeatureEnabled = flag.isEnabled();
```

### Returns

Returns True if flag is enabled otherwise false

## _**useGetFlagVariable**_ Hook

If a particular feature flag is enabled for a user, you can then fetch the required variables corresponding to that feature flag. These variables need to be configured in VWO, which can then be fetched at your server and used to control the user's experience in your codebase.

The _useGetFlagVariable()_ hook retrieves the value of a specific variable associated with a feature flag. If the variable is found, it returns the assigned value; otherwise, it returns the provided default_value. This ensures that your application has a fallback value in case the variable is undefined or unavailable.

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

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**flag**  \n_Required_",
    "0-1": "object",
    "0-2": "flag object returned by useGetFlag hook.",
    "1-0": "**variableKey**  \n_Required_",
    "1-1": "string",
    "1-2": "The unique key of the variable as defined in the VWO application. This key is used to retrieve the corresponding variable value.",
    "2-0": "**defaultValue**  \n_Optional_",
    "2-1": "any",
    "2-2": "The fallback value returns if the useGetFlagVariable hook encounters an error or the specified variable key does not exist."
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## _**useGetFlagVariables**_ Hook

The _useGetFlagVariables()_ hook returns all variables associated with the feature flag as a dictionary. 

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

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**flag**  \n_Required_",
    "0-1": "object",
    "0-2": "flag object returned by useGetFlag hook."
  },
  "cols": 3,
  "rows": 1,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


### Returns

Returns an array of objects containing the variables in the flag.