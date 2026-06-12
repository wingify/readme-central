---
title: New Relic Triggers
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview**

Triggers allow you to automatically disable a specific rule inside a **Wingify Feature Flag** when a metric threshold is breached in **New Relic**.

**Use Case:** If your error rate spikes after a new feature rollout, New Relic can "fire" a webhook to Wingify to turn off the feature flag immediately, acting as an automated "Kill Switch."

## **1. Creating the Trigger URL**

To set this up, you need to construct the API URL for the specific feature environment you want to control.

#### **URL Format**

```
https://app.wingify.com/api/v2/accounts/current/environments/<envId|sdkKey>/features/<featureId|featureKey>/toggle?isEnabled=0&authToken=<your_api_token>
```

**Required Parameters**

* **featureId_or_key** – The ID or key of the feature flag you want to control.
* **envId_or_key** – The ID or key of the environment where the feature flag should be toggled.
* **isEnabled** – Set to `0` to disable the feature flag (or `1` to enable it).
* **authToken**– Your Wingify API authentication token.

## **2. Connecting to New Relic**

Configure New Relic to send a signal to the URL you created above.

## **Create the Destination**

1. Log in to **New Relic** and navigate to **Alerts** > **Destinations**.
2. Click **New destination** and select **Webhook**.
3. **Webhook name**: e.g., `vwo-kill-feature-hook`
4. **Endpoint URL**: Paste the full Trigger URL constructed in Step 2.
5. **Authorization**: Select **No authorization** (since the token is already in the URL string).
6. Click **Save destination**.  

   <Image align="center" src="https://files.readme.io/52a1178b443e5f84658d1d124cf25dad7d9019dc21c96a38d19f37d7ba2d18c0-image4.png" />

## **Create the Workflow**

1. Navigate to **Workflows** (located in the left sidebar under Alerts).
2. Click **Add a workflow**.
3. **Name**: e.g., `Wingify Feature Toggle Workflow`.
4. Under **Filter issues**, define which alerts should trigger this (e.g., Policy Name contains "Critical Errors").  

   <Image align="center" src="https://files.readme.io/033c73c08ab0982df253d75a6094d0e6f3fdfd9807ea2fc7c83aeecc449c0fd2-image3.png" />
5. Under the **Notify** section, click **Webhook**.
6. Select the **Destination** you created in Step A.
7. Click **Update Message** and then **Save**.  

   <Image align="center" src="https://files.readme.io/af69f28d1f9efd85cba380a2c4b355e02f238fc40be96277190796ce02c3aa22-image1.png" />

   **Note:** You do not need to customize the JSON payload; the action is handled by the URL itself.

## **3. Setting up the Alert Condition**

Link the workflow to a specific performance metric using NRQL.

1. Navigate to **Alerts** > **Alert Conditions**.
2. Click **New alert condition** and select **Write your own query (NRQL)**.
3. **Define Query**: Input the metric you want to monitor.  

   <Image align="center" src="https://files.readme.io/eb10a2846e84788b53aa9010316e5e4712d485889b64c2f0abeee8d3fcb49cc5-image5.png" />
4. **Set Threshold**: Define the breaking point (e.g., `Static > 5 errors` at least once in 1 minute).
5. **Advanced Signal Settings**:
   * Set **Fill data gaps with** to `Custom static value: 0`. This prevents the alert from "floating" when there is no traffic.
6. **Assign Policy**: Ensure this condition is part of the Policy linked to the Workflow created in Step 3.
7. Click **Save condition**.  

   <Image align="center" src="https://files.readme.io/21d6286656b827862aa0221606db49e65272a4da6912db8a53d3213c04a817e0-image2.png" />

## **4. Verification**

* **Test the Webhook**: In the New Relic Destination settings, use the "Test connection" feature to ensure Wingify receives the toggle command.
* **Check**: Once the test is sent, refresh your Wingify dashboard to see if the Feature Flag status has moved to **Disabled**.