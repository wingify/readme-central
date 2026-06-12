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
Before you can use the  FE Go SDK, you need to initialize it with your account settings.

## Basic Usage

Here's how to initialize the FE Go SDK:

```go
import wingify "github.com/wingify/wingify-fme-go-sdk"

func main() {
    options := map[string]interface{}{
        "sdkKey":            "your_sdk_key",
        "accountId":         "your_account_id",
        "gatewayServiceURL": "http://your.gateway.service:port",
    }

    wingifyClient, err := wingify.Init(options)
    if err != nil {
        // Handle initialization error
        panic(err)
    }

    // Use the wingifyClient for further operations
}

```

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
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
        **accountId**
        *Required*
      </td>

      <td>
        Number
      </td>

      <td>
        Your Wingify application's Account ID.
      </td>
    </tr>

    <tr>
      <td>
        **sdkKey**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique environment key provided to you inside the Websites & Apps section in Wingify application, under "Default Project".
      </td>
    </tr>

    <tr>
      <td>
        **gatewayServiceUrl**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        URL of your [Gateway Service](https://developers.wingify.com/v2/docs/gateway-service).
      </td>
    </tr>
  </tbody>
</Table>

<br />

Please note that all three parameters are mandatory for initializing the Go SDK. Make sure you have set up the Gateway Service before initializing the SDK. For more information on the Gateway Service, refer to our [Gateway Service documentation](https://developers.wingify.com/v2/docs/gateway-service).

After successful initialization, you can use the instance to access all SDK functionalities.
