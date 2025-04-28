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
      "code": "import vwo\nfrom vwo import LOG_LEVELS\n\n# debug level\nlog_debug_level = LOG_LEVELS.DEBUG\n\n# info level\nlog_info_level = LOG_LEVELS.INFO\n\n# warn level\nlog_warn_level = LOG_LEVELS.WARNING\n\n# error level\nlog_error_level = LOG_LEVELS.ERROR\n",
      "language": "python"
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
      "code": "import vwo\nfrom vwo import logger\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\n\n# Only update the log level\ncustom_logger = logger.DefaultLogger(logger.DEBUG)\nvwo_client_instance = vwo.VWO(settings_file, logger = custom_logger)\n\n# Or override the custom logger method to handle logs\n# i.e Send them in file or store them in database or push them into third-part service\n\nclass CustomLogger:\n   def log(self, level, message):\n      print(level, message)\n      # ...write to file or database or integrate with any third-party service\n\nvwo_client_instance = vwo.VWO(settings_file, logger = CustomLogger())",
      "language": "python"
    }
  ]
}
[/block]