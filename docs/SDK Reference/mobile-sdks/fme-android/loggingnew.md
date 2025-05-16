---
title: Logging(New)
deprecated: false
hidden: true
metadata:
  robots: index
---
VWO by default logs all `ERROR` level messages to your device console. To gain more control over VWO's logging behavior, you can use the `logger` parameter in the `init` configuration.

## Logger Properties

| Parameter      | Type        | Description                                                                            |
| :------------- | :---------- | :------------------------------------------------------------------------------------- |
| **level**      | String      | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **transports** | List/Object | Custom logger implementation(s) for advanced log handling.                             |

## Examples

### Example 1: Set log level to control the verbosity of logs

```kotlin
vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
  put("level", "TRACE") // DEBUG, INFO, ERROR, TRACE, WARN
}
```

```java
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "TRACE");  // DEBUG, INFO, ERROR, TRACE, WARN

vwoInitOptions.setLogger(loggerOptions);
```

### Example 2: Implement custom transport to handle logs your way

The `transports` parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (TRACE, DEBUG, INFO, WARN, ERROR) to process log messages according to your needs.

```kotlin
val logger: MutableList<Map<String, Any>> = mutableListOf()
val transport: MutableMap<String, Any> = mutableMapOf()
transport["defaultTransport"] = object : LogTransport {
    override fun log(level: LogLevelEnum, message: String?) {
        if (message == null) return
        Log.d("FME", message)
    }
}
logger.add(transport)
vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
    put("level", "TRACE")
    put("transports", logger)
}
```

```java
List<Map<String, Object>> logger = new ArrayList<>();
Map<String, Object> transport = new HashMap<>();
transport.put("defaultTransport", new LogTransport() {
    @Override
    public void log(LogLevelEnum level, String message) {
        if (message == null) return;
        Log.d("FME", message);
    }
});
logger.add(transport);
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "TRACE");
loggerOptions.put("transports", logger);
vwoInitOptions.setLogger(loggerOptions);
```

The custom logger implementation allows you to:

* Process log messages according to your application's needs
* Forward logs to your preferred logging service
* Filter or transform log messages before they are displayed
* Integrate with your existing logging infrastructure