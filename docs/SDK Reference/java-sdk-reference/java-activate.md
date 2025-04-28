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
After successfully [instantiating](https://developers.vwo.com/docs/java-launch) a VWO class, *Activate API* activates a FullStack A/B test for a specified user for a running campaign.

> 📘 Note
>
> This API is applicable only to FullStack A/B campaigns only. This API will not activate a Feature Rollout or a Feature Test campaign when invoked with the corresponding campaign key,

## Description

The API method:

* Validates the parameters passed.
* Check whether the user is whitelisted.
* Check if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
* Check if the campaign is part of [Mutually Exclusive Group](https://developers.vwo.com/docs/mutually-exclusive-groups) and evaluate all the grouped campaigns to decide whether the user is eligible for the campaign.
* Check whether the user is eligible for a campaign based on pre-segmentation conditions.
* Check whether the user qualifies to become a part of the campaign based on traffic allocation.
* Assigns a deterministic variation to the qualified user.
* Sends an impression event to the VWO server for generating reports.

The API method requires a campaign unique-key *campaignKey* and a User ID - *userId*. You can also pass other flags in the *options* key. 

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

The API method has various levels of stages and depending on each stage result, the subsequent stage is executed.

* **Parameter Validation** - first, validate the parameters passed. If these are not valid, log the error, and the API method returns null, that is, no variation found.
* **Whitelisting** - checks whether a user is forced into a variation. This could be achieved via user ID or passing custom variation targeting variables that would be evaluated against conditions configured inside the campaign on the VWO app. If the user is whitelisted, variation defined in conditions is returned otherwise proceed further.
* **Pre-segmentation** - checks whether the user passes the segmentation conditions i.e. whether the user is eligible for the campaign by evaluating campaign segmentation conditions against passed custom variables. If the user is eligible, then proceed further, otherwise return. 
* **User Bucketing** - checks whether the User(*userId*) qualifies for the campaign. This is achieved by hashing the *userId* by using the [murmur3 hashing algorithm](https://en.wikipedia.org/wiki/MurmurHash), which always provides the same hash value for the same *userId*. This helps in maintaining consistent behavior throughout for a particular *userId*. The hash value is normalized to a number in the range 1–100 and is checked with the campaign *percent traffic*, which was configured at the time of campaign creation. If the hash value is less than or equal to the campaign *percent traffic*, the user is marked as being qualified for the campaign having test-key as *campaignKey*. If the *userId* is not qualified for the campaign, the API method returns null, that is, no variation is assigned.
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

        userAgent(String): userAgent of the visitor  

        userIpAddress(String): IpAddress of the visitor
      </td>
    </tr>
  </tbody>
</Table>

## Returns

The name of the variation in which the user is bucketed, or null if the user doesn't qualify to become a part of the campaign.

| Value            | Type   | Description                                                             |
| :--------------- | :----- | :---------------------------------------------------------------------- |
| Variation's name | String | When a user qualifies for the campaign, *variation's name* is returned. |
| null             | Object | When a user is not qualified for the campaign, *null* is returned.      |

## Usage

```java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey);

VWO vwoClientInstance = VWO.launch(settingsFile).build();
 
HashMap customVariablesMap = new HashMap();
map.put("browser","chrome");

VWOAdditionalParams options = new VWOAdditionalParams();
options.setCustomVariables(customVariablesMap);
options.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36");
options.setIPAddress("1.1.1.1");

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

## Unique Visitors are tracked

If User Storage Service is provided, SDK will not track the same visitor multiple times. Once tracked and stored by the User Storage Service, the next time the same visitor lands, it will check the existence from the storage via User Storage Service. If found, it will not track the same visitor.

> 🚧 Unique visitors
>
> VWO only tracks a visitor and its corresponding conversion only once even if the SDK sends multiple calls.

## When is Campaign Activation Mandatory

If User Storage Service is provided, campaign activation is mandatory before tracking any goal, getting a variation of a campaign, and getting the value of the feature's variable.
