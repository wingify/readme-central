---
title: Datadog Triggers
excerpt: >-
  NOTE -- THIS WILL BE SHIFTED FROM HERE, SINCE THIS FOLDER CONTAINS IMPORTING
  EVENTS TO VWO
deprecated: false
hidden: true
metadata:
  robots: index
---
## **Overview**

Triggers allow you to automatically disable a specific rule inside a VWO Feature Flag when a metric threshold is breached. For example, if errors spike, Datadog can trigger VWO to turn off the feature flag immediately.

## **1. Creating the Trigger URL**

To set this up, you need to construct the API URL for the specific rule you want to control.

#### **URL Format:**

```

https://api.vwo.com/v2/accounts/{account_id}/environments/{environment_id}/features/{feature_key}/toggle
```

#### **How to find these values:**

* **account_id:** Your VWO Account ID.
* **environment_id:** The environment key .
* **feature_key:** The unique key of your feature flag.

#### **API Reference:** For details on this endpoint, see [Toggle Feature Flag Status](https://developers.vwo.com/reference/fme-toggle-feature-flag-status-for-an-environment).

You will also need a **Authentication header** for this which you can get from  [Access VWO API](https://help.vwo.com/hc/en-us/articles/360020559993-How-to-Access-VWO-API)

## **2. Connecting to Datadog**

Once you have your URL, you need to configure it in Datadog.

1. Log in to Datadog and go to **Integrations**.
2. Search for **Webhooks** and click Configure.
3. Scroll down to create a **New Webhook**.
4. **Name:** Give it a name (e.g., `vwo-kill-feature`).
5. **URL:** Paste the Trigger URL you constructed in Step 1.
6. Payload: Paste this JSON to disable the feature:

```
{ "isEnabled": false }
```

7. **Custom Headers:** You must add your **VWO API token** here for authentication.

```
 { "token": "YOUR_VWO_API_TOKEN" }
```

8. Click **Save**

## **3. Setting up the Alert**

Finally, link the webhook to a Monitor.

1. Navigate to **Monitors** -> **New Monitor** in Datadog.
2. Choose the metric you want to track (e.g., Error Rate).
3. Set your threshold (e.g., above 5%).
4. In the **Notify your team** section, type `@webhook` and select the VWO webhook you just created.
5. Click **Create**.

Now, whenever this alert fires, Datadog will hit the trigger and disable the feature flag in VWO.  
To learn more about how to configure a Datadog monitor, see <Anchor label="Datadog Notifications" target="_blank" href="https://docs.datadoghq.com/monitors/notify/">Datadog Notifications</Anchor>

<br />
