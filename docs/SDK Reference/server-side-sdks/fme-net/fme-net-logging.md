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

| Paramter       | Type         | Description                                                                            |
| :------------- | :----------- | :------------------------------------------------------------------------------------- |
| **Level**      | string       | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **Prefix**     | string       | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **Transports** | LogTransport | Map of functions that control the logging behaviour of each type of log message.       |

**Example 1**: Set log level to control the verbosity of logs

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

**Example 2**: Add a custom prefix to log messages for easier identification

```csharp
var vwoInitOptions2 = new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = new Logger
    {
        Level = "DEBUG",
        Prefix = "CUSTOM LOG PREFIX"
    }
};
var vwoClient2 = VWO.Init(vwoInitOptions2);
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

```csharp
var vwoInitOptions3 = new VWOInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = new Logger
    {
        Level = "DEBUG",
        Transports = new List<LogTransport>
        {
            new LogTransport
            {
                Level = "DEBUG",
                LogHandler = (msg, level) => Console.WriteLine($"DEBUG: {msg}")
            },
            new LogTransport
            {
                Level = "INFO",
                LogHandler = (msg, level) => Console.WriteLine($"INFO: {msg}")
            },
            new LogTransport
            {
                Level = "ERROR",
                LogHandler = (msg, level) => Console.WriteLine($"ERROR: {msg}")
            }
        }
    }
};
var vwoClient3 = VWO.Init(vwoInitOptions3);
```

This "logger" object can be passed as one of the parameters when [initializing _vwoClient_.](https://developers.vwo.com/v2/docs/fme-initialization)