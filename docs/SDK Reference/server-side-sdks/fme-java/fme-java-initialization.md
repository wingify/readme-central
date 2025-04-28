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
To create a VWO Client instance, you need to initialize the VWO FME Java SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```java Java
import com.vwo.VWO;
import com.vwo.models.user.VWOInitOptions;

// Initialize VWO SDK
VWOInitOptions vwoInitOptions = new VWOInitOptions();

// Set SDK Key and Account ID
vwoInitOptions.setSdkKey("sdk-key"); //SDK Key
vwoInitOptions.setAccountId(123); //account ID

// create VWO instance with the vwoInitOptions
VWO vwoClient = VWO.init(vwoInitOptions);
```

An object of `VWOInitOptions` is created to store the SDK configuration details.

The `init()` function is called with the `vwoInitOptions` object. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature  
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Usage",
    "h-2": "Type",
    "h-3": "Description",
    "0-0": "**accountId**  \n_Required_",
    "0-1": "`vwoInitOptions.setAccountId(123);`",
    "0-2": "Integer",
    "0-3": "Your VWO application's Account ID.",
    "1-0": "**sdkKey**  \n_Required_",
    "1-1": "`vwoInitOptions.setSdkKey(\"sdk-key\");`",
    "1-2": "String",
    "1-3": "A unique environment key is provided to you inside the Websites & Apps section in the VWO application, under _**Default Project**_.",
    "2-0": "**pollInterval**  \n_Optional_",
    "2-1": "`vwoInitOptions.setPollInterval(60);`",
    "2-2": "Integer",
    "2-3": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling) ",
    "3-0": "**logger**  \n_Optional_",
    "3-1": "`vwoInitOptions.setLogger(logger);`",
    "3-2": "Object",
    "3-3": "An optional logger object that defines the logging behavior. For more details, please check -[Logger](https://developers.vwo.com/v2/docs/fme-java-logging)",
    "4-0": "**storage**  \n_Optional_",
    "4-1": "`vwoInitOptions.setStorage(storage)`",
    "4-2": "Object",
    "4-3": "Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-java-storage) ",
    "5-0": "**gatewayService**  \n_Optional_",
    "5-1": "`vwoInitOptions.setGatewayService(new HashMap<String, Object>() {  \n            {  \n                put(\"url\", \"<https://your.host.com:port\")>;  \n            }  \n        });`",
    "5-2": "Object",
    "5-3": "If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service) , this object will specify the location and port of where the gateway service is deployed on your servers.",
    "6-0": "**integrations**  \n_Optional_",
    "6-1": "`vwoInitOptions.setIntegrations(integrations);`",
    "6-2": "Object",
    "6-3": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-java-integrations)"
  },
  "cols": 4,
  "rows": 7,
  "align": [
    "left",
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

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setPollInterval(60000); // Set the poll interval to 60 seconds

VWO vwoInstance = VWO.init(vwoInitOptions);
```

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> logger = new HashMap<>();
logger.put("level", "DEBUG");
vwoInitOptions.setLogger(logger);
VWO vwoInstance = VWO.init(vwoInitOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-java-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _getFlag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
vwoInitOptions.setStorage(storageObject)

VWO vwoInstance = VWO.init(vwoInitOptions);
```

Please click [storage](https://developers.vwo.com/v2/docs/fme-java-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway_service parameter during initialization.

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> gatewayService = new HashMap<>();
gatewayService.put("url", "http://custom.gateway.com");
vwoInitOptions.setGatewayService(gatewayService);
VWO vwoInstance = VWO.init(vwoInitOptions);
```

Please click [GatewayService](https://developers.vwo.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```java
IntegrationCallback integrations = new IntegrationCallback() {
    @Override
    public void execute(Map<String, Object> properties) {
        // your function definition 
    }
};

VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
vwoInitOptions.setAccountId(12345);
vwoInitOptions.setIntegrations(integrations);

VWO vwoInstance = VWO.init(vwoInitOptions);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-java-integrations) to learn more about Integrations,.