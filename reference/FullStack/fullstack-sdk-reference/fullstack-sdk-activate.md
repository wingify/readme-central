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
---
After successfully [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) a VWO class, *Activate API* activates a FullStack A/B test for a specified user for a running campaign.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is eligible for a campaign based on pre-segmentation conditions.
* Checks whether the user qualifies to become a part of the campaign based on traffic allocation.
* Assigns a deterministic variation to the qualified user.
* Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key *campaignKey* and a User ID - *userId*. You can also pass other flags in the *options* key. 

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

* **Parameter Validation** - first, validates the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
* **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on the VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceeded further.
* **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return. 
* **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having test-key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns null, that is, no variation assigned.
* **Variation Assignment** - assigns a variation to the *userId* after the user is qualified for the campaign, which again uses the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash) and evenly distributes the traffic based on the traffic distribution of each variation that was configured at the time of campaign creation. The API method returns the name of the assigned variation.\
  This method does take care of *UserStorageService*. It first looks into *UserStorageService*(if provided at the time of Instantiation) before the above logic executes and if the stored variation is found, it returns with that variation name.
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

        userStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the [asynchronous nature of the User Storage Service's get](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous) method.

        * *Note\*\*: This is only supported in Node.js SDK from*v1.11.0\* onwards.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

The name of the variation in which the user is bucketed, or null if the user doesn't qualify to become a part of the campaign.

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
        Variation's name
      </td>

      <td>
        String
      </td>

      <td>
        When a user qualifies for the campaign, *variation's name* is returned.
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
        When a user is not qualified for the campaign, *null* is returned.
      </td>
    </tr>
  </tbody>
</Table>

To prevent your app from crashing, refer to the [best practices](https://developers.vwo.com/reference#fullstack-best-practices) on how to use the VWO SDK.

## Usage

```javascript Node.js
// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
var options = {
  customVariables: {},
  variationTargetingVariables: {}
};
var variation = vwoClientInstance.activate(campaignKey, userId, options);

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

$variationName = $vwoClientInstance->activate($campaignKey, $userId, $options);

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
# custom_variables: pre-segmentation variables (Optional)
# variation_targeting_variables: pre-segmentation variables (Optional)

variation_name = vwo_client_instance.activate(campaign_key, user_id, custom_variables = custom_variables, variation_targeting_variables = variation_targeting_variables)

if (variation_name == "Control"):
  # CODE: write code for Control
elif (variation_name == "Variation-1"):
  # CODE: write code for Variation-1
else:
  # CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
```
```csharp .NET
using VWOSdk;

Settings settingsFile = VWO.GetSettings(accountId, sdkKey);
IVWOClient vwoClientInstance = VWO.Instantiate(settingsFile);  

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

string variationName = vwoClientInstance.Activate(campaignKey, userId, options);

if (variationName == "Control") {
  // Write code for handling 'Control'
} else if (variationName == "Variation-1") {
  // Write code for handling 'Variation-1'
} else {
  // CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```
```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);

VWO vwoClientInstance = VWO.launch(settingsFile).build();

// Activate API
String variationName = vwoClientInstance.activate(campaignKey, userId, options);

if (variationName.equals("Control")) {
  // Write code for handling 'Control'
} else if (variationName.equals("Variation-1")) {
  // CODE: write code for Variation-1
} else {
  // CODE: When user does not become part of campaign.
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

variation_name = vwo_client_instance.activate(campaign_key, user_id, options)

# Without Custom Variables
options = {}
variation_name = vwo_client_instance.activate(campaign_key, user_id, options)

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

// Activate API
options := make(map[string]interface{})

// campaignKey: you provide at the time of campaign creation
// userId: how you identify a particular user
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
variationName = vwoClientInstance.Activate(campaignKey, userId, options)

// With Custom Variables
options["customVariables"] = map[string]interface{}{"browser": "Chrome"}
variationName = vwoClientInstance.Activate(campaignKey, userId, options)

if variationName == "Control" {
  // Write code for handling 'Control'
} else if variationName == "Variation-1" {
	// Write code for handling 'Variation-1'
} else {
	// CODE: User is not qualified for the campaign. Would be due to configuring campaign's percent-traffic less than 100% while creating or updating a FullStack campaign.
}
```

For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/reference#fullstack-is-user-storage-service-synchronous-or-asynchronous).

## Tracking Unique vs Duplicate Visitors

If User Storage Service is provided, SDK will not track the same visitor multiple times. Once tracked and stored by the User Storage Service, the next time the same visitor lands, it will check the existence from the storage via User Storage Service. If found, it will not track the same visitor.

You can pass ***shouldTrackReturningUser*** as `true` in case you prefer to track duplicate visitors.

```javascript Node.js
// For tracking duplicate visitors
const options = {
  shouldTrackReturningUser: true
};

vwoClientInstance.activate(campaignKey, userId, options);
```
```php
$options = [
  "shouldTrackReturningUser" => true
];

$vwoClientInstance->activate($campaignKey, $userId, $options);
```
```java
VWOAdditionalParams options = new VWOAdditionalParams();
options.setShouldTrackReturningUser(true);

vwoInstance.activate(Config.campaignKey, userId, options);
```
```python
vwo_client_instance.activate(campaign_key, user_id, should_track_returning_user=True)
```

Or, you can also pass ***shouldTrackReturningUser*** at the time of instantiating the VWO SDK client. This will avoid passing the flag in different API calls.

```javascript Node.js
let vwoClientInstance = vwoSDK.launch({
  settingsFile,
  shouldTrackReturningUser: true
});
```
```php
$config=[
  'settingsFile' => $settingsFile,
  'shouldTrackReturningUser' => true
];

$vwoClientInstance = new VWO($config);
```
```java
String settingsFile = VWOHelper.getSettingsFile(accountId, sdkKey);

VWO vwoInstance = VWO.launch(settingsFile)
  .withShouldTrackReturningUser(true)
  .build();
```
```python
vwo_client_instance = vwo.launch(
    settings_file=settings_file,
    user_storage_service = user_storage_service,
    should_track_returning_user=True
)
```

> 📘 Note
>
> If ***shouldTrackReturningUser*** param is passed at the time of instantiating the SDK as well as in the API options as mentioned above, then the API options value will be considered.

> 🚧 Note
>
> Unique vs Duplicate visitors is currently available in Node.js SDK from ***v1.13+***, Java SDK from ***v1.11+***, PHP SDK from ***v1.13+***, and Python SDK from ***v1.12+***.

## When is Campaign Activation Mandatory

If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.

> 🚧 Note
>
> Mandatory campaign activation is currently available in Node.js SDK from ***v1.13+***, PHP SDK from ***v1.13+***, Python SDK from ***v1.12+***, and Java SDK from ***v1.11+***.

## Passing meta-information that would be available to User Storage Service

If [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) is provided, there could be cases where you would want to store some other details along with the VWO decision-related data into the storage. It is easily achievable by storing the data at your end asynchronously, while SDK will use the User Storage Service to save the decision-related data.\
Our SDKs provide a way of passing the meta-information like *browser, os, IP address, location*, etc., along with the decision-related data. The data you will provide in the API call will be available in the ***set*** method of User Storage Service, which you can use to save along with VWO SDK's decision-related data.

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

var userStorageService = {
  get: function (userId, campaignKey) {
    // Get stored user-campaign data mapping in the format sdk passed it to set method
  },
  set: function (data) {
    // Save user-campaign data mapping
    // Access meta-data as data.metaData
  }
};

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  userStorageService: userStorageService 
});

const options = {
  metaData: {
    browser: 'chrome',
    os: 'linux'
  }
};

vwoClientInstance.activate(campaignKey, userId, options);
```

> 🚧 Note
>
> Passing meta-information is currently available only in Node.js SDK from ***v1.13.0*** onwards
