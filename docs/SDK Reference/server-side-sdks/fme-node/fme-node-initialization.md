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
To create a Wingify Client instance, you need to initialize the Wingify FE Node SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```node Node.js
const { init } = require('wingify-fme-node-sdk');

const wingifyClient = await init({
  accountId: '123456', // Wingify Account ID
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
});
```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a Wingify Client Object`wingifyClient`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        _Required_
      </td>

      <td>
        Integer
      </td>

      <td>
        Your Wingify application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**
        _Required_
      </td>

      <td>
        String
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the Wingify application, under **_Default Project_**.
      </td>
    </tr>

    <tr>
      <td>
        **pollInterval**
        _Optional_
      </td>

      <td>
        Integer
      </td>

      <td>
        Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.wingify.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **logger**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-node-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-node-storage)
      </td>
    </tr>

    <tr>
      <td>
        **retryConfig**
      </td>

      <td>
        Object
      </td>

      <td>
        Customize retry behavior by passing a **retryConfig** in the init options. For more details, please check - [Retry Configuration](https://developers.wingify.com/v2/docs/fme-node-initialization#retry-configuration)
      </td>
    </tr>

    <tr>
      <td>
        **gatewayService**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        If using the [FE Gateway Service](https://developers.wingify.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **integrations**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-node-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **settings**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Pass the already fetched settings so the SDK can initialize instantly, without waiting to fetch settings from. Refer [this](doc:fme-node-initialization#initialization-with-explicit-settings).
      </td>
    </tr>

    <tr>
      <td>
        **proxyUrl**<br />_Optional_
      </td>

      <td>
        String
      </td>

      <td>
        ProxyUrl is an optional parameter to support for redirecting all network calls through a custom proxy URL. please check - [Proxy URL](https://developers.wingify.com/v2/docs/fme-node-initialization#proxyurl)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized in your server, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```node
// Init options with pollInterval
const wingifyClient = await init({
  accountId: '123456', // Wingify Account ID
  sdkKey: '32-alpha-numeric-sdk-key',
  pollInterval: 60000,
});
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over's logging behavior, you can use the logger parameter in the init configuration.

```node
// Init options with logger
const wingifyClient = await init({
  accountId: '123456', // Wingify Account ID
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    level: 'DEBUG',
  },
});
```

Please click [here](https://developers.wingify.com/v2/docs/fme-node-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _getFlag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```node
// Init options with storage
const wingifyClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  storage: StorageConnector,
});
```

Please click [here](https://developers.wingify.com/v2/docs/fme-node-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```node
// Init options with gateway_service
const wingifyClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  gatewayService: {
    url: 'https://custom.gateway.com',
  },
});
```

Please click [here](https://developers.wingify.com/v2/docs/gateway-service)  to learn more about the Wingify Gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives-specific properties and can forward them to any third-party tool of your choice.

```node
// Init options with integrations
const wingifyClient = await wingify.init({
    accountId: '123456', //replace with your Wingify account ID
    sdkKey: '32-alpha-numeric-sdk-key', //replace with the SDK key for your environment
    integrations: {
      callback (properties) {
        console.log('Integrations callback', properties); // list of keys
      }
    }
})
```

Please click [here](https://developers.wingify.com/v2/docs/fme-node-integrations) to learn more about Integrations,.

### Initialization with Explicit Settings

The SDK provides the ability to reduce initialization time by allowing users to explicitly pass in settings instead of fetching them automatically. This can be especially useful in environments where you need to optimize for faster setup or if you already have the necessary settings retrieved from a remote server.<br />Please refer to <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-explicit-sdk-fetch-settings#/">this</Anchor> document for more information on retrieving settings.

```javascript
const localSettings = {
    "accountId": '123456',
    "sdkKey": '32-alpha-numeric-sdk-key',
    "features": {
        // features json here
    },
    "campaigns": {
        // campaigns json here
    },
    "version": 1,
};

const wingifyClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  settings: localSettings // Pass the settings object here
});
```

### Retry Configuration

The SDK includes a built-in retry mechanism to improve reliability when network requests fail due to transient issues such as timeouts or temporary connectivity problems. You can fully control this behavior by providing a retryConfig object during SDK initialization.

```javascript
const wingifyClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',

  retryConfig: {
    shouldRetry: true, // Turn retries on/off (default: true)
    maxRetries: 3, // How many times to retry (default: 3)
    initialDelay: 2, // First retry after 2 seconds (default: 2)
    backoffMultiplier: 2, // Double the delay each time (delays: 2s, 4s, 8s)
  },
});
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism">here</Anchor> to learn more about Retry Mechanism

### ProxyUrl

Wingify FE SDKs provide support for redirecting all network calls through a custom proxy URL. This feature enables users to route all SDK network requests (including settings, tracking, etc.) through their own proxy server.

```javascript
const wingifyClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',

  proxyUrl: "https://proxy.yourdomain.com",
  // other configuration options
});
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-node-proxy-url">here</Anchor> to learn more about ProxyURL.
