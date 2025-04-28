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

***get*** method, on the other hand, is called the very first time when API is triggered, after Whitelisting, if there, and ensuring User Storage Service is properly configured. This method is responsible for fetching the data from the DB/Storage. Instead of SDK re-evaluating the logic for the returning visitor for a specific campaign, this method gives preference to the already stored data.
Since SDK APIs are all synchronous in nature, it is mandatory to have the implementation of ***get*** method in a synchronous way.
[block:api-header]
{
  "title": "Why not *get* method could be asynchronous?"
}
[/block]
If ***get*** method implementation is asynchronous, this means SDK's APIs would also return a promise instead of a boolean, string, or whatever type each API is currently returning.
Eventually, even if we are doing asynchronous work, the end result would still be synchronous i.e. final response from the API is dependent on the stored data.

That's why we have kept the ***get*** implementation to work synchronously but there's surely a way to tackle asynchronous behavior of your DB calls. Please refer to the section - *What if our implementation to fetch data is asynchronous in nature?* below.

[block:api-header]
{
  "title": "Can't VWO handle the promise returned by *get* method?"
}
[/block]
We would have. But the point being, even if the ***get*** method returns data asynchronously, SDK's execution will have to be deferred till the response. This means the promise returned by the ***get*** method has to be wisely resolved or rejected by the implementation in order to let SDK work in the desired way.

This is nothing, but similar to synchronous behavior, where the SDK needs to wait for the data returned by the ***get*** method.
[block:api-header]
{
  "title": "What if our implementation to fetch data is asynchronous in nature?"
}
[/block]
That's totally correct. If your code is asynchronous in nature, it's good. You simply need to create a wrapper to deal with getting synchronous data.

[block:code]
{
  "codes": [
    {
      "code": "// Interaction with your storage service/db.\nconst customerStorageService = {\n  get: async function get(userId, campaignKey) {\n    const time = 1000;\n\n    return new Promise((res, _rej) => {\n     setTimeout(() => {\n       let dbData = {\n         id: 1,\n         userId,\n         campaignKey\n        };\n\n        console.log(`Got data:${JSON.stringify(dbData)} after ${time}ms`);\n\n       res(dbData);\n     }, time);\n   })\n  },\n  set: async function set(data = {}) {\n   const time = 2000;\n\n   return new Promise((res, _rej) => {\n     setTimeout(() => {\n       console.log(`Data:${JSON.stringify(data)} saved after ${time}ms`);\n       res();\n     }, 2000);\n   });\n }\n}\n\n// Pass this to VWO SDK at the time of launching it\nlet userStorageService = {\n  get: (userId, campaignKey) => {\n    // Do not implement it\n  },\n  set: (campaignUserMap) => {\n    // can be async\n    customerStorageService.set(campaignUserMap);\n  }\n}\n\n// use VWO SDK\nvar vwoSDK = require('vwo-node-sdk');\n\n// Instantiate the VWO SDK\nvar vwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile,\n  userStorageService: userStorageService \n});\n\n// Fetch the data from your service/db\nvar storedData = await customerStorageService.get(userId, campaignKey);\nvar options = {\n  userStorageData: storedData\n};\n\n// Pass it in the options paramter\nvar variation = vwoClientInstance.activate(campaignKey, userId, options);\n\n// Pass it in the options paramter\nvwoClientInstance.track(campaignKey, userId, goalIdentifier, options);",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Passing Stored Data to APIs",
  "body": "**userStorageData** is the key that needs to be passed in the **options** parameter. The value should be the user-campaign map in the same format as VWO provides to the **set** method of User Storage Service."
}
[/block]

[block:api-header]
{
  "title": "Format for the userStorageData"
}
[/block]
***userStorageData*** is a map where data is being stored with respect to a unique user ID and a unique campaign key.

Following keys are expected in the map:
[block:parameters]
{
  "data": {
    "h-0": "Key",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**userId** ",
    "1-0": "**campaignKey** ",
    "2-0": "**variationName** ",
    "0-1": "String",
    "1-1": "String",
    "2-1": "String",
    "0-2": "Unique User ID which was provided at the time of calling the SDK API.",
    "1-2": "Unique campaign key, provided at the time of campaign creation, and passed when calling the SDK API.",
    "2-2": "Variation Name that was assigned to the user having the User ID",
    "3-2": "List of goals that has already been triggered for the campaign having *campaignKey* and for User ID, separated by a delimiter *_vwo_*.\nExample: Campaign having three goals but only two have been triggered since now i.e. *buy-now-clicked* and *product-bought* goals.\n*'buy-now-clicked_vwo_product-bought'* \n\n**Note:** This is required in case of track API only. If you aren't calling *track* API, you can skip this parameter.",
    "3-0": "**goalIdentifier**",
    "3-1": "String"
  },
  "cols": 3,
  "rows": 4
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Note:",
  "body": "VWO SDK validates the *variationName* and checks whether the variation exists in the campaign having the *campaignkey* or not. If the variation is found, SDK will use without looking into the User Storage service. If the variation of not found, SDK will jump onto the process of checking whether the user is eligible for the campaign or not and returns accordingly from the SDK API."
}
[/block]
Below is an example of the map:
[block:code]
{
  "codes": [
    {
      "code": "{\n  userId: 'User ID',\n  campaignKey: 'unique-campaign-key',\n  variationName: 'Variation-1',\n  goalIdentifier: 'buy-now-btn-clicked'\n}\n\n// goalIdentifier can be skipped if you aren't calling \"track\" API",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "Please Note:",
  "body": "***userStorageData*** can be passed via the *options* parameter in all APIs. This is currently only supported on Node.js SDK from ***v1.11.0*** onwards.\n\n**User Storage Service**:\n\n***get***  method should be synchronous. For asynchronous, call the asynchronous implementation and pass it to the options key in all the respective APIs.\n***set*** method could be asynchronous as per the above-mentioned implementation.\n\nAnd, please remember to return the data in the same structure in the ***get*** method, as what VWO SDK provides in the ***set*** method."
}
[/block]