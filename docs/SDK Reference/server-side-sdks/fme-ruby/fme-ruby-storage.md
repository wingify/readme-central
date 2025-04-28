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

Storage Service is optional while [instantiating](https://developers.vwo.com/v2/docs/fme-ruby-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage

```ruby
class StorageConnector
  def get(feature_key, user_id)
    # Return stored data based on feature_key and user_id
  end

  def set(data)
    # Store data using data[:feature_key] and data[:user_id]
  end
end

vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    storage: StorageConnector.new
})
```

Storage Service should expose two methods: *get* and *set*. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Params                 | Description                                                     | Returns                                                                                        |
| :---------- | :--------------------- | :-------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| get         | feature\_key, user\_id | Retrieve stored data corresponding to feature\_key and user\_id | Returns a matching user-feature data mapping corresponding to feature\_key and user\_id passed |
| set         | data                   | Store user-feature data mapping                                 | null                                                                                           |
