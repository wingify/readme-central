---
title: Logging
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
VWO by default logs all ERROR level messages to your server's console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration. 

## Logger Properties

| Parameter     | Type   | Description                                                                            |
| :------------ | :----- | :------------------------------------------------------------------------------------- |
| **level**     | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**    | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **transport** | Object | Custom logger implementation                                                           |

**Example 1**: Set log level to control the verbosity of logs

```python
options = {
    'account_id': '123456', # VWO Account ID
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'logger': {
        'level': 'DEBUG'
    }
}
vwo_client = init(options)
```

**Example 2**: Add a custom prefix to log messages for easier identification

```python
options = {
    'account_id': '123456', # VWO Account ID
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'logger': {
        'level': 'DEBUG',
        'prefix': 'CUSTOM LOG PREFIX'
    }
}
vwo_client = init(options)
```

**Example 3**: Implement custom transport to handle logs your way\
The transports parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

* Send logs to a third-party logging serviceWrite logs to a file
* Format log messages differently
* Filter or transform log messages
* Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```python
from vwo import init

class CustomTransport:
    def __init__(self, config):
        self.level = config.get('level', "ERROR")
        self.config = config

    def log(self, level, message):
        # your custom implementation here

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'logger' {
        'transport': CustomTransport({'level': 'INFO'})
    }
}

vwo_client = init(options)
```

For multiple `transports` you can use the transports parameter. For example:

```python
from vwo import init

class CustomTransportForInfo:
    def __init__(self, config):
        self.level = config.get('level', "INFO")
        self.config = config

    def log(self, level, message):
        # your custom implementation here

class CustomTransportForError:
    def __init__(self, config):
        self.level = config.get('level', "ERROR")
        self.config = config

    def log(self, level, message):
        # your custom implementation here

options = {
    'sdk_key': '32-alpha-numeric-sdk-key', # SDK Key
    'account_id': '123456', # VWO Account ID
    'logger' {
        'transports': [
            CustomTransportForInfo({'level': 'INFO'}),
            CustomTransportForError({'level': 'ERROR'})
        ]
    }
}

vwo_client = init(options)
```

This "logger" object can be passed as one of the parameters when [initializing *vwoClient*.](https://developers.vwo.com/v2/docs/fme-initialization)
