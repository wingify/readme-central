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
To create a Wingify Client instance, you need to initialize the Wingify FE Php SDK. This client instance serves as the core interface for conducting Feature Experimentation(A/B and personalization) within your application.

## Usage

```php
$vwoClient = VWO::init([
  'accountId' => your_account_id,
  'sdkKey' => your_sdk_key,
]);
```

The `init()` function is called with the `sdkKey`and `accountId`. It initializes and returns a Wingify Client Object`vwoClient`, which can be used to perform feature<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        **logger**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v2/docs/fme-php-logging)
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
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v2/docs/fme-php-storage)
      </td>
    </tr>

    <tr>
      <td>
        **retryConfig**<br />_Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Customize retry behavior by passing a **retryConfig** in the init options. For more details, please check - [Retry Configuration](https://developers.wingify.com/v2/docs/fme-php-initialization#retry-configuration)
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
        If using the [FE Gateway Service](https://developers.wingify.com/v2/docs/gateway-service), this object will specify the location and port where the gateway service is deployed on your servers.
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
        A callback function that receives data, which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations]()
      </td>
    </tr>

    <tr>
      <td>
        **settingsConfig**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Use these to configure the network call timeout for fetching settings from Wingify. Refer [this]().
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
        Pass the already fetched settings so the SDK can initialize instantly, without waiting to fetch settings from Wingify. Refer [this](doc:fme-php-initialization#initialization-with-explicit-settings).
      </td>
    </tr>
  </tbody>
</Table>

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

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

Please click [here](https://developers.wingify.com/v2/docs/fme-php-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _getFlag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```php
// Init options with storage
$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'storage' => $storageConnector,
]);
```

Please click [here](https://developers.wingify.com/v2/docs/fme-php-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gatewayService parameter during initialization.

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

Please click [here](https://developers.wingify.com/v2/docs/gateway-service)  to learn more about gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

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

Please click [here](https://developers.wingify.com/v2/docs/fme-python-integrations) to learn more about Integrations,.

### Settings Configuration

Use these options to define and control the timeout duration for the network request made to fetch settings from Wingify, ensuring the SDK does not wait indefinitely and behaves predictably under slow or unreliable network conditions.

```php
$vwoClient = VWO::init([
  'accountId' => '123456',
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'settingsConfig' => [
    // Network timeout for settings fetch in milliseconds (default: 50000)
    'timeout' => 2000
   ],
]);
```

### Initialization with Explicit Settings

The SDK provides the ability to reduce initialization time by allowing users to explicitly pass in settings instead of fetching them automatically. This can be especially useful in environments where you need to optimize for faster setup or if you already have the necessary settings retrieved from a remote server.<br />Please refer to <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-explicit-sdk-fetch-settings#/">this</Anchor> document for more information on retrieving settings.

```php
$settingsStringified = '{
    "accountId": 123456,
    "sdkKey": "32-alpha-numeric-sdk-key",
    "features": {
    },
    "campaigns": {
    },
    "version": 1,
}';


$settings = json_decode($settingsStringified, true);

$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'settings' => $settings
]);
```

### Retry Configuration

The SDK includes a built-in retry mechanism to improve reliability when network requests fail due to transient issues such as timeouts or temporary connectivity problems. You can fully control this behavior by providing a retryConfig object during SDK initialization.

```php
$vwoClient = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'shouldWaitForTrackingCalls' => true,
  'retryConfig' => [
    'shouldRetry' => true,        // default: true
    'maxRetries' => 3,            // default: 3
    'initialDelay' => 2,          // seconds; default: 2
    'backoffMultiplier' => 2,     // delays: 2s, 4s, 8s; default: 2
  ],
]);
```

> Retry works for synchronous (cURL) calls only, and you should pass 'shouldWaitForTrackingCalls' => true, in the init configration to enable synchronous (cURL) calls and retry.

Please click <Anchor target="_blank" href="https://developers.wingify.com/v2/docs/fme-sdk-retry-mechanism">here</Anchor> to learn more about Retry Mechanism
