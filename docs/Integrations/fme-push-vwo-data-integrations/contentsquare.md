---
title: Contentsquare
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Contentsquare is a digital analytics platform that automatically captures user interactions, clicks, mouse movements, and scrolling without manual event tracking.

Wingify Feature Experimentation (FE) sends feature-flag and event data to Contentsquare as **Dynamic Variables**. This allows you to see which variations drive specific user behaviors, filter session replays by active feature flags, and make data-driven decisions on your rollouts.

***

## Prerequisites

Before setting up the integration, ensure you have the following.

### 1. Contentsquare Account Setup

- An active Contentsquare account.
- The Contentsquare JavaScript tracking code is installed and active on your frontend application/website.

### 2. Wingify FE SDK Configuration

- A Wingify account with Feature Experimentation enabled.
- The Wingify SDK is installed and initialized in your backend application.

***

## Integration Steps

Because Contentsquare is a frontend visual analytics tool, it relies on the `window._uxa` object in the browser to collect data securely alongside the user's session replay.

Therefore, you must utilize the SDK's `integrations.callback` on your backend, and then pass those results to your frontend HTML template so that Contentsquare can record them via the `trackDynamicVariable` method.

### 1. Install Dependencies

Ensure you have the Wingify FE SDK installed in your project:

```bash
npm install vwo-fme-node-sdk
```

***

### 2. Create a Helper for Sending Data to Contentsquare

On your frontend (client-side), create a snippet that takes the injected payload from your backend and loops over it using `window._uxa.push(["trackDynamicVariable", ...])`.

```html
<script>
  // Ensure the Contentsquare command array exists
  window._uxa = window._uxa || [];

  // Assuming `vwoData` and `vwoEvent` are injected from your backend callback
  const vwoData = <%- JSON.stringify(vwoFlagData) %>;
  const vwoEvent = <%- JSON.stringify(vwoEventData) %>;

  // Loop through all flag properties and send them as distinct Dynamic Variables
  Object.keys(vwoData).forEach(function (key) {
    if (vwoData[key]) {
      window._uxa.push([
        "trackDynamicVariable",
        {
          key: "VWO_" + key,
          value: String(vwoData[key]),
        },
      ]);
    }
  });

  // Send the event name if an event was tracked
  if (vwoEvent && vwoEvent.eventName) {
    window._uxa.push([
      "trackDynamicVariable",
      {
        key: "VWO_Event",
        value: String(vwoEvent.eventName),
      },
    ]);
  }
</script>
```

> **Note: Dynamic Variable Limits**
>
> Contentsquare enforces character limits for Dynamic Variables:
>
> - Keys can be up to **512 characters**.
> - Values can be up to **255 characters**.
> - You can send up to **40 distinct Dynamic Variables** per pageview.

***

### 3. Initialize Wingify SDK and Set Up the `integrations.callback` (Node SDK Example)

Configure the Wingify SDK to capture data using the `integrations.callback` and make it available for the frontend.

```javascript
const vwo = require("vwo-fme-node-sdk");

let vwoFlagData = {};
let vwoEventData = {};

const vwoClient = await vwo.init({
  accountId: "YOUR_ACCOUNT_ID",
  sdkKey: "YOUR_SDK_KEY",
  integrations: {
    callback: (properties) => {
      if (properties.api === "getFlag") {
        // Collect all the rich data Wingify provides for feature flags
        vwoFlagData = {
          featureName: String(properties.featureName || ""),
          featureId: String(properties.featureId || ""),
          featureKey: String(properties.featureKey || ""),
          experimentId: String(properties.experimentId || ""),
          experimentKey: String(properties.experimentKey || ""),
          experimentVariationId: String(
            properties.experimentVariationId || ""
          ),
          rolloutId: String(properties.rolloutId || ""),
          rolloutKey: String(properties.rolloutKey || ""),
          rolloutVariationId: String(properties.rolloutVariationId || ""),
          isUserPartOfCampaign: String(
            properties.isUserPartOfCampaign || ""
          ),
          isPartOfHoldout: String(properties.isPartOfHoldout || ""),
          isHoldoutPresent: String(properties.isHoldoutPresent || ""),
          holdoutIDs: JSON.stringify(properties.holdoutIDs || []),
          customVariables: JSON.stringify(properties.customVariables || {}),
          variationTargetingVariables: JSON.stringify(
            properties.variationTargetingVariables || {}
          ),
        };
      } else if (properties.api === "trackEvent") {
        // Collect event data when vwoClient.trackEvent is called
        vwoEventData = {
          eventName: String(properties.eventName || ""),
        };
      }
    },
  },
});

// Define the user context
const userContext = {
  id: "unique_user_id",
};

// Evaluate the feature flag
const getFlag = await vwoClient.getFlag(
  "new_checkout_flow",
  userContext
);

// IMPORTANT: Because vwoClient.trackEvent() is asynchronous,
// ensure you use `await` when calling it so the callback finishes
// populating vwoEventData *before* you render your HTML!
await vwoClient.trackEvent("e1", userContext);

// After calling vwoClient.getFlag() and vwoClient.trackEvent(),
// pass vwoFlagData and vwoEventData to your frontend rendering engine!
```

This setup ensures that every time a feature flag is evaluated or an event is tracked by the Wingify SDK, the relevant data is automatically prepared to be sent to your configured Contentsquare project.

***

## Integration Data

### For Flag Evaluations (`getFlag`)

The `properties` object in the callback contains:

```json
{
  "featureName": "string",
  "featureId": "string",
  "featureKey": "string",
  "experimentId": "string",
  "experimentKey": "string",
  "experimentVariationId": "string",
  "rolloutId": "string",
  "rolloutKey": "string",
  "rolloutVariationId": "string",
  "isUserPartOfCampaign": "boolean",
  "isPartOfHoldout": "boolean",
  "isHoldoutPresent": "boolean",
  "holdoutIDs": "array",
  "customVariables": "object",
  "variationTargetingVariables": "object",
  "api": "getFlag"
}
```

### For Event Tracking (`trackEvent`)

The `properties` object in the callback contains:

```json
{
  "eventName": "string",
  "api": "trackEvent"
}
```

***

## How to See the Data in Contentsquare

After integrating Contentsquare with your application, you can view the tracked data in the following ways.

### 1. Verify in Your Browser Network Tab

- Open your website with Developer Tools open (**Right-click → Inspect**).
- Go to the **Network** tab.
- Refresh the page and trigger the code that fires the `trackDynamicVariable` script.
- Filter by `contentsquare` or `uxa` and look for the network request payload to confirm the `VWO_` keys and values are being sent successfully.

### 2. View Feature Flag Evaluations (Dynamic Variables)

- Log in to your Contentsquare dashboard.
- Navigate to **Session Replay**, the **Impact** module, or **Zonal Analysis**.
- Open the **Filters** or **Segment Builder**.
- Look for the **Dynamic Variables** category.
- Filter by your specific keys (for example, `VWO_experimentId` equals `12`).<br />

  ![](https://files.readme.io/7c83f18499da61189064be6308795979b1a75eecd98e38693b9aa4b9283ccd5e-image1.png)

<br />

### 3. Track Custom Events

- Look for the Dynamic Variable key `VWO_Event` to identify exactly which users triggered your tracked events (such as `e1`).

> **Note**
>
> Contentsquare processing is not instantaneous. After a user finishes a session and closes their tab, it can take **15–30 minutes** for the recorded session and its Dynamic Variables to appear in the Session Replay list.

***

## Sample Screenshots

### Custom Events in Session Replays

`getFlag` event with custom properties.

![](https://files.readme.io/7f3c3db3dd57c468947e15245cd80b74e62f685f89a1f75e000580f4727bb9ea-image2.png)

<br />
