---
title: Integrations
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
VWO FME SDKs help you integrate with several third-party tools, be it analytics, monitoring, customer data platforms, messaging, etc., by implementing a very basic and generic callback capable of receiving VWO-specific properties that can then be pushed to any third-party tool.

## Usage

```ruby
def callback(data)
    puts "Integration data: #{data}"
end

vwo_client = VWO.init({
    account_id: '123456',
    sdk_key: '32-alpha-numeric-sdk-key',
    integrations: {
        callback: method(:callback)
    }
})
```

## Properties available to use for integrations

All VWO SDKs provide the following properties when a decision is made. This means if you configure the integrations callback at the time of launching the SDK, the callback will be triggered whenever VWO SDK decides which campaign version to show to the user. The callback, if provided, will be called in case of [get\_flag](https://developers.vwo.com/v2/docs/fme-ruby-flags) and [track\_event](https://developers.vwo.com/v2/docs/fme-ruby-metrics) APIs.

```json
{
  feature_name: String,
  feature_id: Number,
  feature_key: String,  // as passed to API
  user_id: String,  // As passed to API
  api: String,   // API name which triggered the event: getFlag, getVariable, trackMetric
  custom_variables: Object, //custom variables for targeting
  rollout_id: Number,
  rollout_key: String,  // as passed to API
  rollout_variation_id: Number,  // Which variation was rolled out to the current user
  experiment_id: Number,
  experiment_key: String, // as passed to API
  experiment_variation_id: Number
}

```

Different destinations have their own formats for integrating with them and using their respective methods/APIs. Please check the documentation of the respective third-party destination so that the above properties can be mapped accordingly before using the destination APIs.

## Which platforms I can integrate with?

Since VWO SDKs are platform agnostic, with the help of the above code snippets, you can integrate with any third-party tool capable of receiving it via APIs. 

> 📘 Note
>
> Please remember to refer to the third-party destination's official documentation before sending the properties as it is received from the VWO SDK.
