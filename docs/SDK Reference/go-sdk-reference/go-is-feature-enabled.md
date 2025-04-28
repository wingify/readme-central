---
title: Is Feature Enabled
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
After successfully [instantiating](https://developers.vwo.com/docs/go-launch) a VWO class, *isFeatureEnabled API* returns whether a feature is enabled for the campaign(for Feature Rollout) / campaign's variation(for Feature Test) for a specified user and for a running campaign.

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
  * Checks whether the user is eligible for the campaign based on pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Assigns a deterministic variation to the qualified user.
  * Sends an impression event to the VWO server for generating reports.
  * Returns whether the feature is enabled for the user.


The API method requires a campaign unique-key *campaignKey*, feature, and a User ID - *userId*. You can also pass other flags under the *options* key. 

*campaignKey* is the required key provided at the time of FullStack campaign creation.
*userId* is the required unique id associated with the user for identification.
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

  * **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
  * **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
  * **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return.
  * **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having the key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns false, that is, no variation assigned.

This method does take care of *UserStorageService*. It first looks into *UserStorageService*(if provided at the time of Instantiation) before the above logic executes and if the stored variation is found, it returns with that value.
  * **Sending Impression** - sends an impression to the VWO server for generating reports.


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
    "0-0": "**campaignKey**\n*Required*",
    "1-0": "**userId**\n*Required*",
    "0-1": "String",
    "1-1": "String",
    "0-2": "Campaign key to uniquely identify a FullStack campaign.",
    "1-2": "User ID which uniquely identifies each user.",
    "2-0": "**options**\n*Optional*",
    "2-1": "Object",
    "2-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions."
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
A boolean indicating whether the feature is enabled for the user.
[block:parameters]
{
  "data": {
    "h-0": "Value",
    "h-1": "Type",
    "0-0": "true",
    "0-1": "Boolean",
    "1-0": "false",
    "1-1": "Boolean",
    "h-2": "Description",
    "0-2": "When a user qualifies for the feature.",
    "1-2": "When a user is not qualified for the feature."
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
      "code": "import vwo \"github.com/wingify/vwo-go-sdk\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\n\n// Get SettingsFile\nsettingsFile := vwo.GetSettingsFile(\"accountId\", \"sdkKey\")\n\n// Default instance of VwoInstance\nvwoClientInstance, err := vwo.Launch(settingsFile)\n\n// Activate API\noptions := make(map[string]interface{})\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nisEnabled = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)\n\n// With Custom Variables\noptions[\"customVariables\"] = map[string]interface{}{\"browser\": \"Chrome\"}\nvariationName = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)\n\nif (isEnabled) {\n  // Write code for handling feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "go"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Unique Visitors are tracked"
}
[/block]
If User Storage Service is provided, SDK will not track the same visitor multiple times. Once tracked and stored by the User Storage Service, the next time the same visitor lands, it will check the existence from the storage via User Storage Service. If found, it will not track the same visitor.
[block:callout]
{
  "type": "warning",
  "title": "Unique Visitors",
  "body": "VWO only tracks a visitor and its corresponding conversion only once even if the SDK sends multiple calls."
}
[/block]

[block:api-header]
{
  "title": "When is Campaign Activation Mandatory"
}
[/block]
If User Storage Service is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.