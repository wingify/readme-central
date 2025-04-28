---
title: Set SDK Environment
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
Setting up the environment for your application is critical. We strongly recommend you to use this setting carefully. The default environment is set to **production**, which means that the VWO SDK will send events to the VWO server for tracking visitors and conversions along with actions like bucketing variation, checking eligibility of a user to become part of a campaign, assigning a variation to a user, and so on.
[block:parameters]
{
  "data": {
    "h-0": "Environment",
    "h-1": "Type",
    "h-2": "Default",
    "0-0": "isDevelopmentMode",
    "0-1": "Boolean",
    "0-2": "false"
  },
  "cols": 3,
  "rows": 1
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "NOTE",
  "body": "You must set the environment to ***isDevelopmentMode: true*** if you're experimenting with the SDK."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "<?php\n\nrequire_once('vendor/autoload.php');\n\nuse vwo\\VWO;\n\n$settingsFile = VWO::getSettingsFile($accountId, $sdkKey);\n\n$config=[\n  'settingsFile'=>$settingsFile,\n  'isDevelopmentMode'=>true // Set this for DEVELOPMENT\n];\n$vwoClientInstance = new VWO($config);\n",
      "language": "php"
    }
  ]
}
[/block]