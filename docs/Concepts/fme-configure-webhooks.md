---
title: Configuring Webhooks
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

Webhooks are user-defined HTTP callbacks or push APIs. They are a way for one system to provide real-time data or event notifications to another system by sending an HTTP POST request to a URL configured by the recipient system. Unlike APIs, which are pulled (the client must send a request to receive data), webhooks are pushed (the server sends data when an event occurs).

This makes webhooks ideal for event-driven integrations, allowing you to respond instantly to events in an external service, such as feature flag changes, campaign activations, or user configuration updates.

## Key Characteristics:

* **Event-driven**: Webhooks are invoked only when a particular event occurs.
* **Lightweight communication**: Usually performed over HTTP POST with a JSON payload.
* **One-way communication**: They notify, not expect a response.
* **Near real-time**: As soon as the event is triggered, data is pushed.

<br />

## Key Features:

* Push-based system: Immediate delivery on configuration changes
* Reduces SDK polling overhead
* Secure delivery with HMAC-SHA256 signature

<br />

## How Webhooks Work

1. **Event Occurs**: An event happens in the source system (e.g., a feature flag is modified in a control panel).
2. **Webhook Triggered**: The system detects this event and immediately sends an HTTP POST request to a pre-configured URL (the webhook listener endpoint).
3. **Payload Delivered**: This POST request contains a JSON (or optionally other formats) payload with data relevant to the event.
4. **Consumer Acts**: The receiving server processes this data and performs any required logic, like updating cache, triggering workflows, or logging events.

<Image align="center" border={true} caption="How Webhooks Work" src="https://files.readme.io/9bb354009aee72f1ad4b48b74871181e589b37b9c2877313902a249400775721-webhooks.png" />

## Role of Webhooks in Wingify FE SDKs

Wingify FE SDKs fetch configuration settings (features, campaigns, variations) from the Wingify servers. By default, they periodically poll for updates. Webhooks allow a more efficient and scalable solution by enabling:

* **Real-time config sync**: No delay between a change on the dashboard and its reflection in the SDK.
* **Hot-reloading support**: SDK settings are updated in-memory using the webhook payload.
* **Stateless server design**: Webhooks help ensure distributed services are always up-to-date without storing stale configs.

<br />

## Enabling Webhooks in Wingify

1. Log in to your Wingify account.
2. Navigate to `Configurations` → `Website and Apps` from the left-hand panel.
3. Select the `Default Project` associated with your FE setup.
4. Click on the `Configurations` tab.
5. Under the **Environment(s)** section, enable the Webhook option for the specific environment(s) you want to subscribe to for configuration change events.
6. In the `Wehook URL` field, provide the endpoint URL where you want to receive webhook notifications.
7. Click SAVE to apply your changes.

<br />

<Image align="center" border={true} caption="Configuring FE Webhooks in Wingify" src="https://files.readme.io/c44a29c6f6a6396ceb2690d81878d377f2a1bef0f31d2d3f7688c78ed65f0b33-Screenshot_2025-07-15_at_2.26.38_AM.png" />

<br />

> Once saved, Wingify will start sending HTTP POST requests to your configured URL whenever relevant configuration changes occur in the selected environment(s).

<br />

## Securing Webhooks with API Key-Based Authentication

When setting up a webhook in the Wingify app, it’s essential to ensure that your endpoint only accepts requests from trusted sources, i.e., from Wingify itself. To facilitate this, Wingify supports **API key-based authentication** using a secret key.

### How It Works

* During webhook configuration in the Wingify dashboard, you can generate a secret key specifically for that webhook.
* Every time Wingify triggers the webhook (via an HTTP `POST`), it will include this secret key in the request header:
  ```
  x-vwo-auth: YOUR\_SECRET\_KEY
  ```
* On your server, your webhook handler should:
  1. Read the value of the `x-vwo-auth` header from the request.
  2. Compare it with the secret key you generated and securely stored during setup.
  3. Reject the request (e.g., with a `401 Unauthorized`) if the key does not match.

This approach ensures that only authenticated POST requests from Wingify are accepted by your application, effectively preventing any third-party or malicious source from spoofing webhook events.

### Regenerating the Secret Key

If the key gets exposed or you suspect unauthorized access, you can regenerate a new secret key from within the Wingify app. Once updated:

* Wingify will use the new key for all future webhook calls.
* You must also update your server-side logic to validate against the new key.

> 📘 Note
>
> 🔒 Keep your secret key secure, do not expose it in frontend code, logs, or error messages.

<br />

## Webhook Payload Format

Whenever a settings change occurs (e.g., feature flag modified, campaign updated), Wingify triggers a webhook request to your configured endpoint. This is an HTTP POST request with a JSON payload that contains metadata about the event.

### Payload Fields Explained:

```json
{
  "timestamp": 1606482285,
  "event": "settings_changed",
  "action": "campaign_settings_changed",
  "triggered_by": "vwo"
}
```

<br />

| Field           | Description                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `timestamp`     | UNIX timestamp (in seconds) indicating exactly when the change occurred. Useful for logging and event ordering.           |
| `event`         | Describes the type of event. Currently, this is always `"settings_changed"` for Wingify SDK-related updates.                  |
| `action`        | A more specific indicator of what changed, for example, `campaign_settings_changed`, `feature_flag_updated`, etc.         |
| \`triggered\_by | Source of the event trigger, usually `"vwo"`; this may help in filtering internal vs external triggers in future support. |

<br />

> While this payload doesn't contain the full settings, it acts as a notification that the settings have changed — and is particularly useful for lightweight validation or logging before calling the SDK update method.

<br />

## Usage

```javascript Node.js
// Assuming Express server

const express = require('express');
const app = express();
// require Wingify SDK
const { init } = require('wingify-fme-node-sdk');

let wingifyClient = await init({
  accountId: 'WINGIFY_ACCOUNT_ID',
  sdkKey: 'WINGIFY_SDK_KEY'
});

const webhookAuthKey = 'SECRET_WEBHOOK_KEY_GENERATED_IN_WINGIFY_APP';

// Endpoint to subscribe to changes made in Wingify FullStack running campaigns
app.post('/vwo-webhook', async (req, res) => {
  console.log('WEBHOOK TRIGGERED', req.body, 'Webhook Auth Key:', req.headers['x-vwo-auth']);

  if (webhookAuthKey && req.headers['x-vwo-auth']) {
    if (req.headers['x-vwo-auth'] !== webhookAuthKey) {
      console.error('Wingify webhook authentication failed. Please check.');

      return;
    } else {
      console.log('Wingify webhook authenticated successfully.');
    }
  } else {
    console.log('Skipping Webhook Authentication as webhookAuthKey is not provided');
  }

  // You may want to fetch the updated settings so that SDK can use the same
  await wingifyClient.updateSettings();

  res.end(JSON.stringify({
      status: 'success',
      message: 'Webhook received and Settings updated successfully'
  }));
});

app.listen(4000, () => {});
```
```python
# Assuming Flask server

# require Wingify SDK
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
            print('Wingify Webhook authentication failed')
            abort(401)
        else:
            print('Wingify Webhook authentication successful')
    else:
        print('Skipping authentication as missing webhook authentication key')

    if wingify_client:
        wingify_client.update_settings()
    return make_response({'status': 'success', 'message': 'settings updated successfully'}, 200)
```
```java
// Endpoint to subscribe to changes made in Wingify FullStack running
@PostMapping("/vwo-webhook")
@ResponseStatus(HttpStatus.OK)
public void webhook(
  @RequestHeader("x-vwo-auth") String secretKey,
  @RequestBody String body
) {
  String webhookAuthKey = "SECRET_WEBHOOK_KEY_GENERATED_IN_WINGIFY_APP";

  if (webhookAuthKey != null && secretKey != null) {
    if (secretKey.equals(webhookAuthKey)) {
      System.out.println("Wingify webhook authenticated successfully.");
    } else {
      System.out.println("Wingify webhook authentication failed. Please check.");
      return;
    }
  } else {
    System.out.println("Skipping Webhook Authentication as webhookAuthKey is not provided.");
  }

  if (wingifyClient != null) {
    wingifyClient.updateSettings();
    System.out.println(wingifyClientInstance.getSettingFileString());
  }
}
```
```csharp
[Route("/webhook")]
[HttpPost]
public async Task<string> webhook()
{
    CustomLogger logger = new CustomLogger();
    logger.WriteLog(LogLevel.DEBUG, "Post request from wingify app");

    string PayLoad;
    using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
    {
        PayLoad = await reader.ReadToEndAsync();
    }

    logger.WriteLog(LogLevel.DEBUG, "Wingify webhook payload: " + PayLoad);

    bool isAuthenticated = true;

    if (!string.IsNullOrEmpty(Defaults.WebhookSecretKey))
    {
        logger.WriteLog(LogLevel.DEBUG, "WebhookSecretKey exists . Wingify webhook authentication Checking.");

        if (Request.Headers["x-vwo-auth"].ToString() != Defaults.WebhookSecretKey)
        {
            logger.WriteLog(LogLevel.DEBUG, "Wingify webhook authentication failed. Please check.");
            return "Wingify webhook authentication failed. Please check.";
        }
    }

    if (WingifyClient != null)
    {
        logger.WriteLog(LogLevel.DEBUG,
            string.IsNullOrEmpty(Defaults.WebhookSecretKey)
                ? "UpdateSettings function called"
                : "Authentication passed and UpdateSettings function is called");

        await WingifyClient.UpdateSettings();

        logger.WriteLog(LogLevel.DEBUG, "Setting has been updated");
    }

    return "";
}

```
```ruby
# Assuming Sinatra server
require 'vwo'

post '/webhook' do
  content_type :json
  if config['webhook_auth_key'] and request.env['HTTP_X_VWO_AUTH']
    if config['webhook_auth_key'] != request.env['HTTP_X_VWO_AUTH']
      puts('webhook api authentication failed')
      return {'status': 'failed', 'message': 'webhook api authentication failed'}.to_json
    else
      puts('Webhook api authentication successful')
    end
  else
    puts('Skipping authentication as missing webhook authentication key')
  end
  wingify_client.update_settings
  return {'status': 'success', 'message': 'settings updated successfully'}.to_json
end
```

<br />

## Webhook Retries

If the webhook endpoint is unavailable or returns a non-2xx HTTP response, Wingify will automatically retry the request for up to 1 hour, with retry attempts made every 1 to 2 seconds. This ensures resilience in the event of temporary network issues or server downtime.

<br />

## Testing Webhooks

To test your webhook integration, you can use tools like [RequestBin](https://requestbin.com/) or [Webhook.site](webhook.site). These tools allow you to inspect incoming POST requests, review payloads, and validate headers before integrating with your production endpoint.
