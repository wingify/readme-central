---
title: User Context
deprecated: false
hidden: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-node-flags
      title: Feature Flags
      type: basic
---
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **object**, the user context includes an _id_ key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various _**attributes**_ to support advanced targeting and segmentation strategies. These may include:

* **custom-variables**: User-specific data points for personalized experiences.
* **user-agent**: Information about the user's device, browser, or operating system.
* **ip-address**: Location-based data to enable geo-targeting.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
>
> The **user context attributes** differ from the attributes set using the _**setAttribute**_ API.
>
> * **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> * **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
>
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```go
context := map[string]interface{}{
    "id": "unique_user_id", // Set a unique user identifier

    // Create custom variables
    "customVariables": map[string]interface{}{
        "age":      25,
        "location": "US",
    },

    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "ipAddress": "1.1.1.1",
}

// Check if a feature flag is enabled
getFlag, err := vwoClient.GetFlag("feature_key", context)
if err != nil {
  log.Printf("Error getting feature flag: %v", err)
} else {
  isFeatureEnabled := getFlag.IsEnabled()
  fmt.Println("Is feature enabled?", isFeatureEnabled)

  // Get a variable value with a default fallback
  variableValue := getFlag.GetVariable("feature_variable", "default_value")
  fmt.Println("Variable value:", variableValue)
}

// Track a custom event
trackResponse, err := vwoClient.TrackEvent("event_name", context, nil)
if err != nil {
  log.Printf("Error tracking event: %v", err)
} else {
  fmt.Println("Event tracked:", trackResponse)
}

// Set multiple custom attributes
attributeMap := map[string]interface{}{
  "attribute-name": "attribute-value",
}
err = vwoClient.SetAttribute(attributeMap, context)
if err != nil {
  log.Printf("Error setting attributes: %v", err)
}
```

## User Context keys

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        _Required_
      </td>

      <td>
        String
      </td>

      <td>
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.wingify.com/v2/docs/user-id-management)  .
      </td>
    </tr>

    <tr>
      <td>
        **userAgent**  
        _Optional_
      </td>

      <td>
        String
      </td>

      <td>
        The userAgent object for the current user, can be used for targeting & segmentation.
      </td>
    </tr>

    <tr>
      <td>
        **ipAddress**  
        _Optional_
      </td>

      <td>
        String
      </td>

      <td>
        IP Address of the current user, can be used for targeting & segmentation.
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**  
        _Optional_
      </td>

      <td>
        map[string]interface{}
      </td>

      <td>
        Any additional details of the current user that you want to push to VWO can be added here as key-value pairs, can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Note
>
> You need to pass [Gateway Service]() configuration while initializing the SDK for targeting (pre-segmentation using user-agent or IP-address-related segments).