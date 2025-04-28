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

In the case of a Feature Rollout campaign, a boolean value is returned based on whether a user qualifies for a campaign or not.\
In the case of a Feature Test campaign, a boolean value is returned based on whether a user qualifies for a campaign or not and also whether the feature is enabled for the variation assigned to that user or not.

## Description

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

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

* **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
* **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
* **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return.
* **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having the key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns false, that is, no variation assigned.

This method does take care of *UserStorageService*. It first looks into *UserStorageService*(if provided at the time of Instantiation) before the above logic executes and if the stored variation is found, it returns with that value.

* **Sending Impression** - sends an impression to the VWO server for generating reports.

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
        Campaign key to uniquely identify a FullStack campaign.
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
        User ID which uniquely identifies each user.
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

A boolean indicating whether the feature is enabled for the user.

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
        true
      </td>

      <td>
        Boolean
      </td>

      <td>
        When a user qualifies for the feature.
      </td>
    </tr>

    <tr>
      <td>
        false
      </td>

      <td>
        Boolean
      </td>

      <td>
        When a user is not qualified for the feature.
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

// Get SettingsFile
settingsFile := vwo.GetSettingsFile("accountId", "sdkKey")

// Default instance of VwoInstance
vwoClientInstance, err := vwo.Launch(settingsFile)

// Activate API
options := make(map[string]interface{})

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
isEnabled = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)

// With Custom Variables
options["customVariables"] = map[string]interface{}{"browser": "Chrome"}
variationName = vwoClientInstance.IsFeatureEnabled(campaignKey, userId, options)

if (isEnabled) {
  // Write code for handling feature enabled
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
