---
title: Optimizing Performance with Custom Storage in VWO SDK
excerpt: >-
  Learn how to implement a custom storage service in the VWO SDK to enhance
  performance and ensure consistent user experiences.
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-node-integrations
      title: Integrations
      type: basic
---
The SDK operates in a stateless mode by default, meaning each `get_flag` call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

### Key Benefits of Implementing Storage

1. **Improved Performance**: Caching decisions reduces the need for repeated evaluations.
2. **Consistent User Experience**: Ensures uniformity across user sessions.
3. **Reduced Load**: Minimizes the strain on your application.

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Implementing a Storage Service is optional when [instantiating](https://developers.vwo.com/v2/docs/fme-node-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Usage Example

```javascript
class StorageConnector extends StorageConnector {
  constructor() {
    super();
  }

  /**
   * Get data from storage
   * @param {string} featureKey
   * @param {string} userId
   * @returns {Promise<any>}
   */
  async get(featureKey, userId) {
    // return await data (based on featureKey and userId)
  }

  /**
   * Set data in storage
   * @param {object} data
   */
  async set(data) {
    // Set data corresponding to a featureKey and user ID
    // Use data.featureKey and data.userId to store the above data for a specific feature and a user
  }
}

vwo.init({
  sdkKey: '...',
  accountId: '123456',
  storage: StorageConnector,
});
```

### Storage Service Methods

The Storage Service should expose two methods: **get** and **set**. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Parameters         | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| get         | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| set         | data               | Store user-feature data mapping                             | null                                                                                       |