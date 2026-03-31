---
title: Splunk Triggers
deprecated: false
hidden: true
metadata:
  robots: index
---
## **Overview**

Triggers allow you to automatically disable a specific rule inside a VWO Feature Flag when a metric threshold is breached. For example, if errors spike, Splunk can trigger VWO to turn off the feature flag immediately.

_(**Note**: Splunk has two different interfaces. Instructions are provided below for both **Splunk Observability Cloud** and **Splunk Enterprise / Classic Cloud**)._

## **1. Creating the Trigger URL**

To set this up, you need to construct the API URL for the specific rule you want to control.

#### **URL Format:**

```
https://app.vwo.com/api/v2/accounts/current/environments/<envId|sdkKey>/features/<featureId|featureKey>/toggle?isEnabled=0&authToken=<your_api_token>
```

#### **Required Paramerters:**

* **envId|sdkKey**: The environment ID or SDK key.
* **featureId|featureKey**: The unique ID or key of your feature flag.  
* **isEnabled** – Set to `0` to disable the feature flag (or `1` to enable it).
* **authToken**: Your VWO API Authentication token.

## **2. Setting up the Alert Detector in Splunk**

In Splunk Observability Cloud, you can configure your alert and attach the VWO Webhook all in one place.

1. Navigate to **Alerts > Detector** on the left main menu in Splunk.

2. Click the blue **Create Detector** button in the top right.

3. Select the appropriate detector type for your use case (e.g., **Custom Detector** for general metrics) and enter the detector name.

   <Image align="center" src="https://files.readme.io/192c1f5da0af68da4927ff4a50c3b40944fc4692bbf5cd951fd698b83405d998-image3.png" />

4. **Alert Signal:** In the "What signal would you like to alert on?" box, enter the specific metric or log event you want to monitor (e.g., `vwo.test.errors`). Click **Proceed to Alert Condition**.

   <Image align="center" src="https://files.readme.io/befb066d4e09d0d7c00511f77f45b1d86581ab75037d0d6973457d11ef5eddfa-image2.png" />

5. **Alert Condition:** Select the condition type (e.g., **Static Threshold**). Click **Proceed to Alert Settings**.

6. **Alert Settings:** Define your threshold (e.g., Alert when the signal is **Above** a threshold of **50**).

   <Image align="center" src="https://files.readme.io/63d8903e1bdef0cbdc364b3dd7d76d505d20857bfc7d4b6d1f317abe2057e22b-image1.png" />

7. **Trigger sensitivity:** Important for instant kill-switches: change the dropdown to **Immediately** (or a very short duration). Click **Proceed to Alert Message**.

8. **Alert Message:** Configure severity and runbook URLs (optional). Click **Proceed to Alert Notifications**.

9. **Alert Notifications:** Click **Add recipient**, select **Webhook**.

10. **Target endpoint URL:** Paste the VWO Trigger URL you constructed in Step 1. (Leave 'Shared secret' blank). Click **Update**, then **Proceed to Alert Activation**.

    <Image align="center" src="https://files.readme.io/a547f7dad8496e4b6f060bdfc6cddc036220a954c5539d5fc2cfec3995d3f475-image4.png" />

11. **Activate:** Name your detector rule and click the **Activate Alert Rule** button.

Now, whenever this alert threshold is breached, Splunk will instantly hit the webhook and disable the feature flag in VWO.

## **Alternative: Splunk Enterprise / Classic Cloud Setup**

If you are using classic Splunk instead of Observability Cloud, the process uses Saved Searches instead of Detectors.

1. **Perform your Search:** In the main Splunk search bar, write the query that identifies your critical error (e.g., `index="main" status=500`).
2. **Save as Alert:** Click **Save As** in the top right corner and select **Alert**.
3. **Trigger Conditions:** Define when the alert should fire (e.g., trigger when the **Number of Results** is **> 0** in the last **1 minute**).
4. **Trigger Actions:** Click **+ Add Actions** and select **Webhook**.
5. **URL:** Paste the VWO Trigger URL constructed in Step 1. (No payload configuration is necessary since `isEnabled=0` is in the URL).
6. Click **Save**.
