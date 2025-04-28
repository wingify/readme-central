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

> 📘 Note
>
> For the production environment, we recommend that you pass in your custom logger implementation while creating a VWO client instance.

## Log Levels

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Log Level
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **ERROR** 
      </td>

      <td>
        The events that prevent campaigns from functioning properly (for example, invalid settingsFile while initializing the VWO SDK, invalid campaign keys, or goal identifiers) are logged.
      </td>
    </tr>

    <tr>
      <td>
        **WARNING** 
      </td>

      <td>
        The events that don't prevent campaigns from functioning correctly, but can have unexpected outcomes (for example, future API deprecation) are logged.
      </td>
    </tr>

    <tr>
      <td>
        **INFO** 
      </td>

      <td>
        The events which are useful and provide a certain level of information (for example, activate started, bucket value assigned, part of a campaign, tracking user, conversion succeeded, and others) are logged. This depicts the flow of the API method used.
      </td>
    </tr>

    <tr>
      <td>
        **DEBUG** 
      </td>

      <td>
        Any kind of useful information that can help VWO debug the issue in case of unexpected behavior (for example, a user is not in a campaign, bucket value assigned, hash value assigned, and stored User Storage Service used, and others) are logged.
      </td>
    </tr>
  </tbody>
</Table>

To filter these log levels while writing your own logger implementation, use the Enum provided to you by VWO SDKs.

```csharp .NET
using VWOSdk;

// debug level
var logDebugLevel = LogLevel.DEBUG;

// info level
var logInfoLevel = LogLevel.INFO;

// warn level
var logWarnLevel = LogLevel.WARNING;

// error level
var logErrorLevel = LogLevel.ERROR;
```

See the code example below on how to use these appropriately.

## Example

```csharp .NET
using VWO.Sdk;

// If only log level needs to eb changed
VWO.Configure(LogLevel.DEBUG);

// If custom logger implementation is required
public class CustomLogger : ILogWriter
{
        public void WriteLog(LogLevel logLevel, string message)
        {
            // ...write to file or database or integrate with any third-party service
        }
}

//  Configure Custom Logger with SDK.
VWO.Configure(new CustomLogWriter());
```
