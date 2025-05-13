---
title: VWO FME React Native SDK Usage
description: Recipe Description
hidden: true
recipe:
  color: '#018FF4'
  icon: 🦉
---
```javascript JavaScript
import {init} from 'vwo-fme-react-native-sdk';
import {VWOInitOptions, VWOUserContext, GetFlagResult} from 'vwo-fme-react-native-sdk/src/types';

const options: VWOInitOptions = { sdkKey: '32-alpha-numeric-sdk-key', // SDK Key
                                 	accountId: 123456 }; // VWO Account ID
const vwoClient = await init(options);

const userContext: VWOUserContext = { id: 'unique_user_id', customVariables: {} }; 

const flagResult: GetFlagResult = await vwoClient.getFlag('feature_key', userContext);
const isEnabled = flagResult.isEnabled();
const variableValue = flagResult.getVariable('variable_key', 'default_value');
const allVariables = flagResult.getVariables();

vwoClient.trackEvent('event_name', userContext, {});

const attributeMap = { "key": "value" };
vwoClient.setAttribute( attributeMap, userContext);
```

```json Response Example
{"success":true}
```

# Import

<!-- javascript@1-2 -->

Import VWO FME SDK so it can be initialized.




# Initialize

<!-- javascript@4-6 -->

This code initializes the VWO SDK using the init function. The init function takes in the required parameters - SDK Key and Account ID. Optional keys like storage, logger, polling, etc. can be passed depending upon the requirements.

# Set User Context

<!-- javascript@8 -->

The context uniquely identifies users and is crucial for consistent feature rollouts. A typical context is an object with a required id key for user identification. Other user attributes can also be passed for segmentation purposes.

# Get Flag Status & its Variables

<!-- javascript@10-13 -->

This code verifies whether the flag associated with the provided feature-key is enabled and allows access to the corresponding variable(s).

# Track a Custom Event

<!-- javascript@15 -->

Tracks a metric conversion for a specified event, requiring a User Context and optional event properties.

# Set User Attributes

<!-- javascript@17-18 -->

Sends a user attribute to VWO for filtering campaign reports based on attributes.