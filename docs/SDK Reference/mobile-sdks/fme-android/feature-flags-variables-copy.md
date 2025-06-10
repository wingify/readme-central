---
title: Feature Flags & Variables (COPY)
deprecated: false
hidden: false
metadata:
  robots: index
---
A **feature flag** is a tool that allows teams to control the visibility and behavior of features without deploying new code. It enables **dynamic feature rollouts**, targeted testing, and quick rollbacks if needed.

Feature Flags serve as the foundation for all testing, personalization, and rollout rules within FME. To implement a feature flag, first use the getFlag() method to retrieve the flag configuration. The *getFlag()* method provides a simple way to check if a feature is enabled for a specific user and access its variables. It returns an object that contains methods like *isEnabled()* for checking the feature's status and *getVariable()* for retrieving any associated variable(s).

**Key Benefits:**

* Granular Feature Control: Roll out features to specific user segments.
* A/B Testing: Seamlessly test different feature variations.
* Real-Time Personalization: Adjust feature behavior based on user attributes dynamically.
* Reduced Deployment Risk: Enable/disable features without code deployments, minimizing potential issues.

**Key Functions:**

1. getFlag(): Fetches the feature flag configuration for the specified feature and user.
   1. isEnabled(): Determines whether the feature is enabled or disabled for that user.
   2. getVariables() / getVariable(): Retrieves any custom variables or settings linked to the feature flag (e.g., UI colors, text, or limits).

This allows dynamic control over feature availability, enabling targeted rollouts, personalization, and real-time feature management without deploying new code.

**Returns**

The returned flag object allows you to:

1. Check if the feature is enabled for the user:\
   `val isFlagEnabled = flag?.isEnabled`
2. Retrieve associated feature variables (if configured):\
   `val variableValue = flag?.getVariable('variable_key', 'default-value')
     val allVariables = flag?.getVariables()`\
   These variables can define UI elements, feature limits, or configuration settings, enabling personalized experiences without changing the codebase.

## ***Get Flag*** API

This API connects the application to VWO’s feature management system to determine:

* Whether a feature should be active for a specific user.
* What configuration or variation of the feature should be presented to that user.

**Key Components Involved:**

1. **Feature Key:**\
   This acts as a **unique identifier** for the feature you want to manage. It could represent anything from a new dashboard, a beta feature, to a limited-time promotional banner.
2. **User Context:**\
   This refers to the **specific details about the user**, such as their ID, location, device type, or custom attributes. VWO uses this data to decide if the feature should be shown to the user.

### How It Works:

When this API is triggered:

* VWO checks its rules and targeting conditions associated with the feature.
* It evaluates the provided user context to see if the user meets the conditions for accessing the feature.
* Based on this evaluation, it returns information about the feature’s status (enabled/disabled) and any additional settings configured for the feature.

### Usage

```kotlin Kotlin
// Retrieve the feature flag associated with 'feature_key' for the given user context, 
// Allowing access to feature status using is_enabled() and associated variables (getVariables/getVariable). 
flag = vwo.getFlag("feature-key", userContext)
```
```java
// Retrieve the feature flag associated with 'feature_key' for the given user context, 
// Allowing access to feature status using isEnabled() and associated variables (getVariables/getVariable).
flag = vwoInstance.getFlag("feature-key", userContext);
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
        **feature\_key**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        unique identifier for the particular feature flag that you're implementing. You will see this while creating a feature flag, and you can also find it under 'Settings' for the Feature Flag after creating it.
      </td>
    </tr>

    <tr>
      <td>
        **userContext**\
        *Required*
      </td>

      <td>
        Object
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context).
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note
>
> Please note that the flag must already be defined in the VWO Application for this otherwise False will be returned.

## ***Is Enabled*** API

After fetching the flag object, you can call the *isEnabled()* function, which checks if that particular feature flag is enabled for the current user.

This is evaluated based on the rules and targeting conditions configured with your feature flag.

If the current user satisfies the conditions for any rollout, testing, or personalize rule connected to a specific feature flag, *isEnabled()* will return 'true'; otherwise, it will return 'false'.

### Usag

```kotlin Kotlin
// To check if the flag is enabled or disabled, use is_enabled method
val isFlagEnabled = flag?.isEnabled
```
```java
// To check if the flag is enabled or disabled, use is_enabled method
boolean isFlagEnabled = flag.isEnabled();
```

### Returns

Returns True if flag is enabled otherwise false

## ***Get Variable*** API

If a particular feature flag is enabled for a user, you can then fetch the required variables corresponding to that feature flag. These variables need to be configured in VWO, which can then be fetched at your server and used to control the user's experience in your codebase.

The *getVariable()* function retrieves the value of a specific variable associated with a feature flag. If the variable is found, it returns the assigned value; otherwise, it returns the provided default\_value. This ensures that your application has a fallback value in case the variable is undefined or unavailable.

### Usage

```kotlin
// Get value of the flag's variable
val variableValue = flag?.getVariable('variableKey', 'defaultValue')
```
```java
// Get value of the flag's variable
String variable1 = (String) featureFlag.getVariable("variable_key", "default-value1");
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
        **variableKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The unique key of the variable as defined in the VWO application. This key is used to retrieve the corresponding variable value.
      </td>
    </tr>

    <tr>
      <td>
        **defaultValue**\
        *Required*
      </td>

      <td>
        Any
      </td>

      <td>
        The fallback value to return if the getVariable method encounters an error or the specified variable\_key does not exist.
      </td>
    </tr>
  </tbody>
</Table>

## ***Get Variables*** API

The *getVariables()* function returns all variables associated with the feature flag as a dictionary. 

### Usage

```kotlin
// Get value of all the variables of the flag
val allVariables = flag?.getVariables()
```
```java
// Get value of all the variables of the flag
List<Map<String, Object>> allVariables = featureFlag.getVariables();
```

### Returns

Returns an array of objects containing the variables in the flag.