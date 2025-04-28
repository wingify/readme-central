---
title: VWO FullStack JavaScript SDK Usage
description: Recipe DescriptionExample of how VWO SDK can be integrated into your codebase.
hidden: false
recipe:
  color: '#018FF4'
  icon: 🦉
---
```node Node
const vwoSDK = require('vwo-node-sdk');

const settingsFile = await vwoSDK.getSettingsFile(accountId, sdkKey)

const vwoClientInstance = vwoSDK.launch({
	settingsFile
});

const variationName = vwoClientInstance.activate(campaignKey, userId);

vwoClientInstance.track(campaignKey, userId, goalIdentifier);
```

```json Response Example
{"success":true}
```

# Import VWO SDK

<!-- node@1 -->

Install and import the VWO SDK

# Fetch Settings

<!-- node@3 -->

After importing VWO SDK, fetch the campaign settings by providing your VWO Account ID and SDK key.

# Launch the SDK

<!-- node@5-7 -->

Launch the SDK by providing the fetched settings-file. This will create VWO SDK's client instance which would be used to call the activation and tracking APIs exposed by the SDK.

# Activate the A/B Campaign

<!-- node@9 -->

Activate your A/B campaign by using activate API by passing the unique campaign key for your A/B campaign and the unique user ID to get the decision/variation for the corresponding user for your campaign.

# Track A/B Campaign Goal

<!-- node@11 -->

Track a goal of your A/B Campaign by using the track API. Pass unique campaign key, unique user ID, and the unique goal identifier for the goal of the campaign you wish to trigger for that user.