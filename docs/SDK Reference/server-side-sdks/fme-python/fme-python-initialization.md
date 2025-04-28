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

```python Python
from vwo import init

options = {
   'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
   'account_id': '123456' # VWO Account ID
}

vwo_client = init(options)
```

A dictionary named `options` is created to store the SDK configuration details.

The `init()` function is called with the `options` dictionary. It initializes and returns a VWO Client Object`vwo_client`, which can be used to perform feature  
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
    "2-2": "Time (in milliseconds) at which VWO should check with the server for any updates to the feature flag or rules in the VWO Dashboard. Useful to keep your VWO Client instance up-to-date with any changes made in the VWO Application. For more details, please check -[Polling](https://developers.vwo.com/v2/docs/polling)",
    "3-0": "**logger**  \n_Optional_",
    "3-1": "Dict",
    "3-2": "An optional logger object that defines the logging behavior. For more details, please check - [Logger](https://developers.vwo.com/v2/docs/fme-python-logging)",
    "4-0": "**storage**  \n_Optional_",
    "4-1": "Dict",
    "4-2": "Storage Service, if required, can be implemented using this parameter. For more details, please check - [Storage Service](https://developers.vwo.com/v2/docs/fme-python-storage) ",
    "5-0": "**gateway_service**  \n_Optional_",
    "5-1": "Dict",
    "5-2": "If using the [FME Gateway Service](https://developers.vwo.com/v2/docs/gateway-service), this object will specify the location and port of where the gateway service is deployed on your servers. ",
    "6-0": "**integrations**  \n_Optional_",
    "6-1": "Dict",
    "6-2": "A callback function that receives data which can be pushed to any external tool that you need to integrate with. For more details, please check - [Integrations](https://developers.vwo.com/v2/docs/fme-python-integrations)"
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

When you initialize the _vwo_client_ on your server, it pulls the latest configurations you've done in the VWO application.  
If/when you make any changes to the feature flags or rules within VWO after the _vwo_client_ has been initialized in your server, there needs to be some way to update your _vwo_client_ with the latest settings from VWO. This can be done via [polling](https://developers.vwo.com/v2/docs/polling).

The poll interval is an optional parameter that allows the SDK to automatically fetch and update settings from the VWO server at specified intervals. Setting this parameter ensures your application always uses the latest configuration.

```python
# Init options with poll_interval
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'poll_interval': 60000 # Set the poll interval to 60 seconds
}

# Initialize the sdk
vwo_client = init(options)
```

### Logger

VWO by default logs all ERROR level messages to your server console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

```python
# Init options with logger
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'logger': {
        'level': 'DEBUG'
    }
}

# Initialize the sdk
vwo_client = init(options)
```

Please click [here](https://developers.vwo.com/v2/docs/fme-python-logging) for more advanced logger options.

### Storage

By default, the SDK operates in stateless mode, evaluating flags on each _get_flag_ call. To improve performance and consistency, you can use a custom storage mechanism to cache decisions, ensuring stable user experiences and reducing application load.

```python
# Init options with storage
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'storage': UserStorage() # UserStorage would be your custom class implementation
}

# Initialize the sdk
vwo_client = init(options)
```

Please click [here](<>)  to learn more about storage implementation.

### Gateway Service

The VWO FME Gateway Service enhances Feature Management and Experimentation (FME) SDKs by enabling pre-segmentation based on user location and user agent. It ensures minimal latency and improved security. The service can be customized via the gateway_service parameter during initialization.

```python
# Init options with gateway_service
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'gateway_service': {
        'url': 'http://custom.gateway.com'
    }
}

# Initialize the sdk
vwo_client = init(options)
```

Please click [here](<>)  to learn more about gateway service.

### Integrations

VWO FME SDKs provide seamless integration with third-party tools like analytics platforms, monitoring services, customer data platforms (CDPs), and messaging systems. This is achieved through a simple yet powerful callback mechanism that receives VWO-specific properties and can forward them to any third-party tool of your choice.

```python
# Callback function to pass in init options
def callback(properties):
  # your custom callback implementation here
  # properties will contain all the required VWO specific information
  print(properties)
    
# Init options with logger
options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'integrations': {
        'callback': callback
    }
}

# Initialize the sdk
vwo_client = init(options
```

Please click [here](https://developers.vwo.com/v2/docs/fme-python-integrations) to learn more about Integrations.