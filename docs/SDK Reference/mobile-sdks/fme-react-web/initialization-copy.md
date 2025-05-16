---
title: Initialization (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
To integrate VWO Feature Management and Experimentation into your React application, you must wrap your application code with *VWOProvider*. This provider initializes the VWO FME React SDK and returns a React component that serves as the core interface for feature management, A/B testing, and personalization. By using this client instance, you can seamlessly conduct experiments and manage features within your application.

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
        **sdkKey**\
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
        **pollInterval**\
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
        **logger**\
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
        **storage**\
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
        **integrations**\
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

By default, the SDK operates in stateless mode, evaluating flags on each *useGetFlag* hook. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

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