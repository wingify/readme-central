---
title: VWO FME Flutter SDK Usage
description: Recipe Description
hidden: true
recipe:
  color: '#018FF4'
  icon: 🦉
---
```javascript Dart
import 'package:vwo_fme_flutter_sdk/vwo.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_init_options.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/vwo_user_context.dart';
import 'package:vwo_fme_flutter_sdk/vwo/models/get_flag.dart';
import 'package:vwo_fme_flutter_sdk/logger/log_transport.dart';

final vwoInitOptions = VWOInitOptions(
  sdkKey: SDK_KEY,
  accountId: ACCOUNT_ID,
);

// Create VWO instance with the vwoInitOptions
final vwoClient = await VWO.init(vwoInitOptions);

// Create VWOUserContext object
final context = VWOUserContext(
    id: "unique_user_id",
    customVariables: {"key1": 21, "key2": "value"}
);

// Get the GetFlag object for the feature key and context
final featureFlag = await vwoClient?.getFlag(
  featureKey: "feature_key",
  context: context,
);

if (featureFlag != null) {
  // Get the flag value
  final isFeatureFlagEnabled = featureFlag.isEnabled();

  // Get the variable value for the given variable key and default value
  dynamic variable = featureFlag.getVariable("feature_flag_variable", "default-value");
}

// Track the event for the given event name and context
final properties = {"cartvalue": 10};
await vwoClient?.trackEvent(
  eventName: "event-name",
  context: context,
  eventProperties: properties,
);

// Send attributes data
final attributes = {
  "attributeName": "attributeValue"
};
await vwoClient?.setAttribute(
  attributes: attributes,
  context: context,
);
```

```json Response Example
{"success":true}
```

# Import

<!-- javascript@1-5 -->

Import VWO FME SDK so it can be initialized.

# Initialize

<!-- javascript@7-13 -->

This code initializes the VWO SDK using the init function. The init function takes in the required parameters - SDK Key and Account ID. Optional keys like storage, logger, polling, etc can be passed depending upon the requirements.

# Set User Context

<!-- javascript@15-19 -->

The context uniquely identifies users and is crucial for consistent feature rollouts. A typical context is an object with a required id key for user identification. Other user attributes can also be passed for segmentation purposes.

# Get Feature Flag & its Variables

<!-- javascript@21-25 -->

This code verifies whether the flag associated with the provided feature-key is enabled and allows access to the corresponding variable(s).

# Track a Custom Event

<!-- javascript@35-41 -->

Tracks a metric conversion for a specified event, requiring a User Context and optional event properties.

# Set User Attributes

<!-- javascript@43-50 -->

Sends a user attribute to VWO for filtering campaign reports based on attributes.