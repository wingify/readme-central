---
title: VWO FME Android SDK Usage
description: Recipe Description
hidden: true
recipe:
  color: '#018FF4'
  icon: 🦉
---
```shell Shell

```

```kotlin Kotlin
import com.vwo.VWO
import com.vwo.VWO.init
import com.vwo.interfaces.IVwoInitCallback
import com.vwo.models.user.GetFlag
import com.vwo.models.user.VWOUserContext
import com.vwo.models.user.VWOInitOptions

// Initialize VWO SDK
val vwoInitOptions = VWOInitOptions()
// Set SDK Key and Account ID
vwoInitOptions.sdkKey = SDK_KEY
vwoInitOptions.accountId = ACCOUNT_ID

// Create VWO instance with the vwoInitOptions
init(vwoInitOptions, object : IVwoInitCallback {
    override fun vwoInitSuccess(vwoClient: VWO, message: String) {
        this@MyActivity.vwoClient = vwoClient
    }

    override fun vwoInitFailed(message: String) {
        //Initialization failed
    }
})

// Create VWOUserContext object
var context = VWOUserContext()
// Set User ID
context.id = "unique_user_id"
context.customVariables = mutableMapOf("key1" to 21, "key2" to 0)

// Get the GetFlag object for the feature key and context
vwoClient.getFlag("feature_key", context, object : IVwoListener {
    override fun onSuccess(data: Any) {
        featureFlag = data as? GetFlag
        // Get the flag value
        val isFeatureFlagEnabled = featureFlag?.isEnabled()

        // Get the variable value for the given variable key and default value
        val variable: String = featureFlag.getVariable("feature_flag_variable", "default-value") as String
    }

    override fun onFailure(message: String) {
        //Feature flag is disabled
    }
})

// Track the event for the given event name and context
val properties = mutableMapOf<String, Any>("cartvalue" to 10)
vwoClient?.trackEvent("vwoevent", context, properties)

// send attributes data
val attributes = mapOf(
    "attributeName" to "attributeValue"
)
vwoClient?.setAttribute(attributes, context)
```

```json Response Example
{"success":true}
```

# 1. Import

<!-- shell@ -->
<!-- kotlin@1-6 -->

Import VWO FME SDK so it can be initialized.

# 2. Initialize

<!-- shell@ -->
<!-- kotlin@8-23 -->

This code initializes the VWO SDK using the init function. The init function takes in the required parameters - SDK Key and Account ID. Optional keys like storage, logger, polling, etc. can be passed depending upon the requirements.

# 3. Set User Context

<!-- shell@ -->
<!-- kotlin@25-29 -->

The context uniquely identifies users and is crucial for consistent feature rollouts. A typical context is an object with a required id key for user identification. Other user attributes can also be passed for segmentation purposes.

# 4. Get Feature Flag and Variable

<!-- shell@ -->
<!-- kotlin@31-45 -->

This code verifies whether the flag associated with the provided feature-key is enabled and allows access to the corresponding variable(s).

# 5. Track a Custom Event

<!-- shell@ -->
<!-- kotlin@47-49 -->

Tracks a metric conversion for a specified event, requiring a User Context and optional event properties.

# 6. Set User Attributes

<!-- shell@ -->
<!-- kotlin@51-55 -->

Sends a user attribute to VWO for filtering campaign reports based on attributes.