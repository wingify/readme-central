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
To integrate Wingify Feature Experimentation (FE) into your React application, you must wrap your application code with the `WingifyProvider` component.

The `WingifyProvider` is a React context provider that initializes the Wingify Feature Experimentation (FE) SDK and makes the client instance and user context available to child components through React Context.

It is essential for enabling feature flag evaluation, A/B testing, and user tracking using hooks like `useWingifyClient` or `useGetFlag`.

<br />

## Usage

```typescript
import React from 'react';
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your Wingify SDK Key
  accountId: '123456', // Your Wingify Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

const userContext: IWingifyContextModel = {
  id: 'unique_user_id', // Required: Unique identifier for the user
  customVariables: { planId: 2, plan: 'premium' }, // Optional
};

// Optional: Provide a fallback UI component that will be displayed while WingifyProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing Wingify...</div>;

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={ userContext } fallbackComponent={fallbackComponent}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

<br />

## Parameter Types (`IWingifyProvider`)

| Type               | Prop                  | Required | Description                                                                                |
| :----------------- | :-------------------- | :------- | :----------------------------------------------------------------------------------------- |
| `IWingifyClient`       | **client**            | No       | Pre-initialized Wingify client. If provided, it overrides the `config`.                        |
| `IVWOOptions`      | **config**            | No       | SDK configuration for initializing the Wingify client. Required if the `client` is not passed. |
| `IVWOContextModel` | **userContext**       | No       | Initial user context to evaluate flags and experiments.                                    |
| `ReactNode`        | **children**          | Yes      | Child components that require access to the Wingify context.                                   |
| `ReactNode`        | **fallbackComponent** | No       | Component shown while the client is initializing.                                          |

> 📘 Note
>
> ⚠️ Either `client` or `config` must be provided. If both are provided, client takes precedence and a warning is logged.

<br />

## Usage (Using Pre-initialized Wingify Client)

If you have already initialized a Wingify client in your application, you can pass it directly to theProvider:

```typescript
import React, { useEffect, useState } from 'react';
import { WingifyProvider, IWingifyOptions, IWingifyClient, IWingifyContextModel, init } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Replace with your real SDK key
  accountId: '123456', // Replace with your real account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IWingifyContextModel = {
  id: 'unique_user_id',
  customVariables: { planId: 2, plan: 'premium' }
};

const fallbackComponent = <div>Initializing Wingify...</div>;

const App = () => {
  const [wingifyClient, setWingifyClient] = useState<IWingifyClient | null>(null);

  useEffect(() => {
    const initializeWingify = async () => {
      const client = await init(wingifyConfig);
      setWingifyClient(client);
    };

    initializeWingify();
  }, []);

  if (!wingifyClient) return fallbackComponent;

  return (
    <WingifyProvider client={wingifyClient} userContext={ userContext }>
      <YourComponent />
    </WingifyProvider>
  );
};
```

<br />

## Basic Implementation without User Context

If you don't have user details available while initialising the `VWOProvide`r, you can pass it later in the `useGetFlag` hook.

```typescript
import React from 'react';
import { WingifyProvider, IWingifyOptions } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your Wingify SDK Key
  accountId: '123456', // Your Wingify Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

// Optional: Provide a fallback UI component that will be displayed while WingifyProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing Wingify...</div>;

const App = () => (
  <WingifyProvider config={wingifyConfig} fallbackComponent={fallbackComponent}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

<br />

## Using the React SDK Without the `WingifyProvider`

In some cases, you might prefer not to wrap your application with the `WingifyProvider` component. For example, you may want finer control over when and how the SDK is initialized, or you might need to integrate it into an existing setup where using a provider is not feasible.

Wingify FE React SDK allows you to bypass the provider and directly work with its methods. This gives you the flexibility to manually initialize the SDK and manage feature flag evaluations, user targeting, and other SDK operations programmatically.

You can implement this approach using the example below:

```javascript JavaScript
import React, { useEffect, useState } from 'react';
import { init } from 'wingify-fme-react-sdk';

const MyComponent = () => {
  const [isFeatureEnabled, setIsFeatureEnabled] = useState<boolean>(false);

  useEffect(() => {
    // Initialize the Wingify client
    const initializeWingify = async () => {
      const wingifyClient = await init({
        accountId: '123456', // Replace with your actual account ID
        sdkKey: '32-alpha-numeric-sdk-key', // Replace with your actual SDK key
      });

      // Set up user context
      const userContext = { id: 'unique_user_id' };

      // Check if a feature is enabled for the user
      const feature = await wingifyClient.getFlag('feature_key', userContext);

      if (feature.isEnabled()) {
        setIsFeatureEnabled(true);

        // You can also fetch the feature variables
        const value = feature.getVariable('feature_variable', 'default_value');
        console.log('Feature variable:', value);
      } else {
        setIsFeatureEnabled(false);
      }

      // Track custom events
      wingifyClient.trackEvent('custom_event_name', userContext);
    };

    initializeWingify();
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

## Wingify Provider Config Parameter Definitions

To customize the SDK further, additional parameters can be passed to the `WingifyProvider` component using `config` parameter. Here’s a table describing each option:

| Parameter                   | Type    | Description                                                                                                                                                                                                                                                                                                                |
| :-------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **accountId** _Required_    | Integer | Your Wingify application's Account ID.                                                                                                                                                                                                                                                                                         |
| **sdkKey** _Required_       | String  | A unique environment key is provided to you inside the Websites & Apps section in the Wingify application, under **_Default Project_**.                                                                                                                                                                                        |
| **pollInterval** _Optional_ | Number  | Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.wingify.com/v2/docs/polling) |
| **logger** _Optional_       | object  | An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-react-logging)                                                                                                                                                               |
| **storage** _Optional_      | object  | Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-react-storage)                                                                                                                                            |
| **integrations** _Optional_ | object  | A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-react-integrations)                                                                                                |

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ using _WingifyProvider_, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized in your server, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```typescript
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your Wingify SDK Key
  accountId: '123456', // Your Wingify Account ID
  pollInterval: 60000, // Time interval for fetching updates from Wingify servers (in milliseconds)
};

const userContext: IWingifyContextModel = { id: 'unique_user_id' };

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={ userContext }>
    <YourComponent />
  </WingifyProvider>
);
```

### Logger

Wingify by default logs all ERROR level messages to your console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```typescript
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // Wingify Account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IWingifyContextModel = {id: 'unique_user_id'};

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={userContext}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

Please click [here](https://developers.wingify.com/v2/docs/fme-react-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _useGetFlag_ hook. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```typescript
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

// implementation of class StorageConnector - check storage Service page

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your Wingify SDK Key
  accountId: '123456', // Your Wingify Account ID
  storage: StorageConnector,
};

const userContext: IWingifyContextModel = {id: 'unique_user_id'};

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={userContext}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

Please click [here](https://developers.wingify.com/v2/docs/fme-react-storage)  to learn more about storage implementation.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```typescript
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // Wingify Account ID
  integrations: {
    callback (properties) {
      console.log('Integrations callback', properties); // list of keys
    }
  }
};

const userContext: IWingifyContextModel = {id: 'unique_user_id'};

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={userContext}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

Please click [here](https://developers.wingify.com/v2/docs/fme-react-integrations) to learn more about Integrations.
