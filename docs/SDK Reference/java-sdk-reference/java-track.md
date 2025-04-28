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

- Validates the parameters passed.
- Checks whether the user is whitelisted.
- Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
- Assigns the consistent variation to the new/returning qualified user.
- Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - _campaignKey_, unique user identifier - _userId_ and the goal-identifier - _goalIdentifer_. You can also pass other flags under the _options_ key.

_campaignKey_ is the required key provided at the time of FullStack campaign creation.  
_userId_ is the required unique id associated with the user for identification.  
_goalIdentifier_ is the required key provided at the time of creating the goal in a FullStack campaign.  
_options_ is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

## Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**campaignKey**  \n_Required_",
    "0-1": "String  \n  \nFrom v1.8.0+  \nString | Array | null/undefined/empty",
    "0-2": "The Campaign key to uniquely identify a FullStack campaign.  \n  \nFrom v1.8.0+  \nCampaign key, a list of campaign keys, or empty are supported as the type of parameter",
    "1-0": "**userId**  \n_Required_",
    "1-1": "String",
    "1-2": "User ID, which uniquely identifies each user.  \n  \n**Important**: This User ID must match the User ID provided to activate or getVariation API.",
    "2-0": "**goalIdentifier**  \n_Required_",
    "2-1": "String",
    "2-2": "The Goal key to uniquely identify a goal of a FullStack campaign.",
    "3-0": "**options**  \n_Optional_",
    "3-1": "Object",
    "3-2": "Pass params for pre-segmentation and whitelisting  \n  \ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.  \n  \nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.  \n  \nrevenueValue(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.  \n  \ngoalTypeToTrack(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.  \n  \nshouldTrackReturningUser(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end.  \n  \nuserAgent(String): userAgent of the visitor    \n  \nuserIpAddress(String): IpAddress of the visitor"
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## Returns

A boolean value based on whether the impression was made to the VWO server.

| Value | Type    | Description                                                                                                                 |
| :---- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| true  | Boolean | If an impression event is successfully received by VWO server for report generation.                                        |
| false | Boolean | If userId provided is not part of campaign or when unexpected error comes and no impression call is received by VWO server. |

## Usage

```java
// For CUSTOM goal type
boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// For REVENUE goal type
boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 🚧 Tracking Conversions for PAUSED campaign
> 
> If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a **Paused** state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client-instance.

## Tracking goal having same identifier across different campaigns

When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.

> 👍 Same Goal Definition
> 
> A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign.

VWO offer two types of goal i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.

> 📘 Tracking goal across campaigns only if goal-type is same
> 
> By default, SDK will track a goal across all running campaigns irrespective of the type of goal.  
> The behaviour to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API.

Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.

```java
//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

VWO vwoClientInstance = VWO.launch(settingsFile).withGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM).build();
```

Passing the type of goal at the time of calling track API. This flag will be considered for the called track API. If you're using the track API at different places, please make sure to pass the flag in options at every instance.

```java
//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)

VWOAdditionalParams options = new VWOAdditionalParams();
options.setGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM);

boolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 🚧 Precedence Order of the goal-type flag
> 
> Goal Type key, as shown in example-code above, if present in track API will be given the priority over the same key provided even in the launch API.

## Usage(when tracking same goal across campaigns)

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

> 🚧 Unique Conversions
> 
> VWO only tracks a conversion corresponding to a visitor hit only once even if the SDK sends multiple calls for the same user per campaign.