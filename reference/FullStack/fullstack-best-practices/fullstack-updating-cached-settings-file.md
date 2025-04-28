---
title: Updating Cached Settings FIle
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
[block:api-header]
{
  "title": "Why settings file should be updated?"
}
[/block]
Once you have understood the lifecycle of FullStack SDK which is explained [here](https://developers.vwo.com/reference#section-how-vwo-fullstack-sdks-work-end-to-end), you might have a doubt on when and how frequently to update the settings-file.

As mentioned in the section on [how to instantiate](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the SDK, settings-file is required to create an instance of the VWO SDK which represents the state of the server application corresponding to the [settings-file](https://developers.vwo.com/reference#fullstack-get-settings).

Each environment in a project has a corresponding settings-file. This file has all the configuration data of all your running campaigns, such as variations, goals, and features, etc, in a [JSON](https://www.json.org/) format. Whenever there are changes in a campaign, each environment's datafile is automatically updated with the latest campaign configuration. By maintaining and synchronizing a local copy of this settings-file, the SDK can run experiments without making blocking network requests to our VWO CDN. Caching your settings-file is explained [here](https://developers.vwo.com/reference#fullstack-best-practices-caching-your-settingsfile).
[block:api-header]
{
  "title": "How frequently settings-file should be updated?"
}
[/block]
Settings-file represents the current state of the server application. If you want your campaign configuration to be in sync with the SDK installed at the application end, updating your settings-file is mandatory.
This is totally dependent on your use-case. Following is the list of actions which require settings-file to be updated so that server has a fresh copy of settings-file to work  

1. Campaign is started/paused.
2. A variation is added, deleted or traffic distribution is changed in a campaign.
3. A goal is added, deleted or goal-identifier is changed in a campaign
4. Targeting or whitelisting is changed in a campaign
5. Scheduling is changed in a campaign

[block:callout]
{
  "type": "warning",
  "body": "VWO will not track if a campaign is no longer running but SDK still sends tracking hits for user or conversion for that campaign.",
  "title": "Tracking User & Conversion for PAUSED campaign"
}
[/block]
So, depending on the usage, settings-file can be updated.
[block:api-header]
{
  "title": "How to update settings-file?"
}
[/block]
We have a demo app for SDK working for each language.
[block:code]
{
  "codes": [
    {
      "code": "const vwoSDK = require('vwo-node-sdk');\n\nfunction pollSettingsFile() {\n  vwoSDK\n    .getSettingsFile(accountId, sdkKey)\n    .then(latestSettingsFile => {\n      try {\n        // If SettingsFile not changed, do not re-initialize\n        assert.deepEqual(currentSettingsFile, latestSettingsFile);\n      } catch (err) {\n        currentSettingsFile = latestSettingsFile;\n        vwoClientInstance = vwoSDK.createInstance({\n          settingsFile: currentSettingsFile\n        });\n      }\n    })\n    .catch(err => {\n      console.error('Something went wrong in fetching account settings.', err);\n    });\n}\n\n// Call immediately\npollSettingsFile();\n// Poll after every 10 seconds\nconst pollTime = 10000;\nsetInterval(pollSettingsFile, pollTime);",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "<?php\n\nuse vwo\\VWO;\n\nfunction setInterval($func = null, $interval = 0, $times = 0){\n  if (($func == null) || (!function_exists($func))) {\n    throw new Exception('We need a valid function.');\n  }\n\n  $seconds = $interval * 1000;\n  if ($times > 0) {\n    $i = 0;\n    \n    while ($i < $times) {\n        call_user_func($func);\n        $i++;\n        usleep($seconds);\n    }\n  } else {\n    while(true){\n        call_user_func($func);\n        usleep($seconds);\n    }\n  }\n}\n      \nfunction pollSettingsFile() {\n\t$settingsFile = VWO::getSettingsFile($account_id, $sdk_key);\n  $config = [ 'settingsFile'=>$settingsFile ];\n  $vwoClient = new VWO($config);\n}\n\n// Call initially\npollSettingsFile();\n// poll after 10 seconds\nsetInterval('pollSettingsFile', 10000);",
      "language": "php"
    },
    {
      "code": "int pollTIme = 10000; // 10 seconds\n\n(new Thread(() -> {\n  while (true) {\n    try {\n      fetchSettingsAndCreateInstance(); // Function to fetch settings\n      Thread.sleep(pollTime); //  polling time\n    } catch (InterruptedException e) {\n      e.printStackTrace();\n    }\n  }\n})).start();",
      "language": "java"
    },
    {
      "code": "import vwo\n\ndef set_interval(func, sec):\n    def func_wrapper():\n        set_interval(func, sec)\n        func()\n    t = threading.Timer(sec, func_wrapper)\n    t.start()\n    return t\n\nvwo_client_instance = None\nsettings_file = None\n\ndef init_sdk():\n    global vwo_client_instance\n    global settings_file\n\n    new_settings_file = vwo.get_settings_file(account_id, sdk_key)\n\n    if new_settings_file != settings_file:\n        settings_file = new_settings_file\n\n        vwo_client_instance = vwo.launch(\n            settings_file\n        )\n        \ninit_sdk()\nPOLL_TIME = 10 // 10 seconds\nset_interval(init_sdk, POLL_TIME)",
      "language": "python"
    }
  ]
}
[/block]