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
VWO by default logs all ERROR level messages on your browser console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter     | Type   | Description                                                                            |
| :------------ | :----- | :------------------------------------------------------------------------------------- |
| **level**     | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**    | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **transport** | Object | Custom logger implementation                                                           |

**Example 1**: Set log level to control the verbosity of logs

```node
const vwoClient1 = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    level: 'DEBUG',
  },
});
```

**Example 2**: Add a custom prefix to log messages for easier identification

```node
const vwoClient2 = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    level: 'DEBUG',
    prefix: 'CUSTOM LOG PREFIX',
  },
});
```

**Example 3**: Implement custom transport to handle logs your way.  
The **transport** parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

- Send logs to a third-party logging service
- Write logs to a file
- Format log messages differently
- Filter or transform log messages
- Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```node
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    transport: {
      level: 'INFO',
      log: (level, message) => {
        // your custom implementation here
      }
    },
  },
});
```

For multiple transports you can use the `transports` parameter. For example:

```node
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  logger: {
    transports: [
      {
        level: 'INFO',
        log: (level, message) => {
          // your custom implementation here
        },
      },
      {
        level: 'ERROR',
        log: (level, message) => {
          // your custom implementation here
        },
      },
    ],
  },
});
```

This "logger" object can be passed as one of the parameters when [initializing _vwoClient_.](https://developers.vwo.com/v2/docs/fme-initialization)