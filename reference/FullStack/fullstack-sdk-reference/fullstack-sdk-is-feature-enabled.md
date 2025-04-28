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
After successfully [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) a VWO class, *isFeatureEnabled API* returns whether a feature is enabled for the campaign(for Feature Rollout) / campaign's variation(for Feature Test) for a specified user and for a running campaign.

In the case of a Feature Rollout campaign, a boolean value is returned based on whether a user qualifies for a campaign or not.
In the case of a Feature Test campaign, a boolean value is returned based on whether a user qualifies for a campaign or not and also whether the feature is enabled for the variation assigned to that user or not.
[block:api-header]
{
  "title": "Description"
}
[/block]
The API method:
  * validates the parameters passed.
  * Checks whether the user ID is eligible for the campaign based on pre-segmentation conditions.
  * Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
  * Assigns a deterministic variation to the qualified user.
  * sends an impression event to the VWO server for generating reports.
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
    "2-2": "Pass params for pre-segmentation and whitelisting \n\ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.\n\nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.\n\nuserStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.\n**Note**: This is only supported in Node.js SDK from *v1.11.0* onwards."
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
To prevent your app from crashing, refer to the [best practices](https://developers.vwo.com/reference#fullstack-best-practices) on how to use the VWO SDK.
[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nvar isEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, userId, options);\n\nif (isEnabled) {\n  // Write code for handling feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\n$isEnabled = $vwoClientInstance->isFeatureENabled($campaignKey, $userId, $options);\n\nif ($isEnabled) {\n  // CODE: write code for feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "php"
    },
    {
      "code": "import vwo\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\nvwo_client_instance = vwo.launch(settings_file)\n\n# campaign_key: you provide at the time of campaign creation\n# user_id: how you identify a particular user\n# custom_variables: pre-segmentation variables\n# variation_targeting_variables: whitelisting variables\n\nis_enabled = vwo_client_instance.is_feature_enabled(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)\n\nif (is_enabled):\n  # CODE: write code for feature enabled\nelse:\n  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.",
      "language": "python"
    },
    {
      "code": "using VWOSdk;\n\nSettings settingsFile = VWO.GetSettings(accountId, sdkKey);\nIVWOClient vwoClientInstance = VWO.Launch(settingsFile);  \n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\n\npublic static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()\n{\n    {\n        \"customVariables\", new Dictionary<string, dynamic>()\n        {\n            {\"value\", 10}\n        }\n        \"variationTargettingVariable\", new Dictionary<string, dynamic>()\n        {\n            {\"browser\", \"chrome\"}\n        }\n    }\n};\n\nboolean isEnabled = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options);\n\nif (isEnabled) {\n  // Write code for handling feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\n\nVWO vwoClientInstance = VWO.launch(settingsFile).build();\n\nBoolean isEnabled = vwoClientInstance.isFeatureEnabled(campaignKey, userId, options);\n\nif (isEnabled) {\n  // Write code for handling feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "java"
    },
    {
      "code": "require 'vwo'\n\nvwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)\n\n# campaign_key: you provide at the time of campaign creation\n# user_id: how you identify a particular user\n# options: (Optional)\n#   custom_variables: pre-segmentation variables\n#   variation_targeting_variables: whitelisting variables\n\noptions = {\n  \"custom_variables\" => { browser: \"chrome\" },\n  \"variation_targeting_variables\" => { \"price\" => 10  }\n}\n\nis_enabled = vwo_client_instance.is_feature_enabled(campaign_key, user_id, options)\n\nif is_enabled\n  # CODE: write code for feature enabled\nelse\n  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\nend",
      "language": "ruby"
    },
    {
      "code": "import vwo \"github.com/wingify/vwo-go-sdk\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\n\n// Get SettingsFile\nsettingsFile := vwo.GetSettingsFile(\"accountId\", \"sdkKey\")\n\n// Default instance of VwoInstance\nvwoClientInstance, err := vwo.Launch(settingsFile)\n\n// Activate API\noptions := make(map[string]interface{})\n\n// campaignKey: you provide at the time of campaign creation\n// userId: how you identify a particular user\n// options: (Optional)\n//   customVariables: pre-segmentation variables\n//   variationTargetingVariables: forced variation variables\nisEnabled = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)\n\n// With Custom Variables\noptions[\"customVariables\"] = map[string]interface{}{\"browser\": \"Chrome\"}\nvariationName = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)\n\nif (isEnabled) {\n  // Write code for handling feature enabled\n} else {\n  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.\n}",
      "language": "go"
    }
  ]
}
[/block]
For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).
[block:api-header]
{
  "title": "Tracking Unique vs Duplicate Visitors"
}
[/block]
If User Storage Service is provided, SDK will not track the same visitor multiple times. Once tracked and stored by the User Storage Service, the next time the same visitor lands, it will check the existence from the storage via User Storage Service. If found, it will not track the same visitor.

You can pass ***shouldTrackReturningUser*** as `true` in case you prefer to track duplicate visitors.
[block:code]
{
  "codes": [
    {
      "code": "// For tracking duplicate visitors\nconst options = {\n  shouldTrackReturningUser: true\n};\n\nvwoClientInstance.activate(campaignKey, userId, options);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "$options = [\n  \"shouldTrackReturningUser\" => true\n];\n\n$vwoClientInstance->activate($campaignKey, $userId, $options);",
      "language": "php"
    },
    {
      "code": "VWOAdditionalParams options = new VWOAdditionalParams();\noptions.setShouldTrackReturningUser(true);\n\nvwoClientInstance.activate(Config.campaignKey, userId, options);",
      "language": "java"
    },
    {
      "code": "vwo_client_instance.activate(campaign_key, user_id, should_track_returning_user=True)\n",
      "language": "python"
    }
  ]
}
[/block]
Or, you can also pass ***shouldTrackReturningUser*** at the time of instantiating the VWO SDK client. This will avoid passing the flag in different API calls.
[block:code]
{
  "codes": [
    {
      "code": "let vwoClientInstance = vwoSDK.launch({\n  settingsFile,\n  shouldTrackReturningUser: true\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "$config=[\n  'settingsFile' => $settingsFile,\n  'shouldTrackReturningUser' => true\n];\n\n$vwoClientInstance = new VWO($config);",
      "language": "php"
    },
    {
      "code": "String settingsFile = VWOHelper.getSettingsFile(accountId, sdkKey);\n\nVWO vwoInstance = VWO.launch(settingsFile).withShouldTrackReturningUser(true).build();",
      "language": "java"
    },
    {
      "code": "vwo_client_instance = vwo.launch(\n    settings_file=settings_file,\n    user_storage_service = user_storage_service,\n    should_track_returning_user=True\n)",
      "language": "python"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "If ***shouldTrackReturningUser*** param is passed at the time of instantiating the SDK as well as in the API options as mentioned above, then the API options value will be considered.",
  "title": "Note"
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note",
  "body": "Unique vs Duplicate visitors is currently available in Node.js SDK from ***v1.13+***, Java SDK from ***v1.11+***, PHP SDK from ***v1.13+***, and Python SDK from ***v1.12+***."
}
[/block]

[block:api-header]
{
  "title": "When is Campaign Activation Mandatory"
}
[/block]
If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.
[block:callout]
{
  "type": "warning",
  "title": "Note",
  "body": "Mandatory campaign activation is currently available in Node.js SDK from ***v1.13+***, PHP SDK from ***v1.13+***, Python SDK from ***v1.12+***, and Java SDK from ***v1.11+***."
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
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar userStorageService = {\n  get: function (userId, campaignKey) {\n    // Get stored user-campaign data mapping in the format sdk passed it to set method\n  },\n  set: function (data) {\n    // Save user-campaign data mapping\n    // Access meta-data as data.metaData\n  }\n};\n\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  userStorageService: userStorageService \n});\n\nconst options = {\n  metaData: {\n    browser: 'chrome',\n    os: 'linux'\n  }\n};\n\nvwoClientInstance.isFeatureEnabled(campaignKey, userId, options);",
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