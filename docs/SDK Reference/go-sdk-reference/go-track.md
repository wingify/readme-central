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
[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * Validates the parameters passed.
  * Checks whether the user is whitelisted.
  * Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
  * Assigns the consistent variation to the qualified user.
  * Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - *campaignKey*, unique user identifier - *userId* and the goal-identifier - *goalIdentifer*. You can also pass other flags under the *options* key.

*campaignKey* is the required key provided at the time of FullStack campaign creation.
*userId* is the required unique id associated with the user for identification.
*goalIdentifier* is the required key provided at the time of creating the goal in a FullStack campaign.
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.
[block:api-header]
{
  "title": "Parameter Definitions"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**campaignKey**\n*Required*",
    "0-1": "String\n\n\nFrom v1.8.0+\nString | Array | null/undefined/empty",
    "0-2": "The Campaign key to uniquely identify a FullStack campaign.\n\nFrom v1.8.0+ \nCampaign key, a list of campaign keys, or empty are supported as the type of parameter",
    "1-0": "**userId**\n*Required*",
    "1-1": "String",
    "1-2": "User ID, which uniquely identifies each user.\n\n**Important**: This User ID must match the User ID provided to activate or getVariation API.",
    "2-0": "**goalIdentifier**\n*Required*",
    "2-1": "String",
    "2-2": "The Goal key to uniquely identify a goal of a FullStack campaign.",
    "3-0": "**options**\n*Optional*",
    "3-1": "Object",
    "3-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.\n\nrevenueValue(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.\n\ngoalTypeToTrack(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.\n\nshouldTrackReturningUser(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end."
  },
  "cols": 3,
  "rows": 4
}
[/block]

[block:api-header]
{
  "title": "Returns"
}
[/block]
A boolean value based on whether the impression was made to the VWO server.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "0-0": "true",
    "h-2": "Description",
    "0-1": "Boolean",
    "1-0": "false",
    "1-1": "Boolean",
    "1-2": "If userId provided is not part of campaign or when unexpected error comes and no impression call is received by VWO server.",
    "0-2": "If an impression event is successfully received by VWO server for report generation."
  },
  "cols": 3,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Track API\n// With Custom Variables\noptions := make(map[string]interface{})\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// goalIdentifier: you provide at the time of goal creation\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nvariationName = vwoClientInstance.Track(campaignKey, userId, options)\n\n// with custom variables and revenueValue\noptions[\"customVariables\"] = map[string]interface{}{\"browser\": \"Chrome\"}\noptions[\"revenueValue\"] = 12\n\nisSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options)",
      "language": "go"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a Paused state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client instance.",
  "title": "Tracking Conversions for PAUSED campaign"
}
[/block]

[block:api-header]
{
  "title": "Tracking goal having same identifier across different campaigns"
}
[/block]
When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.
[block:callout]
{
  "type": "success",
  "title": "Same Goal Definition",
  "body": "A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign."
}
[/block]
VWO offer two types of goal i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.
[block:callout]
{
  "type": "info",
  "title": "Tracking goal across campaigns only if goal-type is same",
  "body": "By default, SDK will track a goal across all running campaigns irrespective of the type of goal.\nThe behaviour to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API."
}
[/block]
Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.
[block:code]
{
  "codes": [
    {
      "code": "//  Available GoalTypes - constants.GoalTypeRevenue, constants.GoalTypeCustom, constants.GoalTypeAll (Default)\nvwo.Launch(settingsFile, api.WithGoalAttributes(constants.GoalTypeCustom, nil))",
      "language": "go"
    }
  ]
}
[/block]
Passing the type of goal at the time of calling track API. This flag will be considered for the called track API. If you're using the track API at different places, please make sure to pass the flag in options at every instance.
[block:code]
{
  "codes": [
    {
      "code": "//  Available GoalTypes - constants.GoalTypeRevenue, constants.GoalTypeCustom, constants.GoalTypeAll (Default)\n\noptions := make(map[string]interface{})\noptions[\"goalTypeToTrack\"] = constants.GoalTypeCustom\n\nvwoInstance.Track(campaignKey, userID, goalIdentifier, options)",
      "language": "go"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Precedence Order of the goal-type flag",
  "body": "Goal Type key, as shown in example-code above, if present in track API will be given the priority over the same key provided even in the launch API."
}
[/block]

[block:api-header]
{
  "title": "Usage(when tracking same goal across campaigns)"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// It will track goal having `goalIdentifier` of campaign having `CampaignKey` for the user having `userId` as id. \ncampaignKey = \"CampaignKey\"\nisSuccessful = vwoInstance.Track(campaignKey, goalIdentifier, userId, options);\n\n// it will track goal having `goalIdentifier` of campaigns having `CampaignKey1` and `CampaignKey2` for the user having `userId` as id. \ncampaignKeys = []string{\"CampaignKey1\", \"CampaignKey2\"}\nisSuccessful = vwoInstance.Track(campaignKeys, goalIdentifier, userId, options);\n\n// it will track goal having `goalIdentifier` of all the campaigns\ncampaignKeys = nil\nisSuccessful = vwoInstance.Track(campaignKeys, goalIdentifier, userId, options);",
      "language": "go"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Unique Conversions",
  "body": "VWO only tracks a conversion corresponding to a visitor hit only once even if the SDK sends multiple calls for the same user per campaign."
}
[/block]