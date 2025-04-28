---
title: VWO FullStack Java SDK Usage
description: Example of how VWO SDK can be integrated into your codebase.
hidden: false
recipe:
  color: '#018FF4'
  icon: ''
---
```java Java
import com.vwo.VWO;

String settingsFile = VWO.getSettingsFile(accountId, sdkKey));

VWO vwoClientInstance = VWO.launch(settingsFile).build();

String variationName = vwoClientInstance.activate(campaignKey, userId, options);

vwoClientInstance.track(campaignKey, userId, goalIdentifier, options);
```

```json Response Example
{"success":true}
```

# Import VWO SDK

<!-- java@1 -->

Install and import the VWO SDK

# Fetch Settings

<!-- java@3 -->

After importing VWO SDK, fetch the campaign settings by providing your VWO Account ID and SDK key.

# Launch the SDK

<!-- java@5 -->

Launch the SDK by providing the fetched settings file. This will create VWO SDK's client instance which would be used to call the activation and tracking APIs exposed by the SDK.

# Activate the A/B Campaign

<!-- java@7 -->

Activate your A/B campaign by using activate API by passing the unique campaign key for your A/B campaign and the unique user ID to get the decision/variation for the corresponding user for your campaign.

# Track A/B Campaign Goal

<!-- java@9 -->

Track a goal of your A/B Campaign by using the track API. Pass unique campaign key, unique user ID, and the unique goal identifier for the goal of the campaign you wish to trigger for that user.