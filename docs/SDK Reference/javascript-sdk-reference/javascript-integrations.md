---
title: Integrations
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
VWO SDKs help you integrate with a number of third-party destinations. SDKs help you integrate with any kind of tool, be it analytics, monitoring, customer data platforms, and messaging, etc. by implementing a very basic and generic hook that is capable of receiving VWO specific properties.
[block:api-header]
{
  "title": "Do I need to install any library to integrate with the destination?"
}
[/block]
You don't have to install and configure any third-party library for VWO SDKs to send the data to the desired third-party destination. SDKs provide different hooks(one for now), which you can implement, to gather all the helpful information related to the decision-making.
[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "const vwoClientInstance = vwoSDK.launch({\n  settingsFile,\n  integrations: {\n    callback: (properties) => {\n      // properties will contain all the required VWO specific information\n      console.log(properties);\n    }\n  }\n});",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "What's the format for the Integration's object?"
}
[/block]
All VWO SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever VWO SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [activate](https://developers.vwo.com/docs/javascript-activate), [getVariationName](https://developers.vwo.com/docs/javascript-get-variation-name), [track](https://developers.vwo.com/docs/javascript-sdk-track), [isFeatureEnabled](https://developers.vwo.com/docs/javascript-is-feature-enabled), and [getFeatureVariableValue](https://developers.vwo.com/docs/javascript-get-feature-variable-value) APIs.
[block:code]
{
  "codes": [
    {
      "code": "{\n  // campaign info\n  campaignId: Number,\n  campaignName: String,\n  campaignKey: String, // as passed to API\n  campaignType: String,\n  \n  // campaign segmentation conditions\n  customVariables: Object,\n\n  // event name\n  event: 'CAMPAIGN_DECISION',\n  \n  // goal tracked in case of track API\n  goalIdentifier: String,\n    \n  // In case of Feature Rollout and Feature Test Campaigns, to know whether the feature is enabled for the user having userId\n  isFeatureEnabled: Boolean,\n  \n  // campaign whitelisting flag\n  isForcedVariationEnabled: Boolean,\n  \n  sdkVersion: String,\n  \n  // API name which triggered the event\n  source: String,\n  \n  // As passed to API\n  userId: String,\n  \n  // Campaign variation ID which SDK allocates to the user having userId\n  variationId: Number,\n    \n  // Campaign variation Name which SDK allocates to the user having userId\n  variationName: String,\n    \n  // Campaign Whitelisting conditions\n  variationTargetingVariables: Object,\n   \n  // VWO generated UUID based on passed UserId and Account ID\n  vwoUserId: String,\n  \n  // When the variation is fetched from user storage service\n  fromUserStorageService: Boolean,\n  \n  // Whether he variation is shown because of a user being whitelisted\n  isUserWhitelisted: Boolean\n};",
      "language": "json"
    }
  ]
}
[/block]
Different destinations have their own format for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.
This is the reason why VWO SDKs do not provide different libraries to connect with different third-party sources. You can simply refer to the third-party destination's documentation and connect VWO the way you want.

[block:api-header]
{
  "title": "Which all platforms I can integrate with?"
}
[/block]
Since VWO SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party destination. 
[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the VWO SDK."
}
[/block]