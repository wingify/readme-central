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
      slug: fme-php-context
      title: User Context
---
To create a VWO Client instance, you need to initialize the VWO FME Php SDK. This client instance serves as the core interface for conducting feature management and experimentation(A/B and personalization) within your application.

## Usage

```php
$vwoClient = VWO::init([
       'accountId' => your_account_id,
       'sdkKey' => your_sdk_key,
  ]);

```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a VWO Client Object`vwoClient`, which can be used to perform feature\
This client object allows you to run experiments, track events, and enable/disable feature flags.

## Parameter Definitions

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
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
        **logger**\
        *Optional*
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-php-logging)
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
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-php-storage) 
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
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations]()
      </td>
    </tr>
  </tbody>
</Table>

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```php
// Init options with logger
$vwoClient1 = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'logger' => [
    'level' => 'DEBUG',
  ],
]);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-php-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each *getFlag* call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```php
// Init options with storage
$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'storage' => $storageConnector,
]);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-php-storage)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gatewayService parameter during initialization.

```php
// Init options with gatewayService
$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'gatewayService' => [
    'url' => 'https://custom.gateway.com',
  ],
]);
```

Please click [here]()  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```php
// Init options with integrations
$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'integrations' => [
      'callback' => function ($properties) {
          echo "Integrations callback: " . json_encode($properties) . PHP_EOL;
      }
   ]
]);
```

Please click [here](https://developers.vwo.com/v2/docs/fme-python-integrations) to learn more about Integrations,.
