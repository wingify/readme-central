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
[Settings-file](https://developers.vwo.com/docs/dotnet-get-settings-file) is the representation of the VWO campaigns settings and is responsible for running campaigns with up-to-date configurations. Fetching the settings-file is an essential step in preventing the network requests to be made every time a user comes. Please refer to [Caching](https://developers.vwo.com/docs/caching-your-settingsfile) and [Updating](https://developers.vwo.com/docs/updating-cached-settings-file) of the settings-file for more information.

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

* Log in to your VWO account.
* From the left panel, go to FULL STACK > Projects and select a project.
* Under the Environment(s) section, select the Enable Webhooks option for those environments that you prefer to subscribe to the changes for.

<Image title="Screen Shot 2022-01-12 at 5.04.04 PM.png" alt={2244} src="https://files.readme.io/ed6bd5c-Screen_Shot_2022-01-12_at_5.04.04_PM.png">
  Environment Level Webhooks
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

```go Go
router.POST("/vwo-webhook", controllers.WebhookController)

// PushController function gets the configuration values and VWO instance to
// check the Push API and displayes the html output
func WebhookController(c *gin.Context) {
	config := config.GetConfig()
	instance := models.GetVWOInstance()
	signature, exists := c.Request.Header["X-Vwo-Auth"]

	if config.IsSet("webhookSecret") && exists {
		webhookAuthKey := config.GetString("webhookSecret")
		if signature[0] != webhookAuthKey {
			fmt.Println("VWO webhook authentication failed. Please check.")
			return
		} else {
			fmt.Println("VWO webhook authenticated successfully.")
		}
	} else {
		fmt.Println("Skipping Webhook Authentication as webhookAuthKey is not provided in config")
	}
	instance.GetAndUpdateSettingsFile()
}
```

> 🚧 ***Get and Update Settings File*** API is available on vwoClientInstance and is not directly exported by SDK.

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
