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
To create a Wingify Client instance, you need to initialize the Wingify FE Ruby SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```ruby
require 'wingify'

# Initialize Wingify client
wingify_client = Wingify.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key'
})
```

The `init()` function is called with the `sdk_key`and `account_id`. It initializes and returns a Wingify Client Object`wingify_client`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        **account\_id**
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
        **sdk\_key**<br />_Required_
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
        **poll\_interval**<br />_Optional_
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
        **logger**<br />_Optional_
      </td>

      <td>
        Hash
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logging](https://developers.wingify.com/v2/docs/fme-ruby-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**<br />_Optional_
      </td>

      <td>
        Hash
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-ruby-storage)
      </td>
    </tr>

    <tr>
      <td>
        **retry\_config** _Optional_
      </td>

      <td>
        Hash
      </td>

      <td>
        Customize retry behavior by passing a **retry\_config** in the init options. For more details, please check - [Retry Configuration](https://developers.wingify.com/v2/docs/fme-ruby-initialization#retry-configuration)
      </td>
    </tr>

    <tr>
      <td>
        **gateway\_service**<br />_Optional_
      </td>

      <td>
        Hash
      </td>

      <td>
        If using the [FE Gateway Service](https://developers.wingify.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **integrations**<br />_Optional_
      </td>

      <td>
        Hash
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-ruby-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **threading**
      </td>

      <td>
        Hash
      </td>

      <td>
        Toggle threading for better performance (enabled by default).
      </td>
    </tr>

    <tr>
      <td>
        **proxy\_url** _Optional_
      </td>

      <td>
        String
      </td>

      <td>
        Custom proxy URL for redirecting all SDK network requests through a proxy server. Please check - [Proxy URL](https://developers.wingify.com/v2/docs/fme-ruby-initialization#proxy-url)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingify\_client_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingify\_client_ has been initialized in your server, there needs to be some way to update your _wingify\_client_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```ruby
# Init options with poll_interval
wingify_client = Wingify.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key',
  poll_interval: 60000
});
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```ruby
# Init options with logger
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    logger: {
        level: 'DEBUG'
    }
})
```

Please click [here](https://developers.wingify.com/v2/docs/fme-ruby-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get\_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```ruby
# Init options with storage
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    storage: StorageConnector.new
})
```

Please click [here](https://developers.wingify.com/v2/docs/fme-ruby-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```ruby
# Init options with gateway_service
wingify_client = Wingify.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key',
  gateway_service: {
    url: 'http://custom.gateway.com',
  },
});
```

Please click [here](https://developers.wingify.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```ruby
def callback(data)
    puts "Integration data: #{data}"
end

# Init options with integrations
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    integrations: {
        callback: method(:callback)
    }
})
```

Please click [here](https://developers.wingify.com/v2/docs/fme-ruby-integrations) to learn more about Integrations,.

### Threading

The SDK leverages threading to efficiently manage concurrent operations. Threading is enabled by default, but can be disabled by configuring the threading parameter during initialization. This gives you control over the SDK's concurrency behavior based on your application's needs.

**Disable Threading**: When threading is disabled, all tracking calls will block the main execution thread until they complete. This means your application will wait for each Wingify operation before continuing.

```ruby
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    threading: {
        enabled: false
    },
})
```

**Enable Threading (Default)**: When enabled, all tracking calls are processed asynchronously in the background. This prevents these network calls from blocking your application's main execution flow. The SDK uses a thread pool to manage these concurrent operations efficiently. The default pool size of 5 threads is suitable for most applications, but you can adjust it based on your needs:

```ruby
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    threading: {
        enabled: true,
        max_pool_size: 10
    },
})
```

### Retry Configuration

The SDK includes a built-in retry mechanism to improve reliability when network requests fail due to transient issues such as timeouts or temporary connectivity problems. You can fully control this behavior by providing a retryConfig object during SDK initialization.

```ruby
wingify_client = Wingify.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    retry_config : {
      should_retry: true,
      max_retries: 3,
      initial_delay: 2,
      backoff_multiplier: 2
    }
})
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism">here</Anchor> to learn more about Retry Mechanism

### Proxy URL

The `proxy_url` parameter allows you to redirect all SDK network calls through a custom proxy server. This feature enables you to route all SDK network requests (settings, tracking, etc.) through your own proxy server, providing better control over network traffic and security.

**How to Use Proxy URL**
The proxy URL can be configured by passing the `proxy_url` parameter in the init configuration.

```ruby
wingify_client = Wingify.init({
    sdk_key: '32-alpha-numeric-sdk-key',
    account_id: '123456',
    proxy_url: 'https://custom.proxy.com'
})
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-ruby-proxy-url">here</Anchor> to learn more about Proxy URL.
