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
  pages:
    - type: basic
      slug: fme-java-storage
      title: Storage Service
---
VWO by default logs all ERROR level messages to your server's console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter     | Type   | Description                                                                            |
| :------------ | :----- | :------------------------------------------------------------------------------------- |
| **level**     | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**    | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **transport** | String | Custom logger implementation                                                           |

**Example 1**: Set log level to control verbosity of logs

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> logger = new HashMap<>();
logger.put("level", "DEBUG");
vwoInitOptions.setLogger(logger);
VWO vwoInstance = VWO.init(vwoInitOptions);
```

**Example 2**: Add custom prefix to log messages for easier identification

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> logger = new HashMap<>();
logger.put("level", "DEBUG");
logger.put("prefix", "CUSTOM LOG PREFIX");
vwoInitOptions.setLogger(logger);
VWO vwoInstance = VWO.init(vwoInitOptions);
```

**Example 3**: Implement custom transport to handle logs your way  
The transports parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

- Send logs to a third-party logging serviceWrite logs to a file
- Format log messages differently
- Filter or transform log messages
- Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```java
VWOInitOptions vwoInitOptions = new VWOInitOptions();
vwoInitOptions.setAccountId(123456);
vwoInitOptions.setSdkKey("32-alpha-numeric-sdk-key");

Map<String, Object> logger = new HashMap<>();
logger.put("level", "DEBUG");
logger.put("prefix","your_custom_prefix");

List<Map<String, Object>> transports = new ArrayList<>();
LogTransport logTransport = new LogTransport() {
    @Override
    public void log(LogLevelEnum level, String message) {
        // your custom logging logic here
    }
};
transports.add(new HashMap<String, Object>() {{
    put("defaultTransport", logTransport);
}});
logger.put("transports", transports);
vwoInitOptions.setLogger(logger);
VWO vwoInstance = VWO.init(vwoInitOptions);
```