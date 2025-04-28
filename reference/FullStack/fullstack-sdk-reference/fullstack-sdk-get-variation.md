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

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is eligible based on the campaign's pre-segmentation conditions.
* Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
* Assigns a deterministic variation to the qualified user.
* Does ***not*** send an impression event to the VWO server.

It takes the same parameters and returns the same value as [Activate API](https://developers.vwo.com/reference#fullstack-sdk-activate). The only difference is that this API method does ***not*** send a tracking impression to the VWO server. This API method is used to get the variation assigned to the *userId*.\
The behavior of the two API methods, that is, [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) and [getVariationName](https://developers.vwo.com/reference#fullstack-sdk-get-variation) is identical otherwise.

Use *Get Variation Name* API if *Activate* API has been already triggered to prevent a user from being tracked again. Also, this API is also helpful in retrieving the variation assignment to a particular User Id, respecting all other factors like segmentation, whitelisting, etc. without sending any impression call to the VWO servers.

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

        userStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.

        * *Note\*\*: This is only supported in Node.js SDK from*v1.11.0\* onwards.
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

```javascript Node.js
// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
var variation = vwoClientInstance.getVariationName(campaignKey, userId, options);

// Campaign having two variations
if (variation === 'Control') {
  // Write code for handling 'Control'
} else if (variation === 'Variation-1') {
  // Write code for handling 'Variation-1'
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```
```php
<?php

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
$variationName = $vwoClientInstance->getVariationName($campaignKey, $userId, $options);

if ($variationName !== null && $variationName == "Control") {
  // CODE: write code for Control
} elseif($variationName !== null && $variationName == "Variation-1") {
  // CODE: write code for Variation-1
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```
```python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)
vwo_client_instance = vwo.launch(settings_file)

# campaign_key: you provide at the time of campaign creation
# user_id: how you identify a particular user
# custom_variables: pre-segmentation variables
# variation_targeting_variables: forced variation variables
variation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)

if (variation_name == "Control"):
  # CODE: write code for Control
elif (variation_name == "Variation-1"):
  # CODE: write code for Variation-1
else:
  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
```
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
```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);

VWO vwoClientInstance = VWO.launch(settingsFile).build();

String variationName = vwoClientInstance.getVariationName(campaignKey, userId, options);

if (variationName.equals("Control")) {
  // Write code for handling 'Control'
} else if (variationName.equals("Variation-1")) {
  // Write code for handling 'Variation-1'
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```
```ruby
require 'vwo'

vwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)

# With Custom Variables
options = {
  "custom_variables" => { browser: "chrome" },
  "variation_targeting_variables" => { "price" => 10  }
}


variation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)

# Without Custom Variables
options = {}
variation_name = vwo_client_instance.get_variation_name(campaign_key, user_id, options)

if variation_name == "Control"
  # CODE: write code for Control
elsif variation_name == "Variation-1"
  # CODE: write code for Variation-1
else
  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
end
```
```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

// Get SettingsFile
settingsFile := vwo.GetSettingsFile("accountId", "sdkKey")

// Default instance of VwoInstance
vwoClientInstance, err := vwo.Launch(settingsFile)

// GetVariationName API

options := make(map[string]interface{})

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
variationName = vwoClientInstance.GetVariationName(campaignKey, userId, options)

// With Custom Variables
options["customVariables"] = map[string]interface{}{"browser": "Chrome"}

variationName = vwoClientInstance.GetVariationName(campaignKey, userId, options)

if variationName == "Control" {
  // Write code for handling 'Control'
} else if variationName == "Variation-1" {
	// Write code for handling 'Variation-1'
} else {
	// CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```

For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).

## Campaign Activation with User Storage Service

If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

**Correct Usage**

```javascript Node.js
vwoClientInstance.getVariationName(campaignKey, userId, options);
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```
```php
$vwoClientInstance->activate($campaignKey, $userId, $options);
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);
```
```java
vwoClientInstance.activate(campaignKey, userId, options);
 vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

**Wrong Usage**

```javascript Node.js
// Calling track API before activate API
// This will not track the goal as the campaign has not been activated yet.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// After calling track APi
vwoClientInstance.getVariationName(campaignKey, userId, options);
```
```php
// Calling track API before activate API
// This will not track goal as campaign has not been activated yet.
$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);

// After calling track APi
$vwoClientInstance->activate($campaignKey, $userId, $options);
```
```java
// Calling track API before activate API
// This will not track goal as campaign has not been activated yet.
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

// After calling track APi
vwoClientInstance.activate(campaignKey, userId, options);
```

> 🚧 Note
>
> Mandatory campaign activation is currently available in Node.js SDK from ***v1.13+***, PHP SDK from ***v1.13+***, Python SDK from ***v1.12+***, and Java SDK from ***v1.11+***.

##
