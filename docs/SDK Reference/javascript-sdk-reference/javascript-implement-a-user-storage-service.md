---
title: Implement a User Storage Service
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
*User Storage Service (USS)* is a caching layer to persist data about your users. This is helpful in ensuring that variation assignments are always sticky even if you update the campaign settings.\
For example, you can create an implementation that reads and saves user-campaign data mapping from backend services such as Redis, Memcache, MongoDB, or any other storage service.

## How to Implement User Storage Service

User Storage Service is optional while [instantiating](https://developers.vwo.com/docs/javascript-launch) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing one.

User Storage Service should expose two methods: *get* and *set*.

| Method Name | Params              | Description                                                                                                                                                                                        | Returns                                                                       |
| :---------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| get         | userId, campaignKey | Retrieve stored data                                                                                                                                                                               | Returns a matching user-campaign data mapping corresponding to User ID passed |
| set         | campaignUserMap     | Store user-campaign data mapping. It has information like user with User ID become part of a campaign having campaign-key as \<*Campaign\_Key*> and got the assigned variation \<Variation\_Name>. | Nothing.                                                                      |

Check the following example to know more about how to implement your own User Storage Service.

```javascript JavaScript
var vwoSDK = require('vwo-node-sdk');

var userStorageService = {};

// Sync Implementation
userStorageService = {
  get: function (userId, campaignKey) {
    // Get stored user-campaign data mapping in the format sdk passed it to set method
  },
  set: function (campaignUserMap) {
    // Save user-campaign data mapping
  }
};

// Async Implementation
userStorageService = {
  get: function (userId, campaignKey) {
    // This method needs to be synchronous
    // Get stored user-campaign data mapping in the format sdk passed it to set method
    const storedData = db.query(userId, campaignKey);
    // transform (storedData), if needed and
    // return in same format just like campaignUserMap, the it was provided to set method
    return { campaignKey: '', variationName: '', userId: ''  }; // stored data
  },
  set: async function (campaignUserMap) {
    // Save user-campaign data mapping
    // transform (campaignUserMap), if needed
    await db.set(campaignUserMap);
  }
}

var vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile,
  userStorageService: userStorageService 
});
```

## Format for the userStorageData

***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

The following keys are expected in the map:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>

      </th>

      <th>

      </th>

      <th>

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
        Unique campaign key, provided at the time of campaign creation and passed when calling the SDK API.
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
        List of goals that have already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter `_vwo_`.\
        Example: The campaign has three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\
        *'buy-now-clicked\_vwo\_product-bought'*  

        * \*Note:\*\* This is required in case of track API only. If you aren't calling *track* API, you can skip this parameter.
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Note:
>
> VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API.

Below is an example:

```javascript JavaScript
{
  userId: 'User ID',
  campaignKey: 'unique-campaign-key',
  variationName: 'Variation-1'
}
```

> 🚧 User Storage Service Asynchronous Behaviour
>
> ***get*** method needs to be synchronous as all SDK APIs are synchronous except *getSettingsFile* API.\
> Using asynchronous DB/Storage operations inside ***get*** method are not useful as, in any way, SDK needs to wait for the response so that the stored results could be used synchronously.
>
> ***set*** method could be asynchronous as VWO SDK need not wait for any response from it.
>
> Also, asynchronous behavior is limited to languages like Node.js, JavaScript, and Java as other languages do not natively support them in all the SDK supported versions.

Please check the FAQ [Is User Storage Service synchronous or asynchronous?\
](https://developers.vwo.com/docs/is-user-storage-service-synchronous-or-asynchronous) - to know more about how to implement the asynchronous User Storage Service.
