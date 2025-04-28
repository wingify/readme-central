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
To create a VWO Client instance, you need to initialize the VWO FME Python SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```node C#
using VWOFmeSdk;

var vwoInitOptions = new VWOInitOptions{
	SdkKey = "32-alpha-numeric-sdk-key", // Replace with your SDK key
	AccountId = 123456 // Replace with your account ID
};

var vwoClient = VWO.Init(vwoInitOptions);

```

An object of `VWOInitOptions` is created to store the SDK configuration details.

The `Init()` function is called with the `vwoInitOptions` object. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature  
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**AccountId**  \n_Required_",
    "0-1": "integer",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**SdkKey**  \n_Required_",
    "1-1": "string",
    "1-2": "A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.",
    "2-0": "**PollInterval**  \n_Optional_",
    "2-1": "integer",
    "2-2": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check - [Polling](https://developers.vwo.com/v2/docs/polling)",
    "3-0": "**Logger**  \n_Optional_",
    "3-1": "ILogger",
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-net-logging)",
    "4-0": "**Storage**  \n_Optional_",
    "4-1": "IStorage",
    "4-2": "Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-net-storage) ",
    "5-0": "**GatewayService**  \n_Optional_",
    "5-1": "Dictionary",
    "5-2": "If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers. ",
    "6-0": "**Integrations**  \n_Optional_",
    "6-1": "Action",
    "6-2": "Contains a callback function that receives campaign data which can be pushed to any external tool that you need to integrate with. [Integrations](https://developers.vwo.com/v2/docs/fme-net-integrations)"
  },
  "cols": 3,
  "rows": 7,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


### Poll Interval (Keeping VWO client up-to-date)

When you initialize the _vwoClient_ on your server, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwoClient_ has been initialized in your server, there needs to be some way to update your _vwoClient_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```csharp
var vwoClient = VWO.Init(new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    PollInterval = 60000 // Fetch updates every 60 seconds
});
```

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```csharp
var vwoInitOptions1 = new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = new Logger
    {
        Level = "DEBUG"
    }
};
var vwoClient1 = VWO.Init(vwoInitOptions1);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-net-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```csharp
var vwoInitOptions = new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Storage = new StorageConnector()
};
```

Please click [here](https://developers.vwo.com/v2/docs/fme-net-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway_service parameter during initialization.

```csharp
var vwoInitOptions = new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = logger,
    GatewayService = new Dictionary<string, object> { { "url", "https://custom.gateway.com" } },
};
```

Please click [here](<>)  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```csharp
// Integration callback implementation
public class IntegrationCallbackImpl : IntegrationCallback
{
    public void Execute(Dictionary<string, object> properties)
    {
        Console.WriteLine("Integration callback executed: " + JsonConvert.SerializeObject(properties));
    }
}

var vwoClient = VWO.Init(new VWOInitOptions
{
    SdkKey = "your-sdk-key", // Replace with your SDK key
    AccountId = your-account-id, // Replace with your account ID
    Integrations = new IntegrationCallbackImpl() // Your integration callback implementation
});
```

Please click [here](https://developers.vwo.com/v2/docs/fme-net-integrations) to learn more about Integrations,.