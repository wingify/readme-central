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

| Parameter        | Type   | Description                                                                            |
| :--------------- | :----- | :------------------------------------------------------------------------------------- |
| **logLevel**     | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **logPrefix**    | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **logTransport** | Object | Custom logger implementation                                                           |

**Example 1**: Set log level to control the verbosity of logs

```swift
let options = VWOInitOptions(sdkKey: sdkKey, accountId: accountId, logLevel: .info)

// Initialize VWO SDK
VWOFme.initialize(options: options) { result in
    switch result {
        case .success(let message):
            // VWO SDK initialized
        case .failure(let error):
            // VWO SDK failed to initialize
    }
}
```

**Example 2**: Add a custom prefix to log messages for easier identification

```swift
let options = VWOInitOptions(sdkKey: sdkKey, accountId: accountId, logLevel: .info, logPrefix: "CUSTOM_LOG_PREFIX")

// Initialize VWO SDK
VWOFme.initialize(options: options) { result in
    switch result {
        case .success(let message):
            // VWO SDK initialized
        case .failure(let error):
            // VWO SDK failed to initialize
    }
}
```

**Example 3**: Implement custom transport to handle logs your way.\
The **transport** parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

* Send logs to a third-party logging service
* Write logs to a file
* Format log messages differently
* Filter or transform log messages
* Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```swift
// Define a class that conforms to the LogTransport protocol
class MyClass: LogTransport {
    // Implement the log method to handle log messages
    func log(logType: String, message: String) {
        // Send log to a third-party service or handle it as needed
        print("Log Type: \(logType), Message: \(message)")
    }
}

// Create an instance of your custom log transport class
let logClass = MyClass()

// Initialize VWOInitOptions with the custom log transport
let options = VWOInitOptions(sdkKey: SDK_KEY, accountId: ACCOUNT_ID,  logTransport:logClass)

// Initialize VWO SDK
VWOFme.initialize(options: options) { result in
    switch result {
        case .success(let message):
            // VWO SDK initialized
        case .failure(let error):
            // VWO SDK failed to initialize
    }
}
```

This "logger" object can be passed as one of the parameters when [initializing *vwoClient*.](https://developers.vwo.com/v2/docs/fme-initialization)
