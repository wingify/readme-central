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
After successfully instantiating a VWO class, *getVariationName API* activates a FullStack A/B test for the specified user for a particular running campaign.
[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * Validates the parameters passed.
  * Checks whether the user is eligible based on the campaign's pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Assigns a deterministic variation to the qualified user.
  * Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/reference#fullstack-sdk-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.
The behavior of the two API methods, that is, [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) and [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) is identical otherwise.

Use *Get Variation Name* API if *Activate* API has been already triggered to prevent a user from being tracked again. Also, this API is also helpful in retrieving the variation assignment to a particular User Id, respecting all other factors like segmentation, whitelisting, etc. without sending any impression call to the VWO servers.
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
    "2-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.\n\nuserStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.\n**Note**: This is only supported in Node.js SDK from *v1.11.0* onwards.",
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
      "code": "// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nvar variation = vwoClientInstance.getVariationName(campaignKey, userId, options);\n\n// Campaign having two variations\nif (variation === 'Control') {\n  // Write code for handling 'Control'\n} else if (variation === 'Variation-1') {\n  // Write code for handling 'Variation-1'\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\n$variationName = $vwoClientInstance->getVariationName($campaignKey, $userId, $options);\n\nif ($variationName !== null && $variationName == \"Control\") {\n  // CODE: write code for Control\n} elseif($variationName !== null && $variationName == \"Variation-1\") {\n  // CODE: write code for Variation-1\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "php"
    },
    {
      "code": "import vwo\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\nvwo_client_instance = vwo.launch(settings_file)\n\n# campaign_key: you provide at the time of campaign creation\n# user_id: how you identify a particular user\n# custom_variables: pre-segmentation variables\n# variation_targeting_variables: forced variation variables\nvariation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\n\nif (variation_name == \"Control\"):\n  # CODE: write code for Control\nelif (variation_name == \"Variation-1\"):\n  # CODE: write code for Variation-1\nelse:\n  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.",
      "language": "python"
    },
    {
      "code": "using VWOSdk;\n\nSettings settingsFile = VWO.GetSettingsFile(accountId, sdkKey);\nIVWOClient vwoClientInstance = VWO.CreateInstance(settingsFile);  \n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\n\npublic static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()\n{\n    {\n        \"customVariables\", new Dictionary<string, dynamic>()\n        {\n            {\"value\", 10}\n        }\n        \"variationTargettingVariable\", new Dictionary<string, dynamic>()\n        {\n            {\"browser\", \"chrome\"}\n        }\n    }\n};\n\nstring variationName = vwoClientInstance.GetVariationName(campaignKey, userId, options);\n\nif (variation === 'Control') {\n  // Write code for handling 'Control'\n} else if (variation === 'Variation-1') {\n  // Write code for handling 'Variation-1'\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\n\nVWO vwoClientInstance = VWO.launch(settingsFile).build();\n\nString variationName = vwoClientInstance.getVariationName(campaignKey, userId, options);\n\nif (variationName.equals(\"Control\")) {\n  // Write code for handling 'Control'\n} else if (variationName.equals(\"Variation-1\")) {\n  // Write code for handling 'Variation-1'\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "java"
    },
    {
      "code": "require 'vwo'\n\nvwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)\n\n# With Custom Variables\noptions = {\n  \"custom_variables\" => { browser: \"chrome\" },\n  \"variation_targeting_variables\" => { \"price\" => 10  }\n}\n\n\nvariation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)\n\n# Without Custom Variables\noptions = {}\nvariation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)\n\nif variation_name == \"Control\"\n  # CODE: write code for Control\nelsif variation_name == \"Variation-1\"\n  # CODE: write code for Variation-1\nelse\n  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\nend",
      "language": "ruby"
    },
    {
      "code": "import vwo \"github.com/wingify/vwo-go-sdk\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\n\n// Get SettingsFile\nsettingsFile := vwo.GetSettingsFile(\"accountId\", \"sdkKey\")\n\n// Default instance of VwoInstance\nvwoClientInstance, err := vwo.Launch(settingsFile)\n\n// GetVariationName API\n\noptions := make(map[string]interface{})\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nvariationName = vwoClientInstance.GetVariationName(campaignKey, userId, options)\n\n// With Custom Variables\noptions[\"customVariables\"] = map[string]interface{}{\"browser\": \"Chrome\"}\n\nvariationName = vwoClientInstance.GetVariationName(campaignKey, userId, options)\n\nif variationName == \"Control\" {\n  // Write code for handling 'Control'\n} else if variationName == \"Variation-1\" {\n\t// Write code for handling 'Variation-1'\n} else {\n\t// CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "go"
    }
  ]
}
[/block]
For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).
[block:api-header]
{
  "title": "Campaign Activation with User Storage Service"
}
[/block]
If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**
[block:code]
{
  "codes": [
    {
      "code": "vwoClientInstance.getVariationName(campaignKey, userId, options);\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "$vwoClientInstance->activate($campaignKey, $userId, $options);\n$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);",
      "language": "php"
    },
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
      "code": "// Calling track API before activate API\n// This will not track the goal as the campaign has not been activated yet.\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);\n\n// After calling track APi\nvwoClientInstance.getVariationName(campaignKey, userId, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "// Calling track API before activate API\n// This will not track goal as campaign has not been activated yet.\n$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);\n\n// After calling track APi\n$vwoClientInstance->activate($campaignKey, $userId, $options);",
      "language": "php"
    },
    {
      "code": "// Calling track API before activate API\n// This will not track goal as campaign has not been activated yet.\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);\n\n// After calling track APi\nvwoClientInstance.activate(campaignKey, userId, options);",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note",
  "body": "Mandatory campaign activation is currently available in Node.js SDK from ***v1.13+***, PHP SDK from ***v1.13+***, Python SDK from ***v1.12+***, and Java SDK from ***v1.11+***."
}
[/block]

[block:api-header]
{
  "title": ""
}
[/block]