---
title: Microsoft Clarity
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Microsoft Clarity is a user behavior analytics tool that helps you understand how users interact with your website through session replays and heatmaps.

Wingify Feature Experimentation (FE) sends feature-flag and event data to Microsoft Clarity as **Custom Tags** and **Smart Events**. This allows you to see exactly which feature flag variations drive specific user behaviors, filter session recordings by active feature flags, and make data-driven decisions on your rules associated with the feature flag.

***

## Prerequisites

Before setting up the integration, ensure you have the following:

### 1. Microsoft Clarity Account Setup

- **Active Project:** An active Microsoft Clarity project.
  > **Note:** When creating a new project in Clarity, it requires a valid URL format like `www.example.com`. If you are testing locally, you can use a dummy URL to bypass the creation step, and then run the snippet on `localhost`.

- **Tracking Code:** The Microsoft Clarity JavaScript tracking code is installed and active on your frontend application/website.

### 2. Wingify FE SDK Configuration

- **Account:** A Wingify account with Feature Experimentation enabled.
- **SDK:** The Wingify SDK is installed and initialized in your backend application.

***

## Integration Steps

Because Microsoft Clarity is a frontend visual analytics tool, it relies on the `window.clarity` object in the browser to collect custom data securely and attach it to the ongoing video session replay. Clarity does not provide a backend API for sending incoming data.

Therefore, you must utilize the SDK's `integrations.callback` on your backend, and then pass those results down to the frontend HTML.

### 1. Install Dependencies

Ensure you have the Wingify FE SDK installed in your project:

```bash
npm install Wingify-fme-node-sdk
```

***

### 2. Create a Helper for Sending Data to Clarity

On your frontend (client-side), create a snippet that takes the injected payload from your backend and loops over it using `window.clarity("set")` and `window.clarity("event")`.

```html
<script>
  // Ensure the Clarity command queue exists in case the main snippet hasn't finished loading
  window.clarity = window.clarity || function () {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };

  // Assuming `WingifyData` and `WingifyEvent` are injected from your backend callback
  const WingifyData = <%- JSON.stringify(WingifyFlagData) %>;
  const WingifyEvent = <%- JSON.stringify(WingifyEventData) %>;

  // Loop through all flag properties and send them as distinct Custom Tags
  Object.keys(WingifyData).forEach(function (key) {
    if (WingifyData[key]) {
      window.clarity("set", "Wingify_" + key, WingifyData[key]);
    }
  });

  // Send the event name if an event was tracked
  if (WingifyEvent && WingifyEvent.eventName) {
    window.clarity("event", "Wingify_Event_" + WingifyEvent.eventName);
  }
</script>
```

> **Note:** **Custom Tag Limits**
>
> Microsoft Clarity enforces strict limits for Custom Tags:
>
> - The tag name (key) cannot exceed **255 characters**.
> - The tag value cannot exceed **255 characters**.
> - A single pageview can have no more than **128 custom tags** attached to it.
>
> Passing down the entire integrations callback object is perfectly safe and well within these limits.

***

### 3. Initialize Wingify SDK and Set Up the `integrations.callback`

Configure the Wingify SDK to capture data using the `integrations.callback` and make it available for the frontend.

```javascript
const wingify = require("wingify-fme-node-sdk");

let WingifyFlagData = {};
let WingifyEventData = {};

const WingifyClient = await wingify.init({
  accountId: "YOUR_ACCOUNT_ID",
  sdkKey: "YOUR_SDK_KEY",
  integrations: {
    callback: (properties) => {
      if (properties.api === "getFlag") {
        // Collect all the rich data Wingify provides for feature flags
        WingifyFlagData = {
          featureName: String(properties.featureName || ""),
          featureId: String(properties.featureId || ""),
          featureKey: String(properties.featureKey || ""),
          experimentId: String(properties.experimentId || ""),
          experimentKey: String(properties.experimentKey || ""),
          experimentVariationId: String(properties.experimentVariationId || ""),
          rolloutId: String(properties.rolloutId || ""),
          rolloutKey: String(properties.rolloutKey || ""),
          rolloutVariationId: String(properties.rolloutVariationId || ""),
          isUserPartOfCampaign: String(properties.isUserPartOfCampaign || ""),
          isPartOfHoldout: String(properties.isPartOfHoldout || ""),
          isHoldoutPresent: String(properties.isHoldoutPresent || ""),
          holdoutIDs: JSON.stringify(properties.holdoutIDs || []),
          customVariables: JSON.stringify(properties.customVariables || {}),
          variationTargetingVariables: JSON.stringify(
            properties.variationTargetingVariables || {}
          ),
        };
      } else if (properties.api === "trackEvent") {
        // Collect event data when WingifyClient.trackEvent is called
        WingifyEventData = {
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
const getFlag = await WingifyClient.getFlag(
  "new_checkout_flow",
  userContext
);

await WingifyClient.trackEvent("e1", userContext);

// After calling wingifyClient.getFlag() and wingifyClient.trackEvent(),
// pass WingifyFlagData and WingifyEventData to your frontend rendering engine!
```

This setup ensures that every time a feature flag is evaluated or an event is tracked by the Wingify SDK, the relevant data is automatically prepared to be sent to your configured Microsoft Clarity project.

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

## How to See the Data in Clarity

After integrating Microsoft Clarity with your application, you can view the tracked data in the following ways.

### 1. Verify in Your Browser Network Tab

- Open your website with Developer Tools open.
- Go to the **Network** tab.
- Refresh the page.
- Filter requests by `collect` or `bing.com`.
- Look at the payload to confirm your Wingify keys are being sent.

### 2. View Feature Flag Evaluations (Custom Tags)

- Log in to your Microsoft Clarity dashboard and navigate to the **Recordings** tab.
- Open a session recording.
- On the left sidebar, click the **Info** tab.
- Scroll down to the **Custom Tags** section to see all attached Wingify properties.
- Alternatively, click the **More details** button above the video player to expand the session metadata.

### 3. Filter Recordings by Wingify Data

- From the main **Recordings** or **Dashboard** tab, click the blue **Filters** button at the top left.
- For **Custom Tags** (such as `Wingify_experimentId`):
  - Expand the **Custom tags** category.
  - Select your key.
  - Set the value (for example, `12`).
- For **Behavioral Events** (such as `Wingify_Event_e1`):
  - Expand the **Smart events** category.
  - Type your event name.

> **Note**
>
> Custom tags in Microsoft Clarity are not retroactive, and it may take a little time for new session recordings to be fully encoded and visible in the dashboard.
>
> If you don't see your tag immediately in the Filters dropdown or Info tab, wait **15–30 minutes** and try again.

***

## Sample Screenshots

1. ### Dashboard Analytics

&#x20;   Filtering sessions and viewing Smart Events.<br />

![](https://files.readme.io/573ef85fcc0d5e6aadac12114266230b4f119fed797600a42cb2686c73c01395-image2.png)

2. ### Custom Tags

&#x20;   Wingify `getFlag` event with custom properties.<br />

![](https://files.readme.io/54872ad2187054fc06fd89dc60b040dcd3eeb0c4a126ba19c54c0916011d03d9-image1.png)

<br />

<br />
