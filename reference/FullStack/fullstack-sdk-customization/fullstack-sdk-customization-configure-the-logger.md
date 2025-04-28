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

Different SDKs accept loggers differently.

**Node.js**

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

```javascript Node.js
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
```php
<?php

require_once('vendor/autoload.php');

use vwo\VWO;

// debug level
$logLevelDebug = VWO::LOG_LEVEL_DEBUG;

// info level
$logLevelInfo = VWO::LOG_LEVEL_INFO;

// warn level
$logLevelWarning = VWO::LOG_LEVEL_WARNING;

// error level
$logLevelError = VWO::LOG_LEVEL_ERROR;
```
```python
import vwo
from vwo import LOG_LEVELS

# debug level
log_debug_level = LOG_LEVELS.DEBUG

# info level
log_info_level = LOG_LEVELS.INFO

# warn level
log_warn_level = LOG_LEVELS.WARNING

# error level
log_error_level = LOG_LEVELS.ERROR
```
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
```ruby
@@logger_instance = logger_instance || Logger.new(STDOUT, level: :debug)
@@logger_instance = logger_instance || Logger.new(STDOUT, level: :info)
@@logger_instance = logger_instance || Logger.new(STDOUT, level: :warning)
@@logger_instance = logger_instance || Logger.new(STDOUT, level: :error)
```

See the code example below on how to use these appropriately.

## Example

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

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
```php
// CUSTOM LOGGER File - CustomLogger.php

<?php
require_once('vendor/autoload.php');
use vwo\Logger\LoggerInterface;

/**
 * Class CustomLogger
 */
Class CustomLogger implements LoggerInterface{
  /**
   * @param $message
   * @param $level
   * @return string
   */
  public function addLog($message, $level){
    // do code for writing logs to your files/databases
    // throw new Exception('my test');
    // return $x;
  }
}
?>

// MAIN FILE

<?php

require_once('vendor/autoload.php');
require_once('CustomLogger.php');

use vwo\VWO;

$config = [
  'settingsFile'=>$settingsFile,
  'logging'=>new CustomLogger()
];

$vwoClientInstance = new VWO($config);
```
```python
import vwo
from vwo import logger

settings_file = vwo.get_settings_file(account_id, sdk_key)

# Only update the log level
custom_logger = logger.DefaultLogger(logger.DEBUG)
vwo_client_instance = vwo.VWO(settings_file, logger = custom_logger)

# Or override the custom logger method to handle logs
# i.e Send them in file or store them in database or push them into third-part service

class CustomLogger:
   def log(self, level, message):
      print(level, message)
      # ...write to file or database or integrate with any third-party service

vwo_client_instance = vwo.VWO(settings_file, logger = CustomLogger())
```
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
```java
import com.vwo.VWO;

VWO.getSettingsFile(accountId, sdkKey);

public static VWOLogger getCustomLogger() {
    return new VWOLogger() {
        @Override
        public void debug(String message, Object... params) {
            LOGGER.debug(message, params);
        }

        @Override
        public void info(String message, Object... params) {
            LOGGER.info(message, params);
        }

        @Override
        public void warn(String message, Object... params) {
            LOGGER.warn(message, params);
        }

        @Override
        public void error(String message, Object... params) {
            LOGGER.error(message, params);
        }
    };
}

VWO.createInstance(settingsFile)
  .withCustomLogger(getCustomLogger())
  .build();
```
```ruby
# Basic Custom Logging Before Starting App
class VWO
  class CustomLogger
    def initialize(logger_instance)
      # Only log info logs and above, no debug
      @@logger_instance = logger_instance || Logger.new(STDOUT, level: :info)
    end

    def log(level, message)
      # Basic Modification
      message = "#{Time.now} #{message}"
      @@logger_instance.log(level, message)
    end
  end
end


# Custom Logging After Starting App
def start_custom_logger
  VWO::CustomLogger.class_eval do
    # Override this method to handle logs in a custom manner
    def log(level, message)
      # Modify message for custom logging
      message = "Custom message #{message}"
      VWO::CustomLogger.class_variable_get('@@logger_instance').log(level, message)
    end
  end
end

def stop_custom_logger
  VWO::CustomLogger.class_eval do
    def log(level, message)
      message = "#{Time.now} #{message}"
      VWO::CustomLogger.class_variable_get('@@logger_instance').log(level, message)
    end
  end
end

start_custom_logger
# Call API methods
stop_custom_logger
```
```go
import vwo "github.com/wingify/vwo-go-sdk"
import "github.com/wingify/vwo-go-sdk/pkg/api"

// declare Log interface with the following CustomLog function signature
type Log interface {
	CustomLog(level, errorMessage string)
}

// declare a LogS struct to implement Log interface
type LogS struct{}

// Get function to handle logs
func (c *LogS) CustomLog(level, errorMessage string) {}

func main() {
	settingsFile := vwo.GetSettingsFile("accountID", "SDKKey")
	// create LogS object
	logger := &LogS{}

	vwoClientInstance, err := vwo.Launch(settingsFile, api.WithLogger(logger))
	if err != nil {
		//handle err
	}
}
```
