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

```python Python
from wingify import init

options = {
   'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
   'account_id': '123456' # Wingify Account ID
}

wingify_client = init(options)
```

A dictionary named `options` is created to store the SDK configuration details.

The `init()` function is called with the `options` dictionary. It initializes and returns a Wingify Client Object`wingify_client`.<br />This client object allows you to run experiments, track events, and enable/disable feature flags.

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
        Time (in milliseconds) at which Wingify should check with the server for any updates to the feature flag or rules in the Wingify Dashboard. Useful to keep your Wingify Client instance up-to-date with any changes made in the Wingify Application. For more details, please check -[Polling](https://developers.wingify.com/v3/docs/polling)
      </td>
    </tr>

    <tr>
      <td>
        **logger**<br />_Optional_
      </td>

      <td>
        Dict
      </td>

      <td>
        An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.wingify.com/v3/docs/fme-python-logging)
      </td>
    </tr>

    <tr>
      <td>
        **storage**<br />_Optional_
      </td>

      <td>
        Dict
      </td>

      <td>
        Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.wingify.com/v3/docs/fme-python-storage)
      </td>
    </tr>

    <tr>
      <td>
        **proxy\_url**<br />_Optional_
      </td>

      <td>
        String
      </td>

      <td>
        ProxyUrl is an optional parameter to support for redirecting all network calls through a custom proxy URL. please check - [Proxy URL](https://developers.wingify.com/v3/docs/fme-python-initialization#proxyurl)
      </td>
    </tr>

    <tr>
      <td>
        **gateway\_service**<br />_Optional_
      </td>

      <td>
        Dict
      </td>

      <td>
        If using the [FE Gateway Service](https://developers.wingify.com/v3/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers.
      </td>
    </tr>

    <tr>
      <td>
        **integrations**<br />_Optional_
      </td>

      <td>
        Dict
      </td>

      <td>
        A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.wingify.com/v3/docs/fme-python-integrations)
      </td>
    </tr>
  </tbody>
</Table>

### Poll Interval (Keeping Wingify client up-to-date)

When you initialize the _vwo\_client_ on your server, it pulls the latest configurations you've done in the Wingify application.<br />If/when you make any changes to the feature flags or rules within Wingify after the _vwo\_client_ has been initialized in your server, there needs to be some way to update your _vwo\_client_ with the latest settings from. This can be done via [polling](https://developers.wingify.com/v3/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the Wingify server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```python
# Init options with poll_interval
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'poll_interval': 60000 # Set the poll interval to 60 seconds
}

# Initialize the sdk
wingify_client = init (options)
```

### Logger

Wingify by default logs all ERROR level messages to your server console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

```python
# Init options with logger
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'logger': {
        'level': 'DEBUG'
    }
}

# Initialize the sdk
wingify_client = init (options)
```

Please click [here](https://developers.wingify.com/v3/docs/fme-python-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get\_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```python
# Init options with storage
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'storage': UserStorage() # UserStorage would be your custom class implementation
}

# Initialize the sdk
wingify_client = init (options)
```

Please click [here](https://developers.wingify.com/v3/docs/fme-python-storage)  to learn more about storage implementation.

### Gateway Service

The Wingify FE Gateway Service enhances Feature Experimentation (FE) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway\_service parameter during initialization.

```python
# Init options with gateway_service
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'gateway_service': {
        'url': 'http://custom.gateway.com'
    }
}

# Initialize the sdk
wingify_client = init (options)
```

Please click [here](https://developers.wingify.com/v3/docs/gateway-service)  to learn more about gateway service.

### Integrations

Wingify FE SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives Wingify-specific properties and can forward them to any third-party tool of your choice.

```python
# Callback function to pass in init options
def callback(properties):
  # your custom callback implementation here
  # properties will contain all the required Wingify specific information
  print(properties)

# Init options with logger
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'integrations': {
        'callback': callback
    }
}

# Initialize the sdk
wingify_client = init(options)
```

Please click [here](https://developers.wingify.com/v3/docs/fme-python-integrations) to learn more about Integrations.

### ProxyUrl

Wingify FE SDKs provide support for redirecting all network calls through a custom proxy URL. This feature enables users to route all SDK network requests (including settings, tracking, etc.) through their own proxy server.

```python
from wingify import init

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # Wingify Account ID
    'proxy_url': 'https://proxy.yourdomain.com',
    # other configuration options
}

wingify_client = init(options)
```

Please click <Anchor target="_blank" href="https://developers.wingify.com/v3/docs/fme-python-proxy-url">here</Anchor> to learn more about ProxyURL.
