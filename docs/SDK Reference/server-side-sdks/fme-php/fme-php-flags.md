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
  pages:
    - type: basic
      slug: fme-php-variables
      title: Variables
---
A **feature flag** is a tool that allows teams to control the visibility and behavior of features without deploying new code. It enables **dynamic feature rollouts**, targeted testing, and quick rollbacks if needed.

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME. To implement a feature flag, first use the getFlag() method to retrieve the flag configuration. The _getFlag()_ method provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns an object that contains methods like _isEnabled()_ for checking the feature's status and _getVariable()_ for retrieving any associated variable(s).

**Key Benefits:**

- Granular Feature Control: Roll out features to specific user segments.
- A/B Testing: Seamlessly test different feature variations.
- Real-Time Personalization: Adjust feature behavior based on user attributes dynamically.
- Reduced Deployment Risk: Enable/disable features without code deployments, minimizing potential issues.

**Key Functions:**

1. getFlag(): Fetches the feature flag configuration for the specified feature and user.
   1. isEnabled(): Determines whether the feature is enabled or disabled for that user.
   2. getVariables() / getVariable(): Retrieves any custom variables or settings linked to the feature flag (e.g., UI colors, text, or limits).

This allows dynamic control over feature availability, enabling targeted rollouts, personalization, and real-time feature management without deploying new code.

**Returns**

The returned flag object allows you to:

1. Check if the feature is enabled for the user:  
   `isFeatureEnabled = flag.is_enabled()`
2. Retrieve associated feature variables (if configured):  
   `variableValue = flag.getVariable('variableKey')
     allVariables = flag.getVariables()`  
   These variables can define UI elements, feature limits, or configuration settings, enabling personalized experiences without changing the codebase.

## **_Get Flag_** API

This API connects the application to VWO’s feature management system to determine:

- Whether a feature should be active for a specific user.
- What configuration or variation of the feature should be presented to that user.

**Key Components Involved:**

1. **Feature Key:**  
   This acts as a **unique identifier** for the feature you want to manage. It could represent anything from a new dashboard, a beta feature, to a limited-time promotional banner.
2. **User Context:**  
   This refers to the **specific details about the user**, such as their ID, location, device type, or custom attributes. VWO uses this data to decide if the feature should be shown to the user.

### How It Works:

When this API is triggered:

- VWO checks its rules and targeting conditions associated with the feature.
- It evaluates the provided user context to see if the user meets the conditions for accessing the feature.
- Based on this evaluation, it returns information about the feature’s status (enabled/disabled) and any additional settings configured for the feature.

## Usage

```php
// Retrieve the feature flag associated with 'feature_key' for the given user context, 
// Allowing access to feature status using is_enabled() and associated variables (getVariables/getVariable).
$flag = $vwoClient->getFlag(‘feature_key’, $userContext);
```

### Parameters Definition

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**feature_key**  \n_Required_",
    "0-1": "String",
    "0-2": "unique identifier for the particular feature flag that you're implementing. You will see this while creating a feature flag, and you can also find it under 'Settings' for the Feature Flag after creating it.",
    "1-0": "**userContext**  \n_Required_",
    "1-1": "Object",
    "1-2": "Contains information about the current user, including a required unique identifier for each user. Read more about userContext here."
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

## _**Is Enabled**_ API

After fetching the flag object, you can call the _isEnabled()_ function, which checks if that particular feature flag is enabled for the current user.

This is evaluated based on the rules and targeting conditions configured with your feature flag.

If the current user satisfies the conditions for any rollout, testing, or personalize rule connected to a specific feature flag, _isEnabled()_ will return 'true'; otherwise, it will return 'false'.

```php
// To check if the flag is enabled or disabled, use is_enabled method 
$isFlagEnabled = $flag->isEnabled();
```

### Returns

Returns True if flag is enabled otherwise false

## _**Get Variable**_ API

If a particular feature flag is enabled for a user, you can then fetch the required variables corresponding to that feature flag. These variables need to be configured in VWO, which can then be fetched at your server and used to control the user's experience in your codebase.

The _getVariable()_ function retrieves the value of a specific variable associated with a feature flag. If the variable is found, it returns the assigned value; otherwise, it returns the provided default_value. This ensures that your application has a fallback value in case the variable is undefined or unavailable.

```php
// Get value of the flag's variable
$variableValue = $flag->getVariable('variable_key', 'default_value');
```

### Parameters Definition

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**variable_key**  \n_Required_",
    "0-1": "String",
    "0-2": "The unique key of the variable as defined in the VWO application. This key is used to retrieve the corresponding variable value.",
    "1-0": "**default_value**  \n_Required_",
    "1-1": "Any",
    "1-2": "The fallback value to return if the get_variable method encounters an error or the specified variable_key does not exist."
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


## _**Get Variables**_ API

The _getVariables()_ function returns all variables associated with the feature flag as a dictionary. 

### Usage

```php
// Get value of all the variables of the flag
$allVariables = $flag->getVariables()
```

### Returns

Returns a list of object containing the variables in the flag.