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
To create a VWO Client instance, you need to initialize the VWO FME Ruby SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```ruby
require 'vwo'

# Initialize VWO client
vwo_client = VWO.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key'
});
```

The `init()` function is called with the `sdk_key`and `account_id`. It initializes and returns a VWO Client Object`vwo_client`, which can be used to perform feature  
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**account_id**  \n_Required_",
    "0-1": "Integer",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdk_key**  \n_Required_",
    "1-1": "String",
    "1-2": "A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.",
    "2-0": "**poll_interval**  \n_Optional_",
    "2-1": "Integer",
    "2-2": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) ",
    "3-0": "**logger**  \n_Optional_",
    "3-1": "Hash",
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logging](https://developers.vwo.com/v2/docs/fme-ruby-logging)",
    "4-0": "**storage**  \n_Optional_",
    "4-1": "Hash",
    "4-2": "Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-ruby-storage) ",
    "5-0": "**gateway_service**  \n_Optional_",
    "5-1": "Hash",
    "5-2": "If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers. ",
    "6-0": "**integrations**  \n_Optional_",
    "6-1": "Hash",
    "6-2": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-ruby-integrations)",
    "7-0": "**threading**",
    "7-1": "Hash",
    "7-2": "Toggle threading for better performance (enabled by default)."
  },
  "cols": 3,
  "rows": 8,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


### Poll Interval (Keeping VWO client up-to-date)

When you initialize the _vwo_client_ on your server, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwo_client_ has been initialized in your server, there needs to be some way to update your _vwo_client_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```ruby
# Init options with poll_interval
vwo_client = VWO.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key',
  poll_interval: 60000
});
```

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```ruby
# Init options with logger
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    logger: {
        level: 'DEBUG'
    }
})
```

Please click [here](https://developers.vwo.com/v2/docs/fme-ruby-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```ruby
# Init options with storage
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    storage: StorageConnector.new
})
```

Please click [here](https://developers.vwo.com/v2/docs/fme-ruby-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway_service parameter during initialization.

```ruby
# Init options with gateway_service
vwo_client = VWO.init({
  account_id: '123456',
  sdk_key: '32-alpha-numeric-sdk-key',
  gateway_service: {
    url: 'http://custom.gateway.com',
  },
});
```

Please click [here](https://developers.vwo.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```ruby
def callback(data)
    puts "Integration data: #{data}"
end

# Init options with integrations
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    integrations: {
        callback: method(:callback)
    }
})
```

Please click [here](https://developers.vwo.com/v2/docs/fme-ruby-integrations) to learn more about Integrations,.

### Threading

The SDK leverages threading to efficiently manage concurrent operations. Threading is enabled by default, but can be disabled by configuring the threading parameter during initialization. This gives you control over the SDK's concurrency behavior based on your application's needs.

**Disable Threading**: When threading is disabled, all tracking calls will block the main execution thread until they complete. This means your application will wait for each VWO operation before continuing.

```ruby
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    threading: {
        enabled: false
    },
})
```

**Enable Threading (Default)**: When enabled, all tracking calls are processed asynchronously in the background. This prevents these network calls from blocking your application's main execution flow. The SDK uses a thread pool to manage these concurrent operations efficiently. The default pool size of 5 threads is suitable for most applications, but you can adjust it based on your needs:

```ruby
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    threading: {
        enabled: true,
        max_pool_size: 10
    },
})
```