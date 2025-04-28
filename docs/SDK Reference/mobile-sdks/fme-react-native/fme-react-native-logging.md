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

| Parameter     | Type   | Description                                                                            |
| :------------ | :----- | :------------------------------------------------------------------------------------- |
| **logLevel**  | String | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **logPrefix** | String | The text that is prefixed to the error messages when logged. Defaults to 'VWO-SDK'.    |

**Example 1**: Set log level to control the verbosity of logs

```javascript
const options: VWOInitOptions = {
	sdkKey: SDK_KEY,
	accountId: ACCOUNT_ID,
	logLevel: LogLevel.debug
};

// initialize VWO
const vwoClient = await init(options);
```

**Example 2**: Add a custom prefix to log messages for easier identification

```javascript
const options: VWOInitOptions = {
	sdkKey: SDK_KEY,
	accountId: ACCOUNT_ID,
	logLevel: LogLevel.debug,
  logPrefix: "CUSTOM_LOG_PREFIX"
};

// initialize VWO
const vwoClient = await init(options);
```

**Example 3**: Logging Callback for Third-Party Integration

```Text Javascript
useEffect(() => {
  const removeLogListener = VWO.registerLogCallback((log) => {
   const now = new Date();
   const formattedDate = now.toLocaleString();
   const formattedLog = `[${formattedDate}] ${log.type} - ${log.message}`;

   // send to third party 
  });

  // Clean up the listener when the component unmounts
  return () => {
   removeLogListener();
  };
 }, []);
```