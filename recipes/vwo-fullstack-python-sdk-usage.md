---
title: VWO FullStack Python SDK Usage
description: Recipe DescriptionExample of how VWO SDK can be integrated into your codebase.
hidden: false
recipe:
  color: '#018FF4'
  icon: ''
---
```python Python
import vwo

settings_file = vwo.get_settings_file(account_id, sdk_key)

vwo_client_instance = vwo.launch(settings_file)

variation_name = vwo_client_instance.activate(campaign_key, user_id)

vwo_client_instance.track(campaign_key, user_id, goal_identifeir)

```

```json Response Example
{"success":true}
```

# Import VWO SDK

<!-- python@1 -->

Install and import the VWO SDK

# Fetch Settings

<!-- python@3 -->

After importing VWO SDK, fetch the campaign settings by providing your VWO Account ID and SDK key.

# Launch the SDK

<!-- python@5 -->

Launch the SDK by providing the fetched settings file. This will create VWO SDK's client instance which would be used to call the activation and tracking APIs exposed by the SDK.

# Activate the A/B Campaign

<!-- python@7 -->

Activate your A/B campaign by using activate API by passing the unique campaign key for your A/B campaign and the unique user ID to get the decision/variation for the corresponding user for your campaign.

# Track A/B Campaign Goal

<!-- python@9 -->

Track a goal of your A/B Campaign by using the track API. Pass unique campaign key, unique user ID, and the unique goal identifier for the goal of the campaign you wish to trigger for that user.