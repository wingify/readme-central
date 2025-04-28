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
VWO by default logs all ERROR level messages to your device console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter  | Type   | Description                                                                            |
| :--------- | :----- | :------------------------------------------------------------------------------------- |
| **level**  | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix** | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |

**Example 1**: Set log level to control the verbosity of logs

```kotlin
vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
  put("level", "INFO") // DEBUG, INFO, ERROR, TRACE, WARN
}
```
```java
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "INFO");  // DEBUG, INFO, ERROR, TRACE, WARN

vwoInitOptions.setLogger(loggerOptions);
```

**Example 2**: Add a custom prefix to log messages for easier identification

```kotlin
vwoInitOptions.logger = mutableMapOf<String, Any>().apply {
  put("level", "INFO") // DEBUG, INFO, ERROR, TRACE, WARN
  put("prefix", "VWO")
}
```
```java
Map<String, Object> loggerOptions = new HashMap<>();
loggerOptions.put("level", "INFO");  // DEBUG, INFO, ERROR, TRACE, WARN
loggerOptions.put("prefix", "VWO");

vwoInitOptions.setLogger(loggerOptions);
```

This "logger" object can be passed as one of the parameters when [initializing _vwoClient_.](https://developers.vwo.com/v2/docs/fme-initialization)