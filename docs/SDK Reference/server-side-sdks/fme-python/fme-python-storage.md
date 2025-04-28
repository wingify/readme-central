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
The SDK operates in a stateless mode by default, meaning each get\_flag call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

Key benefits of implementing storage:

1. Improved performance by caching decisions
2. Consistent user experience across sessions
3. Reduced load on your application

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Storage Service is optional while [instantiating](https://developers.vwo.com/v2/docs/fme-python-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage

```python
from vwo import StorageConnector

class UserStorage(StorageConnector):
    def get(self, key: str, user_id: str):
        return client_db.get(f"{key}_{user_id}")

    def set(self, value: dict):
        key = f"{value.get('featureKey')}_{value.get('userId')}"
        client_db[key] = {
            'rolloutKey': value.get('rolloutKey'),
            'rolloutVariationId': value.get('rolloutVariationId'),
            'rolloutId': value.get('rolloutId'),
            'experimentKey': value.get('experimentKey'),
            'experimentVariationId': value.get('experimentVariationId'),
            'experimentId': value.get('experimentId'),
        }
        return True
        
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'storage': UserStorage()
}

vwo_client = init(options)
```

Storage Service should expose two methods: *get* and *set*. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| get         | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| set         | data               | Store user-feature data mapping                             | null                                                                                       |
