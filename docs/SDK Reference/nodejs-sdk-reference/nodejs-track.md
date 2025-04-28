---
title: Track
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
Tracks a conversion event for a particular user for a running FullStack campaign.

## Description

The API method:

* Validates the parameters passed.
* Checks whether the user is whitelisted.
* Checks if User Storage Service is provided to know whether the user is returning. If yes, show the previously assigned variation always.
* Assigns the consistent variation to the new/returning qualified user.
* Sends an asynchronous impression event to the VWO server for generating reports.

The API method requires a campaign unique-key - *campaignKey*, unique user identifier - *userId* and the goal-identifier - *goalIdentifer*. You can also pass other flags under the *options* key.

*campaignKey* is the required key provided at the time of FullStack campaign creation.\
*userId* is the required unique id associated with the user for identification.\
*goalIdentifier* is the required key provided at the time of creating the goal in a FullStack campaign.\
*options* is the optional key to provide targeting, whitelisting, User Storage Service stored data, and other flags based on your campaign setup and requirements.

## Parameter Definitions

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

        From v1.8.0+\
        String | Array | null/undefined/empty
      </td>

      <td>
        The Campaign key to uniquely identify a FullStack campaign.  

        From v1.8.0+\
        Campaign key, a list of campaign keys, or empty are supported as the type of parameter
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
        User ID, which uniquely identifies each user.  

        * \*Important\*\*: This User ID must match the User ID provided to activate or getVariation API.
      </td>
    </tr>

    <tr>
      <td>
        **goalIdentifier**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The Goal key to uniquely identify a goal of a FullStack campaign.
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

        revenueValue(Number | Float | String): Revenue goal value, necessary only when type of goal is revenue.  

        goalTypeToTrack(String): If you want to track a particular goal across multiple campaigns(having the same identifier), use this flag to define which type of goal you would like to track i.e. conversion-only or revenue-only, or both. Defaults to ALL i.e. Conversion as well as Revenue goals.  

        shouldTrackReturningUser(Boolean): Calling track APIs with same user ID will track that user multiple times in the campaign reports. Pass a true value to track only unique conversions of a particular user. This is applicable only if you've implemented a User Storage Service at your end.  

        userStorageData(Object): Pass this so that SDK uses this data instead of calling the User Storage Service's *get* method to retrieve the stored data. It also helps in implementing the asynchronous nature of the User Storage Service's *get* method.  

        userAgent(String): userAgent of the visitor    

        userIpAddress(String): IpAddress of the visitor
      </td>
    </tr>
  </tbody>
</Table>

## Returns

A boolean value based on whether the impression was made to the VWO server.

| Value | Type    | Description                                                                                                                 |
| :---- | :------ | :-------------------------------------------------------------------------------------------------------------------------- |
| true  | Boolean | If an impression event is successfully received by VWO server for report generation.                                        |
| false | Boolean | If userId provided is not part of campaign or when unexpected error comes and no impression call is received by VWO server. |

## Usage

```javascript Node.js
// options: (Optional)
//   customVariables: pre-segmentation variables
//   variationTargetingVariables: forced variation variables
//.  userAgent: userAgent of visitor to use segmentation on VWO
//   userIpAddress: IpAddress of visitor to use segmentation on VWO

var options = {
  customVariables: {},
  variationTargetingVariables: {},
  userAgent: '',
  userIpAddress: ''
};
// For CUSTOM goal type
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);

options = {
 // ...other optional params like customVariables, variationTargetingVariables
 revenueValue: 'REPLACE_WITH_REVENUE_VALUE'
}
// For REVENUE goal type
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

For passing *userStorageData* in the options, please follow this [doc](https://developers.vwo.com/docs/is-user-storage-service-synchronous-or-asynchronouss).

> 🚧 Tracking Conversions for PAUSED campaign
>
> If your server is using an old version of settings, VWO will discard any track calls for a campaign that is now in a **Paused** state. SDKs will keep on sending tracking hits for users or conversions for that campaign until you fetch the latest settings file and update your VWO client-instance.

## Tracking goal having same identifier across different campaigns

When you want to track a goal having the same identifier across multiple campaigns, there is no need to trigger the goal for each different campaign individually. This will reduce the manual effort in case you plan to use the same goal in many campaigns. For example, in case you are planning to run 3 A/B tests and 4 Feature Tests, where you would be using the same goal, you don't have to trigger the goal having the same identifier for each of those 7 campaigns individually.

> 👍 Same Goal Definition
>
> A goal is considered to be the **same** when the goal identifier used for that goal is same across the multiple campaigns, irrespective of the type of campaign i.e. A/B or Feature Test Campaign.

VWO offer two types of goal i.e. **Conversion** and **Revenue**, which can be configured inside VWO application.

> 📘 Tracking goal across campaigns only if goal-type is same
>
> By default, SDK will track a goal across all running campaigns irrespective of the type of goal.\
> The behaviour to configure and track only the specific type of goals is possible via passing a key either at the time of launching the SDK or inside the options parameter of the track API.

Passing the type of goal at the time of launching the SDK will consider the flag for all the track API calls. Defaults to ALL i.e. Conversion as well as Revenue.

```javascript Node.js
//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  goalTypeToTrack: vwoSDK.GoalTypeEnum.CUSTOM
});
```

Passing the type of goal at the time of calling track API. This flag will be considered for the called track API. If you're using the track API at different places, please make sure to pass the flag in options at every instance.

```javascript Node.js
//  Available GoalTypes - GoalTypeEnum.REVENUE, GoalTypeEnum.CUSTOM, GoalTypeEnum.ALL (Default)

var options = {
  goalTypeToTrack: vwoSdk.GoalTypeEnum.CUSTOM
};

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 🚧 Precedence Order of the goal-type flag
>
> Goal Type key, as shown in example-code above, if present in track API will be given the priority over the same key provided even in the launch API.

## Usage(when tracking same goal across campaigns)

```javascript Node.js
// Tracking a goal of a particular campaign
vwoClientInstance.track('campaign-in-context', userId, goalIdentifier, options);

// Tracking a same goal across specific campaigns
vwoClientInstance.track(['campaign-1', 'campaign-2', 'campaign-3'], userId, goalIdentifier, options);

// Tracking a same goal across all valid campaigns
vwoClientInstance.track(null, userId, goalIdentifier, options);
```

> 🚧 Unique Conversions
>
> VWO only tracks a conversion corresponding to a visitor hit only once even if the SDK sends multiple calls for the same user per campaign.

## Passing meta-information that would be available to User Storage Service

If [User Storage Service](https://developers.vwo.com/docs/nodejs-implement-a-user-storage-service) is provided, there could be cases where you would want to store some other details along with the VWO decision-related data into the storage. It is easily achievable by storing the data at your end asynchronously, while SDK will use the User Storage Service to save the decision-related data.\
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

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 🚧 Note
>
> Passing meta-information is available from ***v1.13*** onwards

## Promises and async

If your application uses promises for asynchronous operations, you can configure the SDK to manage asynchronous operations. VWO SDK is capable of returning a value as well as promise depending on the use case.\
When returning a value, API response time is faster (\< 50ms) as it does not wait for the asynchronous tracking call to get completed. in the case of returning a promise, API will wait for both the decision as well as the asynchronous tracking call to get completed, and thereby, the response time of the API will include the round-trip time of the network call.

Since the async/await syntax is based on Promises, all APIs will also work with it.

**Configuring the SDK**

You can pass ***returnPromiseFor*** option at the time of instantiating the SDK i.e. while using *launch* API.\
The ***returnPromiseFor*** option is an object and you can use it either to enable promise-based response from all the APIs or select the required API(s).

```javascript Node.js
const vwoInstance = vwoSdk.launch({
  settingsFile,
  returnPromiseFor: {
    all: true
  }
});

// Or just for track API

const vwoInstance = vwoSdk.launch({
  settingsFile,
  returnPromiseFor: {
    track: true
  }
});
```

**Example** 

```javascript Node.js
// Using the .then() method to add a handler for a Promise
vwoClientInstance.track(campaignKey, userId, goalIdentifier).then(response => {
  // your application code
});

// Using "await" instead, within an async function
const variationName = await vwoClientInstance.track(campaignKey, userId, goalIdentifier);
```
