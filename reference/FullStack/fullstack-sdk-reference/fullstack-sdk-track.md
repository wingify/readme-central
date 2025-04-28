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
  * Assigns the consistent variation to the new/returning qualified user.
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
    "3-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.\n\nrevenueValue(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.\n\ngoalTypeToTrack(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.\n\nshouldTrackReturningUser(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) at your end.\n\nuserStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.\n**Note**: This is only supported in Node.js SDK from *v1.11.0* onwards."
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
      "code": "var options = {\n  customVariables: {\n   // custom variables\n  },\n  variationTargetingVariables: {\n  \t// custom variation targeting variables\n  }\n};\n// For CUSTOM goal type\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);\n\noptions = {\n // ...other optional params like customVariables, variationTargetingVariables\n revenueValue: 'REPLACE_WITH_REVENUE_VALUE'\n}\n// For REVENUE goal type\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n$options = [];\n$options[\"customVariables\"] = [];\n  // Optional, neeeded for Forced Variation\n$options[\"variationTargetingVariables\"] = [];\n\n// For CUSTOM goal type\n$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);\n\n// For REVENUE goal type\n$options[\"revenueValue\"] = 1000.12;\n$vwoClientInstance->track($campaignKey, $userId, $goalIdentifeir, $options);",
      "language": "php"
    },
    {
      "code": "# For CUSTOM goal type\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\n\n# For REVENUE goal type\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, revenue_value = revenue_value)",
      "language": "python"
    },
    {
      "code": "// Without Revenue Value and Custom Variable\nDictionary<string, dynamic> options = new Dictionary<string, dynamic>(){};\nbool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);\n\n// For only Revenue Value\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\n//   revenueValue: for revenue goals only\n\npublic static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()\n{\n    {\n        \"customVariables\", new Dictionary<string, dynamic>()\n        {\n            {\"value\", 10}\n        }\n        \"variationTargettingVariable\", new Dictionary<string, dynamic>()\n        {\n            {\"browser\", \"chrome\"}\n        }\n        \"revenueValue\", 100\n    }\n};\nbool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "// For CUSTOM goal type\nboolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);\n\n// For REVENUE goal type\nboolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "java"
    },
    {
      "code": "# Without Custom Variables and Revenue Value\nvwo_client_instance.track(campaign_key, user_id, goal_identifier)\n\n# With Revenue Value and other options\noptions = {\n  \"custom_variables\" => { browser: \"chrome\" },\n  \"variation_targeting_variables\" => { \"price\" => 10  },\n\t\"revenue_value\" => 10.23\n}\n\nis_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)\n\n# With both Custom Variables and Revenue Value\noptions = { \"custom_variable\" => { \"a\" => \"x\"}, \"revenue_value\" => 10.23}\nis_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)\n",
      "language": "ruby"
    },
    {
      "code": "// Track API\n// With Custom Variables\noptions := make(map[string]interface{})\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// goalIdentifier: you provide at the time of goal creation\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nvariationName = vwoClientInstance.Track(campaignKey, userId, options)\n\n// with custom variables and revenueValue\noptions[\"customVariables\"] = map[string]interface{}{\"browser\": \"Chrome\"}\noptions[\"revenueValue\"] = 12\n\nisSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options)",
      "language": "go"
    }
  ]
}
[/block]
For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).
[block:callout]
{
  "type": "warning",
  "body": "If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a **Paused** state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client-instance.",
  "title": "Tracking Conversions for PAUSED campaign"
}
[/block]

[block:api-header]
{
  "title": "Tracking goal having same identifier across different campaigns"
}
[/block]
When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.

This is supported in Node.js, Python, Java, and .NET as of now from **v1.8.0**+ onwards and in PHP from **v1.13.0**+ onwards.
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
      "code": "//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)\n\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  goalTypeToTrack: vwoSDK.GoalTypeEnum.CUSTOM\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "#  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)\n\nvwo_client_instance = vwo.launch(settings_file, goal_type_to_track=vwo.GOAL_TYPES.CUSTOM)",
      "language": "python"
    },
    {
      "code": "//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)\n\nVWO vwoClientInstance = VWO.launch(settingsFile).withGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM).build();",
      "language": "java"
    },
    {
      "code": "//  Available GoalTypes - GoalTypes.REVENUE, GoalTypes.CUSTOM, GoalTypes.ALL (Default)\n\nvar vwoClient = VWO.Launch(settingsFile, goalTypeToTrack: Constants.GoalTypes.CUSTOM);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "//  Available GoalTypes - 'REVENUE', 'CUSTOM', 'ALL'(Default)\n$config = [\n'goalTypeToTrack' => 'CUSTOM'\n];\n\n$vwoClientInstance = new VWO($config);",
      "language": "php"
    }
  ]
}
[/block]
Passing the type of goal at the time of calling track API. This flag will be considered for the called track API. If you're using the track API at different places, please make sure to pass the flag in options at every instance.
[block:code]
{
  "codes": [
    {
      "code": "//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)\n\nvar options = {\n  goalTypeToTrack: vwoSdk.GoalTypeEnum.CUSTOM\n};\n\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "#  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)\n\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, goal_type_to_track = vwo.GOAL_TYPES.CUSTOM)",
      "language": "python"
    },
    {
      "code": "//  Available Goal_Types - GOAL_TYPES.REVENUE, GOAL_TYPES.CUSTOM, GOAL_TYPES.ALL (Default)\n\nVWOAdditionalParams options = new VWOAdditionalParams();\noptions.setGoalTypeToTrack(GoalEnums.GOAL_TYPES.CUSTOM);\n\nboolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "java"
    },
    {
      "code": "//  Available GoalTypes - GoalTypes.REVENUE, GoalTypes.CUSTOM, GoalTypes.ALL (Default)\n\npublic static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()\n{\n    {\n      \t\"goalTypeToTrack\", Constants.GoalTypes.CUSTOM\n    }\n};\n\nbool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);\n\n",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "$options = {\n  'goalTypeToTrack' =>'CUSTOM'\n};\n\n$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);",
      "language": "php"
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
      "code": "// Tracking a goal of a particular campaign\nvwoClientInstance.track('campaign-in-context', userId, goalIdentifier, options);\n\n// Tracking a same goal across specific campaigns\nvwoClientInstance.track(['campaign-1', 'campaign-2', 'campaign-3'], userId, goalIdentifier, options);\n\n// Tracking a same goal across all valid campaigns\nvwoClientInstance.track(null, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "# Tracking a goal of a particular campaign\nvwo_client_instance.track('campaign-in-context', user_id, goal_identifier);\n\n# Tracking a same goal across specific campaigns\nvwo_client_instance.track(['campaign-1', 'campaign-2', 'campaign-3'], user_id, goal_identifier);\n\n# Tracking a same goal across all valid campaigns\nvwo_client_instance.track(None, user_id, goal_identifier);",
      "language": "python"
    },
    {
      "code": "// Tracking a goal of a particular campaign\nvwoClientInstance.track('campaign-in-context', userId, goalIdentifier, options);\n\n// Tracking a same goal across specific campaigns\nString[] campaignKeysList = {\n  \"campaignKey1\",\n  \"campaignKey2\",\n}\nvwoClientInstance.track(campaignKeysList, userId, goalIdentifier, options);\n\n// Tracking a same goal across all valid campaigns\nvwoClientInstance.track(null, userId, goalIdentifier, options);",
      "language": "java"
    },
    {
      "code": "// Tracking a goal of a particular campaign\nvwoClientInstance.Track('campaign-in-context', userId, goalIdentifier, options);\n\n// Tracking a same goal across specific campaigns\nvwoClientInstance.Track(new List<string>() { campaignKey1, campaignKey2 }, userId, goalIdentifier, options);\n\n// Tracking a same goal across all valid campaigns\nvwoClientInstance.Track(userId, goalIdentifier, options);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "// it will track goal having `goalIdentifier` of campaign having `campaignKey` for the user having `userId` as id.\n$vwoClientInstance->track(\"campaignKey\", $goalIdentifier, $userId, $options);\n\n// it will track goal having `goalIdentifier` of campaigns having `campaignKey1` and `campaignKey2` for the user having `userId` as id.\n$vwoClientInstance->track([\"campaignKey1\", \"campaignKey2\"], $goalIdentifier, $userId, $options);\n// it will track goal having `goalIdentifier` of all the campaigns\n$vwoClientInstance->track(null, $goalIdentifier, $userId, $options);\n//Read more about configuration and usage - https://developers.vwo.com/reference#server-side-sdk-track",
      "language": "php"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Tracking Unique vs Duplicate conversions"
}
[/block]
Same user can trigger a goal multiple times and there are two possibilities to track them inside VWO application via SDKs:

1. You can track only once - unique conversions. [DEFAULT]
2. You can track it as many times as the same user gets converted
[block:code]
{
  "codes": [
    {
      "code": "// Default: shouldTrackReturningUser: false\nvar options = {\n  shouldTrackReturningUser: true\n};\n\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "# Default: should_track_returning_user: false\n\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, should_track_returning_user = true)",
      "language": "python"
    },
    {
      "code": "// Default: shouldTrackReturningUser: false\n\nVWOAdditionalParams options = new VWOAdditionalParams();\noptions.setShouldTrackReturningUser(true);\n\nboolean isSuccessful = vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "java"
    },
    {
      "code": "// Default: shouldTrackReturningUser: false\n\npublic static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()\n{\n    {\n      \t\"shouldTrackReturningUser\", true\n    }\n};\n\nbool isSuccessful = vwoClientInstance.Track(campaignKey, userId, goalIdentifier, options);\n\n",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "$options = [\n  \"shouldTrackReturningUser\" => true\n];\n\n$vwoClientInstance->activate($campaignKey, $userId, $options);",
      "language": "php"
    }
  ]
}
[/block]
If you prefer to have consistent behavior across all the *track* API usage, you simply pass the *shouldTrackReturningUser* at the time of launching the SDK. This way you don't have to explicitly pass the flag in every track API usage.
[block:code]
{
  "codes": [
    {
      "code": "var vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  shouldTrackReturningUser: true // a boolean\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "vwo_client_instance = vwo.launch(settings_file, should_track_returning_user = True)",
      "language": "python"
    },
    {
      "code": "VWO vwoClientInstance = VWO.launch(settingsFile).withShouldTrackReturningUser(true).build();",
      "language": "java"
    },
    {
      "code": "var vwoClient = VWO.Launch(settingsFile, shouldTrackReturningUser: true);",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "$config=[\n  'settingsFile' => $settingsFile,\n  'shouldTrackReturningUser' => true\n];\n\n$vwoClientInstance = new VWO($config);",
      "language": "php"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "SDK Support",
  "body": "This is currently supported in Node.js, Python, Java, and .NET SDKs from **v1.8.0**+ onwards and in PHP from **v1.13.0**+ onwards."
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "NOTE",
  "body": "User Storage Service is mandatory if you want to track unique conversions only. Please check [How to Implement User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service)."
}
[/block]

[block:api-header]
{
  "title": "Passing meta-information that would be available to User Storage Service"
}
[/block]
If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, there could be cases where you would want to store some other details along with the VWO decision-related data into the storage. It is easily achievable by storing the data at your end asynchronously, while SDK will use the User Storage Service to save the decision-related data.
Our SDKs provide a way of passing the meta-information like *browser, os, IP address, location*, etc., along with the decision-related data. The data you will provide in the API call will be available in the ***set*** method of User Storage Service, which you can use to save along with VWO SDK's decision-related data.
[block:code]
{
  "codes": [
    {
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar userStorageService = {\n  get: function (userId, campaignKey) {\n    // Get stored user-campaign data mapping in the format sdk passed it to set method\n  },\n  set: function (data) {\n    // Save user-campaign data mapping\n    // Access meta-data as data.metaData\n  }\n};\n\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  userStorageService: userStorageService \n});\n\nconst options = {\n  metaData: {\n    browser: 'chrome',\n    os: 'linux'\n  }\n};\n\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note",
  "body": "Passing meta-information is currently available only in Node.js SDK from ***v1.13.0*** onwards"
}
[/block]