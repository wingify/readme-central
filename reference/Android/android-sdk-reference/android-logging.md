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
To enable logging in to the SDK, use ```VWOLog.setLogLevel(int logLevel)```.
You can set different log levels, depending on the priority of logging, as follows:

* **OFF**: A special level that can be used to turn off logging.
* **SEVERE**: A message level indicating a serious failure.
* **WARNING**: A message level indicating a potential problem.
* **CONFIG**: A message level indicating debugging logs.
* **INFO**: A message level for informational messages.
* **ALL**: A message level indicating that all messages should be logged.

The different methods set the log level of the message. VWO prints only messages with a log level greater to or equal to its current log level setting. So a logger with a level of WARNING can output only log messages with a level of WARNING or SEVERE.
[block:code]
{
  "codes": [
    {
      "code": "VWOLog.setLogLevel(VWOLog.ALL);",
      "language": "java"
    },
    {
      "code": "VWOLog.setLogLevel(VWOLog.ALL)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
By default, it will only display severe error messages or exceptions. To enable verbose logging, you can add the adb command after connecting your device:
[block:code]
{
  "codes": [
    {
      "code": "adb shell setprop log.tag.init VERBOSE\nadb shell setprop log.tag.socket VERBOSE\nadb shell setprop log.tag.socketInit VERBOSE\nadb shell setprop log.tag.downloadData VERBOSE\nadb shell setprop log.tag.config VERBOSE\nadb shell setprop log.tag.segmentation VERBOSE\nadb shell setprop log.tag.campaign VERBOSE",
      "language": "shell"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "success",
  "body": "[Installing adb](https://developer.android.com/studio/releases/platform-tools.html)\n[Using adb](https://developer.android.com/studio/command-line/adb.html#howadbworks)",
  "title": "Helpful links for adb"
}
[/block]