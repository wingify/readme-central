---
title: User Context (Draft)
deprecated: false
hidden: true
metadata:
  robots: index
---
```Text Swift
// Define the user context object to identify and provide user-specific details
let userId = "unique_user_id"
let customVariables: [String : Any] = ["age": 25, "location": "US"]

let userContext = VWOUserContext(id: userId, customVariables: customVariables)

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
VWOFme.getFlag(featureKey: "feature_key", context: userContext, completion: { flag in
      let isFlagEnabled = flag.isEnabled()     
})

// Track a metric conversion for the specified event-name
VWOFme.trackEvent(eventName: "eventName", context: userContext)

// Send a user attribute to VWO
let attributeMap: [String : Any] = ["userType": "paid"]

VWOFme.setAttribute(
  attributeMap,
  context: userContext
)
```