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
  pages:
    - type: basic
      slug: fme-php-storage
      title: Storage Service
---
Wingify by default logs all ERROR level messages to your server's console. To gain more control over Wingify's logging behavior, you can use the logger parameter in the init configuration.

## Logger Properties

| Parameter              | Type    | Description                                                                            |
| :--------------------- | :------ | :------------------------------------------------------------------------------------- |
| **level**              | String  | Level or Type of error. Could be one of the following: DEBUG, INFO, ERROR, TRACE, WARN |
| **prefix**             | String  | The text that is prefixed to the error messages when logged. Defaults to 'Wingify-SDK'.    |
| **transport**          | Object  | Custom logger implementation                                                           |
| **isAnsiColorEnabled** | Boolean | For ANSI colours output in logging                                                     |

**Example 1**: Set log level to control the verbosity of logs

```php
$vwoClient1 = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'logger' => [
    'level' => 'DEBUG',
  ],
]);
```

**Example 2**: Add a custom prefix to log messages for easier identification

```php
$vwoClient2 = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'accountId' => '123456',
  'logger' => [
    'level' => 'DEBUG',
    'prefix' => 'CUSTOM LOG PREFIX',
  ],
]);
```

**Example 3**: Implement custom transport to handle logs your way  
The transports parameter allows you to implement custom logging behavior by providing your own logging functions. You can define handlers for different log levels (debug, info, warn, error, trace) to process log messages according to your needs.

For example, you could:

* Send logs to a third-party logging serviceWrite logs to a file
* Format log messages differently
* Filter or transform log messages
* Route different log levels to different destinations

The transport object should implement handlers for the log levels you want to customize. Each handler receives the log message as a parameter.

```php
$vwoClient3 = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'logger' => [
    'transport' => [
        'level' => 'DEBUG',
        'logHandler' => function($msg, $level){
          echo "$msg $level";
        }
    ],
  ]
]);
```

For multiple `transports` you can use the transports parameter. For example:

```php
$vwoClient3 = VWO::init([
  'sdkKey' => '32-alpha-numeric-sdk-key',
  'logger' => [
    'transports' => [
        [
            'level' => 'DEBUG',
            'logHandler' => function($msg, $level){
              echo "$msg $level";
            }
        ],
        [
            'level' => 'INFO',
            'logHandler' => function($msg, $level){
              echo "$msg $level";
            }
        ]
    ]
  ]
]);
```

**Example 4**: Enables ANSI-colored log output for better terminal readability.

By default, the PHP SDK outputs log messages to standard output or forwards them to a custom logger without any modification. However, when isAnsiColorEnabled is set to true, the SDK formats the log type with appropriate ANSI colours for better readability in terminal environments.

These colour codes are intended for terminals that support ANSI escape sequences. As a result, if you are using a custom logger, the log messages you receive will also include the corresponding ASCII/ANSI colour codes, which may need to be handled or stripped depending on how and where the logs are displayed.

```php
$vwoClient = VWO::init([
    'accountId' => '123456',
    'sdkKey' => '32-alpha-numeric-sdk-key',
    'logger' => [
        'level' => 'DEBUG',
        'isAnsiColorEnabled' => true, // Enable colored log levels in terminal. Default is false
    ],
]);
```

<Callout icon="📘" theme="info">
  **Note:**: Before `v1.17.0`, the default behavior also printed ASCII characters. This caused custom loggers to always include these ASCII characters, even though they are not required by default.
</Callout>
