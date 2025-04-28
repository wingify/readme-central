---
title: VWO FullStack PHP SDK Usage
description: Example of how VWO SDK can be integrated into your codebase.
hidden: false
recipe:
  color: '#018FF4'
  icon: ''
---
```php PHP
require_once('vendor/autoload.php');

use vwo\VWO;

$settingsFile = VWO::getSettingsFile($accountId, $sdkKey);

$sdkConfig = [
  'settingsFile' => $settingsFile
];


$vwoClientInstance = new VWO($sdkConfig);

$variationName = $vwoClientInstance->activate($campaignKey, $userId, $options);

$vwoClientInstance->track($campaignKey, $userId, $goalIdentifier, $options);

```

```json Response Example
{"success":true}
```

# Import VWO SDK

<!-- php@1 -->

Install and import the VWO SDK

# Fetch Settings

<!-- php@5 -->

After importing VWO SDK, fetch the campaign settings by providing your VWO Account ID and SDK key.

# Launch the SDK

<!-- php@12 -->

Launch the SDK by providing the fetched settingsFile. This will create VWO SDK's client instance which would be used to call the activation and tracking APIs exposed by the SDK.

# Activate the A/B Campaign

<!-- php@14 -->

Activate your A/B campaign by using activate API by passing the unique campaign key for your A/B campaign and the unique user ID to get the decision/variation for the corresponding user for your campaign.

# Track A/B Campaign Goal

<!-- php@16 -->

Track a goal of your A/B Campaign by using the track API. Pass unique campaign key, unique user ID, and the unique goal identifier for the goal of the campaign you wish to trigger for that user.