---
title: Integrating VWO Feature Experimentation (FE) With Heap
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview:**

**Heap** is an analytics platform that automatically collects user interaction data from your site or app to generate insights. It helps teams understand customer behavior, improve conversion and retention, and drive data-informed decisions.

## **What This Integration Achieves**

This integration allows you to use **Heap-identified users** for **VWO feature flag targeting**. By importing user segments from Heap into VWO, you can roll out or test features for specific cohorts (e.g., Premium users, Trial users) and personalize product experiences based on real user behavior.

## **Key Benefits**

* **Segment-based targeting:** Run feature experiments only for specific Heap segments
* **Personalized rollouts:** Deliver variations tailored to user properties (e.g., plan, region, lifecycle stage).
* **Cohort-driven A/B 	testing:** Combine Heap’s beahavioural analytics with VWO’s eperiments

## **Step 1: Enabling the Heap Integration for Your VWO Account**

To enable the VWO-Heap integration for your VWO account, follow this:

1.  Log in to your VWO account.
2. From the left panel of your VWO dashboard, go to the **Configurations** > **Integrations** tab.
3. Click on the **Heap** integration and enable it.  

   <Image align="center" border={false} src="https://files.readme.io/868ed9269d59e1f16a87120e855510350a3aab1003775e548d21d916d9d88d98-image2.png" />

Once enabled, you will be taken to the **Config** tab to configure the data transit for this integration.

<br />

## **Step 2. Enable Use of Heap Segment for Visitor Targeting**

This option lets you import the segment data from your Heap account to target visitors for your VWO campaigns. Select this option and click **Save**.

**NOTE**: VWO supports only Heap’s identified visitors. Heap visitors can be identified using Heap’s Identity API. To learn more about it, refer to [this article](https://developers.heap.io/docs/using-identify).

Now, you will have to authenticate the data transfer from your Heap account to VWO by clicking the **Authenticate VWO on Heap** button. In the Authentication popup that appears, select the Heap environment that you want to use with VWO, carefully read through what VWO will be able to view in your Heap account with this permission, and if you’re ready to proceed, click **Allow**.

Once done, you will have to enable the VWO integration in Heap to push the data from Heap to VWO.

## **Step 3: Syncing a Heap Segment to VWO**

To export a segment from Heap to VWO, you need to do the following:

1. From your Heap dashboard, go to **Integrations** > **Directory**. Search for **VWO Cohort Sync** and enable it.

   1. [Create a segment](https://help.heap.io/data-types/segments/segments-overview/#creating-segments), and in the same, scroll down to the **Integrations** section and enable **VWO Cohort Sync**.

      <Image align="center" border={false} width="550px" src="https://files.readme.io/fa7ac2db69c424b2ab498cc39aebba1ac1bc2b98c89af83d5f0f157759123f02-image4.png" />

   2. In the **Sync Segment to VWO Cohort Sync** popup that appears, click **Enable Recurring Sync** to recurrently sync the segment for this specific campaign.

   <br />

   <Image align="center" border={false} width="550px" src="https://files.readme.io/f9430d933b855d6232be6dafe41651668ae2a0393f6569f4eb2902c292346247-image1.png" />

**NOTE:** We recommend using the Enable Recurring Sync option as it ensures any new data that is added to the segment is pushed to VWO. However, if you only need the current data and do not require any new data to be pushed to VWO, you can click on the Sync now button.

Now, the Heap segment is imported to your VWO account. You can log in to your VWO account to access it.

## **Step 4: Accessing the Heap Segments Imported Into VWO**

To access the Heap Segments imported into VWO, perform the following steps on the **Heap** integration page:

1. Under the **Enable use of Heap segment for visitor targeting** section, click on the **Add segments from Heap** link.

   <Image align="center" border={false} width="550px" src="https://files.readme.io/78441c5cd773971dc22c11664e657f2bd82974a47f7cecab701d83442e17174f-image5.png" />

2. On the **Add Heap Segments** popup that appears, select the audience and click **Add**.

   <Image align="center" border={false} width="450px" src="https://files.readme.io/e8f504b0561d86e663142326cfc6d02d7e967262652cf90dc0b83794dc0b152d-image3.png" />

This enables VWO to start syncing the segment. You can check the sync status from the audience list table that appears.

**NOTE**: At once, you can only connect one Heap account per workspace in your VWO account

Now, we have to setup the SDK and avail the integration feature.

## Step 5 : SDK Setup (Node.js Example)**

### **5.1 Install and Initialize the VWO SDK**

Install the official VWO FE Node SDK:

```
npm install vwo-fme-node-sdk
```

### 5.2 Setup Gateway Service :**

**Reference**: [VWO Gateway Service Doc](https://developers.vwo.com/v2/docs/gateway-service)

### 5.3 Initialize the SDK in your application with gateway service:**

**Reference**: [SDK Initialization Doc](https://developers.vwo.com/v2/docs/fme-node-initialization)

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

Note: The `gatewayService` enables real-time flag evaluations and syncs your SDK with the VWO Gateway.

## **Step 6: Setting Up Pre-Segmentation for Heap-Synced Segments**

Once your Heap segments are imported into VWO, configure **pre-segmentation** in your feature flag to target those users.

### **6.1 Configure Pre-Segmentation in the Feature Flag**

1. Navigate to **Feature Experimentation → Feature Flags** in VWO.

2. Click **Create Feature Flag** (or open an existing one).

3. Add **variables** and **variations** as per your use case.

   Example:

   * **Variable Name:** `Your_Variable_Name`
   * **Type:** Datatype
   * **Default Value:** “Default value”

4. Choose a **primary metric** to measure conversions or engagement.

5. Go to the **Rules** tab → Click **Create New Rollout Rule**.

6. Under **Audience**, choose **Custom Segment**.

7. In **Attribute**, select **Custom Variable**.

8. Enter the identifier name used for targeting.

9. Choose **Operator → In List**.

10. Select the **Attribute List** corresponding to your Heap segment (e.g., `heap_premium_users`).

11. Save the rule and **toggle ON** the rollout rule.

Finally, copy the **SDK Key**, you’ll need it for SDK initialization.

## **Step 7: Implementing Heap Segment Targeting in SDK**

After configuring pre-segmentation in the VWO app, ensure your SDK passes the appropriate user context for evaluation. Let’s see an example of using Heap Segment in feature evaluation.

#### Once the SDK is setup do the following

* #### Add the Heap identified user ID inside `customVariables` while creating the user context.

* #### Pass this context to `getFlag()` so VWO can evaluate the feature flag using Heap segment pre-segmentation.

```javascript
let context = {
    id: 'UserID',
    customVariables: {
        "your_custom_variable": "heapIdentifiedUserId"
    },
    ipAddress: 'user_ip_Address',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
};

const featureFlag = vwoClient.getFlag('featureFlag', context);

if (featureFlag.enabled) {
    console.log("Feature enabled for Heap-segmented user");
} else {
    console.log("User does not qualify for the Heap segment rollout");
}
```

## **Explanation**

* The key `"your_custom_variable"` must **exactly match** the identifier defined in your VWO pre-segmentation rule.

* If the value (`heapIdentifiedUserId`) exists in the imported Heap segment list, the segmentation **passes** and the user qualifies.

* If not, the segmentation **fails** and the rule remains disabled for that user.

***

## **Notes & Best Practices**

* Ensure the **custom variable key** in your SDK context matches the one defined in VWO’s rule configuration.

* Only **Heap-identified users** from the synced segment will pass the segmentation rule,  
  **Reference**: [Heap’s Identity API](https://developers.heap.io/reference/identify)

* If you have multiple Heap segments, create separate rollout rules for each to maintain clear targeting logic.

* Always use **recurring sync** to keep segment data updated between Heap and VWO
