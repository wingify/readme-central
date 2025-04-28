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
      "code": "var settingsFile = await vwoSDK.getSettingsFile(accountId, sdkKey);\n\nvar vwoClientInstance = vwoSDK.launch({\n  isDevelopmentMode: true, // Set this for DEVELOPMENT\n  settingsFile: settingsFile\n});",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n\nrequire_once('vendor/autoload.php');\n\nuse vwo\\VWO;\n\n$settingsFile = VWO::getSettingsFile($accountId, $sdkKey);\n\n$config=[\n  'settingsFile'=>$settingsFile,\n  'isDevelopmentMode'=>true // Set this for DEVELOPMENT\n];\n$vwoClientInstance = new VWO($config);\n",
      "language": "php"
    },
    {
      "code": "import vwo\n\nsettings_file = vwo.get_settings_file(account_id, sdk_key)\n\nvwo_client_instance = vwo.launch(settings_file, is_development_mode=True)\n",
      "language": "python"
    },
    {
      "code": "using VWOSdk;\n\nSettings settingsFile = VWO.GetSettings(accountId, sdkKey);\nIVWOClient vwoClient = VWO.Instantiate(settingsFile, isDevelopmentMode: true);\n",
      "language": "csharp",
      "name": ".NET"
    },
    {
      "code": "import com.vwo.VWO;\n\nString settingsFile = VWO.getSettingsFile(accountId, sdkKey);\n\nVWO vwoInstance = VWO.launch(settingsFile)\n                  .withDevelopmentMode(true)\n                  .build();",
      "language": "java"
    },
    {
      "code": "is_development_mode = true\n\nvwo_client_instance = VWO.new(account_id, sdk_key, custom_logger, UserStorage.new, is_development_mode, settings_file)",
      "language": "ruby"
    },
    {
      "code": "settingsFile := vwo.GetSettingsFile(\"accountId\", \"sdkKey\")\n\n// Instance with custom options\ninstance, err := vwo.Launch(settingsFile, api.WithDevelopmentMode())\nif err != nil {\n\t//handle err\n}\n",
      "language": "go"
    }
  ]
}
[/block]