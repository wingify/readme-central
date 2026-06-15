---
title: Mixpanel
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview:**

**Mixpanel** is a powerful analytics platform that helps you understand user behavior across web and mobile. It automatically tracks user interactions and provides deep insights into customer journeys, retention, and engagement patterns.

## **What This Integration Achieves:**

This integration allows you to use Mixpanel-identified users and cohorts for VWO feature flag targeting. By importing user cohorts from Mixpanel into VWO, you can roll out or test features for specific segments (e.g., Power Users, Premium users, At-Risk users) and personalize product experiences based on actual user behavior tracked in Mixpanel.

## **Key Benefits:**

* **Segment-based targeting:** Run feature experiments only for specific Mixpanel cohorts.
* **Personalized rollouts:** Deliver variations tailored to user properties (e.g., plan, region, engagement level, lifecycle stage).
* **Cohort-driven A/B testing:** Combine Mixpanel's behavioral analytics with Wingify's experimentation engine.
* **Data-driven decisions:** Leverage Mixpanel's rich user behavior data for more effective feature rollouts.

## **Step 1: Enabling the VWO-Mixpanel Integration for your VWO Account:**

To enable the VWO-Mixpanel integration for your VWO account:

1. From the main menu of your VWO dashboard, go to **Configurations** > **Integrations**.
2. Click on the **Mixpanel** integration and enable it by switching on the toggle. Once   enabled, the Mixpanel screen within the VWO’s Integration section looks like this:

<Image align="center" border={false} width="750px" src="https://files.readme.io/af3f339c0b6b0df9d6016bbe3d3fb8c1b46eaddeb06fed866569d65c27f8f575-image4.png" />

3. You will be auto-navigated to the **Config** tab.

<Image align="center" border={false} width="450px" src="https://files.readme.io/4c21af1578f743ad58fcf4524be772d8f8e25fb3676107eb7c73d6109e08b2e5-image1.png" />

3. Enable "Enable use of Mixpanel cohorts for visitor targeting".
4. Click Save
5. Copy/note the API key that VWO generates. You'll need this to configure Mixpanel.

## **Step 2 - Configure VWO as a Destination in Mixpanel:**

* In Mixpanel, navigate to Integrations.
* Click Add a new integration, select VWO.
* Enter a name for the destination (e.g., “VWO Production”).
* Paste the API Key from the previous VWO step.
* For the user identification, make sure user profiles in Mixpanel have the $vwo_user_id property set (this must match the User ID in VWO).
* Click Save.

## **Step 3 - Sync Cohorts from Mixpanel to VWO:**

* In Mixpanel, go to Data Management > Cohorts.
* Select an existing cohort or create a new one using Mixpanel’s segmentation builder.
* Click on the cohort’s menu and choose Export to → VWO.
* Choose the sync frequency:
  * Dynamic Sync: Recommended. Syncs automatically every 2 hours, updates targeting as your cohort changes.
  * One-Time Export: Only exports the current cohort list, no updates.
* Click Sync.

  <Image align="center" border={false} width="650px" src="https://files.readme.io/92c9c6e8b387ed8d25b3a98e9bfdfa45e020649e073a7468b25930a1e53c8471-image2.png" />

## **Step 4 -  Import & Activate Mixpanel Cohorts in VWO:**

* Back in VWO, within the Mixpanel integration settings, click Add Cohort.
* Search for or select the Mixpanel cohort(s) you just synced.
* Click Add.
  * First sync may take up to 2 hours. Subsequent syncs are automatic (every 2 hours by default for dynamic sync).
  * Manual sync is available if required.

    <Image align="center" border={false} width="400px" src="https://files.readme.io/7f49324f988390c09fe56b2ef2d8f7e9ff27c532055b555d4f1b2e8ca2a57f2f-image3.png" />

## Step 5 - SDK Setup (Node.js Example)

### Install and Initialize the VWO SDK

Install the official VWO FE Node SDK:

```
npm install vwo-fme-node-sdk
```

### **Setup Gateway Service**:

**Reference**: [VWO Gateway Service Doc](https://developers.wingify.com/v2/docs/gateway-service)

### Initialize the SDK in your application with the VWO Gateway service:

**Reference**: [SDK Initialization Doc](https://developers.wingify.com/v2/docs/fme-node-initialization)

```javascript
const { init } = require('vwo-fme-node-sdk');

const vwoClient = await init({
    sdkKey: 'YOUR_SDK_KEY',
    accountId: 'YOUR_ACCOUNT_ID',
    gatewayService: {
        url: 'YOUR_GATEWAY_SERVICE_URL'
    }
});
```

**Note:** `The gatewayService` is mandatory for Mixpanel integration because the SDK itself does not store your Mixpanel cohort data. When you evaluate a flag, the SDK uses the Gateway to check in real-time if the user belongs to the synced Mixpanel segment.

## **Step 6: Setting Up Pre-Segmentation for Mixpanel-Synced Segments**

Once your Mixpanel segments are imported into VWO, configure **pre-segmentation** in your feature flag to target those users.

### Configure Pre-Segmentation in the Feature Flag

1. Navigate to **Feature Experimentation → Feature Flags** in VWO.

2. Click **Create Feature Flag** (or open an existing one).

3. Add **variables** and **variations** as per your use case.

   Example:

   * **Variable Name:** Your_Variable_Name
   * **Type:** Datatype
   * **Default Value:** “Default value”

4. Choose a **primary metric** to measure conversions or engagement.

5. Go to the **Rules** tab → Click **Create New Rollout Rule**.

6. Under **Audience**, choose **Custom Segment**.

7. In **Attribute**, select **Custom Variable**.

8. Enter the identifier name used for targeting (e.g., vwo_user_id).

9. Choose **Operator → In List**.

10. Select the **Attribute List** corresponding to your Mixpanel segment (e.g., mixpanel_premium_users).

    <Image align="center" border={false} width="700px" src="https://files.readme.io/d746aac590a3c6c6d8ad2576fb9c6f50f3182057296016fea48a44662fb384df-Screenshot_2026-02-04_171510.png" />

11. Save the rule and **toggle ON** the rollout rule.

Finally, copy the **SDK Key;** you’ll need it for SDK initialization.

## **Step 7: Implementing Mixpanel Segment Targeting in SDK**

After configuring pre-segmentation in the VWO app, ensure your SDK passes the appropriate user context for evaluation. Let’s see an example of using Mixpanel cohorts in feature evaluation.

#### Once the SDK is installed, do the following

* #### Set the Mixpanel user identifier (mapped to `$vwo_user_id`) inside `customVariables` while creating the user context

* Pass this context to `getFlag()` so VWO can evaluate the feature flag using Mixpanel cohort pre-segmentation.

```javascript
let context = {
    id: 'UserID', // Should match $vwo_user_id in Mixpanel
    customVariables: {
//example custom variable
        "vwo_user_id": "user_12345"
    },
    ipAddress: 'user_ip_Address',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)'
};

const featureFlag = vwoClient.getFlag('featureFlag', context);

if (featureFlag.isEnabled()) {
    console.log("Feature enabled for Mixpanel-segmented user");
} else {
    console.log("User does not qualify for the Mixpanel cohort rollout");
}
```

###

### **Explanation**

* The key "vwo_user_id" must exactly match the identifier defined in your VWO pre-segmentation rule.
* If the value (e.g., user_12345) exists in the imported Mixpanel cohort list, the segmentation passes and the user qualifies.
* If not, the segmentation fails, and the rule remains disabled for that user.

***

## **Notes & Best Practices**

* Ensure the custom variable key in your SDK context matches the one defined in VWO’s rule configuration.
* Only Mixpanel-identified users (with $vwo_user_id) from the synced cohort will pass the segmentation rule.
* If you have multiple Mixpanel cohorts, create separate rollout rules for each to maintain clear targeting logic.
* Always use dynamic sync to keep cohort data updated between Mixpanel and VWO.

<br />