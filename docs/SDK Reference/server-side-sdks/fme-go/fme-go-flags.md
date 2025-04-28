---
title: Feature Flags
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-variables
      title: Variables
---
Feature flags are at the core of VWO's Feature Management and Experimentation capabilities. They allow you to control feature rollouts and conduct experiments.

## GetFlag()

The `GetFlag()` function is used to fetch the status and variables of a feature flag for a given user.

```go
flag, err := vwoClient.GetFlag("feature_key", userContext)
if err != nil {
    // Handle error
}

if flag.IsEnabled() {
    // Feature is enabled for this user
    // Implement the feature
} else {
    // Feature is disabled for this user
    // Implement fallback behavior
}
```

<br />

### Parameter Definitions

<br />

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**feature_key**  \n_Required_",
    "0-1": "string",
    "0-2": "unique identifier for the particular feature flag that you're implementing. You will see this while creating a feature flag, and you can also find it under 'Settings' for the Feature Flag after creating it.",
    "1-0": "**userContext**  \n_Required_",
    "1-1": "map[string]interface{}",
    "1-2": "Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context)."
  },
  "cols": 3,
  "rows": 2,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


<br />

### Return Value

The _GetFlag()_ function returns a _GetFlagResponse_ object, which has the following methods:

- IsEnabled(): Returns a boolean indicating if the feature is enabled for the user.
- GetVariables(): Returns a list of variables associated with the feature.
- GetVariable(key string, defaultValue interface{}): Returns the value of a specific variable.

### Example Usage

```go
flag, err := vwoClient.GetFlag("new_checkout", userContext)
if err != nil {
    log.Fatal(err)
}

if flag.IsEnabled() {
    // Implement new checkout flow
    buttonColor := flag.GetVariable("button_color", "blue")
    // Use buttonColor in your UI
} else {
    // Use old checkout flow
}
```

Remember that the feature flag must be defined in your VWO dashboard before using it in your code.