---
title: Activate
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: dotnet-get-variation-name
      title: Get Variation Name
---
After successfully [instantiating](https://developers.vwo.com/docs/dotnet-launch) a VWO class, _Activate API_ activates a FullStack A/B test for a specified user for a running campaign.

> 📘 Note
> 
> This API is applicable only to FullStack A/B campaigns only. This API will not activate a Feature Rollout or a Feature Test campaign when invoked with the corresponding campaign key,

## Description

The API method:

- Validates the parameters passed.
- Checks whether the user is whitelisted.
- Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
- Checks if the campaign is part of [Mutually Exclusive Group](https://developers.vwo.com/docs/mutually-exclusive-groups) and evaluates all the grouped campaigns to decide whether the user is eligible for the campaign.
- Checks whether the user is eligible for a campaign based on pre-segmentation conditions.
- Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
- Assigns a deterministic variation to the qualified user.
- Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key _campaignKey_ and a User ID - _userId_. You can also pass other flags in the _options_ key. 

_campaignKey_ is the required key provided at the time of FullStack campaign creation.  
_userId_ is the required unique id associated with the user for identification.  
_options_ is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

- **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
- **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on the VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
- **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return. 
- **User Bucketing** - checks whether the User(_userId_) qualifies for the campaign. This is achieved by hashing the _userId_ by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same _userId_. This helps in maintaining consistent behavior throughout for a particular _userId_. The hash value is normalized to a number in the range 1–100 and is checked with the campaign _percent traffic_, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign _percent traffic_, the user is marked as being qualified for the campaign having test-key as _campaignKey_. If the _userId_ is not qualified for the campaign, the API method returns null, that is, no variation assigned.
- **Variation Assignment** - assigns a variation to the _userId_ after the user is qualified for the campaign, which again uses the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash) and evenly distributes the traffic based on the traffic distribution of each variation that was configured at the time of campaign creation. The API method returns the name of the assigned variation.  
  This method does take care of _UserStorageService_. It first looks into _UserStorageService_(if provided at the time of Instantiation) before the above logic executes and if the stored variation is found, it returns with that variation name.
- **Sending Impression** - sends an impression to the VWO server for generating reports.

## Parameter definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**campaignKey**  \n_Required_",
    "0-1": "String",
    "0-2": "Campaign key to uniquely identify a FullStack campaign.",
    "1-0": "**userId**  \n_Required_",
    "1-1": "String",
    "1-2": "User ID which uniquely identifies each user.",
    "2-0": "**options**  \n_Optional_",
    "2-1": "Object",
    "2-2": "Pass params for pre-segmentation and whitelisting  \n  \ncustomVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.  \n  \nvariationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.  \n  \nuserAgent(string): userAgent of the visitor  \n  \nuserIpAddress(string): IpAddress of the visitor"
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


## Returns

The _name of the variation_ in which the user is bucketed, or _null_ if the user doesn't qualify to become a part of the campaign.

| Value            | Type   | Description                                                             |
| :--------------- | :----- | :---------------------------------------------------------------------- |
| Variation's name | String | When a user qualifies for the campaign, _variation's name_ is returned. |
| null             | Object | When a user is not qualified for the campaign, _null_ is returned.      |

## Usage

```csharp .NET
using VWOSdk;

Settings settingsFile = VWO.GetSettings(accountId, sdkKey);
IVWOClient vwoClientInstance = VWO.Instantiate(settingsFile);  

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
//.  userAgent: send userAgent of visitor to use segmentation on VWO
//   userIpAddress: send IpAddress of visitor to use segmentation on VWO

public static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()
{
      {
        "customVariables", new Dictionary<string, dynamic>()
        {
          {"value", 10}
        }
      },
      {
        "variationTargettingVariable", new Dictionary<string, dynamic>()
        {
          {"browser", "chrome"}
        }
      },
      {
        "userAgent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
      },
      {
        "userIpAddress", "1.1.1.1"
      }
};

string variationName = vwoClientInstance.Activate(campaignKey, userId, options);

if (variationName == "Control") {
  // Write code for handling 'Control'
} else if (variationName == "Variation-1") {
  // Write code for handling 'Variation-1'
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```

## Unique Visitors are tracked

If User Storage Service is provided, SDK will not track the same visitor multiple times. Once tracked and stored by the User Storage Service, the next time the same visitor lands, it will check the existence from the storage via User Storage Service. If found, it will not track the same visitor.

> 🚧 Unique Visitors
> 
> VWO only tracks a visitor and its corresponding conversion only once even if the SDK sends multiple calls.

## When is Campaign Activation Mandatory

If User Storage Service is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.