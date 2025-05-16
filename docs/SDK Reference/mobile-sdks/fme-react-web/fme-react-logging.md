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
VWO by default logs all ERROR level messages to your console. To gain more control over VWO's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter     | Type   | Description                                                                            |
| :------------ | :----- | :------------------------------------------------------------------------------------- |
| **level**     | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**    | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |
| **transport** | Object | Map of functions that control the logging behavior of each type of log message.        |

**Example 1**: Set log level to control the verbosity of logs

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

**Example 2**: Add a custom prefix to log messages for easier identification

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'debug',
    prefix: 'CUSTOM LOG PREFIX', // custom logger prefix
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

**Example 3**: Implement custom transport to handle logs your way

The transport parameter allows you to implement custom logging behavior by providing your logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

* Send logs to a third-party logging service
* Write logs to a file
* Format log messages differently
* Filter or transform log messages
* Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```typescript
import { VWOProvider, IVWOOptions, IVWOContextModel } from 'vwo-fme-react-sdk';
const vwoConfig: IVWOOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
  accountId: '123456', // VWO Account ID
  logger: {
    level: 'DEBUG',
    transport: {
      debug: (msg) => console.log(`DEBUG: ${msg}`),
      info: (msg) => console.log(`INFO: ${msg}`),
      warn: (msg) => console.log(`WARN: ${msg}`),
      error: (msg) => console.log(`ERROR: ${msg}`),
      trace: (msg) => console.log(`TRACE: ${msg}`),
    },
  },
};

const userContext: IVWOContextModel = {id: 'unique_user_id'};

const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

This "logger" object can be passed as one of the parameters when [initializing *VWOProvider*.](https://dash.readme.com/project/vwo/v2/docs/fme-react-initialization)