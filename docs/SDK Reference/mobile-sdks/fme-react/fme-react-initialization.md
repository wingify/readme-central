---
title: Initialization
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
To integrate VWO Feature Experimentation (FE) into your React application, you must wrap your application code with the `VWOProvider` component.

The `VWOProvider` is a React context provider that initializes the VWO Feature Experimentation (FE) SDK and makes the client instance and user context available to child components through React Context.

It is essential for enabling feature flag evaluation, A/B testing, and user tracking using hooks like `useVWOClient` or `useGetFlag`.

<br />

## Usage

```typescript
import React from 'react';
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

const userContext: IVWOContextModel = {
  id: 'unique_user_id', // Required: Unique identifier for the user
  customVariables: { planId: 2, plan: 'premium' }, // Optional
};

// Optional: Provide a fallback UI component that will be displayed while VWOProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => (
  <VWOProvider config={vwoConfig} userContext={ userContext } fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

<br />

## Parameter Types (`IVWOProvider`)

| Type               | Prop                  | Required | Description                                                                                |
| :----------------- | :-------------------- | :------- | :----------------------------------------------------------------------------------------- |
| `IVWOClient`       | **client**            | No       | Pre-initialized VWO client. If provided, it overrides the `config`.                        |
| `IVWOOptions`      | **config**            | No       | SDK configuration for initializing the VWO client. Required if the `client` is not passed. |
| `IVWOContextModel` | **userContext**       | No       | Initial user context to evaluate flags and experiments.                                    |
| `ReactNode`        | **children**          | Yes      | Child components that require access to the VWO context.                                   |
| `ReactNode`        | **fallbackComponent** | No       | Component shown while the client is initializing.                                          |

> 📘 Note
>
> ⚠️ Either `client` or `config` must be provided. If both are provided, client takes precedence and a warning is logged.

<br />

## Usage (Using Pre-initialized VWO Client)

If you have already initialized a VWO client in your application, you can pass it directly to the VWOProvider:

```typescript
import React, { useEffect, useState } from 'react';
import { VWOProvider, IVWOOptions, IVWOClient, IVWOContextModel, init } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Replace with your real SDK key
  accountId: '123456', // Replace with your real account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IVWOContextModel = {
  id: 'unique_user_id',
  customVariables: { planId: 2, plan: 'premium' }
};

const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => {
  const [vwoClient, setVwoClient] = useState<IVWOClient | null>(null);

  useEffect(() => {
    const initializeVWO = async () => {
      const client = await init(vwoConfig);
      setVwoClient(client);
    };

    initializeVWO();
  }, []);

  if (!vwoClient) return fallbackComponent;

  return (
    <VWOProvider client={vwoClient} userContext={ userContext }>
      <YourComponent />
    </VWOProvider>
  );
};

export default App;
```

<br />

## Basic Implementation without User Context

If you don't have user details available while initialising the `VWOProvide`r, you can pass it later in the `useGetFlag` hook.

```typescript
import React from 'react';
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

// Optional: Provide a fallback UI component that will be displayed while VWOProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing VWO...</div>;

const App = () => (
  <VWOProvider config={vwoConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

<br />

## Using the React SDK Without the `VWOProvider`

In some cases, you might prefer not to wrap your application with the `VWOProvider` component. For example, you may want finer control over when and how the SDK is initialized, or you might need to integrate it into an existing setup where using a provider is not feasible.

VWO FE React SDK allows you to bypass the provider and directly work with its methods. This gives you the flexibility to manually initialize the SDK and manage feature flag evaluations, user targeting, and other SDK operations programmatically.

You can implement this approach using the example below:

```javascript JavaScript
import React, { useEffect, useState } from 'react';
import { init } from 'vwo-fme-react-sdk';

const MyComponent = () => {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState<Boolean>(false);

  useEffect(() => {
    // Initialize the VWO client using vwo-fme-node-sdk
    const initializeVWO = async () => {
      const vwoClient = await init({
        accountId: '123456', // Replace with your actual account ID
        sdkKey: '32-alpha-numeric-sdk-key', // Replace with your actual SDK key
      });

      // Set up user context
      const userContext = { id: 'unique_user_id' };

      // Check if a feature is enabled for the user
      const feature = await vwoClient.getFlag('feature_key', userContext);

      if (feature.isEnabled()) {
        setIsFeatureEnabled(true);

        // You can also fetch the feature variables
        const value = feature.getVariable('feature_variable', 'default_value');
        console.log('Feature variable:', value);
      } else {
        setIsFeatureEnabled(false).
      }

      // Track custom events
      vwoClient.trackEvent('custom_event_name', userContext);
    };

    initializeVWO();
  }, []);

  return (
    <div>
      <h1>Feature Status: {isFeatureEnabled ? 'Enabled' : 'Disabled'}</h1>
    </div>
  );
};

export default MyComponent;
```

<br />

## VWO Provider Config Parameter Definitions

To customize the SDK further, additional parameters can be passed to the `VWOProvider` component using `config` parameter. Here’s a table describing each option:

| Parameter                   | Type    | Description                                                                                                                                                                                                                                                                                                                |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accountId** _Required_    | Integer | Your VWO application's Account ID.                                                                                                                                                                                                                                                                                         |
| **sdkKey** _Required_       | String  | A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.                                                                                                                                                                                        |
| **pollInterval** _Optional_ | Number  | Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.wingify.com/v2/docs/polling) |
| **logger** _Optional_       | object  | An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-react-logging)                                                                                                                                                               |
| **storage** _Optional_      | object  | Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-react-storage)                                                                                                                                            |
| **integrations** _Optional_ | object  | A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-react-integrations)                                                                                                |

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the _vwoClient_ using _VWOProvider_, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwoClient_ has been initialized in your server, there needs to be some way to update your _vwoClient_ with the latest settings from VWO. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  pollInterval: 60000, // Time interval for fetching updates from VWO servers (in milliseconds)
};

const userContext: IVWOContextModel = { id: 'unique_user_id' };

const App = () => (
  <VWOProvider config={vwoConfig} userContext={ userContext }>
    <YourComponent />
  </VWOProvider>
);
```

### Logger

VWO by default logs all ERROR level messages to your console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

Please click [here](https://developers.wingify.com/v2/docs/fme-react-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _useGetFlag_ hook. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';

// implementation of class StorageConnector - check storage Service page

const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your VWO SDK Key
  accountId: '123456', // Your VWO Account ID
  storage: StorageConnector,
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

Please click [here](https://developers.wingify.com/v2/docs/fme-react-storage)  to learn more about storage implementation.

### Integrations

VWO FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  integrations: {
    callback (properties) {
      console.log('Integrations callback', properties); // list of keys
    }
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

Please click [here](https://developers.wingify.com/v2/docs/fme-react-integrations) to learn more about Integrations.
