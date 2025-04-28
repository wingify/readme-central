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

The `init()` function is called with the `vwoInitOptions` object. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        *Required*
      </td>

      <td>
        `vwoInitOptions.setAccountId(123);`
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
        `vwoInitOptions.setSdkKey("sdk-key");`
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
        `vwoInitOptions.setPollInterval(60);`
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
        `vwoInitOptions.setLogger(logger);`
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check -[Logger](https://developers.vwo.com/v2/docs/fme-java-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**\
        *Optional*
      </td>

      <td>
        `vwoInitOptions.setStorage(storage)`
      </td>

      <td>
        Object
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-java-storage) 
      </td>
    </tr>

    <tr>
      <td>
        **gatewayService**\
        *Optional*
      </td>

      <td>
        ```
        vwoInitOptions.setGatewayService(new HashMap<String, Object>() {  
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
        If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service) , this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **integrations**\
        *Optional*
      </td>

      <td>
        `vwoInitOptions.setIntegrations(integrations);`
      </td>

      <td>
        Object
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-java-integrations)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping VWO client up-to-date)

When you initialize the *vwoClient* on your server, it pulls the latest configurations you've done in the VWO application.\
If/when you make any changes to the feature flags or rules within VWO after the *vwoClient* has been initialized in your server, there needs to be some way to update your *vwoClient* with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

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

By default, the SDK operates in stateless mode, evaluating flags on each *getFlag* call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");
vwoInitOptions.setStorage(storageObject)

VWO vwoInstance = VWO.init(vwoInitOptions);
```

Please click [storage](https://developers.vwo.com/v2/docs/fme-java-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

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
