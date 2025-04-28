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
  pages:
    - type: basic
      slug: how-to-launch-sdk-after-fetching-settingsfile-in-nodejs
      title: How to launch SDK after fetching SettingsFile in Node.js
---
## Why settings file should be updated?

Once you have understood the lifecycle of FullStack SDK which is explained [here](https://developers.vwo.com/docs/core-concepts#how-vwo-fullstack-sdks-work-end-to-end), you might have a doubt on when and how frequently to update the settings-file.

As mentioned in the section on how to instantiate the SDK, a settings-file is required to create an instance of the VWO SDK which represents the state of the server application corresponding to the [settings-file](https://developers.vwo.com/reference#fullstack-get-settings).

Each environment in a project has a corresponding settings file. This file has all the configuration data of all your running campaigns, such as variations, goals, and features, etc, in a [JSON](https://www.json.org/) format. Whenever there are changes in a campaign, each environment's settings file is automatically updated with the latest campaign configuration. By maintaining and synchronizing a local copy of this settings file, the SDK can run experiments without making blocking network requests to our VWO CDN. Caching your settings-file is explained [here](https://developers.vwo.com/docs/caching-your-settingsfile).

## How frequently settings-file should be updated?

Settings-file represents the current state of the server application. If you want your campaign configuration to be in sync with the SDK installed at the application end, updating your settings-file is mandatory.\
This is totally dependent on your use-case. Following is the list of actions which require settings-file to be updated so that server has a fresh copy of settings-file to work  

1. Campaign is started/paused.
2. A variation is added, deleted or traffic distribution is changed in a campaign.
3. A goal is added, deleted or goal-identifier is changed in a campaign
4. Targeting or whitelisting is changed in a campaign
5. Scheduling is changed in a campaign

> 🚧 Tracking User & Conversion for PAUSED campaign
>
> VWO will not track if a campaign is no longer running but SDK still sends tracking hits for user or conversion for that campaign.

So, depending on the usage, settings-file can be updated.

## How to update settings-file?

We have a demo app for SDK working for each language.

```javascript Node.js
const vwoSDK = require('vwo-node-sdk');

function pollSettingsFile() {
  vwoSDK
    .getSettingsFile(accountId, sdkKey)
    .then(latestSettingsFile => {
      try {
        // If SettingsFile not changed, do not re-initialize
        assert.deepEqual(currentSettingsFile, latestSettingsFile);
      } catch (err) {
        currentSettingsFile = latestSettingsFile;
        vwoClientInstance = vwoSDK.createInstance({
          settingsFile: currentSettingsFile
        });
      }
    })
    .catch(err => {
      console.error('Something went wrong in fetching account settings.', err);
    });
}

// Call immediately
pollSettingsFile();
// Poll after every 10 seconds
const pollTime = 10000;
setInterval(pollSettingsFile, pollTime);
```
```php
<?php

use vwo\VWO;

function setInterval($func = null, $interval = 0, $times = 0){
  if (($func == null) || (!function_exists($func))) {
    throw new Exception('We need a valid function.');
  }

  $seconds = $interval * 1000;
  if ($times > 0) {
    $i = 0;
    
    while ($i < $times) {
        call_user_func($func);
        $i++;
        usleep($seconds);
    }
  } else {
    while(true){
        call_user_func($func);
        usleep($seconds);
    }
  }
}
      
function pollSettingsFile() {
	$settingsFile = VWO::getSettingsFile($account_id, $sdk_key);
  $config = [ 'settingsFile'=>$settingsFile ];
  $vwoClient = new VWO($config);
}

// Call initially
pollSettingsFile();
// poll after 10 seconds
setInterval('pollSettingsFile', 10000);
```
```java
int pollTIme = 10000; // 10 seconds

(new Thread(() -> {
  while (true) {
    try {
      fetchSettingsAndCreateInstance(); // Function to fetch settings
      Thread.sleep(pollTime); //  polling time
    } catch (InterruptedException e) {
      e.printStackTrace();
    }
  }
})).start();
```
```python
import vwo

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

vwo_client_instance = None
settings_file = None

def init_sdk():
    global vwo_client_instance
    global settings_file

    new_settings_file = vwo.get_settings_file(account_id, sdk_key)

    if new_settings_file != settings_file:
        settings_file = new_settings_file

        vwo_client_instance = vwo.launch(
            settings_file
        )
        
init_sdk()
POLL_TIME = 10 // 10 seconds
set_interval(init_sdk, POLL_TIME)
```
