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
Different SDKs accept loggers differently.

**Node.js**

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
      "name": "Node.js"
    },
    {
      "code": "<?php\n\nrequire_once('vendor/autoload.php');\n\nuse vwo\\VWO;\n\n// debug level\n$logLevelDebug = VWO::LOG_LEVEL_DEBUG;\n\n// info level\n$logLevelInfo = VWO::LOG_LEVEL_INFO;\n\n// warn level\n$logLevelWarning = VWO::LOG_LEVEL_WARNING;\n\n// error level\n$logLevelError = VWO::LOG_LEVEL_ERROR;\n\n",
      "language": "php"
    },
    {
      "code": "import vwo\nfrom vwo import LOG_LEVELS\n\n# debug level\nlog_debug_level = LOG_LEVELS.DEBUG\n\n# info level\nlog_info_level = LOG_LEVELS.INFO\n\n# warn level\nlog_warn_level = LOG_LEVELS.WARNING\n\n# error level\nlog_error_level = LOG_LEVELS.ERROR\n",
      "language": "python"
    },
    {
      "code": "using VWOSdk;\n\n// debug level\nvar logDebugLevel = LogLevel.DEBUG;\n\n// info level\nvar logInfoLevel = LogLevel.INFO;\n\n// warn level\nvar logWarnLevel = LogLevel.WARNING;\n\n// error level\nvar logErrorLevel = LogLevel.ERROR;\n  ",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "@@logger_instance = logger_instance || Logger.new(STDOUT, level: :debug)\n@@logger_instance = logger_instance || Logger.new(STDOUT, level: :info)\n@@logger_instance = logger_instance || Logger.new(STDOUT, level: :warning)\n@@logger_instance = logger_instance || Logger.new(STDOUT, level: :error)\n",
      "language": "ruby"
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
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvar customLoggingConfig = {\n  logger: {\n    log: (level, message) => {\n      switch (level) {\n        case vwoSDK.logging.LogLevelEnum.DEBUG:\n          console.debug(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.INFO:\n          console.info(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.ERROR:\n          console.error(message);\n          break;\n        case vwoSDK.logging.LogLevelEnum.WARN:\n          console.warn(message);\n          break;\n      }\n\n      // Write below the logic to write logs to a file or pass onto other services, if required\n      // Code goes here...\n    }\n  },\n  level: vwoSDK.logging.LogLevelEnum.DEBUG\n};\n\n\nvwoClientInstance = vwoSDK.createInstance({\n  settingsFile: settingsFile, // required\n  logging: customLoggingConfig // required only when custom logger implementation is required\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "// CUSTOM LOGGER File - CustomLogger.php\n\n<?php\nrequire_once('vendor/autoload.php');\nuse vwo\\Logger\\LoggerInterface;\n\n/**\n * Class CustomLogger\n */\nClass CustomLogger implements LoggerInterface{\n  /**\n   * @param $message\n   * @param $level\n   * @return string\n   */\n  public function addLog($message, $level){\n    // do code for writing logs to your files/databases\n    // throw new Exception('my test');\n    // return $x;\n  }\n}\n?>\n\n// MAIN FILE\n\n<?php\n\nrequire_once('vendor/autoload.php');\nrequire_once('CustomLogger.php');\n\nuse vwo\\VWO;\n\n$config = [\n  'settingsFile'=>$settingsFile,\n  'logging'=>new CustomLogger()\n];\n\n$vwoClientInstance = new VWO($config);\n",
      "language": "php"
    },
    {
      "code": "import vwo\nfrom vwo import logger\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\n\n# Only update the log level\ncustom_logger = logger.DefaultLogger(logger.DEBUG)\nvwo_client_instance = vwo.VWO(settings_file, logger = custom_logger)\n\n# Or override the custom logger method to handle logs\n# i.e Send them in file or store them in database or push them into third-part service\n\nclass CustomLogger:\n   def log(self, level, message):\n      print(level, message)\n      # ...write to file or database or integrate with any third-party service\n\nvwo_client_instance = vwo.VWO(settings_file, logger = CustomLogger())",
      "language": "python"
    },
    {
      "code": "using VWO.Sdk;\n\n// If only log level needs to eb changed\nVWO.Configure(LogLevel.DEBUG);\n\n// If custom logger implementation is required\npublic class CustomLogger : ILogWriter\n{\n        public void WriteLog(LogLevel logLevel, string message)\n        {\n            // ...write to file or database or integrate with any third-party service\n        }\n}\n\n//  Configure Custom Logger with SDK.\nVWO.Configure(new CustomLogWriter());",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nVWO.getSettingsFile(accountId, sdkKey);\n\npublic static VWOLogger getCustomLogger() {\n    return new VWOLogger() {\n        @Override\n        public void debug(String message, Object... params) {\n            LOGGER.debug(message, params);\n        }\n\n        @Override\n        public void info(String message, Object... params) {\n            LOGGER.info(message, params);\n        }\n\n        @Override\n        public void warn(String message, Object... params) {\n            LOGGER.warn(message, params);\n        }\n\n        @Override\n        public void error(String message, Object... params) {\n            LOGGER.error(message, params);\n        }\n    };\n}\n\nVWO.createInstance(settingsFile)\n  .withCustomLogger(getCustomLogger())\n  .build();",
      "language": "java"
    },
    {
      "code": "# Basic Custom Logging Before Starting App\nclass VWO\n  class CustomLogger\n    def initialize(logger_instance)\n      # Only log info logs and above, no debug\n      @@logger_instance = logger_instance || Logger.new(STDOUT, level: :info)\n    end\n\n    def log(level, message)\n      # Basic Modification\n      message = \"#{Time.now} #{message}\"\n      @@logger_instance.log(level, message)\n    end\n  end\nend\n\n\n# Custom Logging After Starting App\ndef start_custom_logger\n  VWO::CustomLogger.class_eval do\n    # Override this method to handle logs in a custom manner\n    def log(level, message)\n      # Modify message for custom logging\n      message = \"Custom message #{message}\"\n      VWO::CustomLogger.class_variable_get('@@logger_instance').log(level, message)\n    end\n  end\nend\n\ndef stop_custom_logger\n  VWO::CustomLogger.class_eval do\n    def log(level, message)\n      message = \"#{Time.now} #{message}\"\n      VWO::CustomLogger.class_variable_get('@@logger_instance').log(level, message)\n    end\n  end\nend\n\nstart_custom_logger\n# Call API methods\nstop_custom_logger",
      "language": "ruby"
    },
    {
      "code": "import vwo \"github.com/wingify/vwo-go-sdk\"\nimport \"github.com/wingify/vwo-go-sdk/pkg/api\"\n\n// declare Log interface with the following CustomLog function signature\ntype Log interface {\n\tCustomLog(level, errorMessage string)\n}\n\n// declare a LogS struct to implement Log interface\ntype LogS struct{}\n\n// Get function to handle logs\nfunc (c *LogS) CustomLog(level, errorMessage string) {}\n\nfunc main() {\n\tsettingsFile := vwo.GetSettingsFile(\"accountID\", \"SDKKey\")\n\t// create LogS object\n\tlogger := &LogS{}\n\n\tvwoClientInstance, err := vwo.Launch(settingsFile, api.WithLogger(logger))\n\tif err != nil {\n\t\t//handle err\n\t}\n}",
      "language": "go"
    }
  ]
}
[/block]