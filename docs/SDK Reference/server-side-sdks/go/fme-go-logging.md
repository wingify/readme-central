---
title: Logging
deprecated: false
hidden: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-node-storage
      title: Storage Service
      type: basic
---
VWO by default logs all ERROR level messages to your server's console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter     | Type                   | Description                                                                            |
| :------------ | :--------------------- | :------------------------------------------------------------------------------------- |
| **level**     | String                 | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**    | String                 | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **transport** | map[string]interface{} | Custom logger implementation                                                           |

**Example 1**: Set log level to control the verbosity of logs

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "logger": map[string]interface{}{
        "level": "DEBUG",
    },
}

vwoInstance, err := vwo.Init(options)
```

**Example 2**: Add a custom prefix to log messages for easier identification

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "logger": map[string]interface{}{
        "level":  "DEBUG",
        "prefix": "CUSTOM LOG PREFIX",
    },
}

vwoInstance, err := vwo.Init(options)
```

**Example 3**: Implement custom transport to handle logs your way.  
The **transport** parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

```go
options := map[string]interface{}{
    "sdkKey":    "32-alpha-numeric-sdk-key",
    "accountId": "123456",
    "logger": map[string]interface{}{
        "level": "DEBUG",
        "transport": map[string]interface{}{
          "trace": func(message string) {
            // custom implementation
            fmt.Printf("[CUSTOM-TRACE] %s\n", message)
          },
          "debug": func(message string) {
            // custom implementation
            fmt.Printf("[CUSTOM-DEBUG] %s\n", message)
          },
          "info": func(message string) {
            // custom implementation
            fmt.Printf("[CUSTOM-INFO] %s\n", message)
          },
          "warn": func(message string) {
            // custom implementation
            fmt.Printf("[CUSTOM-WARN] %s\n", message)
          },
          "error": func(message string) {
            // custom implementation
            fmt.Printf("[CUSTOM-ERROR] %s\n", message)
          },
        },
    },
}

vwoInstance, err := vwo.Init(options)
```
