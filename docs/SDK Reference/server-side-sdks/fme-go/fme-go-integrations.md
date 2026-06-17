---
title: Integrations
deprecated: false
hidden: false
metadata:
  robots: index
---
Wingify FE SDKs help you integrate with several third-party tools, be it analytics, monitoring, customer data platforms, messaging, etc., by implementing a very basic and generic callback capable of receiving Wingify-specific properties that can then be pushed to any third-party tool.

## Usage

```go
options := map[string]interface{}{
    "sdkKey":       "32-alpha-numeric-sdk-key",
    "accountId":    "123456",
    "integrations": map[string]interface{}{
        "Callback": func(properties map[string]interface{}) {
            // implement your custom logic here
            fmt.Printf("Integration callback called with properties: %+v\n", properties)
        },
    },
}

wingifyClient, err := wingify.Init(options)
```

## Properties available to use for integrations

All Wingify SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever Wingify SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [GetFlag](https://developers.wingify.com/v2/docs/fme-go-flags) and [TrackEvent](https://developers.wingify.com/v2/docs/fme-go-metrics) APIs.

```json
{
  featureName: String,
  featureId: Number,
  featureKey: String,  // as passed to API
  userId: String,  // As passed to API
  api: String,   // API name which triggered the event: getFlag, getVariable, trackEvent
  customVariables: Object, //custom variables for targeting
  rolloutId: Number,
  rolloutKey: String,  // as passed to API
  rolloutVariationId: Number,  // Which variation was rolled out to the current user
  variationTargetingVariables: Object, //campaign whitelisting conditions
  experimentId: Number,
  experimentKey: String, // as passed to API
  experimentVariationId: Number
}

```

Different destinations have their own formats for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.

## Which platforms can I integrate with?

Since Wingify SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party tool capable of receiving it via APIs.

> 📘 Note
>
> Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the Wingify SDK.

<br />
