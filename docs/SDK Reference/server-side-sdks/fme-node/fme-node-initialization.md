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
  pages:
    - type: basic
      slug: fme-node-context
      title: User Context
---
To create a VWO Client instance, you need to initialize the VWO FME Node SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```node Node.js
const { init } = require('vwo-fme-node-sdk');

const vwoClient = await init({
  accountId: '123456', // VWO Account ID
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key,
});
```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

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
        Integer
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
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-node-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-node-storage) 
      </td>
    </tr>

    <tr>
      <td>
        **gatewayService**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers. 
      </td>
    </tr>

    <tr>
      <td>
        **integrations**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-node-integrations)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the *vwoClient* on your server, it pulls the latest configurations you've done in the VWO application.\
If/when you make any changes to the feature flags or rules within VWO after the *vwoClient* has been initialized in your server, there needs to be some way to update your *vwoClient* with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```node
// Init options with poll_interval
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  pollInterval: 60000,
});
```

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```node
// Init options with logger
const vwoClient1 = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    level: 'DEBUG',
  },
});
```

Please click [here](https://developers.vwo.com/v2/docs/fme-node-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each *getFlag* call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```node
// Init options with storage
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  storage: StorageConnector,
});
```

Please click [here](https://developers.vwo.com/v2/docs/fme-node-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```node
// Init options with gateway_service
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  gatewayService: {
    url: 'https://custom.gateway.com',
  },
});
```

Please click [here](https://developers.vwo.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```node
// Init options with integrations
const vwoClient = await vwo.init({
    sdkKey: 'bfce67fb74a7a59264045347f650dd2c', //replace with the SDK key for your environment
    accountId: '917741', //replace with your VWO account ID
    integrations: {
      callback (properties) {
        console.log('Integrations callback', properties); // list of keys
      }
    }
})
```

Please click [here](https://developers.vwo.com/v2/docs/fme-node-integrations) to learn more about Integrations,.
