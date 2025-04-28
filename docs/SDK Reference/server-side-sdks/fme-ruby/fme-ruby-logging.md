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

| Parameter  | Type   | Description                                                                            |
| :--------- | :----- | :------------------------------------------------------------------------------------- |
| **level**  | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix** | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |

**Example 1**: Set log level to control the verbosity of logs

```ruby
# Set log level
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    logger: {
        level: 'DEBUG'
    }
})
```

**Example 2**: Add a custom prefix to log messages for easier identification

```ruby
# Set log level
vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    logger: {
        level: 'DEBUG',
        prefix: 'CUSTOM LOG PREFIX'
    }
})
```

This "logger" object can be passed as one of the parameters when [initializing _vwo_client_.](https://developers.vwo.com/v2/docs/fme-ruby-initialization)