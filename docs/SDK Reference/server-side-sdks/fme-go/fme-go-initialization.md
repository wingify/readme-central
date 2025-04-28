---
title: Initialization
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
      slug: fme-go-context
      title: User Context
---
Before you can use the  FME Go SDK, you need to initialize it with your account settings.

## Basic Usage

Here's how to initialize the FME Go SDK:

```go
import vwo "github.com/wingify/vwo-fme-go-sdk"

func main() {
    options := map[string]interface{}{
        "sdkKey":            "your_sdk_key",
        "accountId":         "your_account_id",
        "gatewayServiceURL": "http://your.gateway.service:port",
    }

    vwoClient, err := vwo.Init(options)
    if err != nil {
        // Handle initialization error
        panic(err)
    }

    // Use the vwoClient for further operations
}

```

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**accountId**  \n_Required_",
    "0-1": "Number",
    "0-2": "Your VWO application's Account ID.",
    "1-0": "**sdkKey**  \n_Required_",
    "1-1": "String",
    "1-2": "Unique environment key provided to you inside the Websites & Apps section in VWO application, under \"Default Project\".",
    "2-0": "**gatewayServiceUrl**  \n_Required_",
    "2-1": "String",
    "2-2": "URL of your [Gateway Service](https://developers.vwo.com/v2/docs/gateway-service). "
  },
  "cols": 3,
  "rows": 3,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]


<br />

Please note that all three parameters are mandatory for initializing the Go SDK. Make sure you have set up the Gateway Service before initializing the SDK. For more information on the Gateway Service, refer to our [Gateway Service documentation](https://developers.vwo.com/v2/docs/gateway-service).

After successful initialization, you can use the instance to access all SDK functionalities.