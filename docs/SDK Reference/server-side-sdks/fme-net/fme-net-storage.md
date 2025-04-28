---
title: Storage Service
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The SDK operates in a stateless mode by default, meaning each get_flag call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

Key benefits of implementing storage:

1. Improved performance by caching decisions
2. Consistent user experience across sessions
3. Reduced load on your application

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Storage Service is optional while [instantiating](https://developers.vwo.com/v2/docs/fme-node-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage

```node C#
using System;
using System.Collections.Generic;
using VWOFmeSdk.Packages.Storage;

public class StorageConnector : Connector
{
   public override object Get(string featureKey, string userId)
   {
       // Retrieve data based on featureKey and userId
       return null;
   }

   public override void Set(Dictionary<string, object> data)
   {
       // Store data based on data["featureKey"] and data["userId"]
   }
}

var vwoInitOptions = new VWOInitOptions
{
   SdkKey = "32-alpha-numeric-sdk-key",
   AccountId = 123456,
   Storage = new StorageConnector()
};

```

Storage Service should expose two methods: _get_ and _set_. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Get         | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| Set         | data               | Store user-feature data mapping                             | null                                                                                       |