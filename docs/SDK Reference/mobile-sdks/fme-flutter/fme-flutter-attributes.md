---
title: Attributes
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
User attributes are specific characteristics or properties assigned to users that help define who they are or how they interact with an application. These attributes can include demographic information (like age, location), behavioral data (such as past purchases), or custom-defined properties relevant to business goals.

For any additional parameters or information about the current user, you can use attributes to pass that data to VWO.

These attributes would typically be any additional user info that you'd like to use in VWO for post-segmentation (filtering, slicing and dicing of reports). 

For example, you might want to analyze the performance of a test based on the user type to see which user type converted better or worse than the other. For this, you can pass on the "user type" as an attribute to VWO, with the relevant values for each user, ie "free", "paid" or whatever internal parameters you'd like to use for post-segmentation.

## _Set Attribute_ API

This API allows you to assign a specific attribute key-value pair to a user. By doing so, VWO can:

- Segment users based on defined attributes.
- Deliver personalized experiences tailored to individual user preferences.
- Enable targeted feature rollouts to specific user groups.
- Improve the accuracy of experiments by analyzing results across different audience segments.

### How It Works:

When this API is executed:

- The application assigns the specified attribute (attribute_key and attribute_value) to the user defined in the user_context.
- VWO stores this attribute information and uses it to influence feature flag decisions, experiment variations, and targeting rules.
- This data is then factored into real-time decision-making, allowing VWO to determine which features, content, or experiments are relevant to the user.

### Why It’s Valuable:

- _Audience Segmentation_: Create dynamic user segments based on attributes like location, membership status, or behavior.
- _Personalized Experiences_: Tailor content and features to individual user preferences, enhancing user engagement.
- _Targeted Feature Rollouts_: Roll out new features gradually to specific user groups, minimizing risk.
- _Advanced Experimentation_: Analyze A/B test results across different user segments for deeper insights.
- _Behavioral Targeting_: Trigger specific experiences based on real-time changes in user attributes.

> 📘 Important Note
> 
> The attributes set using the **_setAttribute_** API differ from the **User Context attributes**
> 
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.

> 🚧 Current Limitation
> 
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```swift Dart
// Set a custom user attribute in VWO for the specified user context.
// 'attribute_key' is the name of the attribute (e.g., 'subscription_status').
// 'attribute_value' is the value to assign to the attribute (e.g., 'premium').  
final attributeMap = {
  'subscription_status': 'premium'
};
final success = await vwoClient?.setAttribute(
	attributeMap,
	context: userContext,
);
```

### Parameters Definition

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**attributeMap**  \n_Required_",
    "0-1": "object",
    "0-2": "Multiple Key-value pairs to send attributes to VWO.",
    "1-0": "**userContext**  \n_Required_",
    "1-1": "object",
    "1-2": "Object containing user identification and other contextual information"
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


> 🚧 Note
> 
> Please note that the _Attribute_ must already be defined in the VWO Application for this, otherwise an unregistered attribute won't get tracked in VWO application.