---
title: Configure Webhooks
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
[Settings-file](https://developers.vwo.com/reference#fullstack-get-settings) is the representation of the VWO campaigns settings and is responsible for running campaigns with up-to-date configurations. Fetching the settings-file is an essential step in preventing the network requests to be made every time a user comes. Please refer to [Caching](https://developers.vwo.com/reference#fullstack-best-practices-caching-your-settingsfile) and [Updating](https://developers.vwo.com/reference#fullstack-updating-cached-settings-file) of the settings-file for more information.

## Ways of Detecting Changes in Settings File

One way to detect a change in the settings-file is by using Webhooks.

Another way to detect a change in the settings-file is by polling the VWO servers frequently, and when detected, update the settings file. Refer [Configure Polling](https://developers.vwo.com/reference#fullstack-configure-polling) to know about it.

## Webhooks

Anytime there is a change in the FullStack campaign settings, VWO sends an HTTP POST call with a payload to the configured URL. Therefore, you know when to fetch the settings-file. It helps you to keep the most up-to-date version of the settings file. 

With Webhooks in place, you don't have to worry whether or not you are using the updated settings file. VWO keeps you up-to-date.

**For example**, as soon the traffic allocation percentage of a variation is changed from the app, VWO sends an HTTP POST call with a payload to notify about a change in the campaign settings. 

To get notified about the change in the settings file, all you need to do is-enable the Webhook setting from the Campaign Settings UI and specify the URL where you wish to receive the change event notification.

<Image title="Webhooks.png" alt={850} width="smart" src="https://files.readme.io/5140e0f-Webhooks.png">
  Webhooks
</Image>

## Advantages of using Webhooks

* Eliminates the need to frequently fetch the latest campaign settings file that reduces the load on your servers.
* Eliminates the possibility of using the old campaign settings file if not fetched in short intervals.

## Enabling Webhooks in VWO

If you wish to get notified whenever there is a change in campaign settings, enable the Webhooks feature. 

**Procedure**

* Login to your VWO account.
* Go to Settings > CAMPAIGN SETTINGS.
* Scroll down to the **Webhooks** section and select Enable Webhooks.

<Image title="webhooks.png" alt={858} src="https://files.readme.io/6fd94b5-webhooks.png">
  VWO - Enable Webhooks
</Image>

* In the **Enter the URL** field, enter the URL where you wish to receive the change event notification.
* To finalize your settings, click SAVE.

## Securing Webhooks with API key based authentication

While configuring the webhook, you can secure it by generating a secret key which will be sent in the **x-vwo-auth** header of the POST request by VWO. You can then compare this key at your end to authenticate that the requests are sent by VWO and not by any other third-party service. In case you want to generate a new key for the webhook, you can do that from the VWO app.

> 📘 Secure your Secret Key
>
> Make sure to keep your webhook secret key secure and private.

## Payload Format

The webhook URL must accept a POST call. VWO will send an HTTP POST call to the configured URL along with the payload that helps you in knowing the exact time when settings were changed along with other information. Please refer to the format below:

```json
{
  "timestamp": 1606482285,
  "event": "settings_changed",
  "action": "campaign_settings_changed",
  "triggered_by": "vwo"
}
```

## Usage

```javascript Node.js
// Assuming Express server

const express = require('express');
const app = express();
// require VWO SDK
cosnt vwoSDK = require('vwo-node-sdk');

let vwoClientInstance;
// Fetch settings file and launch VWO SDK
vwoSDK.getSettingsFile(accountId, sdkKey).then((settingsFile) => {
  vwoClientInstance = vwoSDK.launch({
    settingsFile
  });
});

const webhookAuthKey = 'SECRET_WEBHOOK_KEY_GENERATED_IN_VWO_APP';

// Endpoint to subscribe to changes made in VWO FullStack running campaigns
app.post('/vwo-webhook', (req, res) => {
  console.log('WEBHOOK TRIGGERED', req.body, 'Webhook Auth Key:', req.headers['x-vwo-auth']);

  if (webhookAuthKey && req.headers['x-vwo-auth']) {
    if (req.headers['x-vwo-auth'] !== webhookAuthKey) {
      console.error('VWO webhook authentication failed. Please check.');

      return;
    } else {
      console.log('VWO webhook authenticated successfully.');
    }
  } else {
    console.log('Skipping Webhook Authentication as webhookAuthKey is not provided');
  }
  
  // You may want to fetch the updated settings so that SDK can use the same
  vwoClientInstance.getAndUpdateSettingsFile().then(latestSettings => {
    console.log(latestSettings);
    
    res.end(JSON.stringify({
      status: 'success',
      message: 'Webhook received and Settings-file updated successfully'
    }));
  });
});

app.listen(4000, () => {});
```
```php
<?php
// Endpoint to subscribe to changes made in VWO FullStack running campaigns

require_once('vendor/autoload.php');
use vwo\VWO;

// When Webhook gets triggered, pass a boolean to getSettingsFile API as the third argument and its value as true, defaults to false
$settingsFile = VWO::getSettingsFile($accountId, $sdkKey, true);

?>
```
```java
// Endpoint to subscribe to changes made in VWO FullStack running 
@PostMapping("/vwo-webhook")
@ResponseStatus(HttpStatus.OK)
public void webhook(
  @RequestHeader("x-vwo-auth") String secretKey,
  @RequestBody String body
) {
  String webhookAuthKey = "SECRET_WEBHOOK_KEY_GENERATED_IN_VWO_APP";
  
  if (webhookAuthKey != null && secretKey != null) {
    if (secretKey.equals(webhookAuthKey)) {
      System.out.println("VWO webhook authenticated successfully.");
    } else {
      System.out.println("VWO webhook authentication failed. Please check.");
      return;
    }
  } else {
    System.out.println("Skipping Webhook Authentication as webhookAuthKey is not provided.");
  }
   
  if (vwoClientInstance != null) {
    vwoClientInstance.getAndUpdateSettingsFile(accountId, sdkKey);
    System.out.println(vwoClientInstance.getSettingFileString());
  }
}
```
```python
# Assuming Flask server

# require VWO SDK
import vwo
from flask import Flask, request, abort, make_response

@app.route('/vwo-webhook', methods=['POST'])
def webhook():
    print('WEBHOOK TRIGGERED, {body}, Webhook Auth Key: {webhook_auth_key}'
          .format(
             body=request.json,
             webhook_auth_key=request.headers.get('x-vwo-auth')
          )
    )

    WEBHOOK_AUTH_KEY = AccountDetails.get('webhook_auth_key')
    
    if WEBHOOK_AUTH_KEY and request.headers.get('x-vwo-auth'):
        if WEBHOOK_AUTH_KEY != request.headers.get('x-vwo-auth'):
            print('VWO Webhook authentication failed')
            abort(401)
        else:
            print('VWO Webhook authentication successful')
    else:
        print('Skipping authentication as missing webhook authentication key')

    if vwo_client_instance:
        settings_file = vwo_client_instance.get_and_update_settings_file(
          AccountDetails.get('account_id'),
          AccountDetails.get('sdk_key'),
          True
        )
    return make_response({'status': 'success', 'message': 'settings updated successfully'}, 200)
```

> 🚧 ***Get and Update Settings File*** API is available on vwoClientInstance and is not directly exported by SDK.\
> ***Get and Update Settings File*** API - is only available in **Node.js, Java, and Python SDKs** from **v1.10**+ onwards.
>
> ***getSettingsFIle*** API accepts a third argument as a boolean. Pass true to fetch the latest settings-file when a webhook is triggered. Defaults to false. This is only available in PHP SDK from **v1.10**+ onwards.

## Points to remember

The webhook will be triggered whenever:

1. There is a change in the settings of any running FullStack campaign.
2. A FullStack campaign is created. 

The webhook will **not** be triggered:

1. On cloning a FullStack campaign.
2. For any changes done in Projects and Features.
3. For any account level changes.

> 🚧 Changing Webhook URL
>
> If you change the Webhook URL, then the effect will only take place when there will be some change done in any of the FullStack campaign(s).

## Retrying Webhook

In case the webhook URL is down (or we receive a non 200 response for the POST request), then the webhook would be retried for the next 1 hour after every 1-2 seconds.

## Testing Webhooks

You can use [Request Bin](https://requestbin.com/) to test out webhooks integration.
