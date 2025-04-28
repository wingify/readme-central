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
  * Assigns the consistent variation to the new/returning qualified user.
  * Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - *campaign_key*, unique user identifier - *userId* and the goal-identifier - *goalIdentifer*. You can also pass other flags under the *options* key.

*campaign_key* is the required key provided at the time of FullStack campaign creation.
*userId* is the required unique id associated with the user for identification.
*goal_identifier* is the required key provided at the time of creating the goal in a FullStack campaign.
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
    "0-0": "**campaign_key**\n*Required*",
    "0-1": "String\n\n\nFrom v1.8.0+\nString | Array | null/undefined/empty",
    "0-2": "The Campaign key to uniquely identify a FullStack campaign.\n\nFrom v1.8.0+ \nCampaign key, a list of campaign keys, or empty are supported as the type of parameter",
    "1-0": "**user_id**\n*Required*",
    "1-1": "String",
    "1-2": "User ID, which uniquely identifies each user.\n\n**Important**: This User ID must match the User ID provided to activate or getVariation API.",
    "2-0": "**goal_identifier**\n*Required*",
    "2-1": "String",
    "2-2": "The Goal key to uniquely identify a goal of a FullStack campaign.",
    "3-0": "**options**\n*Optional*",
    "3-1": "Hash",
    "3-2": "Pass params for pre-segmentation and whitelisting \n\ncustom-variables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariation_targeting_variables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.\n\nrevenue_value(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.\n\ngoal_type_to_track(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.\n\nshould_track_returning_user(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end."
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
      "code": "# Without Custom Variables and Revenue Value\nvwo_client_instance.track(campaign_key, user_id, goal_identifier)\n\n# With Revenue Value and other options\noptions = {\n  \"custom_variables\" => { \"browser\" => \"chrome\" },\n  \"variation_targeting_variables\" => { \"price\" => 10  },\n\t\"revenue_value\" => 10.23\n}\n\nis_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)\n\n# With both Custom Variables and Revenue Value\noptions = { \"custom_variable\" => { \"a\" => \"x\"}, \"revenue_value\" => 10.23}\nis_successful = vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)\n",
      "language": "ruby"
    }
  ]
}
[/block]

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
[block:callout]
{
  "type": "success",
  "title": "Same Goal Definition",
  "body": "A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign."
}
[/block]
VWO offers two types of goals i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.
[block:callout]
{
  "type": "info",
  "body": "By default, SDK will track a goal across all running campaigns irrespective of the type of goal.\nThe behavior to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API.",
  "title": "Tracking goal across campaigns only if goal-type is same"
}
[/block]
Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.
[block:code]
{
  "codes": [
    {
      "code": "#  Available Goal_Types - REVENUE_TRACKING, CUSTOM_GOAL, ALL (Default)\n\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, {goal_type_to_track: 'REVENUE_TRACKING'})",
      "language": "ruby"
    }
  ]
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
      "code": "# it will track goal having `goal_identifier` of campaign having `campaign_key` for the user having `user_id` as id.\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, {})\n\n# it will track goal having `goal_identifier` of campaigns having `campaign_key1` and `campaign_key2` for the user having `user_id` as id.\n\nvwo_client_instance.track([campaign_key1, campaign_key2], user_id, goal_identifier, {})\n\n# it will track goal having `goal_identifier` of all the campaigns\nvwo_client_instance.track(nil, user_id, goalIdentifier, {}",
      "language": "ruby"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Unique conversions",
  "body": "VWO only tracks a conversion corresponding to a visitor hit only once even if the SDK sends multiple calls for the same user per campaign."
}
[/block]