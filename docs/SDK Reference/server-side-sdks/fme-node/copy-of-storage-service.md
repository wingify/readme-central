---
title: Copy of Storage Service
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

```node
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
  
  /**
   * Get settingsData from storage
   * @param {number} accountId
   * @param {string} sdkKey
   * @returns {Promise<ISettingsData>}
   */
  async getSettings(accountId, sdkKey) {
    // return await data (based on accountId and sdkKey)
  }

  /**
   * Set settingsData in storage
   * @param {ISettingsData} data
   */
  async setSettings(data) {
    // Set settingsData corresponding to a accountId and sdkKey
    // Use data.settings.accountId and data.settings.sdkKey to store the above data for a specific accountId and sdkKey
  }

}

vwo.init({
  sdkKey: '...',
  accountId: '123456',
  storage: StorageConnector,
});
```

### Required Methods (Variation Storage)

Storage Service should expose two methods: _get_ and _set_. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `get`       | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| `set`       | data               | Store user-feature data mapping                             | null                                                                                       |

### Optional Methods (Settings Storage)

> **Supported from SDK version `1.35.0` onwards**

The storage connector can optionally support settings storage.
When implemented, the SDK can load settings from storage instead of fetching them from the VWO servers during initialization.

#### Supported Methods

| Method Name   | Params            | Description                                | Returns                                                                                                   |
| :------------ | :---------------- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `getSettings` | accountId, sdkKey | Retrieves cached VWO settings              | This function returns an object that includes the settings and a timestamp indicating when it was stored. |
| `setSettings` | data              | Stores VWO settings along with a timestamp | void                                                                                                      |

### Settings Storage Behavior

* During SDK initialization, the SDK checks if `getSettings` is available
* If valid settings are returned, they are used directly
* If not, the SDK fetches settings from VWO servers and persists them using `setSettings`
* This behavior is transparent and does not affect variation evaluation logic
