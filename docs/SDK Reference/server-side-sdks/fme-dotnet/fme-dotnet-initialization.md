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
To create a Wingify Client instance, you need to initialize the Wingify FE Python SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```node C#
using WingifyFmeSdk;
using WingifyFmeSdk.Models.User;

var wingifyInitOptions = new WingifyInitOptions{
	SdkKey = "32-alpha-numeric-sdk-key", // Replace with your SDK key
	AccountId = 123456 // Replace with your account ID
};

var wingifyClient = Wingify.Init(wingifyInitOptions);

```

An object of `WingifyInitOptions` is created to store the SDK configuration details.

The `Init()` function is called with the `wingifyInitOptions` object. It initializes and returns a Wingify Client Object `wingifyClient`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        **AccountId**
        _Required_
      </td>

      <td>
        integer
      </td>

      <td>
        Your Wingify application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **SdkKey**<br />_Required_
      </td>

      <td>
        string
      </td>

      <td>
        A unique environment key is provided to you inside the Websites & Apps section in the Wingify application, under **_Default Project_**.
      </td>
    </tr>

    <tr>
      <td>
        **PollInterval**<br />_Optional_
      </td>

      <td>
        integer
      </td>

      <td>
        Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check - [Polling](https://developers.wingify.com/v2/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **Logger**<br />_Optional_
      </td>

      <td>
        ILogger
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-net-logging)
      </td>
    </tr>

    <tr>
      <td>
        **Storage**<br />_Optional_
      </td>

      <td>
        IStorage
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-net-storage)
      </td>
    </tr>

    <tr>
      <td>
        **GatewayService**<br />_Optional_
      </td>

      <td>
        Dictionary
      </td>

      <td>
        If using the [FE Gateway Service](https://developers.wingify.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **Integrations**<br />_Optional_
      </td>

      <td>
        Action
      </td>

      <td>
        Contains a callback function that receives campaign data which can be pushed to any external tool that you need to integrate with. [Integrations](https://developers.wingify.com/v2/docs/fme-net-integrations)
      </td>
    </tr>

    <tr>
      <td>
        **retryConfig**<br />_Optional_
      </td>

      <td>
        Dictionary
      </td>

      <td>
        Customize retry behavior by passing a **retryConfig** in the init options. For more details, please check - [Retry Configuration](https://developers.wingify.com/v2/docs/fme-dotnet-initialization#retry-configuration)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _wingifyClient_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _wingifyClient_ has been initialized in your server, there needs to be some way to update your _wingifyClient_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```csharp
var wingifyClient = Wingify.Init(new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    PollInterval = 60000 // Fetch updates every 60 seconds
});
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```csharp
var wingifyInitOptions = new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = new Logger
    {
        Level = "DEBUG"
    }
};
var wingifyClient = Wingify.Init(wingifyInitOptions1);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-net-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get\_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```csharp
var wingifyInitOptions = new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Storage = new StorageConnector()
};
```

Please click [here](https://developers.wingify.com/v2/docs/fme-net-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```csharp
var wingifyInitOptions = new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = logger,
    GatewayService = new Dictionary<string, object> { { "url", "https://custom.gateway.com" } },
};
```

Please click [here]()  to learn more about gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```csharp
// Integration callback implementation
public class IntegrationCallbackImpl : IntegrationCallback
{
    public void Execute(Dictionary<string, object> properties)
    {
        Console.WriteLine("Integration callback executed: " + JsonConvert.SerializeObject(properties));
    }
}

var wingifyClient = Wingify.Init(new WingifyInitOptions
{
    SdkKey = "your-sdk-key", // Replace with your SDK key
    AccountId = your-account-id, // Replace with your account ID
    Integrations = new IntegrationCallbackImpl() // Your integration callback implementation
});
```

Please click [here](https://developers.wingify.com/v2/docs/fme-net-integrations) to learn more about Integrations,.

### Retry Configuration

The SDK includes a built-in retry mechanism to improve reliability when network requests fail due to transient issues such as timeouts or temporary connectivity problems. You can fully control this behavior by providing a retryConfig object during SDK initialization.

```csharp
var retryConfig = new Dictionary<string, object>
{
    { "shouldRetry", true },   // Enable retries (default: true)
    { "maxRetries", 5 },       // Retry up to 5 times
    { "initialDelay", 3 },     // Wait 3 seconds before first retry
    { "backoffMultiplier", 2 } // Double the delay for each subsequent retry
};

var wingifyClient = Wingify.Init(new WingifyInitOptions
{
    SdkKey = "your-sdk-key", // Replace with your SDK key
    AccountId = your-account-id, // Replace with your account ID
    RetryConfig = retryConfig
});
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism">here</Anchor> to learn more about Retry Mechanism
