---
title: Get Variation Name
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
After successfully instantiating a VWO class, *getVariationName API* returns the variation assigned to the specified user if the user qualifies to become part of the specified campaign. This API doesn't activate the campaign i.e. it will not send any impression call to the VWO servers for tracking any data.
[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * Validates the parameters passed.
  * Checks whether the user is whitelisted.
  * Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
  * Checks if the campaign is part of [Mutually Exclusive Group](https://developers.vwo.com/docs/mutually-exclusive-groups) and evaluates all the grouped campaigns to decide whether the user is eligible for the campaign.
  * Checks whether the user is eligible based on the campaign's pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Assigns a deterministic variation to the qualified user.
  * Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/docs/ruby-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.
The behaviour of the two API methods, that is, [activate](https://developers.vwo.com/docs/ruby-activate) and [getVariationName](https://developers.vwo.com/docs/ruby-get-variation-name) is identical otherwise.

Use *Get Variation Name* API if *Activate* API has already been triggered to prevent a user from being tracked again. Also, this API is also helpful in retrieving the variation assignment to a particular User Id, respecting all other factors like segmentation, whitelisting, etc. without sending any impression call to the VWO servers.
[block:api-header]
{
  "title": "Parameter definitions"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**campaign_key**\n*Required*",
    "1-0": "**user_id**\n*Required*",
    "0-2": "The campaign needs to be identified based on the unique test-key provided at the time of campaign creation.",
    "1-2": "The User ID which uniquely identifies each user.",
    "1-1": "String",
    "0-1": "String",
    "2-0": "**options**\n*Optional*",
    "2-1": "Object",
    "2-2": "Pass params for pre-segmentation and whitelisting \n\ncustom_variables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariation_targeting_variables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.",
    "3-0": "**customVariables**\n*Optional*\n**Note**: only for SDKs other than NodeJs and Python for now",
    "3-1": "Object",
    "3-2": "Custom variables to be matched against Campaign's pre-segmentation"
  },
  "cols": 3,
  "rows": 3
}
[/block]

[block:api-header]
{
  "title": "Returns"
}
[/block]
The name of the variation in which the user is bucketed, or is *null* if the user does not qualify for a campaign.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "0-0": "Variation name",
    "0-1": "String",
    "1-0": "null",
    "h-2": "Description",
    "0-2": "When a user qualifies for the campaign, *variation name* is returned.",
    "1-1": "Object",
    "1-2": "When a user is not qualified for a campaign, *null* is returned."
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
      "code": "require 'vwo'\n\nvwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)\n\n# With Custom Variables\noptions = {\n  \"custom_variables\" => { \"browser\" => \"chrome\" },\n  \"variation_targeting_variables\" => { \"price\" => 10  }\n}\n\n\nvariation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)\n\n# Without Custom Variables\noptions = {}\nvariation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)\n\nif variation_name == \"Control\"\n  # CODE: write code for Control\nelsif variation_name == \"Variation-1\"\n  # CODE: write code for Variation-1\nelse\n  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\nend",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Campaign Activation with User Storage Service"
}
[/block]
If [User Storage Service](https://developers.vwo.com/docs/ruby-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**
[block:code]
{
  "codes": [
    {
      "code": "vwo_client_instance.activate(campaign_key, user_id)\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, {})",
      "language": "ruby"
    }
  ]
}
[/block]
**Wrong Usage**
[block:code]
{
  "codes": [
    {
      "code": "# Calling track API before activate API\n# This will not track goal as campaign has not been activated yet.\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, {})\n\n# After calling track API\nvwo_client_instance.activate(campaign_key, user_id)",
      "language": "ruby"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": ""
}
[/block]