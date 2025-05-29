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
## In-Built Storage

In browser-based environments, the VWO FullStack JavaScript SDK automatically utilizes the browser’s localStorage API to persist user-related data. This ensures a seamless user experience by maintaining state across page reloads and browser sessions.

### Key Benefits of Custom Storage:

1. **Performance Optimization**: Cache feature flag and variation decisions locally, reducing round trips to remote APIs.
2. **Consistency Across Sessions**: Maintain stable experiences for returning users by preserving decision state.
3. **Reduced Backend/API Load**: Avoid repeated decision evaluations by storing results on the client side.

<br />

### Default Behavior

#### By default:

* The SDK leverages window\.localStorage to persist all relevant data such as:
  * User variation assignments
  * Campaign and experiment metadata
  * Event tracking identifiers
* This persistence ensures that:
  * Data survives browser restarts and page reloads

    User consistency is maintained without requiring re-identification
* All data is stored under a key namespace prefixed with vwo\_ for easy identification and isolation.

#### Customizing Storage: clientStorage Option

For more advanced use cases, the SDK provides a clientStorage configuration option during initialization. This allows you to override the default storage mechanism with a custom implementation.

### Usage

```javascript
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  
  clientStorage: {
    // Custom key used to store SDK data, default is 'vwo_fme_data'
    key: 'vwo_data',
    // Storage mechanism to use: can be sessionStorage or localStorage (default)
    provider: sessionStorage,
    // If true, disables client-side in-built storage altogether. Though can connect Storage Connector still
    isDisabled: false,
  },
});
```

### Explanation of `clientStorage` Parameters

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Description
      </th>

      <th>
        Use case
      </th>

      <th>
        Default
        Value
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **key**(String)
        (*Optional*)
      </td>

      <td>
        Specifies the key under which SDK data will be stored in browser storage. This allows you to customize the storage entry name to avoid conflicts or better organize stored data.
      </td>

      <td>
        Useful for avoiding key collisions or aligning with your app's naming conventions.
      </td>

      <td>
        `vwo_fme_data`
      </td>
    </tr>

    <tr>
      <td>
        **provider**(Object)
        (*Optional*)
      </td>

      <td>
        Determines the browser storage mechanism to use. It can be either `localStorage` or `sessionStorage`. `localStorage` persists data even after the browser is closed, while `sessionStorage` persists data only during the current browser tab session.
      </td>

      <td>
        * Use localStorage for persistent storage across sessions (default).
        * Use sessionStorage if you want data to reset on every new browser session (e.g., enhanced privacy or compliance needs).
      </td>

      <td>
        `localStorage`
      </td>
    </tr>

    <tr>
      <td>
        **isDisabled**(Boolean)\
        (*Optional*)
      </td>

      <td>
        When set to `true`, completely disables client-side storage. This is useful if you want to avoid any data persistence in the browser for privacy or other reasons.
      </td>

      <td>
        Ideal for ephemeral or stateless environments, or when you need full control over state management externally.
      </td>

      <td>
        `false`
      </td>
    </tr>
  </tbody>
</Table>

```mermaid
flowchart TD
    A[SDK Initialization] --> B[clientStorage block parsed]
    B --> C{isDisabled == true?}
    C -- Yes --> D[Skip all storage; SDK operates statelessly]
    C -- No --> E{provider defined?}
    E -- Yes --> F[Use custom provider (e.g., sessionStorage)]
    E -- No --> G[Use default: localStorage]
    F & G --> H[Store data under specified key (default: 'vwo_fme_data')]

```

> 📘 Important Notes
>
> * **Browser Environment Only:** The `clientStorage` option works exclusively in browser environments where `localStorage` and `sessionStorage` APIs are available.
> * **Node.js Environments:** For server-side or Node.js environments, use the `storage` option for implementing custom storage logic, as `localStorage` and `sessionStorage` are not available there. To know more, click [here](https://developers.vwo.com/v2/docs/fme-node-storage#/).

<br />

## How to Implement a StorageConnector

In browser environments, if you prefer not to rely on VWO's default web-based APIs for decision resolution, you can still implement a custom storage connector. This gives you more control over how feature flag decisions are cached and reused, though it may introduce slight performance trade-offs depending on your implementation.

The storage mechanism ensures that once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application. This is particularly useful for maintaining a stable user experience during A/B tests and feature rollouts.

### Usage

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
  storage: StorageConnector, // this is how you can pass and connect storage connector
});
```

Storage Service should expose two methods: *get* and *set*. These methods are used by VWO whenever there is a need to read or write from the storage service.

| Method Name | Params             | Description                                                 | Returns                                                                                    |
| :---------- | :----------------- | :---------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| get         | featureKey, userId | Retrieve stored data corresponding to featureKey and userId | Returns a matching user-feature data mapping corresponding to featureKey and userId passed |
| set         | data               | Store user-feature data mapping                             | null                                                                                       |