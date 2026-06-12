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
      slug: fme-java-context
      title: User Context
---
To create a Wingify Client instance, you need to initialize the Wingify FE Java SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```java Java
import com.wingify.Wingify;
import com.wingify.models.user.WingifyInitOptions;

// Initialize Wingify SDK
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();

// Set SDK Key and Account ID
wingifyInitOptions.setSdkKey("sdk-key"); //SDK Key
wingifyInitOptions.setAccountId(123); //account ID

// create Wingify instance with the wingifyInitOptions
Wingify wingifyClient = Wingify.init(wingifyInitOptions);
```

An object of `wingifyInitOptions` is created to store the SDK configuration details.

The `init()` function is called with the `wingifyInitOptions` object. It initializes and returns a Wingify Client Object `wingifyClient`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Usage
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
        `wingifyInitOptions.setAccountId(123);`
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
        **sdkKey**<br />_Required_
      </td>

      <td>
        `wingifyInitOptions.setSdkKey("sdk-key");`
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
        **pollInterval**<br />_Optional_
      </td>

      <td>
        `wingifyInitOptions.setPollInterval(60);`
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
        `wingifyInitOptions.setLogger(logger);`
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check -[Logger](https://developers.wingify.com/v2/docs/fme-java-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**<br />_Optional_
      </td>

      <td>
        `wingifyInitOptions.setStorage(storage)`
      </td>

      <td>
        Object
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-java-storage)
      </td>
    </tr>

    <tr>
      <td>
        **proxyUrl**<br />_Optional_
      </td>

      <td>
        `wingifyInitOptions.setProxyUrl("[http://custom.proxy.com](http://custom.proxy.com)");`
      </td>

      <td>
        String
      </td>

      <td>
        ProxyUrl is an optional parameter to support for redirecting all network calls through a custom proxy URL. please check - [Proxy URL](https://developers.wingify.com/v2/docs/fme-java-initialization#proxyurl)
      </td>
    </tr>

    <tr>
      <td>
        **gatewayService**<br />_Optional_
      </td>

      <td>
        ```
        wingifyInitOptions.setGatewayService(new HashMap<String, Object>() {
                    {
                        put("url", "<https://your.host.com:port")>;
                    }
                });
        ```
      </td>

      <td>
        Object
      </td>

      <td>
        If using the [FE Gateway Service](https://developers.wingify.com/v2/docs/gateway-service) , this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **integrations**<br />_Optional_
      </td>

      <td>
        `wingifyInitOptions.setIntegrations(integrations);`
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v2/docs/fme-java-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **retryConfig**<br />_Optional_
      </td>

      <td>
        `wingifyInitOptions.setRetryConfig(retryConfig);`
      </td>

      <td>
        Object
      </td>

      <td>
        Customize retry behavior by passing a **retryConfig** in the init options. For more details, please check - [Retry Configuration](https://developers.wingify.com/v2/docs/fme-java-initialization#retry-configuration)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized in your server, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setPollInterval(60000); // Set the poll interval to 60 seconds

Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over's logging behavior, you can use the logger parameter in the init configuration.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setAccountId(123456);
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> logger = new HashMap<>();
logger.put("level", "DEBUG");
wingifyInitOptions.setLogger(logger);
Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-java-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _getFlag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setAccountId(123456);
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
wingifyInitOptions.setStorage(storageObject)

Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click [storage](https://developers.wingify.com/v2/docs/fme-java-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions(); 
wingifyInitOptions.setAccountId(123456); 
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key"); 

Map < String , Object > gatewayService = new HashMap <> (); 
gatewayService.put("url", "http://custom.gateway.com"); 
wingifyInitOptions.setGatewayService(gatewayService); 
Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click [GatewayService](https://developers.wingify.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives-specific properties and can forward them to any third-party tool of your choice.

```java
IntegrationCallback integrations = new IntegrationCallback() { 
    @Override 
    public void execute(Map < String , Object > properties) { 
        // your function definition 
    } 
}; 

WingifyInitOptions wingifyInitOptions = new WingifyInitOptions(); 
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key"); 
wingifyInitOptions.setAccountId(12345); 
wingifyInitOptions.setIntegrations(integrations); 

Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-java-integrations) to learn more about Integrations,.

### ProxyUrl

Wingify FE SDKs provide support for redirecting all network calls through a custom proxy URL. This feature enables users to route all SDK network requests (including settings, tracking, etc.) through their own proxy server.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
wingifyInitOptions.setAccountId(12345);
wingifyInitOptions.setProxyUrl("http://custom.proxy.com");

Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-java-proxy-url">here</Anchor> to learn more about Proxy URL,.

### Retry Configuration

The SDK includes a built-in retry mechanism to improve reliability when network requests fail due to transient issues such as timeouts or temporary connectivity problems. You can fully control this behavior by providing a retryConfig object during SDK initialization.

```java
WingifyInitOptions wingifyInitOptions = new WingifyInitOptions();
wingifyInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
wingifyInitOptions.setAccountId(12345);

// Configure Network Retry
RetryConfig retryConfig = new RetryConfig();
retryConfig.setShouldRetry(true); // Enable/Disable retries
retryConfig.setMaxRetries(3);     // Max number of retries
retryConfig.setInitialDelay(2);   // Initial delay in seconds (default is 2)
retryConfig.setBackoffMultiplier(2); // Backoff multiplier (default is 2)
wingifyInitOptions.setRetryConfig(retryConfig);

Wingify wingifyInstance = Wingify.init(wingifyInitOptions);
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism">here</Anchor> to learn more about Retry Mechanism
