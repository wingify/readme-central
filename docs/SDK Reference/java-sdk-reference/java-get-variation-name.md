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
  * Checks whether the user is eligible for a campaign based on pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Assigns a deterministic variation to the qualified user.
  * Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/docs/java-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.
The behaviour of the two API methods, that is, [activate](https://developers.vwo.com/docs/java-activate) and [getVariationName](https://developers.vwo.com/docs/java-get-variation-name) is identical otherwise.

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
    "0-0": "**campaignKey**\n*Required*",
    "1-0": "**userId**\n*Required*",
    "0-2": "The campaign needs to be identified based on the unique test-key provided at the time of campaign creation.",
    "1-2": "The User ID which uniquely identifies each user.",
    "1-1": "String",
    "0-1": "String",
    "2-0": "**options**\n*Optional*",
    "2-1": "Object",
    "2-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.",
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
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\n\nVWO vwoClientInstance = VWO.launch(settingsFile).build();\n\nHashMap customVariablesMap = new HashMap();\nmap.put(\"browser\",\"chrome\");\n\nVWOAdditionalParams options = new VWOAdditionalParams();\noptions.setCustomVariables(customVariablesMap);\n\nString variationName = vwoClientInstance.getVariationName(campaignKey, userId, options);\n\nif (variationName.equals(\"Control\")) {\n  // Write code for handling 'Control'\n} else if (variationName.equals(\"Variation-1\")) {\n  // Write code for handling 'Variation-1'\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "java"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Campaign Activation with User Storage Service"
}
[/block]
If [User Storage Service](https://developers.vwo.com/docs/is-user-storage-service-synchronous-or-asynchronous) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**
[block:code]
{
  "codes": [
    {
      "code": " vwoClientInstance.activate(campaignKey, userId, options);\n vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "java"
    }
  ]
}
[/block]
**Wrong Usage**

[block:code]
{
  "codes": [
    {
      "code": "// Calling track API before activate API\n// This will not track goal as campaign has not been activated yet.\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);\n\n// After calling track APi\nvwoClientInstance.activate(campaignKey, userId, options);",
      "language": "java"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": ""
}
[/block]