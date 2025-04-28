---
title: Track
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
Tracks a conversion event for a particular user for a running FullStack campaign.

## Description

The API method:

* Validates the parameters passed.
* Assigns the consistent variation to the new/returning qualified user.
* Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - *campaignKey*, unique user identifier - *userId* and the goal-identifier - *goalIdentifer*. You can also pass other flags under the *options* key.

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*goalIdentifier* is the required key provided at the time of creating the goal in a FullStack campaign.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

## Parameter Definitions

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

        From v1.8.0+\
        String | Array | null/undefined/empty
      </td>

      <td>
        The Campaign key to uniquely identify a FullStack campaign.

        From v1.8.0+\
        Campaign key, a list of campaign keys, or empty are supported as the type of parameter
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
        User ID, which uniquely identifies each user.

        * \*Important\*\*: This User ID must match the User ID provided to activate or getVariation API.
      </td>
    </tr>

    <tr>
      <td>
        **goalIdentifier**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The Goal key to uniquely identify a goal of a FullStack campaign.
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

        revenueValue(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.

        goalTypeToTrack(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.

        shouldTrackReturningUser(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) at your end.

        userStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.

        * *Note\*\*: This is only supported in Node.js SDK from*v1.11.0\* onwards.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

A boolean value based on whether the impression was made to the VWO server.

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
        true
      </td>

      <td>
        Boolean
      </td>

      <td>
        If an impression event is successfully received by VWO server for report generation.
      </td>
    </tr>

    <tr>
      <td>
        false
      </td>

      <td>
        Boolean
      </td>

      <td>
        If userId provided is not part of campaign or when unexpected error comes and no impression call is received by VWO server.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```javascript Node.js
var options = {
  customVariables: {
   // custom variables
  },
  variationTargetingVariables: {
  	// custom variation targeting variables
  }
};
// For CUSTOM goal type
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

options = {
 // ...other optional params like customVariables, variationTargetingVariables
 revenueValue: 'REPLACE_WITH_REVENUE_VALUE'
}
// For REVENUE goal type
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```php
<?php
$options = [];
$options["customVariables"] = [];
  // Optional, neeeded for Forced Variation
$options["variationTargetingVariables"] = [];

// For CUSTOM goal type
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);

// For REVENUE goal type
$options["revenueValue"] = 1000.12;
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifeir, $options);
```
```python
# For CUSTOM goal type
vwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)

# For REVENUE goal type
vwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, revenue_value = revenue_value)
```
```csharp .NET
// Without Revenue Value and Custom Variable
Dictionary<string, dynamic> options = new Dictionary<string, dynamic>(){};
bool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);

// For only Revenue Value
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
//   revenueValue: for revenue goals only

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
        "revenueValue", 100
    }
};
bool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);
```
```java
// For CUSTOM goal type
boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// For REVENUE goal type
boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```ruby
# Without Custom Variables and Revenue Value
vwo_client_instance.track(campaign_key, user_id, goal_identifier)

# With Revenue Value and other options
options = {
  "custom_variables" => { browser: "chrome" },
  "variation_targeting_variables" => { "price" => 10  },
	"revenue_value" => 10.23
}

is_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)

# With both Custom Variables and Revenue Value
options = { "custom_variable" => { "a" => "x"}, "revenue_value" => 10.23}
is_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)
```
```go
// Track API
// With Custom Variables
options := make(map[string]interface{})

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// goalIdentifier: you provide at the time of goal creation
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
variationName = vwoClientInstance.Track(campaignKey, userId, options)

// with custom variables and revenueValue
options["customVariables"] = map[string]interface{}{"browser": "Chrome"}
options["revenueValue"] = 12

isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options)
```

For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).

> 🚧 Tracking Conversions for PAUSED campaign
>
> If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a **Paused** state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client-instance.

## Tracking goal having same identifier across different campaigns

When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.

This is supported in Node.js, Python, Java, and .NET as of now from **v1.8.0**+ onwards and in PHP from **v1.13.0**+ onwards.

> 👍 Same Goal Definition
>
> A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign.

VWO offer two types of goal i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.

> 📘 Tracking goal across campaigns only if goal-type is same
>
> By default, SDK will track a goal across all running campaigns irrespective of the type of goal.\
> The behaviour to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API.

Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.

```javascript Node.js
//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  goalTypeToTrack: vwoSDK.GoalTypeEnum.CUSTOM
});
```
```python
#  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

vwo_client_instance = vwo.launch(settings_file, goal_type_to_track=vwo.GOAL_TYPES.CUSTOM)
```
```java
//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

VWO vwoClientInstance = VWO.launch(settingsFile).withGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM).build();
```
```csharp .NET
//  Available GoalTypes - GoalTypes.REVENUE, GoalTypes.CUSTOM, GoalTypes.ALL (Default)

var vwoClient = VWO.Launch(settingsFile, goalTypeToTrack: Constants.GoalTypes.CUSTOM);
```
```php
//  Available GoalTypes - 'REVENUE', 'CUSTOM', 'ALL'(Default)
$config = [
'goalTypeToTrack' => 'CUSTOM'
];

$vwoClientInstance = new VWO($config);
```

Passing the type of goal at the time of calling track API. This flag will be considered for the called track API. If you're using the track API at different places, please make sure to pass the flag in options at every instance.

```javascript Node.js
//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)

var options = {
  goalTypeToTrack: vwoSdk.GoalTypeEnum.CUSTOM
};

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```python
#  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

vwo_client_instance.track(campaign_key, user_id, goal_identifier, goal_type_to_track = vwo.GOAL_TYPES.CUSTOM)
```
```java
//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

VWOAdditionalParams options = new VWOAdditionalParams();
options.setGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM);

boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```csharp .NET
//  Available GoalTypes - GoalTypes.REVENUE, GoalTypes.CUSTOM, GoalTypes.ALL (Default)

public static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()
{
    {
      	"goalTypeToTrack", Constants.GoalTypes.CUSTOM
    }
};

bool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);
```
```php
$options = {
  'goalTypeToTrack' =>'CUSTOM'
};

$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);
```

> 🚧 Precedence Order of the goal-type flag
>
> Goal Type key, as shown in example-code above, if present in track API will be given the priority over the same key provided even in the launch API.

## Usage(when tracking same goal across campaigns)

```javascript Node.js
// Tracking a goal of a particular campaign
vwoClientInstance.track('campaign-in-context', userId, goalIdentifier, options);

// Tracking a same goal across specific campaigns
vwoClientInstance.track(['campaign-1', 'campaign-2', 'campaign-3'], userId, goalIdentifier, options);

// Tracking a same goal across all valid campaigns
vwoClientInstance.track(null, userId, goalIdentifier, options);
```
```python
# Tracking a goal of a particular campaign
vwo_client_instance.track('campaign-in-context', user_id, goal_identifier);

# Tracking a same goal across specific campaigns
vwo_client_instance.track(['campaign-1', 'campaign-2', 'campaign-3'], user_id, goal_identifier);

# Tracking a same goal across all valid campaigns
vwo_client_instance.track(None, user_id, goal_identifier);
```
```java
// Tracking a goal of a particular campaign
vwoClientInstance.track('campaign-in-context', userId, goalIdentifier, options);

// Tracking a same goal across specific campaigns
String[] campaignKeysList = {
  "campaignKey1",
  "campaignKey2",
}
vwoClientInstance.track(campaignKeysList, userId, goalIdentifier, options);

// Tracking a same goal across all valid campaigns
vwoClientInstance.track(null, userId, goalIdentifier, options);
```
```csharp .NET
// Tracking a goal of a particular campaign
vwoClientInstance.Track('campaign-in-context', userId, goalIdentifier, options);

// Tracking a same goal across specific campaigns
vwoClientInstance.Track(new List<string>() { campaignKey1, campaignKey2 }, userId, goalIdentifier, options);

// Tracking a same goal across all valid campaigns
vwoClientInstance.Track(userId, goalIdentifier, options);
```
```php
// it will track goal having `goalIdentifier` of campaign having `campaignKey` for the user having `userId` as id.
$vwoClientInstance->track("campaignKey", $goalIdentifier, $userId, $options);

// it will track goal having `goalIdentifier` of campaigns having `campaignKey1` and `campaignKey2` for the user having `userId` as id.
$vwoClientInstance->track(["campaignKey1", "campaignKey2"], $goalIdentifier, $userId, $options);
// it will track goal having `goalIdentifier` of all the campaigns
$vwoClientInstance->track(null, $goalIdentifier, $userId, $options);
//Read more about configuration and usage - https://developers.vwo.com/reference#server-side-sdk-track
```

## Tracking Unique vs Duplicate conversions

Same user can trigger a goal multiple times and there are two possibilities to track them inside VWO application via SDKs:

1. You can track only once - unique conversions. [DEFAULT]
2. You can track it as many times as the same user gets converted

```javascript Node.js
// Default: shouldTrackReturningUser: false
var options = {
  shouldTrackReturningUser: true
};

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```python
# Default: should_track_returning_user: false

vwo_client_instance.track(campaign_key, user_id, goal_identifier, should_track_returning_user = true)
```
```java
// Default: shouldTrackReturningUser: false

VWOAdditionalParams options = new VWOAdditionalParams();
options.setShouldTrackReturningUser(true);

boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```csharp .NET
// Default: shouldTrackReturningUser: false

public static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()
{
    {
      	"shouldTrackReturningUser", true
    }
};

bool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);
```
```php
$options = [
  "shouldTrackReturningUser" => true
];

$vwoClientInstance->activate($campaignKey, $userId, $options);
```

If you prefer to have consistent behavior across all the *track* API usage, you simply pass the *shouldTrackReturningUser* at the time of launching the SDK. This way you don't have to explicitly pass the flag in every track API usage.

```javascript Node.js
var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  shouldTrackReturningUser: true // a boolean
});
```
```python
vwo_client_instance = vwo.launch(settings_file, should_track_returning_user = True)
```
```java
VWO vwoClientInstance = VWO.launch(settingsFile).withShouldTrackReturningUser(true).build();
```
```csharp .NET
var vwoClient = VWO.Launch(settingsFile, shouldTrackReturningUser: true);
```
```php
$config=[
  'settingsFile' => $settingsFile,
  'shouldTrackReturningUser' => true
];

$vwoClientInstance = new VWO($config);
```

> 📘 SDK Support
>
> This is currently supported in Node.js, Python, Java, and .NET SDKs from **v1.8.0**+ onwards and in PHP from **v1.13.0**+ onwards.

> 🚧 NOTE
>
> User Storage Service is mandatory if you want to track unique conversions only. Please check [How to Implement User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service).

## Passing meta-information that would be available to User Storage Service

If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, there could be cases where you would want to store some other details along with the VWO decision-related data into the storage. It is easily achievable by storing the data at your end asynchronously, while SDK will use the User Storage Service to save the decision-related data.\
Our SDKs provide a way of passing the meta-information like *browser, os, IP address, location*, etc., along with the decision-related data. The data you will provide in the API call will be available in the ***set*** method of User Storage Service, which you can use to save along with VWO SDK's decision-related data.

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var userStorageService = {
  get: function (userId, campaignKey) {
    // Get stored user-campaign data mapping in the format sdk passed it to set method
  },
  set: function (data) {
    // Save user-campaign data mapping
    // Access meta-data as data.metaData
  }
};

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  userStorageService: userStorageService 
});

const options = {
  metaData: {
    browser: 'chrome',
    os: 'linux'
  }
};

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 🚧 Note
>
> Passing meta-information is currently available only in Node.js SDK from ***v1.13.0*** onwards
