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
  pages:
    - type: basic
      slug: dotnet-is-feature-enabled
      title: Is Feature Enabled
---
After successfully instantiating a VWO class, *getVariationName API* returns the variation assigned to the specified user if the user qualifies to become part of the specified campaign. This API doesn't activate the campaign i.e. it will not send any impression call to the VWO servers for tracking any data.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is whitelisted.
* Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
* Checks if the campaign is part of [Mutually Exclusive Group](https://developers.vwo.com/docs/mutually-exclusive-groups) and evaluates all the grouped campaigns to decide whether the user is eligible for the campaign.
* Checks whether the user is eligible based on the campaign's pre-segmentation conditions.
* Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
* Assigns a deterministic variation to the qualified user.
* Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/docs/dotnet-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.\
The behaviour of the two API methods, that is, [activate](https://developers.vwo.com/docs/dotnet-activate) and [getVariationName](https://developers.vwo.com/docs/dotnet-get-variation-name) is identical otherwise.

Use *Get Variation Name* API if *Activate* API has already been triggered to prevent a user from being tracked again. Also, this API is also helpful in retrieving the variation assignment to a particular User Id, respecting all other factors like segmentation, whitelisting, etc. without sending any impression call to the VWO servers.

## Parameter definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **campaignKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The campaign needs to be identified based on the unique test-key provided at the time of campaign creation.
      </td>
    </tr>

    <tr>
      <td>
        **userId**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The User ID which uniquely identifies each user.
      </td>
    </tr>

    <tr>
      <td>
        **options**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Pass params for pre-segmentation and whitelisting 

        customVariables(Object): Custom variables to be matched  against Campaign's pre-segmentation.

        variationTargetingVariables(Object): Custom variation targeting variables to be matched  against Campaign's forced variation/whitelisting conditions.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

The name of the variation in which the user is bucketed, or is *null* if the user does not qualify for a campaign.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Variation name
      </td>

      <td>
        String
      </td>

      <td>
        When a user qualifies for the campaign, *variation name* is returned.
      </td>
    </tr>

    <tr>
      <td>
        null
      </td>

      <td>
        Object
      </td>

      <td>
        When a user is not qualified for a campaign, *null* is returned.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```csharp .NET
using VWOSdk;

Settings settingsFile = VWO.GetSettingsFile(accountId, sdkKey);
IVWOClient vwoClientInstance = VWO.CreateInstance(settingsFile);  

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables

public static Dictionary<string, dynamic> options = new Dictionary<string, dynamic>()
{
    {
        "customVariables", new Dictionary<string, dynamic>()
        {
            {"value", 10}
        }
        "variationTargettingVariable", new Dictionary<string, dynamic>()
        {
            {"browser", "chrome"}
        }
    }
};

string variationName = vwoClientInstance.GetVariationName(campaignKey, userId, options);

if (variation === 'Control') {
  // Write code for handling 'Control'
} else if (variation === 'Variation-1') {
  // Write code for handling 'Variation-1'
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```

##
