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
This API returns the value of a variable being used in a feature for a particular campaign(for Feature Rollout) / campaign's variation(for Feature Test) for a specified user and for a running campaign.

In the case of a Feature Rollout campaign, a boolean value is returned based on whether a user qualifies for a campaign or not.
In the case of a Feature Test campaign, a boolean value is returned based on whether a user qualifies for a campaign or not and also whether the feature is enabled for the variation assigned to that user or not.
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
  * Checks whether the user is eligible for a campaign based on pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Does not send any impression event to VWO.
  * Returns the feature variable value.


The API method requires a campaign unique-key *campaignKey*, *variableKey* and a User ID - *userId*. You can also pass other flags under the *options* key.

*campaign_key* is the required key provided at the time of FullStack campaign creation.
*variable_key* is the required key of the feature's variable.
*user_id* is the required unique id associated with the user for identification.
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

  * **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
  * **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on the VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
  * **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return.
  * **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having the key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns false, that is, no variation assigned.

This method does take care of *UserStorageService*. It first looks into *UserStorageService*(if provided at the time of Instantiation) before the above logic executes and if the stored value is found, it returns with that value.


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
    "1-0": "**variable_key**\n*Required*",
    "0-1": "String",
    "1-1": "String",
    "0-2": "Campaign key to uniquely identify a FullStack campaign.",
    "1-2": "Feature variable key to uniquely identify a variable",
    "2-0": "**user_id**\n*Required*",
    "2-1": "String",
    "2-2": "User ID which uniquely identifies each user.",
    "3-0": "**options**\n*Optional*",
    "3-1": "Object",
    "3-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions."
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
The value of the variable.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "0-0": "value",
    "0-1": "Boolean | String | Number | Float | JSON | null",
    "1-0": "false",
    "1-1": "n",
    "h-2": "Description",
    "0-2": "Depending on the value requested",
    "1-2": "When a user is not qualified for the feature."
  },
  "cols": 3,
  "rows": 1
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
      "code": "# campaign_key: you provide at the time of campaign creation\n# variable_key: you provide while create a variable inside a feature\n# user_id: how you identify a particular user\n\nvalue = vwo_client_instance.get_feature_variable_value(campaign_key, variable_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables);\n",
      "language": "python"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Campaign Activation with User Storage Service"
}
[/block]
If [User Storage Service](https://developers.vwo.com/docs/python-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**
[block:code]
{
  "codes": [
    {
      "code": "vwo_client_instance.activate(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\n",
      "language": "python"
    }
  ]
}
[/block]
**Wrong Usage**
[block:code]
{
  "codes": [
    {
      "code": "# Calling track API before activate API\n# This will not track goal as campaign has not been activated yet.\nvwo_client_instance.track(campaign_key, user_id, goal_identifier, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\n\n# After calling track API\nvwo_client_instance.activate(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)",
      "language": "python"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": ""
}
[/block]