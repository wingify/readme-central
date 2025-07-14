---
title: Configuring Webhooks
deprecated: false
hidden: true
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

## Role of Webhooks in VWO FME SDKs

VWO FME SDKs fetch configuration settings (features, campaigns, variations) from the VWO servers. By default, they periodically poll for updates. Webhooks allow a more efficient and scalable solution by enabling:

* **Real-time config sync**: No delay between a change on the dashboard and its reflection in the SDK.
* **Hot-reloading support**: SDK settings are updated in-memory using the webhook payload.
* **Stateless server design**: Webhooks help ensure distributed services are always up-to-date without storing stale configs.

<br />

## Securing Webhooks with API Key-Based Authentication

When setting up a webhook in the VWO app, it’s essential to ensure that your endpoint only accepts requests from trusted sources, i.e., from VWO itself. To facilitate this, VWO supports **API key-based authentication** using a secret key.

### How It Works

* During webhook configuration in the VWO dashboard, you can generate a secret key specifically for that webhook.
* Every time VWO triggers the webhook (via an HTTP `POST`), it will include this secret key in the request header:
  ```
  x-vwo-auth: YOUR\_SECRET\_KEY
  ```
* On your server, your webhook handler should:
  1. Read the value of the `x-vwo-auth` header from the request.
  2. Compare it with the secret key you generated and securely stored during setup.
  3. Reject the request (e.g., with a `401 Unauthorized`) if the key does not match.

This approach ensures that only authenticated POST requests from VWO are accepted by your application, effectively preventing any third-party or malicious source from spoofing webhook events.

### Regenerating the Secret Key

If the key gets exposed or you suspect unauthorized access, you can regenerate a new secret key from within the VWO app. Once updated:

* VWO will use the new key for all future webhook calls.
* You must also update your server-side logic to validate against the new key.

> 📘 Note
>
> 🔒 Keep your secret key secure, do not expose it in frontend code, logs, or error messages.

<br />

## Webhook Payload Format

Whenever a settings change occurs (e.g., feature flag modified, campaign updated), VWO triggers a webhook request to your configured endpoint. This is an HTTP POST request with a JSON payload that contains metadata about the event.

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

| Field          | Description                                                                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `timestamp`    | UNIX timestamp (in seconds) indicating exactly when the change occurred. Useful for logging and event ordering.           |
| `event`        | Describes the type of event. Currently, this is always `"settings_changed"` for VWO SDK-related updates.                  |
| `action`       | A more specific indicator of what changed — for example, `campaign_settings_changed`, `feature_flag_updated`, etc.        |
| `triggered_by` | Source of the event trigger, usually `"vwo"`; this may help in filtering internal vs external triggers in future support. |

<br />

> While this payload doesn't contain the full settings, it acts as a notification that the settings have changed — and is particularly useful for lightweight validation or logging before calling the SDK update method.

<br />

## Usage