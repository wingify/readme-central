---
title: Initialization (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
To integrate VWO Feature Management and Experimentation (FME) into your React application, you must wrap your application code with the `VWOProvider` component.

The `VWOProvider` is a React context provider that initializes the VWO Feature Management and Experimentation (FME) SDK and makes the client instance and user context available to child components through React Context.

It is essential for enabling feature flag evaluation, A/B testing, and user tracking using hooks like `useVWOClient` or `useGetFlag`.

## Parameter Types (`IVWOProvider`)

<br />

| Prop                  | Type               | Required | Description                                                                                |
| :-------------------- | :----------------- | :------- | :----------------------------------------------------------------------------------------- |
| **client**            | `IVWOClient`       | No       | Pre-initialized VWO client. If provided, it overrides the `config`.                        |
| **config**            | `IVWOOptions`      | No       | SDK configuration for initializing the VWO client. Required if the `client` is not passed. |
| **userContext**       | `IVWOContextModel` | No       | Initial user context to evaluate flags and experiments.                                    |
| **children**          | `ReactNode`        | Yes      | Child components that require access to the VWO context.                                   |
| **fallbackComponent** | `ReactNode`        | No       | Component shown while the client is initializing.                                          |

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
  customVariables: { age: 25, location: 'US' }, // Optional
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', // Optional
  ipAddress: '1.1.1.1', // Optional
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
  customVariables: { age: 25, location: 'US' },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  ipAddress: '1.1.1.1',
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

## VWO Provider Config Parameter Definitions

To customize the SDK further, additional parameters can be passed to the `VWOProvider` component using `config` parameter. Here’s a table describing each option:

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **accountId**
        *Required*
      </td>

      <td>
        Integer
      </td>

      <td>
        Your VWO application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under ***Default Project***.
      </td>
    </tr>

    <tr>
      <td>
        **pollInterval**
        *Optional*
      </td>

      <td>
        Number
      </td>

      <td>
        Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **logger**
        *Optional*
      </td>

      <td>
        object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**
        *Optional*
      </td>

      <td>
        object
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-react-storage-service)
      </td>
    </tr>

    <tr>
      <td>
        **integrations**
        *Optional*
      </td>

      <td>
        object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-react-integrations)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the *vwoClient* using *VWOProvider*, it pulls the latest configurations you've done in the VWO application.\
If/when you make any changes to the feature flags or rules within VWO after the *vwoClient* has been initialized in your server, there needs to be some way to update your *vwoClient* with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

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

VWO by default logs all ERROR level messages to your console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

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

Please click [here](https://developers.vwo.com/v2/docs/fme-react-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each *useGetFlag* hook. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

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

Please click [here](https://developers.vwo.com/v2/docs/fme-react-storage)  to learn more about storage implementation.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

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

Please click [here](https://developers.vwo.com/v2/docs/fme-react-integrations) to learn more about Integrations.