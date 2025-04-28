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
[Settings-file](https://developers.vwo.com/docs/nodejs-get-settings-files) is the representation of the VWO campaigns settings and is responsible for running campaigns with up-to-date configurations. Fetching the settings-file is an essential step in preventing the network requests to be made every time a user comes. Please refer to [Caching](https://developers.vwo.com/docs/caching-your-settingsfile) and [Updating](https://developers.vwo.com/docs/updating-cached-settings-file) of the settings-file for more information.
[block:api-header]
{
  "title": "Ways of Detecting Changes in Settings File"
}
[/block]
One way to detect a change in the settings-file is by using Webhooks.

Another way to detect a change in the settings-file is by polling the VWO servers frequently, and when detected, update the settings file. Refer [Configure Polling](https://developers.vwo.com/docs/nodejs-configure-polling) to know about it.
[block:api-header]
{
  "title": "Webhooks"
}
[/block]
Anytime there is a change in the FullStack campaign settings, VWO sends an HTTP POST call with a payload to the configured URL. Therefore, you know when to fetch the settings-file. It helps you to keep the most up-to-date version of the settings file. 

With Webhooks in place, you don't have to worry whether or not you are using the updated settings file. VWO keeps you up-to-date.

**For example**, as soon the traffic allocation percentage of a variation is changed from the app, VWO sends an HTTP POST call with a payload to notify about a change in the campaign settings. 

To get notified about the change in the settings file, all you need to do is-enable the Webhook setting from the Campaign Settings UI and specify the URL where you wish to receive the change event notification.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/5140e0f-Webhooks.png",
        "Webhooks.png",
        850,
        621,
        "#ebe7f0"
      ],
      "caption": "Webhooks",
      "sizing": "smart"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Advantages of using Webhooks"
}
[/block]
* Eliminates the need to frequently fetch the latest campaign settings file that reduces the load on your servers.
* Eliminates the possibility of using the old campaign settings file if not fetched in short intervals.
[block:api-header]
{
  "title": "Enabling Webhooks in VWO"
}
[/block]
If you wish to get notified whenever there is a change in campaign settings, enable the Webhooks feature. 

**Procedure**

* Log in to your VWO account.
* From the left panel, go to FULL STACK > Projects and select a project.
* Under the Environment(s) section, select the Enable Webhooks option for those environments that you prefer to subscribe to the changes for.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6e86fcd-Screen_Shot_2022-01-12_at_5.04.04_PM.png",
        "Screen Shot 2022-01-12 at 5.04.04 PM.png",
        2244,
        1200,
        "#d8dadc"
      ],
      "caption": "Environment Level Webhooks"
    }
  ]
}
[/block]
* In the **Enter the URL** field, enter the URL where you wish to receive the change event notification.
* To finalize your settings, click SAVE.
[block:api-header]
{
  "title": "Securing Webhooks with API key based authentication"
}
[/block]
While configuring the webhook, you can secure it by generating a secret key which will be sent in the **x-vwo-auth** header of the POST request by VWO. You can then compare this key at your end to authenticate that the requests are sent by VWO and not by any other third-party service. In case you want to generate a new key for the webhook, you can do that from the VWO app.
[block:callout]
{
  "type": "info",
  "body": "Make sure to keep your webhook secret key secure and private.",
  "title": "Secure your Secret Key"
}
[/block]

[block:api-header]
{
  "title": "Payload Format"
}
[/block]
The webhook URL must accept a POST call. VWO will send an HTTP POST call to the configured URL along with the payload that helps you in knowing the exact time when settings were changed along with other information. Please refer to the format below:
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"timestamp\": 1606482285,\n  \"event\": \"settings_changed\",\n  \"action\": \"campaign_settings_changed\",\n  \"triggered_by\": \"vwo\"\n}",
      "language": "json"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Usage"
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "// Assuming Express server\n\nconst express = require('express');\nconst app = express();\n// require VWO SDK\ncosnt vwoSDK = require('vwo-node-sdk');\n\nlet vwoClientInstance;\n// Fetch settings file and launch VWO SDK\nvwoSDK.getSettingsFile(accountId, sdkKey).then((settingsFile) => {\n  vwoClientInstance = vwoSDK.launch({\n    settingsFile\n  });\n});\n\nconst webhookAuthKey = 'SECRET_WEBHOOK_KEY_GENERATED_IN_VWO_APP';\n\n// Endpoint to subscribe to changes made in VWO FullStack running campaigns\napp.post('/vwo-webhook', (req, res) => {\n  console.log('WEBHOOK TRIGGERED', req.body, 'Webhook Auth Key:', req.headers['x-vwo-auth']);\n\n  if (webhookAuthKey && req.headers['x-vwo-auth']) {\n    if (req.headers['x-vwo-auth'] !== webhookAuthKey) {\n      console.error('VWO webhook authentication failed. Please check.');\n\n      return;\n    } else {\n      console.log('VWO webhook authenticated successfully.');\n    }\n  } else {\n    console.log('Skipping Webhook Authentication as webhookAuthKey is not provided');\n  }\n  \n  // You may want to fetch the updated settings so that SDK can use the same\n  vwoClientInstance.getAndUpdateSettingsFile().then(latestSettings => {\n    console.log(latestSettings);\n    \n    res.end(JSON.stringify({\n      status: 'success',\n      message: 'Webhook received and Settings-file updated successfully'\n    }));\n  });\n});\n\napp.listen(4000, () => {});",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "body": "***Get and Update Settings File*** API is available on vwoClientInstance and is not directly exported by SDK."
}
[/block]

[block:api-header]
{
  "title": "Points to remember"
}
[/block]
The webhook will be triggered whenever:

1. There is a change in the settings of any running FullStack campaign.
2. A FullStack campaign is created. 

The webhook will **not** be triggered:

1. On cloning a FullStack campaign.
2. For any changes done in Projects and Features.
3. For any account level changes.

[block:callout]
{
  "type": "warning",
  "body": "If you change the Webhook URL, then the effect will only take place when there will be some change done in any of the FullStack campaign(s).",
  "title": "Changing Webhook URL"
}
[/block]

[block:api-header]
{
  "title": "Retrying Webhook"
}
[/block]
In case the webhook URL is down (or we receive a non 200 response for the POST request), then the webhook would be retried for the next 1 hour after every 1-2 seconds.
[block:api-header]
{
  "title": "Testing Webhooks"
}
[/block]
You can use [Request Bin](https://requestbin.com/) to test out webhooks integration.