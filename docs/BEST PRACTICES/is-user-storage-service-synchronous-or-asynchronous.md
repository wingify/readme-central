---
title: User Storage Service Synchronous vs Asynchronous
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
      slug: >-
        why-is-it-important-to-use-persistent-storage-when-deploying-to-production
      title: >-
        Why is it important to use Persistent Storage when deploying to
        Production?
---
User Storage Service is a service that stores the user information and VWO campaign-related decision-making details. User Storage Service provides persistent storage for the user-campaign details. 

 User Storage Service recommends having two methods ***set*** and ***get***.

***set*** method is called when a decision is made by our SDKs logic for a specific campaign and userId and User Storage Service is properly configured. Implementation inside ***set*** methods could be synchronous or asynchronous, based upon your requirements, since VWO SDKs do not rely on the return value from the ***set*** method, 

***get*** method, on the other hand, is called the very first time when API is triggered, after Whitelisting, if there, and ensuring User Storage Service is properly configured. This method is responsible for fetching the data from the DB/Storage. Instead of SDK re-evaluating the logic for the returning visitor for a specific campaign, this method gives preference to the already stored data.\
Since SDK APIs are all synchronous in nature, it is mandatory to have the implementation of ***get*** method in a synchronous way.

## Why not *get* method could be asynchronous?

If ***get*** method implementation is asynchronous, this means SDK's APIs would also return a promise instead of a boolean, string, or whatever type each API is currently returning.\
Eventually, even if we are doing asynchronous work, the end result would still be synchronous i.e. final response from the API is dependent on the stored data.

That's why we have kept the ***get*** implementation to work synchronously but there's surely a way to tackle asynchronous behavior of your DB calls. Please refer to the section - *What if our implementation to fetch data is asynchronous in nature?* below.

## Can't VWO handle the promise returned by *get* method?

We would have. But the point being, even if the ***get*** method returns data asynchronously, SDK's execution will have to be deferred till the response. This means the promise returned by the ***get*** method has to be wisely resolved or rejected by the implementation in order to let SDK work in the desired way.

This is nothing, but similar to synchronous behavior, where the SDK needs to wait for the data returned by the ***get*** method.

## What if our implementation to fetch data is asynchronous in nature?

That's totally correct. If your code is asynchronous in nature, it's good. You simply need to create a wrapper to deal with getting synchronous data.

```javascript Node.js
// Interaction with your storage service/db.
const customerStorageService = {
  get: async function get(userId, campaignKey) {
    const time = 1000;

    return new Promise((res, _rej) => {
     setTimeout(() => {
       let dbData = {
         id: 1,
         userId,
         campaignKey
        };

        console.log(`Got data:${JSON.stringify(dbData)} after ${time}ms`);

       res(dbData);
     }, time);
   })
  },
  set: async function set(data = {}) {
   const time = 2000;

   return new Promise((res, _rej) => {
     setTimeout(() => {
       console.log(`Data:${JSON.stringify(data)} saved after ${time}ms`);
       res();
     }, 2000);
   });
 }
}

// Pass this to VWO SDK at the time of launching it
let userStorageService = {
  get: (userId, campaignKey) => {
    // Do not implement it
  },
  set: (campaignUserMap) => {
    // can be async
    customerStorageService.set(campaignUserMap);
  }
}

// use VWO SDK
var vwoSDK = require('vwo-node-sdk');

// Instantiate the VWO SDK
var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  userStorageService: userStorageService 
});

// Fetch the data from your service/db
var storedData = await customerStorageService.get(userId, campaignKey);
var options = {
  userStorageData: storedData
};

// Pass it in the options paramter
var variation = vwoClientInstance.activate(campaignKey, userId, options);

// Pass it in the options paramter
vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

> 📘 Passing Stored Data to APIs
>
> **userStorageData** is the key that needs to be passed in the **options** parameter. The value should be the user-campaign map in the same format as VWO provides to the **set** method of User Storage Service.

## Format for the userStorageData

***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

Following keys are expected in the map:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Key
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
        **userId** 
      </td>

      <td>
        String
      </td>

      <td>
        Unique User ID which was provided at the time of calling the SDK API.
      </td>
    </tr>

    <tr>
      <td>
        **campaignKey** 
      </td>

      <td>
        String
      </td>

      <td>
        Unique campaign key, provided at the time of campaign creation, and passed when calling the SDK API.
      </td>
    </tr>

    <tr>
      <td>
        **variationName** 
      </td>

      <td>
        String
      </td>

      <td>
        Variation Name that was assigned to the user having the User ID
      </td>
    </tr>

    <tr>
      <td>
        **goalIdentifier**
      </td>

      <td>
        String
      </td>

      <td>
        List of goals that has already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter **vwo**.\
        Example: Campaign having three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\
        *'buy-now-clicked\_vwo\_product-bought'* 

        * *Note:\*\* This is required in case of track API only. If you aren't calling*track\* API, you can skip this parameter.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note:
>
> VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API.

Below is an example of the map:

```javascript Node.js
{
  userId: 'User ID',
  campaignKey: 'unique-campaign-key',
  variationName: 'Variation-1',
  goalIdentifier: 'buy-now-btn-clicked'
}

// goalIdentifier can be skipped if you aren't calling "track" API
```

> 🚧 Please Note:
>
> ***userStorageData*** can be passed via the *options* parameter in all APIs. This is currently only supported on Node.js SDK from ***v1.11.0*** onwards.
>
> **User Storage Service**:
>
> ***get***  method should be synchronous. For asynchronous, call the asynchronous implementation and pass it to the options key in all the respective APIs.\
> ***set*** method could be asynchronous as per the above-mentioned implementation.
>
> And, please remember to return the data in the same structure in the ***get*** method, as what VWO SDK provides in the ***set*** method.
