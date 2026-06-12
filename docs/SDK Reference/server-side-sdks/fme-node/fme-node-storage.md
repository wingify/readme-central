---
title: Storage Service
deprecated: false
hidden: false
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
## Overview

The VWO SDK operates in a stateless mode by default, meaning each `get_flag` call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, you can implement a custom storage mechanism by passing a storage parameter during initialization. This allows you to persist feature flag decisions in your preferred database system (like Redis, MongoDB, or any other data store).

### Key Benefits

Key benefits of implementing storage:

1. **Improved Performance**: Cache feature flag decisions and SDK settings to reduce API calls
2. **Consistent User Experience**: Maintain sticky variation assignments across sessions
3. **Reduced Load**: Decrease network requests and server load
4. **Faster Initialization**: Load SDK settings from cache instead of fetching from VWO servers

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

## How to Implement a Storage Service

Storage Service is optional while [instantiating](https://developers.vwo.com/v2/docs/fme-node-initialization) the VWO SDK. However, to ensure sticky variation assignments, we recommend implementing it.

### Basic Implementation

```node Node.js
class StorageConnector extends StorageConnector {
  protected ttl = 7200000; // 2 hours in milliseconds
  protected alwaysUseCachedSettings = false;
  
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
    // Implement logic to retrieve cached settings based on accountId and sdkKey
    // Must return an object with structure: { settings: {...}, timestamp: number }
  }

  /**
   * Set settingsData in storage
   * @param {ISettingsData} data
   */
  async setSettings(data) {
    // Implement logic to store settings data
    // Use data.settings.accountId and data.settings.sdkKey to store the above data for a specific accountId and sdkKey
  }

}

wingify.init({
  sdkKey: '...',
  accountId: '123456',
  storage: new StorageConnector(),
});
```

### Required Methods (Variation Storage)

Storage Service should expose two methods: _get_ and _set_. These methods are used by VWO whenever there is a need to read from or write to the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `get`       | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| `set`       | data               | Store user-feature data mapping                             | null                                                                                       |

### Optional Methods (Settings Storage)

> **Supported from SDK version&#x20;**`1.35.0`**&#x20;onwards**

These methods are **optional** but highly recommended for performance optimization. When implemented, the SDK can load settings from your storage instead of fetching them from VWO servers during initialization.

| Method Name   | Params            | Description                                | Returns                                                                                                   |
| :------------ | :---------------- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `getSettings` | accountId, sdkKey | Retrieves cached VWO settings              | This function returns an object that includes the settings and a timestamp indicating when it was stored. |
| `setSettings` | data              | Stores VWO settings along with a timestamp | void                                                                                                      |

**ISettingsData Interface:**

```typescript
interface ISettingsData {
  settings: Record<string, any>;  // The SDK configuration object
  timestamp: number;              // Unix timestamp in milliseconds when settings were stored
}
```

## Settings Storage Configuration

### TTL (Time To Live)

**TTL** controls how long cached settings remain valid before the SDK fetches fresh settings from VWO servers.

- **Type**: `number` (milliseconds)
- **Default**: `7200000` (2 hours)
- **Minimum**: `60000` (1 minute)
- **Location**: Set via `protected ttl` property in your storage connector class

**How TTL Works:**

1. When settings are stored via `setSettings`, a timestamp is saved
2. During SDK initialization, `getSettings` is called
3. The SDK calculates: `currentTime - storedTimestamp`
4. If the difference exceeds TTL, settings are considered expired
5. Expired settings trigger a fresh fetch from VWO servers

**Example:**

```typescript
class RedisStorageConnector extends Connector {
  protected ttl: number = 3600000; // 1 hour TTL

  constructor() {
    super();
    // TTL can be set in constructor or as a class property
  }
}
```

### alwaysUseCachedSettings

**alwaysUseCachedSettings** is a boolean flag that, when enabled, makes the SDK always use cached settings regardless of TTL expiration.

- **Type**: `boolean`
- **Default**: `false`
- **Location**: Set via `protected alwaysUseCachedSettings` property in your storage connector class

**Behavior:**

- **When&#x20;**`false` (default): SDK respects TTL and fetches fresh settings when cache expires
- **When&#x20;**`true`: SDK always uses cached settings, skipping TTL validation entirely

**Use Cases:**

- `false`: Recommended for most scenarios. Ensures settings stay relatively fresh while benefiting from caching
- `true`: Useful when you want maximum performance and control settings updates manually, or when network calls are expensive/restricted

**Example:**

```typescript
class CustomStorageConnector extends Connector {
  protected alwaysUseCachedSettings: boolean = true; // Always use cache

  constructor() {
    super();
  }
}
```

**Important Notes:**

- Settings storage is completely transparent to variation evaluation logic
- If `getSettings` or `setSettings` throw errors, SDK falls back to fetching from VWO servers
- Settings are validated for `accountId` and `sdkKey` match before use
- Invalid or mismatched settings trigger a fresh fetch

<br />
