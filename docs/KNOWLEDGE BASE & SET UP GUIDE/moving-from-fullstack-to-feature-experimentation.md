---
title: Moving from Fullstack to Feature Experimentation
deprecated: false
hidden: true
metadata:
  robots: index
---
# VWO FullStack vs FME

A comprehensive guide to understanding the differences and migrating from VWO FullStack to Feature Management & Experimentation (FME).

***

## Introduction

**`DEPRECATED`** **VWO FullStack (FS)** — The original server-side SDK for A/B testing and feature management. Only receiving critical bug fixes and security patches.

**`CURRENT`** **VWO FME (Feature Management & Experimentation)** — The actively developed replacement with a modernized API and improved developer experience.

### Same Purpose, New Philosophy

Both SDKs enable server-side A/B testing and feature management. The key difference lies in their design philosophy:

| FullStack                                                                                                                    | FME                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Campaign-Centric** — Everything revolves around campaigns. You activate users into campaigns and track goals per campaign. | **Feature-Flag-Centric** — Features are the primary unit. You evaluate flags and track events independently of campaigns. |

***

## Installation

| Aspect              | FullStack                  | FME                            |
| ------------------- | -------------------------- | ------------------------------ |
| **Package Name**    | `vwo-node-sdk`             | `vwo-fme-node-sdk`             |
| **Install Command** | `npm install vwo-node-sdk` | `npm install vwo-fme-node-sdk` |
| **Node.js Version** | >= 6.10.0                  | >= 12.0                        |

***

## Initialization

### FullStack: Two-Step Process

```javascript
const vwoSDK = require('vwo-node-sdk');

// Step 1: Fetch settings file
const settingsFile = await vwoSDK.getSettingsFile(
  accountId,
  sdkKey
);

// Step 2: Launch SDK
const vwoClient = vwoSDK.launch({
  settingsFile: settingsFile
});
```

### FME: Single-Step Process

```javascript
const { init } = require('vwo-fme-node-sdk');

// Single initialization call
const vwoClient = await init({
  accountId: '123456',
  sdkKey: 'your-sdk-key',
});

// Optional: auto-refresh settings
const vwoClient = await init({
  accountId: '123456',
  sdkKey: 'your-sdk-key',
  pollInterval: 60000,
});
```

> **Key Difference:** FME handles settings file fetching internally. No need for a separate `getSettingsFile()` call.

***

## Running an A/B Test

### FullStack Approach (Campaign-Centric)

```javascript
const vwoSDK = require('vwo-node-sdk');

// Initialize
const settingsFile = await vwoSDK.getSettingsFile(accountId, sdkKey);
const vwoClient = vwoSDK.launch({ settingsFile });

// Activate user in campaign - returns variation name
const variation = vwoClient.activate(
  'checkout-button-campaign',  // campaignKey
  'user-123',                   // userId
  {
    customVariables: { plan: 'premium' },
    userAgent: req.headers['user-agent']
  }
);

// Handle variations by name
if (variation === 'Control') {
  buttonColor = 'blue';
} else if (variation === 'Variation-1') {
  buttonColor = 'green';
} else {
  // User not in campaign (null returned)
  buttonColor = 'blue';
}

// Track conversion (requires campaignKey)
vwoClient.track(
  'checkout-button-campaign',  // campaignKey
  'user-123',                   // userId
  'purchase-completed'          // goalIdentifier
);
```

### FME Approach (Feature-Flag-Centric)

```javascript
const { init } = require('vwo-fme-node-sdk');

// Initialize
const vwoClient = await init({
  accountId: '123456',
  sdkKey: 'your-sdk-key',
});

// Create user context once, reuse it
const userContext = {
  id: 'user-123',
  customVariables: { plan: 'premium' },
  userAgent: req.headers['user-agent']
};

// Get feature flag - contains all variation data
const flag = await vwoClient.getFlag('checkout-button', userContext);

// Check if enabled and get variables
if (flag.isEnabled()) {
  buttonColor = flag.getVariable('buttonColor', 'blue');
  buttonText = flag.getVariable('buttonText', 'Buy Now');
}

// Track event (no campaign key needed)
vwoClient.trackEvent('purchase-completed', userContext);
```

> **Key Differences:**
>
> * **User ID:** FS passes it per method; FME uses a reusable `userContext` object
> * **Variation access:** FS returns variation name to check; FME provides variables directly via `getVariable()`
> * **Tracking:** FS requires `campaignKey`; FME tracks events independently

***

## Variables Over Variations

One of the most important changes in FME is the shift from **variation-name-based logic** to **variable-driven logic**. This isn't just a syntax change—it's a fundamental improvement in how you architect experiments.

### The Problem with Variation Names (FS Approach)

In FullStack, you typically check which variation a user is in and branch your code accordingly:

```javascript
// FullStack: Variation-name-based logic (NOT recommended)
const variation = vwoClient.activate('checkout-experiment', userId);

if (variation === 'Control') {
  buttonColor = 'blue';
  buttonText = 'Buy Now';
  showBadge = false;
} else if (variation === 'Variation-1') {
  buttonColor = 'green';
  buttonText = 'Buy Now';
  showBadge = true;
} else if (variation === 'Variation-2') {
  buttonColor = 'orange';
  buttonText = 'Add to Cart';
  showBadge = true;
}
```

> **Problems with this approach:**
>
> * **Tight coupling:** Your code is tightly coupled to variation names defined in VWO
> * **Code changes for experiments:** Adding a new variation requires a code deployment
> * **Hard to maintain:** Variation logic is scattered across your codebase
> * **Rigid:** Non-developers cannot iterate on experiments without code changes

### The Solution: Variable-Driven Logic (FME Approach)

FME encourages you to define **variables** (buttonColor, buttonText, showBadge) in the VWO dashboard, with each variation specifying different values. Your code simply reads these variables:

```javascript
// FME: Variable-driven logic (RECOMMENDED)
const flag = await vwoClient.getFlag('checkout-experiment', userContext);

if (flag.isEnabled()) {
  // Variables are configured in VWO dashboard, not hardcoded
  const buttonColor = flag.getVariable('buttonColor', 'blue');
  const buttonText = flag.getVariable('buttonText', 'Buy Now');
  const showBadge = flag.getVariable('showBadge', false);

  renderButton(buttonColor, buttonText, showBadge);
}
```

> **Benefits of variable-driven logic:**
>
> * **Decoupled:** Code doesn't know or care about variation names
> * **No deployments:** Add new variations or modify existing ones entirely in VWO
> * **Single source of truth:** All experiment configuration lives in the dashboard
> * **Team empowerment:** Product managers can iterate without engineering

### Side-by-Side Comparison

**FullStack (Variation-Based):**

```javascript
// Code knows about variations
if (variation === 'Variation-1') {
  // Hardcoded behavior
  showNewCheckout();
} else {
  showOldCheckout();
}

// Adding Variation-2 requires:
// 1. Code change
// 2. Code review
// 3. Deployment
```

**FME (Variable-Based):**

```javascript
// Code only knows about variables
const useNewFlow = flag.getVariable(
  'useNewCheckout', false
);

if (useNewFlow) {
  showNewCheckout();
} else {
  showOldCheckout();
}

// Adding variations:
// Just update VWO dashboard!
```

### When You Need Variation Names

Sometimes you genuinely need to know which variation a user is in (for logging, analytics, or debugging). In FME, the recommended approach is to create an explicit `variation_name` variable:

```javascript
// Create a 'variationName' variable in VWO dashboard
// Control: variationName = "control"
// Variation-1: variationName = "green-button"
// Variation-2: variationName = "orange-button"

const flag = await vwoClient.getFlag('checkout-experiment', userContext);
const variationName = flag.getVariable('variationName', 'control');

// Use for logging/analytics only, not branching logic
analytics.track('experiment_viewed', { variation: variationName });
```

> **Best Practice:** Treat variation names as **configuration artifacts**, not API contracts. Your code should depend on **variables** (what to do), not **variations** (which bucket the user is in). This aligns with OpenFeature best practices.

***

## API Method Mapping

| Purpose                | FullStack                                                   | FME                                      |
| ---------------------- | ----------------------------------------------------------- | ---------------------------------------- |
| **Initialize SDK**     | `getSettingsFile()` + `launch()`                            | `init()`                                 |
| **Get variation**      | `activate(campaignKey, userId)`                             | `getFlag(featureKey, userContext)`       |
| **Check if enabled**   | `isFeatureEnabled(campaignKey, userId)`                     | `flag.isEnabled()`                       |
| **Get variable value** | `getFeatureVariableValue(campaignKey, variableKey, userId)` | `flag.getVariable(key, defaultValue)`    |
| **Get all variables**  | N/A (call per variable)                                     | `flag.getVariables()`                    |
| **Track conversion**   | `track(campaignKey, userId, goalId)`                        | `trackEvent(eventName, userContext)`     |
| **Push attributes**    | `push(tagKey, tagValue, userId)`                            | `setAttribute(name, value, userContext)` |

***

## Conceptual Differences

| Aspect                  | FullStack                                                                    | FME                                       |
| ----------------------- | ---------------------------------------------------------------------------- | ----------------------------------------- |
| **Primary Unit**        | Campaign                                                                     | Feature Flag                              |
| **User Identification** | `userId` string passed to each method                                        | `userContext` object created once, reused |
| **Async Pattern**       | Callback-based with opt-in promises (`returnPromiseFor: { activate: true }`) | Native async/await by default             |
| **Event Tracking**      | Tied to campaigns (requires `campaignKey`)                                   | Event-based, campaign-agnostic            |
| **Custom Variables**    | Passed in `options` per method call                                          | Part of `userContext.customVariables`     |
| **Settings Management** | Manual: fetch, store, refresh via webhooks/polling                           | Automatic with `pollInterval` option      |

***

## Quick Migration Checklist

* [ ] Update package: `vwo-node-sdk` → `vwo-fme-node-sdk`
* [ ] Change import: `require('vwo-node-sdk')` → `const { init } = require('vwo-fme-node-sdk')`
* [ ] Replace `getSettingsFile()` + `launch()` with single `init()`
* [ ] Create `userContext` objects instead of passing `userId` strings
* [ ] Replace `activate()` with `getFlag()`
* [ ] Replace `isFeatureEnabled()` with `flag.isEnabled()`
* [ ] Replace `getFeatureVariableValue()` with `flag.getVariable()`
* [ ] Replace `track()` with `trackEvent()` (remove campaignKey)
* [ ] Move `customVariables` from options to `userContext`
* [ ] Update Node.js to >= 12.0 if needed

***

## Detailed Migration Guide

### Step 1: Update Package

```bash
# Remove old package
npm uninstall vwo-node-sdk

# Install new package
npm install vwo-fme-node-sdk --save
```

### Step 2: Update Import Statement

**Before (FS):**

```javascript
const vwoSDK = require('vwo-node-sdk');
```

**After (FME):**

```javascript
const { init } = require('vwo-fme-node-sdk');
```

### Step 3: Refactor Initialization

**Before (FS):**

```javascript
const settingsFile = await vwoSDK.getSettingsFile(accountId, sdkKey);

const vwoClient = vwoSDK.launch({
  settingsFile,
  isDevelopmentMode: false,
  logging: { level: 'ERROR' }
});
```

**After (FME):**

```javascript
const vwoClient = await init({
  accountId: '123456',
  sdkKey: 'your-sdk-key',
  logger: { level: 'ERROR' },
  pollInterval: 60000  // auto-refresh settings
});
```

### Step 4: Create User Context

**Before (FS) — User ID and options passed to each method:**

```javascript
const userId = 'user-123';
const options = {
  customVariables: { plan: 'premium' },
  userAgent: req.headers['user-agent'],
  userIpAddress: req.ip
};

vwoClient.activate(campaignKey, userId, options);
vwoClient.track(campaignKey, userId, goalId, options);
```

**After (FME) — User context created once and reused:**

```javascript
const userContext = {
  id: 'user-123',
  customVariables: { plan: 'premium' },
  userAgent: req.headers['user-agent'],
  ipAddress: req.ip
};

const flag = await vwoClient.getFlag(featureKey, userContext);
vwoClient.trackEvent(eventName, userContext);
```

### Step 5: Migrate A/B Test Logic

**Before (FS):**

```javascript
const variation = vwoClient.activate('button-test', userId, options);

if (variation === 'Control') {
  showBlueButton();
} else if (variation === 'Variation-1') {
  showGreenButton();
}
```

**After (FME):**

```javascript
const flag = await vwoClient.getFlag('button-test', userContext);

if (flag.isEnabled()) {
  const color = flag.getVariable('buttonColor', 'blue');
  showButton(color);
} else {
  showBlueButton();
}
```

### Step 6: Migrate Event Tracking

**Before (FS):**

```javascript
// Track requires campaign key
vwoClient.track('button-test', userId, 'button-clicked');

// Track across multiple campaigns
vwoClient.track(['campaign-1', 'campaign-2'], userId, 'purchase');

// Revenue tracking
vwoClient.track('campaign', userId, 'revenue-goal', {
  revenueValue: 99.99
});
```

**After (FME):**

```javascript
// Track event (no campaign key needed)
vwoClient.trackEvent('button-clicked', userContext);

// Same event works across all campaigns automatically
vwoClient.trackEvent('purchase', userContext);

// Event with properties
vwoClient.trackEvent('revenue-goal', userContext, {
  revenue: 99.99
});
```

### Step 7: Migrate Variable Access

**Before (FS):**

```javascript
// Check feature and get variables separately
const isEnabled = vwoClient.isFeatureEnabled('new-checkout', userId);

if (isEnabled) {
  const headerText = vwoClient.getFeatureVariableValue(
    'new-checkout', 'headerText', userId
  );
  const showBanner = vwoClient.getFeatureVariableValue(
    'new-checkout', 'showBanner', userId
  );
}
```

**After (FME):**

```javascript
// Get flag once, access all variables
const flag = await vwoClient.getFlag('new-checkout', userContext);

if (flag.isEnabled()) {
  const headerText = flag.getVariable('headerText', 'Welcome');
  const showBanner = flag.getVariable('showBanner', false);

  // Or get all variables at once
  const allVars = flag.getVariables();
}
```

***

## Summary

| Aspect            | FullStack (Deprecated)    | FME (Current)                            |
| ----------------- | ------------------------- | ---------------------------------------- |
| **Package**       | `vwo-node-sdk`            | `vwo-fme-node-sdk`                       |
| **Node.js**       | >= 6.10.0                 | >= 12.0                                  |
| **Init Pattern**  | Two-step (fetch + launch) | Single `init()` call                     |
| **User ID**       | String per method         | `userContext` object                     |
| **Get Variation** | `activate()` → string     | `getFlag()` → flag object                |
| **Variables**     | One call per variable     | `flag.getVariable()` or `getVariables()` |
| **Tracking**      | Requires `campaignKey`    | Event-based, campaign-agnostic           |
| **Async**         | Opt-in promises           | Native async/await                       |
| **Status**        | Critical fixes only       | Actively developed                       |

***

> **Need Help?** For assistance migrating from FullStack to FME, contact VWO support at [support@vwo.com](mailto:support@vwo.com)
