---
title: Storage Service
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
The VWO Go SDK uses the Gateway Service for caching and storage. Unlike some other SDKs, the Go SDK does not provide a separate storage interface for custom implementations.

## Gateway Service Storage

The Gateway Service handles caching and storage of:

- Feature flag configurations
- User-specific variation assignments
- Metrics data

This centralized storage approach ensures consistency across your application instances and reduces the load on VWO's servers.

## Benefits

1. **Improved Performance**: The Gateway Service caches data, reducing the need for frequent API calls to VWO servers.
2. **Consistency**: All instances of your application connect to the same Gateway Service, ensuring consistent feature flag evaluations.
3. **Real-time Updates**: The Gateway Service can receive real-time updates from VWO, ensuring your application always has the latest configuration.

## Configuration

The storage configuration is handled automatically when you set up the Gateway Service. Ensure you've properly configured the Gateway Service URL when initializing the SDK:

```go
options := map[string]interface{}{
    "sdkKey":            "your_sdk_key",
    "accountId":         "your_account_id",
    "gatewayServiceURL": "http://your.gateway.service:port",
}

vwoClient, err := vwo.Init(options)
if err != nil {
    // Handle initialization error
}
```

For more information on setting up and configuring the Gateway Service, refer to the [Gateway Service documentation](https://developers.vwo.com/v2/docs/gateway-service).