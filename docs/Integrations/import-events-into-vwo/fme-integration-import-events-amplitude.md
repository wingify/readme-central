---
title: Amplitude
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview:**

Amplitude is a powerful digital analytics platform that helps you understand user behavior across web and mobile. It automatically tracks user interactions and provides deep insights into customer journeys, retention, and engagement patterns.

## **What This Integration Achieves**

This integration allows you to use Amplitude-identified users and cohorts for Wingify feature flag targeting. By importing user cohorts from Amplitude into Wingify, you can roll out or test features for specific segments (e.g. Power Users, Premium users, At-Risk users) and personalize product experiences based on actual user behavior tracked in Amplitude.

## **Key Benefits**

* **Segment-based targeting:** Run feature experiments only for specific Amplitude cohorts
* **Personalized rollouts:** Deliver variations tailored to user properties (e.g., plan, region, engagement level, lifecycle stage)
* **Cohort-driven A/B testing:** Combine Amplitude's behavioral analytics with Wingify's experimentation engine
* **Data-driven decisions:** Leverage Amplitude's rich user behavior data for more effective feature rollouts

## **Step 1: Enabling the Amplitude Integration for Your Wingify Account**

To enable the Wingify-Amplitude integration on your Wingify account, follow this:

1. Log in to your Wingify account.
2. From the left panel of your Wingify dashboard, go to **Configurations** > **Integrations**.
3. Click on the **Amplitude** integration and enable it. Once enabled, the Amplitude screen within the Wingify’s Integration section looks like this:

   <Image align="center" border={true} src="https://files.readme.io/db3da347795d7134dc0c9cc8a64f831e305b77f7b3787ba1d9f5e4369dcbe611-image1.png" className="border" />
4. You will be auto-navigated to the **Config** tab.

5 .Enable "Enable use of Amplitude cohorts for visitor targeting".

* Click Save.
* Copy/note the API key that Wingify auto-generates. You'll need this to configure Amplitude.

  <Image align="center" border={true} src="https://files.readme.io/2c0f2a786915338cef35c4099c73cd58f5e6cecb9a9ad71f3a26552765c8473c-image2.png" className="border" />

## **Step 2 - Configure Wingify as a Destination in Amplitude**

* In Amplitude, navigate to Data > Catalog > Destinations > Wingify.

* Click Add another destination.

* Enter a name for the destination (e.g., “Wingify Production”).

* Paste the API Key from the previous Wingify step.

* For the User ID, select the property that best identifies your users (typically Amplitude's Device ID or User ID, as appropriate for your organization).

* Click Save.

  <Image align="center" border={true} width="400px" src="https://files.readme.io/3442aab1de98fabaa135820b3a573ff68c2d48c42063bad913e8198d83bc4de3-image3.png" className="border" />

## **Step 3 - Sync Cohorts from Amplitude to Wingify**

* In Amplitude, go to Users > Cohorts.
* Select an existing cohort or create a new one using Amplitude’s segmentation builder.
* Click Sync for the cohort.
* In the Select Destination popup, choose your Wingify destination.
* Choose the sync frequency:
  * Enable Scheduled Sync: Recommended (syncs automatically, keeps targeting up to date).
  * One-Time Sync: Use if you do not want to keep syncing changes.
* Click Sync.

<Image align="center" border={true} width="550px" src="https://files.readme.io/f73e03bbf6e36c496dd11ce5eaf33b766d48b1c2ee8dab6dc9a833013c5d8894-image5.png" className="border" />

## **Step 4 -  Import & Activate Amplitude Cohorts in Wingify**

* Back in Wingify, within the Amplitude integration settings, click Add Cohort.
* Search for or select the Amplitude cohort(s) you just synced.
* Click Add.
* First sync may take up to 24 hours depending on the size of cohort. Subsequent syncs are automatic (every 24 hours by default), but you can also trigger manual sync.

  <Image align="center" border={false} width="600px" src="https://files.readme.io/d7dd3745daf67e9ecd3056165fd48adf20f9fbd579d56fc6ba43034f73d10e0f-image4.png" />

## **Step 5 - SDK Setup (Node.js Example)**

### **5.1 Install and Initialize the Wingify FE SDK**

Install the official Wingify FE Node SDK:

```
npm install vwo-fme-node-sdk
```

### 5.2 Setup Gateway Service :

**Reference**: [Wingify Gateway Service Doc](https://developers.wingify.com/v2/docs/gateway-service)

### 5.3 Initialize the SDK in your application with gateway service:

**Reference**: [SDK Initialization Doc](https://developers.wingify.com/v2/docs/fme-node-initialization)

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

**Note:** The `gatewayService` is mandatory for Amplitude integration because the SDK itself does not store your Amplitude cohort data. When you evaluate a flag, the SDK uses the Gateway to check in real-time if the user belongs to the synced Amplitude segment.

## **Step 6: Setting Up Pre-Segmentation for Amplitude-Synced Segments**

Once your Amplitude segments are imported into Wingify, configure **pre-segmentation** in your feature flag to target those users.

### **Configure Pre-Segmentation in the Feature Flag**

1. Navigate to **Feature Experimentation → Feature Flags** in Wingify.

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

8. Enter the identifier name used for targeting.

9. Choose **Operator → In List**.

10. Select the **Attribute List** corresponding to your Amplitude segment (e.g., amplitude_premium_users).

    <Image align="center" border={false} width="700px" src="https://files.readme.io/676815b88430b6361ff244a518ddd2321f96d0c28776cfc78c3753292ea98437-Screenshot_2026-02-04_171510.png" />

11. Save the rule and **toggle ON** the rollout rule.

Finally, copy the **SDK Key** — you’ll need it for SDK initialization.

## **Step 7: Implementing Amplitude Segment Targeting in SDK**

After configuring pre-segmentation in the Wingify app, ensure your SDK passes the appropriate user context for evaluation. Let’s see an example of using Amplitude Segments in feature evaluation.

#### Once the SDK is installed, do the following

* Add the Amplitude user identifier inside customVariables while creating the user context.
* Pass this context to getFlag() so Wingify can evaluate the feature flag using Amplitude cohort pre-segmentation.

```javascript
let context = {
    id: 'UserID',
    customVariables: {
        "your_variable_name": "value_for_variable"
    },
    ipAddress: 'user_ip_Address',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'


};

const featureFlag = vwoClient.getFlag('featureFlag', context);

if (featureFlag.enabled) {
    console.log("Feature enabled for Amplitude-segmented user");
} else {
    console.log("User does not qualify for the Amplitude segment rollout");
}
```

### **Explanation**

* The key "your_custom_variable" must **exactly match** the identifier defined in your Wingify pre-segmentation rule.

* If the value Identifier exists in the imported Amplitude list, the segmentation **passes** and the user qualifies.

* If not, the segmentation **fails** and the rule  remains disabled for that user.

***

## **Notes & Best Practices**

* Ensure the **custom variable key** in your SDK context matches the one defined in Wingify’s rule configuration.

* If you have multiple Amplitude Cohorts, create separate rollout rules for each to maintain clear targeting logic.

* Always use **recurring sync** to keep segment data updated between Amplitude and Wingify
