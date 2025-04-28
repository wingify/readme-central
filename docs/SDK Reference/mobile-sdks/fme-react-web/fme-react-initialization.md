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
To integrate VWO Feature Management and Experimentation into your React application, you must wrap your application code with _VWOProvider_. This provider initializes the VWO FME React SDK and returns a React component that serves as the core interface for feature management, A/B testing, and personalization. By using this client instance, you can seamlessly conduct experiments and manage features within your application.

## Usage

```javascript
import { VWOProvider } from 'vwo-fme-react-sdk';

const vwoConfig = {
  sdkKey: '32-alpha-numeric-sdk-key',  // Your VWO SDK Key
  accountId: '123456',  // Your VWO Account ID
};

const userContext = {
  id: 'unique_user_id',  // Required: Unique identifier for the user
  customVariables: {     // Optional
    age: 25,
    location: 'US',
  }
};

// Here passing userContext is optional. You can also pass this in useGetFlag hook.
const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

An object named `options` is created to store the SDK configuration details.

The `VWOProvider` component is used to initialize the VWO client using the provided configuration. It wraps your React application and provides the VWO client instance to all components inside it. The client instance allows you to interact with the VWO platform, including running experiments, tracking events, and enabling/disabling feature flags.

## Usage (Passing VWO Client Directly)

```javascript
import { init,  VWOProvider } from 'vwo-fme-react-sdk';

// Initialize VWO client
const vwoClient = init({
  sdkKey: 'your-sdk-key',
  accountId: 'your-account-id'
});

const userContext = {
  id: 'unique_user_id',  // Required: Unique identifier for the user
  customVariables: {     // Optional
    age: 25,
    location: 'US',
  }
};

const App = () => (
  <VWOProvider client={vwoClient} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

## VWO Provider Config Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accountId**  \n_Required_",
    "0-1": "Integer",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdkKey**  \n_Required_",
    "1-1": "String",
    "1-2": "A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.",
    "2-0": "**pollInterval**  \n_Optional_",
    "2-1": "Number",
    "2-2": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) ",
    "3-0": "**logger**  \n_Optional_",
    "3-1": "object",
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-react-logging)",
    "4-0": "**storage**  \n_Optional_",
    "4-1": "object",
    "4-2": "Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-react-storage-service) ",
    "5-0": "**integrations**  \n_Optional_",
    "5-1": "object",
    "5-2": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-react-integrations) "
  },
  "cols": 3,
  "rows": 6,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


### Poll Interval (Keeping VWO client up-to-date)

When you initialize the _vwoClient_ using _VWOProvider_, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwoClient_ has been initialized in your server, there needs to be some way to update your _vwoClient_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```javascript
// Init options with pollInterval
const options = {
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  pollInterval: 60000,
};
```

### Logger

VWO by default logs all ERROR level messages to your console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```javascript
// Init options with logger
const options = {
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    level: 'DEBUG',
  }
};
```

Please click [here](https://developers.vwo.com/v2/docs/fme-react-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _useGetFlag_ hook. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```javascript
// Init options with storage
const options = {
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  storage: StorageConnector
};
```

Please click [here](https://developers.vwo.com/v2/docs/fme-react-storage)  to learn more about storage implementation.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```javascript
// Callback function to pass in init options
const options = {
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  integrations: {
    callback (properties) {
      console.log('Integrations callback', properties); // list of keys
    }
  }
};
```

Please click [here](https://developers.vwo.com/v2/docs/fme-react-integrations) to learn more about Integrations,.