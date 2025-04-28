---
title: VWO FullStack Ruby SDK Usage
description: Example of how VWO SDK can be integrated into your codebase.
hidden: false
recipe:
  color: '#018FF4'
  icon: ''
---
```ruby Ruby
require 'vwo'

vwo_client_instance = VWO.new(config['account_id'], config['sdk_key'], nil, nil, false)

options = {}

variation_name = vwo_client_instance.activate(campaign_key, user_id, options)

vwo_client_instance.track(campaign_key, user_id, goal_identifier, options)

```

```json Response Example
{"success":true}
```

# Import VWO SDK

<!-- ruby@1 -->

Install and import the VWO SDK

# Fetch Settings and Launch the SDK

<!-- ruby@3 -->

After importing VWO SDK, fetch the campaign settings by providing your VWO Account ID and SDK key.
This will create VWO SDK's client instance which would be used to call the activation and tracking APIs exposed by the SDK.

# Activate the A/B Campaign

<!-- ruby@7 -->

Activate your A/B campaign by using activate API by passing the unique campaign key for your A/B campaign and the unique user ID to get the decision/variation for the corresponding user for your campaign.

# Track A/B Campaign Goal

<!-- ruby@9 -->

Track a goal of your A/B Campaign by using the track API. Pass unique campaign key, unique user ID, and the unique goal identifier for the goal of the campaign you wish to trigger for that user.