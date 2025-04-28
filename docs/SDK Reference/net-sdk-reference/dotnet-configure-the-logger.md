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
  pages:
    - type: basic
      slug: dotnet-implement-a-user-storage-service
      title: Implement a User Storage Service
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
      "code": "using VWOSdk;\n\n// debug level\nvar logDebugLevel = LogLevel.DEBUG;\n\n// info level\nvar logInfoLevel = LogLevel.INFO;\n\n// warn level\nvar logWarnLevel = LogLevel.WARNING;\n\n// error level\nvar logErrorLevel = LogLevel.ERROR;",
      "language": "csharp",
      "name": ".NET"
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
      "code": "using VWO.Sdk;\n\n// If only log level needs to eb changed\nVWO.Configure(LogLevel.DEBUG);\n\n// If custom logger implementation is required\npublic class CustomLogger : ILogWriter\n{\n        public void WriteLog(LogLevel logLevel, string message)\n        {\n            // ...write to file or database or integrate with any third-party service\n        }\n}\n\n//  Configure Custom Logger with SDK.\nVWO.Configure(new CustomLogWriter());",
      "language": "csharp",
      "name": ".NET"
    }
  ]
}
[/block]