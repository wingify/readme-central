---
title: Get Feature Variable Value
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
*getFeatureVariableValue API* returns the value of a variable being used in a feature for a particular campaign(for Feature Rollout) / campaign's variation(for Feature Test) for a specified user and for a running campaign.

In the case of a Feature Rollout campaign, a boolean value is returned based on whether a user qualifies for a campaign or not.\
In the case of a Feature Test campaign, a boolean value is returned based on whether a user qualifies for a campaign or not and also whether the feature is enabled for the variation assigned to that user or not.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user id eligible for the campaign based on pre-segmentation conditions.
* Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
* Returns the feature variable value.

The API method requires a campaign unique-key *campaignKey*, *variableKey* and a User ID - *userId*. You can also pass other flags under the *options* key.

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*variableKey* is the required key of the feature's variable.\
*userId* is the required unique id associated with the user for identification.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

* **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
* **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on the VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
* **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return.
* **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having the key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns false, that is, no variation assigned.

This method does take care of *UserStorageService*. It first looks into *UserStorageService*(if provided at the time of Instantiation) before the above logic executes and if the stored value is found, it returns with that value.

## Parameter definitions

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
        **campaignKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Campaign key to uniquely identify a FullStack campaign.
      </td>
    </tr>

    <tr>
      <td>
        **variableKey**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Feature variable key to uniquely identify a variable
      </td>
    </tr>

    <tr>
      <td>
        **userId**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        User ID which uniquely identifies each user.
      </td>
    </tr>

    <tr>
      <td>
        **options**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Pass params for pre-segmentation and whitelisting 

        customVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.

        variationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.

        userStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.

        * *Note\*\*: This is only supported in Node.js SDK from*v1.11.0\* onwards.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

A boolean indicating whether the feature is enabled for the user.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
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
        value
      </td>

      <td>
        Boolean|String|Number|Float|null
      </td>

      <td>
        Depending on the value requested
      </td>
    </tr>
  </tbody>
</Table>

To prevent your app from crashing, refer to the [best practices](https://developers.vwo.com/reference#fullstack-best-practices) on how to use the VWO SDK.

## Usage

```javascript Node.js
// campaignKey: you provide at the time of campaign creation
// variableKey: you provide while create a variable inside a feature
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
var value = vwoClientInstance.getFeatureVariableValue(campaignKey, variableKey, userId, options);
```
```php
<?php

// campaignKey: you provide at the time of campaign creation
// variableKey: you provide while create a variable inside a feature
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
$value = $vwoClientInstance->getFeatureVariableValue($campaignKey, $variableKey, $userId, $options);
```
```python
# campaign_key: you provide at the time of campaign creation
# variable_key: you provide while create a variable inside a feature
# user_id: how you identify a particular user

value = vwo_client_instance.get_feature_variable_value(campaign_key, variable_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables);
```
```csharp .NET
// campaignKey: you provided at the time of campaign creation
// variableKey: you provide while create a variable inside a feature
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables

public static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()
{
    {
        "customVariables", new Dictionary<string, dynamic>()
        {
            {"value", 10}
        }
        "variationTargettingVariable", new Dictionary<string, dynamic>()
        {
            {"browser", "chrome"}
        }
    }
};
dynamic value = vwoClientInstance.GetFeatureVariableValue(campaignKey, variableKey, userId, options);
```
```java
// campaignKey: you provide at the time of campaign creation
// variableKey: you provide while create a variable inside a feature
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
Object value = vwoClientInstance.getFeatureVariableValue(campaignKey, variableKey, userId, options);
```
```ruby
# campaign_key: you provide at the time of campaign creation
# variable_key: you provide while create a variable inside a feature
# user_id: how you identify a particular user
# options: (Optional)
#   custom_variables: pre-segmentation variables
#   variation_targeting_variables: whitelisting variables
options = {
  "custom_variables" => { browser: "chrome" },
  "variation_targeting_variables" => { "price" => 10  }
}

value = vwo_client_instance.get_feature_variable_value(campaign_key, variable_key, user_id, options);
```
```go
// campaignKey: you provide at the time of campaign creation
// variableKey: you provide while create a variable inside a feature
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables

// With Custom Variables
options["customVariables"] = map[string]interface{}{"browser": "Chrome"}
variableValue = vwoClientInstance.GetFeatureVariableValue(campaignKey, variableKey, userID, options)

// Without custom variables
variableValue = vwoClientInstance.GetFeatureVariableValue(campaignKey, variableKey, userID, nil)
```

For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).

## Campaign Activation with User Storage Service

If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**

```javascript Node.js
vwoClientInstance.isFeatureEnabled(campaignKey, userId, options);
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```php
$vwoClientInstance->activate($campaignKey, $userId, $options);
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);
```
```java
vwoClientInstance.activate(campaignKey, userId, options);
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```python
vwo_client_instance.activate(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)
vwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)
```

**Wrong Usage**

```javascript Node.js
// Calling track API before activate API
// This will not track the goal as the campaign has not been activated yet.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// After calling track APi
vwoClientInstance.getVariationName(campaignKey, userId, options);
```
```php
// Calling track API before activate API
// This will not track goal as campaign has not been activated yet.
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);

// After calling track APi
$vwoClientInstance->activate($campaignKey, $userId, $options);
```
```java
// Calling track API before activate API
// This will not track goal as campaign has not been activated yet.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// After calling track APi
vwoClientInstance.activate(campaignKey, userId, options);
```
```python
# Calling track API before activate API
# This will not track goal as campaign has not been activated yet.
vwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)

# After calling track API
vwo_client_instance.activate(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)
```

> 🚧 Note
>
> Mandatory campaign activation is currently available in Node.js SDK from ***v1.13+***, PHP SDK from ***v1.13+***, Python SDK from ***v1.12+***, and Java SDK from ***v1.11+***.

##
