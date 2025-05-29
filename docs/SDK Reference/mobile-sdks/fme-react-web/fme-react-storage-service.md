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

In browser environments, the SDK automatically uses `localStorage` to persist user data. This means any data related to the SDK is saved in the browser’s `local storage`By default, allowing it to persist across page reloads and browser sessions.

However, you can customize this behavior using the `clientStorage` option during SDK initialization. This option provides more control over how and where the SDK stores its data on the client side.

### Usage

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel, StorageConnector } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
  clientStorage: {
    key: 'vwo_data', // Custom key used to store SDK data, default is 'vwo_fme_data'
    provider: sessionStorage, // Storage mechanism to use: can be sessionStorage or localStorage (default)
    isDisabled: false, // If true, disables client-side storage altogether
  }
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

### Explanation of `clientStorage` Parameters

| Parameter      | Description                                                                                                                                                                                                                                            | Required | Type    | Default Value  |
| :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | :------ | :------------- |
| **key**        | Specifies the key under which SDK data will be stored in browser storage. This allows you to customize the storage entry name to avoid conflicts or better organize stored data.                                                                       | No       | String  | `vwo_fme_data` |
| **provider**   | Determines the browser storage mechanism to use. It can be either `localStorage` or `sessionStorage`. `localStorage` persists data even after the browser is closed, while `sessionStorage` persists data only during the current browser tab session. | No       | Object  | `localStorage` |
| **isDisabled** | When set to `true`, completely disables client-side storage. This is useful if you want to avoid any data persistence in the browser for privacy or other reasons.                                                                                     | No       | Boolean | `false`        |

> 📘 Important Notes
>
> * **Browser Environment Only:** The `clientStorage` option works exclusively in browser environments where `localStorage` and `sessionStorage` APIs are available.
> * **Node.js Environments:** For server-side or Node.js environments, use the `storage` option for implementing custom storage logic, as `localStorage` and `sessionStorage` are not available there. To know more, click [here](https://developers.vwo.com/v2/docs/fme-node-storage#/).