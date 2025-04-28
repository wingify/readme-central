---
title: Logging
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
To enable logging in SDK, use `[VWO.setLogLevel: level]`.\
You can set different log levels depending upon the priority of logging as follows:

* **Debug**: Gives detailed logs.
* **Info**: Informational logs
* **Warning**: Warning is a message level indicating a potential problem.
* **Error**: Indicates Error
* **None**: No logs are printed

The different methods set the log level of the message. VWO will only print messages with a log level that is greater to or equal to it's current log level setting. So a logger with a level of Warning will only output log messages with a level of Warning, or Error.

```objectivec
[VWO.setLogLevel: VWOLogLevelWarning];
```
```swift
VWO.logLevel = .warning
```
