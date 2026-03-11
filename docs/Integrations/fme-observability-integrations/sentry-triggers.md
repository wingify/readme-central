---
title: Sentry Triggers
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview**

Triggers can be used with Sentry to automatically toggle a Feature Flag based on application errors or performance issues. For example, you can create a trigger that disables a Feature Flag and connect it to a Sentry alert webhook. If Sentry detects a spike in errors or a critical issue in your application, it can call the trigger URL, allowing VWO to automatically disable the Feature Flag and prevent further impact to users.

## **1. Creating the Trigger URL**

To set this up, you need to construct the API URL for the specific feature environment you want to control. Because **Sentry** webhooks do not support custom headers or custom payloads, the required parameters (`isEnabled` and the `authToken`) must be included directly in the URL query parameters.

#### **URL Format**:

```
https://app.vwo.com/api/v2/accounts/current/environments/<envId|sdkKey>/features/<featureId|featureKey>/toggle?isEnabled=<0|1>&authToken=<api_token>
```

#### **Parameters:**

* **feature_id_or_key** – The ID or key of the feature flag you want to control.
* **environment_id_or_key** – The ID or key of the environment where the feature flag should be toggled.
* **isEnabled** – Set to `0` to disable the feature flag (or `1` to enable it).
* **authToken** – Your VWO API authentication token.

## **2. Connecting to Sentry**

Once you have your complete URL, you need to configure it in Sentry as an Internal Integration.

1. Log in to Sentry and go to **Settings > Developer Settings**.

   <Image align="center" width="700px" src="https://files.readme.io/cb834ff029e50541961e96918c3373c397cc4eb151318f5aae39ff913bff6a3e-image4.png" />
2. Click **Custom Integrations > Create New Integration > Internal Integration**
3. **Name:** Give it a name (e.g., `VWO Feature Kill Switch`).
4. **Webhook URL:** Paste the Trigger URL you constructed in Step 1.

   <Image align="center" src="https://files.readme.io/123920e956c3437bc05440046f4a3d4916afb8612fc1d851c75adeb6ecf088bc-image3.png" />
5. **Alert Rule Action:** Toggle this to **ON** (this allows you to use it in alerts).
6. Under **Permissions**, grant `Read` access to **Alerts**, **Issue & Event** and **Projects**.
7. Under **Webhooks**, check the boxes for `issue` and `error`.
8. Click **Save Changes**.

## **3. Setting up the Alert**

Finally, link the integration to an Alert Rule in Sentry.

1. Navigate to **Alerts** -> **Create Alert** in Sentry.

   <Image align="center" src="https://files.readme.io/f3ba107d044cac67abb07a755c940f9f94280314a84d37ffe5ca6eb893b36acd-image1.png" />

2. Choose the metric you want to track (e.g., Number of Errors).

3. Set your threshold (e.g., above 50 errors in 5 minutes).

4. In the **Actions** section, select **Send a notification via an integration**.

5. Choose the `VWO Feature Kill Switch` integration you just created.

   <Image align="center" src="https://files.readme.io/a7e6f167bf36d3f9a3b618ca742a2204a29fdbf1418e61adb4e50b25382b38d2-image2.png" />

6. Click **Save Rule**.

Now, whenever this alert fires, Sentry will hit the trigger URL and disable the feature flag in VWO immediately.

<br />