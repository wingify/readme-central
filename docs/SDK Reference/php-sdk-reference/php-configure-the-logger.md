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

See the code example below on how to use these appropriately.

## Example

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
