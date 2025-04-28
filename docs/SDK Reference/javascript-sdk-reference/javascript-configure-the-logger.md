---
title: Configure the Logger
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
Every backend application relies on some kind of logs to debug it. The VWO SDK **logger** logs information about your running campaigns to help you with debugging. You can customize what kind of logs you need and where to send these, that is, you can write your own logger implementation to write the logs on some file, database, or some third-party logging service.

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "For the production environment, we recommend that you pass in your custom logger implementation while creating a VWO client instance."
}
[/block]

[block:api-header]
{
  "title": "Logger"
}
[/block]
A ***logger*** is a JSON object, which has the following keys:

[block:parameters]
{
  "data": {
    "h-0": "Key name",
    "h-1": "Type",
    "h-2": "Default (if any)",
    "0-0": "log",
    "0-1": "Function",
    "0-2": "Do NOT create this key for default logger implementation.",
    "1-0": "level",
    "2-0": "haveColoredLogs\n(only for NodeJS)",
    "2-1": "Boolean",
    "1-1": "String",
    "1-2": "**ERROR**, that is, *vwoSDK.logging.LogLevelEnum.ERROR*",
    "2-2": "**true** when *isDevelopment:true*,\notherwise, **false**",
    "h-3": "Description",
    "0-3": "Custom implementation of logger.",
    "1-3": "The kind of logs that are needed.",
    "2-3": "If logs are written in console, should these be colored for better visibility?"
  },
  "cols": 4,
  "rows": 2
}
[/block]

[block:api-header]
{
  "title": "Log Levels"
}
[/block]

[block:parameters]
{
  "data": {
    "h-0": "Log Level",
    "h-1": "Description",
    "0-0": "**ERROR** ",
    "1-0": "**WARNING** ",
    "2-0": "**INFO** ",
    "3-0": "**DEBUG** ",
    "0-1": "The events that prevent campaigns from functioning properly (for example, invalid settingsFile while initializing the VWO SDK, invalid campaign keys, or goal identifiers) are logged.",
    "1-1": "The events that don't prevent campaigns from functioning correctly, but can have unexpected outcomes (for example, future API deprecation) are logged.",
    "2-1": "The events which are useful and provide a certain level of information (for example, activate started, bucket value assigned, part of a campaign, tracking user, conversion succeeded, and others) are logged. This depicts the flow of the API method used.",
    "3-1": "Any kind of useful information that can help VWO debug the issue in case of unexpected behavior (for example, a user is not in a campaign, bucket value assigned, hash value assigned, and stored User Storage Service used, and others) are logged."
  },
  "cols": 2,
  "rows": 4
}
[/block]
To filter these log levels while writing your own logger implementation, use the Enum provided to you by VWO SDKs.
[block:code]
{
  "codes": [
    {
      "code": "var vwoSDK = require('vwo-node-sdk');\n\n// debug level\nvar logDebugLevel = vwoSDK.logging.LogLevelEnum.DEBUG:\n\n// info level\nvar logInfoLevel = vwoSDK.logging.LogLevelEnum.INFO:\n\n// warn level\nvar logWarnLevel = vwoSDK.logging.LogLevelEnum.WARN:\n\n// error level\nvar logErrorLevel = vwoSDK.logging.LogLevelEnum.ERROR:\n\n",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]
See the code example below on how to use these appropriately.
[block:api-header]
{
  "title": "Example"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "var customLoggingConfig = {\n  logger: {\n    log: (level, message) => {\n      switch (level) {\n        case vwoSDK.logging.LogLevelEnum.DEBUG:\n          console.debug(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.INFO:\n          console.info(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.ERROR:\n          console.error(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.WARN:\n          console.warn(message);\n          break;\n      }\n\n      // Write below the logic to write logs to a file or pass onto other services, if required\n      // Code goes here...\n    }\n  },\n  level: vwoSDK.logging.LogLevelEnum.DEBUG\n};\n\n\nvwoClientInstance = vwoSDK.createInstance({\n  settingsFile: settingsFile, // required\n  logging: customLoggingConfig // required only when custom logger implementation is required\n});",
      "language": "javascript",
      "name": "JavaScript"
    }
  ]
}
[/block]