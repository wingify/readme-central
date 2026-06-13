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
Wingify by default logs all ERROR level messages to your server's console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Paramter       | Type         | Description                                                                            |
| :------------- | :----------- | :------------------------------------------------------------------------------------- |
| **Level**      | string       | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **Prefix**     | string       | The text that is prefixed to the error messages when logged. Defaults to 'WINGIFY-SDK'.    |
| **Transports** | LogTransport | Map of functions that control the logging behaviour of each type of log message.       |

**Example 1**: Set log level to control the verbosity of logs

```csharp
var wingifyInitOptions = new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
	  Logger = new Dictionary<string, object> { { "level", "DEBUG" } }
};
var wingifyClient = Wingify.Init(wingifyInitOptions);
```

**Example 2**: Add a custom prefix to log messages for easier identification

```csharp
var wingifyInitOptions = new WingifyInitOptions
{
    SdkKey = "32-alpha-numeric-sdk-key",
    AccountId = 123456,
    Logger = new Dictionary<string, object>
    {
        { "level", "DEBUG" },
        { "prefix", "CUSTOM LOG PREFIX" }
    }
};
var wingifyClient = Wingify.Init(WingifyInitOptions);
```

**Example 3**: Implement custom transport to handle logs your way.<br />The **transport** parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

- Send logs to a third-party logging service
- Write logs to a file
- Format log messages differently
- Filter or transform log messages
- Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```csharp
using System.Collections.Generic;
using WingifyFmeSdk;
using WingifyFmeSdk.Models.User;
using WingifyFmeSdk.Interfaces.Logger;
using WingifyFmeSdk.Packages.Logger.Enums;

public class CustomLogTransport : LogTransport
{
    public void Log(LogLevelEnum level, string message)
    {
        // your custom logging logic here
    }
}

var logger = new Dictionary<string, object>
{
    { "level", "DEBUG" },
    { "transports", new List<Dictionary<string, object>>
        {
            new Dictionary<string, object>
            {
                { "level", "DEBUG" }, // optional: per-transport level filter, defaults to global level
                { "log", new CustomLogTransport() }
            }
        }
    }
};

var wingifyInitOptions = new WingifyInitOptions
{
    AccountId = 123456,
    SdkKey = "32-alpha-numeric-sdk-key",
    Logger = logger
};

var wingifyInstance = Wingify.Init(wingifyInitOptions);

```

This "logger" object can be passed as one of the parameters when [initializing _wingifyClient_.](https://developers.wingify.com/v2/docs/fme-initialization)
