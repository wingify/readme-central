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

## Do I need to install any library to integrate with the destination?

You don't have to install and configure any third-party library for VWO SDKs to send the data to the desired third-party destination. SDKs provide different hooks(one for now), which you can implement, to gather all the helpful information related to the decision-making.

## Usage

```csharp .NET
internal class HookCallback : IntegrationEventListener
{
    public void onEvent(Dictionary<string, dynamic> properties)
    {
        string payLoad = JsonConvert.SerializeObject(properties);
        CustomLogger logger = new CustomLogger();
        logger.WriteLog(LogLevel.DEBUG, "onEvent call from SDK: " + payLoad);

    }
}

VWO.Launch(SettingsFile, integrations: new HookManager() { HookCallback = new HookCallback() });
```

## What's the format for the Integration's object?

All VWO SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever VWO SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [activate](https://developers.vwo.com/docs/dotnet-activate), [getVariationName](https://developers.vwo.com/docs/dotnet-get-variation-name), [track](https://developers.vwo.com/docs/dotnet-track), [isFeatureEnabled](https://developers.vwo.com/docs/dotnet-is-feature-enabled), and [getFeatureVariableValue](https://developers.vwo.com/docs/dotnet-get-feature-variable-value) APIs.

```json
{
  // campaign info
  campaignId: Number,
  campaignKey: String, // as passed to API
  campaignName: String,
  campaignType: String,
  
  // campaign segmentation conditions
  customVariables: Object,

  // event name
  event: 'CAMPAIGN_DECISION',
  
  // goal tracked in case of track API
  goalIdentifier: String,
    
  // In case of Feature Rollout and Feature Test Campaigns, to know whether the feature is enabled for the user having userId
  isFeatureEnabled: Boolean,
  
  // campaign whitelisting flag
  isForcedVariationEnabled: Boolean,
  
  sdkVersion: String,
  
  // API name which triggered the event
  source: String,
  
  // As passed to API
  userId: String,
  
  // Campaign variation ID which SDK allocates to the user having userId
  variationId: Number,
    
  // Campaign variation Name which SDK allocates to the user having userId
  variationName: String,
    
  // Campaign Whitelisting conditions
  variationTargetingVariables: Object,
   
  // VWO generated UUID based on passed UserId and Account ID
  vwoUserId: String,
  
  // When the variation is fetched from user storage service
  fromUserStorageService: Boolean,
  
  // Whether he variation is shown because of a user being whitelisted
  isUserWhitelisted: Boolean
};
```

Different destinations have their own format for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.\
This is the reason why VWO SDKs do not provide different libraries to connect with different third-party sources. You can simply refer to the third-party destination's documentation and connect VWO the way you want.

## Which all platforms I can integrate with?

Since VWO SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party destination. 

> 📘 Note
>
> Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the VWO SDK.
