---
title: Initialization
deprecated: false
hidden: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-node-context
      title: User Context
      type: basic
---
To create a Wingify Client instance, you need to initialize the Wingify FE Go SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```go Go
package main

import (
    "fmt"
    "log"

    wingify "github.com/wingify/wingify-fme-go-sdk"
)

func main() {
    // Initialize Wingify SDK with your account details
    options := map[string]interface{}{
        "sdkKey":    "32-alpha-numeric-sdk-key", // Replace with your SDK key
        "accountId": "123456",                   // Replace with your account ID
    }

    // Initialize Wingify wingifyClient
    wingifyClient, err := wingify.Init(options)
    if err != nil {
        log.Fatalf("Failed to initialize Wingify client: %v", err)
    }
}
```

The `Init` function is called with the `sdkKey`and `accountId`. It initializes and returns a Wingify Client Object `wingifyClient`.<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        map\[string]interface{}
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-go-logging)
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
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-go-storage)
      </td>
    </tr>

    <tr>
      <td>
        **gatewayService**
        _Optional_
      </td>

      <td>
        map\[string]interface{}
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
        map\[string]interface{}
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-go-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **retryConfig**
        _Optional_
      </td>

      <td>
        map\[string]interface{}
      </td>

      <td>
        Configuration for network request retry behavior and exponential backoff strategy. For more details, please check - [Retry Config](https://developers.wingify.com/v2/docs/fme-go-initialization#/retry-config)
      </td>
    </tr>

    <tr>
      <td>
        **proxyUrl**
        _Optional_
      </td>

      <td>
        String
      </td>

      <td>
        Custom proxy URL for redirecting all SDK network requests through a proxy server. Please check - [ProxyUrl](https://developers.wingify.com/v2/docs/fme-go-initialization#proxyurl)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized in your server, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```go
options := map[string]interface{}{
    "sdkKey":       "32-alpha-numeric-sdk-key",
    "accountId":    "123456",
    "pollInterval": 60000, // Set the poll interval to 60 seconds
}

wingifyClient, err := wingify.Init(options)
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "logger": map[string]interface{}{
        "level": "DEBUG",
    },
}

wingifyClient, err := wingify.Init(options)
```

Please click [here](https://developers.wingify.com/v2/docs/fme-go-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _getFlag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```go
// Use in initialization
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "storage":   customStorage,
}

wingifyClient, err := wingify.Init(options)
```

Please click [here](https://developers.wingify.com/v2/docs/fme-go-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "gatewayService": map[string]interface{}{
        "url": "http://custom.gateway.com",
    },
}

wingifyClient, err := wingify.Init(options)
```

Please click [here](https://developers.wingify.com/v2/docs/gateway-service)  to learn more about the Wingify Gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```go
options := map[string]interface{}{
    "sdkKey":       "32-alpha-numeric-sdk-key",
    "accountId":    "123456",
    "integrations": map[string]interface{}{
        "Callback": func(properties map[string]interface{}) {
            // implement your custom logic here
            fmt.Printf("Integration callback called with properties: %+v\n", properties)
        },
    },
}

wingifyClient, err := wingify.Init(options)
```

Please click [here](https://developers.wingify.com/v2/docs/fme-go-integrations) to learn more about Integrations,.

### Initialization with Explicit Settings

The SDK provides the ability to reduce initialization time by allowing users to explicitly pass in settings instead of fetching them automatically. This can be especially useful in environments where you need to optimize for faster setup or if you already have the necessary settings retrieved from a remote server.<br />Please refer to <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-explicit-sdk-fetch-settings#/">this</Anchor> document for more information on retrieving settings.

```go
var localSettings = '{
    "accountId": 123456,
    "sdkKey": '32-alpha-numeric-sdk-key',
    "features": {
        // features json here
    },
    "campaigns": {
        // campaigns json here
    },
    "version": 1,
}'

options := map[string]interface{}{
    "sdkKey":       "32-alpha-numeric-sdk-key",
    "accountId":    "123456",
    "settings": localSettings,
}

wingifyClient, err := wingify.Init(options)
```

### Retry Config

The `retryConfig` parameter allows you to customize the retry behavior for network requests. This is particularly useful for applications that need to handle network failures gracefully with exponential backoff strategies.

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "retryConfig": map[string]interface{}{
        "shouldRetry":       true,  // Enable retries
        "maxRetries":        5,     // Retry up to 5 times
        "initialDelay":      3,     // Wait 3 seconds before first retry
        "backoffMultiplier": 2,     // Double the delay for each subsequent retry
    },
}

wingifyClient, err := wingify.Init(options)
```

Please click [here](https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism) to learn more about retry configuration.

### ProxyUrl

The `proxyUrl` parameter allows you to redirect all SDK network calls through a custom proxy server. This feature enables you to route all SDK network requests (settings, tracking, etc.) through your own proxy server, providing better control over network traffic and security.

**How to Use Proxy URL**
The proxy URL can be configured by passing the `proxyUrl` parameter in the init configuration.

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key", // Replace with your SDK key
    "accountId": "123456",                   // Replace with your account ID
    "proxyUrl": "https://custom.proxy.com",  // Replace with your custom proxy url
}

// Initialize Wingify instance
wingifyClient, err := wingify.Init(options)
```

Please <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-go-proxy-url">click</Anchor> here to learn more about Proxy URL.

<br />
