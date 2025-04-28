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

> 📘 Note
>
> For the production environment, we recommend that you pass in your custom logger implementation while creating a VWO client instance.

## Logger

A ***logger*** is a JSON object, which has the following keys:

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Key name
      </th>

      <th>
        Type
      </th>

      <th>
        Default (if any)
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        log
      </td>

      <td>
        Function
      </td>

      <td>
        Do NOT create this key for default logger implementation.
      </td>

      <td>
        Custom implementation of logger.
      </td>
    </tr>

    <tr>
      <td>
        level
      </td>

      <td>
        String
      </td>

      <td>
        **ERROR**, that is, *vwoSDK.logging.LogLevelEnum.ERROR*
      </td>

      <td>
        The kind of logs that are needed.
      </td>
    </tr>
  </tbody>
</Table>

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

```javascript JavaScript
var vwoSDK = require('vwo-node-sdk');

// debug level
var logDebugLevel = vwoSDK.logging.LogLevelEnum.DEBUG:

// info level
var logInfoLevel = vwoSDK.logging.LogLevelEnum.INFO:

// warn level
var logWarnLevel = vwoSDK.logging.LogLevelEnum.WARN:

// error level
var logErrorLevel = vwoSDK.logging.LogLevelEnum.ERROR:
```

See the code example below on how to use these appropriately.

## Example

```javascript JavaScript
var customLoggingConfig = {
  logger: {
    log: (level, message) => {
      switch (level) {
        case vwoSDK.logging.LogLevelEnum.DEBUG:
          console.debug(message);
          break;
        case vwoSDK.logging.LogLevelEnum.INFO:
          console.info(message);
          break;
        case vwoSDK.logging.LogLevelEnum.ERROR:
          console.error(message);
          break;
        case vwoSDK.logging.LogLevelEnum.WARN:
          console.warn(message);
          break;
      }

      // Write below the logic to write logs to a file or pass onto other services, if required
      // Code goes here...
    }
  },
  level: vwoSDK.logging.LogLevelEnum.DEBUG
};


vwoClientInstance = vwoSDK.createInstance({
  settingsFile: settingsFile, // required
  logging: customLoggingConfig // required only when custom logger implementation is required
});
```
