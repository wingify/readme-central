---
title: Segment
deprecated: false
hidden: true
metadata:
  robots: index
---
<br />

Segment

## **Overview**

**Segment** is a leading Customer Data Platform (CDP) that collects, cleans, and routes your customer data to hundreds of tools. By integrating Segment with **VWO Feature Experimentation**, you can leverage Segment’s powerful "Personas" and "Audiences" to drive your experimentation strategy.

## **What This Integration Achieves**

This integration allows you to use Segment-computed traits and audiences for VWO feature flag targeting. By importing these segments into VWO, you can perform highly granular rollouts and A/B tests based on real-time user data captured across your entire tech stack.

## **Key Benefits:**

* **Audience-based targeting:** Run feature experiments only for specific Segment audiences.
* **Personalized rollouts:** Deliver variations tailored to user traits (e.g., plan, region, engagement level, lifecycle stage).
* **Audience-driven A/B testing:** Combine Segment’s unified customer data with VWO’s experimentation engine.
* **Data-driven decisions:** Leverage Segment’s rich cross-platform user data for more effective feature rollouts.

## **Step 1: Enabling the VWO-Segment Integration for your VWO Account**

To enable the Segment integration in VWO:

1. From the main menu of your VWO dashboard, go to **Configurations > Integrations**.
2. Click on the **Segment** integration and enable it by switching on the toggle.

   <Image align="center" width="650px" src="https://files.readme.io/932fad9edbdcf47e45dbebaed1366717572ec1e11e0511e4060b5d91786255e7-image1.png" />
3. You will be auto-navigated to the **Config** tab.
4. Enable **"Enable use of Segment audiences for visitor targeting"**.
5. Click **Save**.

   <Image align="center" src="https://files.readme.io/095644fcd5b7592782c5dd1bb82e95b6a8c7ea4e5bf4f3b0e384dbeae7cda946-2.png" />

## **Step 2: Configure VWO Cloud Mode (Actions) in Segment**

Before VWO can see your audiences, you must connect them via the Cloud Mode destination:

1. In your Segment dashboard, navigate to **Engage > Audiences** and select your desired audience.

   <Image align="center" width="700px" src="https://files.readme.io/ff51abbe6237df0a3fc51aad335e19ff7f30f045e4c6b6b20a374ac0c0ce91a7-3.png" />
2. Under the **Destinations** section, click **Add Destination**.

   <Image align="center" width="700px" src="https://files.readme.io/4f90b311fcdab836bafd95e0ae214570f53ff2998019ead7fe5ac3403bc376d3-image4.png" />
3. Select the **VWO Cloud Mode (Actions)** destination.  
   **INFO:** If you can’t find the **VWO Cloud Mode (Actions)** destination, you need to install it by performing the steps mentioned [here](https://segment.com/docs/connections/destinations/catalog/actions-vwo-cloud/).  
   Enabling the VWO Cloud Mode (Actions) destination is essential as it is the channel through which the events, attributes, and audiences are transited to VWO from Segment.

   <Image align="center" width="700px" src="https://files.readme.io/8adca4968029a09f8f40b935cbf494a521008ac3e9412c02901a7182361e67cb-image7.png" />
4. In the destination settings, ensure **Send Track** is enabled under Connection settings.

   <Image align="center" width="700px" src="https://files.readme.io/dbe9b3cf18a1b7bc9913215093e2970dc96c941fc73be0e14e0aa66ac72ba5cc-image5.png" />
5. Click **Save**.

   **Note:** Segment audiences populate in VWO only after your website receives a visitor following this connection.

## **Step 3: Import & Activate Segment Audiences in VWO**

1. Back in VWO (**Configurations** > **Integrations** > **Segment** > **Config**), click **Add Audience**.

2. In the popup, search for or select the Segment audience from the list.  
   **Note:** List visibility requires a successful connection with the Cloud Mode destination.

   <Image align="center" width="450px" src="https://files.readme.io/36605ac2c300b39fbe46cc3c4ef3b8d0dca9e6ce85b0463121e0e72f5855cdcf-image6.png" />

3. Click **Add**. A toast message will confirm the addition.

**Note: Syncing:** VWO takes ~24 hours for the initial sync, then updates every 24 hours. Use **Sync all** or the vertical ellipsis (⋮) for a manual sync.

## **Step 4: SDK Setup (Node.js Example)**

#### **4.1 Install and Initialize the VWO SDK**

Install the official VWO FE Node SDK:

Bash

```
npm install vwo-fme-node-sdk
```

#### **4.2 Setup Gateway Service**

The Gateway Service is required for real-time flag evaluation against synced segments.

**Reference:** [VWO Gateway Service Doc](https://help.vwo.com/hc/en-us/articles/16147461611161-Integrating-VWO-With-Segment)

#### **4.3 Initialize the SDK with Gateway Service**

```javascript
const vwo = require('vwo-fme-node-sdk');
const vwoClient = await vwo.init({
    sdkKey: 'YOUR_SDK_KEY',
    accountId: 'YOUR_ACCOUNT_ID',
    gatewayService: {
        url: 'YOUR_GATEWAY_SERVICE_URL'
    }
});
```

## **Step 5: Setting Up Pre-Segmentation in VWO**

Configure the targeting rules for your feature flag:

1. Navigate to **Feature Experimentation → Feature Flags**.
2. Under the **Rules** tab, click **Create New Rollout Rule**.
3. Under **Audience**, choose **Custom Segment**.
4. In **Attribute**, select **Custom Variable**.
5. Enter the identifier name used (e.g., `PayPal`).
6. Choose **Operator → In List**.
7. Select the **Attribute List** corresponding to your Segment Audience.
8. Save the rule and toggle **ON**.

## **Step 6: Implementing Segment Targeting in SDK**

Pass the identifier inside `customVariables` to evaluate the user.

```javascript
let context = {
    id: 'UserID', // Unique user identifier
    customVariables: {
        // "PayPal" must match the key defined in VWO Pre-segmentation
        "PayPal": "650412318e2-46d5-cfb07a69958"
    }
};
const featureFlag = vwoClient.getFlag('featureKey', context);
if (featureFlag.isEnabled()) {
    console.log("Segmentation passed: User qualifies for the Segment audience.");
} else {
    console.log("Segmentation failed: User is not in the Segment list.");
}
```

## **Explanation**

* **VWO Cloud Mode (Actions):** This is the essential channel for transiting audience data from Segment to VWO.
* **In List Logic:** If the `customVariables` value passed in the SDK (e.g., the specific ID for `PayPal`) exists in the imported Segment list, the user qualifies for the rollout.

## **Notes & Best Practices**

* **24-Hour Sync:** Be mindful that VWO syncs Segment audience data every 24 hours by default. Use **Manual Sync** for immediate testing.
* **ID Mapping:** Ensure the key used in `customVariables` matches the identifier name defined in VWO's rule configuration.
* **Gateway Service:** Always ensure the Gateway Service is reachable for server-side evaluation of these audiences.

<br />
