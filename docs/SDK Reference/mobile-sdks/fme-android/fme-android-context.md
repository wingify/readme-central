---
title: User Context
deprecated: false
hidden: false
metadata:
  robots: index
---
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as a **object**, the user context includes an _id_ key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various **_attributes_** to support advanced targeting and segmentation strategies. This includes **custom-variables** that are User-specific data points for personalized experiences.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
>
> The **user context attributes** differ from the attributes set using the **_setAttribute_** API.
>
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
>
> Wingify **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of Wingify applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```kotlin
import com.wingify.models.user.WingifyUserContext

// Define the user context object to identify and provide user-specific details
val userContext = WingifyUserContext()
// Mandatory
userContext.id = "unique_user_id"

// Optional - if rules have pre-segmentation applied 
userContext.customVariables = mutableMapOf(
  "variable1" to "value1",
  "variable2" to 10
)

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
wingifyClient.getFlag("feature-key", userContext, object : IWingifyListener {
    override fun onSuccess(data: Any) {
        val featureFlag = data as? GetFlag
    }

    override fun onFailure(message: String) {
				// Log the message
    }
})

// Track a metric conversion for the specified event-name
val trackResponse = wingifyClient?.trackEvent("event_name", userContext)

// Send a user attribute to Wingify
val attributeMap = mutableMapOf<String, Any>(
    "userType" to "paid"
)
wingifyClient.setAttribute(attributeMap, userContext);
```
```java
import com.wingify.models.user.WingifyUserContext

// Define the user context object to identify and provide user-specific details
val userContext = new WingifyUserContext();
// Mandatory
userContext.setId("unique_user_id");

// Optional - if rules have pre-segmentation applied 
Map<String, Object> customVariables = new HashMap<>();
customVariables.put("variable1", "value1");
customVariables.put("variable2", 10);
userContext.setCustomVariables(customVariables);

// The same user context can be used across different APIs. For example -

// Returns a flag object which can be used to get flag's status or variable(s)
wingifyClient.getFlag("feature-key", userContext, new IWingifyListener() {
    public void onSuccess(Object data) {
        featureFlag = (GetFlag) data;
    }

    public void onFailure(@NonNull String message) {
        // Log the message
    }
});

// Track a metric conversion for the specified event-name
Map<String, Boolean> trackResponse = wingifyClient.trackEvent("wingifyevent", userContext);

// Send a user attribute to Wingify
Map<String, Object> attributeMap = new HashMap<>();
eventProperties.put("userType", "paid");

wingifyClient.setAttribute(attributeMap, userContext);
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
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to. [Read more here](https://developers.wingify.com/v2/docs/user-id-management)  .
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**
        _Optional_
      </td>

      <td>
        Object
      </td>

      <td>
        Any additional details of the current user that you want to push to Wingify can be added here as key-value pairs, can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>

<br />
