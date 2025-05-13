---
title: VWO FME iOS SDK Usage
description: Recipe Description
hidden: true
recipe:
  color: '#018FF4'
  icon: 🦉
---
```swift Swift
import VWO_FME

let options = VWOInitOptions(sdkKey: "32-alpha-numeric-sdk-key", // SDK Key
                             accountId: 123456) // VWO Account ID

VWOFme.initialize(options: options) { result in
	switch result {
		case .success(let message):
			// Initialization was successfull
		case .failure(let error):
       // Handle initialization failure
  }
}

let userContext = VWOUserContext(id: "unique_user_id",
                                 customVariables: ["key":"value"]) //

VWOFme.getFlag(featureKey: "feature_key", context: userContext, completion: { featureFlag in

	let isFlagEnabled = featureFlag.isEnabled()
	let variableValue = featureFlag.getVariable(key: "variable_key", defaultValue: "default_value")
	let allVariables = featureFlag.getVariables()
})

VWOFme.trackEvent(eventName: "event_name", context: userContext, eventProperties: [:])

let attributeDict: [String: Any] = ["key", "value"]
VWOFme.setAttribute(attributes: attributeDict, context: userContext)
```

```json Response Example
{"success":true}
```

# Import

<!-- swift@1 -->

Import VWO FME SDK so it can be initialized.

# Initialiaze

<!-- swift@3-13 -->

This code initializes the VWO SDK using the init function. The init function takes in the required parameters - SDK Key and Account ID. Optional keys like storage, logger, polling, etc. can be passed depending upon the requirements.

# Set user context

<!-- swift@15-17 -->

The context uniquely identifies users and is crucial for consistent feature rollouts. A typical context is an object with a required id key for user identification. Other user attributes can also be passed for segmentation purposes.

# Get Flag Status & its Variables

<!-- swift@18-23 -->

This code verifies whether the flag associated with the provided feature-key is enabled and allows access to the corresponding variable(s).

# Track a Custom Event

<!-- swift@25 -->

Tracks a metric conversion for a specified event, requiring a User Context and optional event properties.

# Set User Attributes

<!-- swift@27-28 -->

Sends a user attribute to VWO for filtering campaign reports based on attributes.