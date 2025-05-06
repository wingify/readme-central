---
title: Edge Support
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
JavaScript is fully supported on edge platforms like **Cloudflare Workers, AWS Lambda, Netlify Functions**, and other similar environments. As a result, **VWO FME JavaScript SDK**, which is a port of the **VWO FME Node SDK**, is fully compatible with these edge environments.

When running the VWO Feature Management and Experimentation SDK on edge environments like Cloudflare Workers or similar serverless platforms, certain configurations need to be adjusted for optimal performance and compatibility. This document outlines the required parameters and settings to run the SDK successfully in edge computing environments.

For further details on the VWO FME JavaScript SDK, including specific configuration examples and advanced usage, refer to the [VWO JavaScript SDK Documentation](https://developers.vwo.com/v2/update/docs/fme-javascript#/).

## Key Configuration for Edge Environments

In edge environments, the SDK has to ensure that tracking calls are properly managed before resolving promises. To achieve this, the `shouldWaitForTrackingCalls` Parameter must be explicitly set.

### Parameter: shouldWaitForTrackingCalls

The `shouldWaitForTrackingCalls` Parameter is designed to ensure that tracking calls complete before the promise resolves, which is important for edge environments where asynchronous operations like HTTP requests may be handled differently.

| Parameter                      | Type    | Default |
| :----------------------------- | :------ | :------ |
| **shouldWaitForTrackingCalls** | Boolean | False   |

When `shouldWaitForTrackingCalls` is set to true, the SDK will wait for the tracking calls (such as event tracking or feature flag tracking) to finish before returning control to the application. This ensures that all tracking data is sent successfully before continuing execution, which is particularly useful when using edge functions, where immediate resolution of promises might bypass crucial asynchronous actions like data transmission.

### Example Configuration

Here’s how you can configure the SDK to work properly in an edge environment:

```javascript
const { init } = require('vwo-fme-node-sdk');

// Initialize VWO client with Edge environment support
(async function () {
  const vwoClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    shouldWaitForTrackingCalls: true, // Ensures tracking calls complete before resolving
  });

  const userContext = { id: 'unique_user_id' };

  // Check if feature is enabled for the user
  const flag = await vwoClient.getFlag('feature_key', userContext);

  if (flag.isEnabled()) {
    console.log('Feature is enabled!');
    // Get feature variable
    const value = flag.getVariable('feature_variable', 'default_value');
    console.log('Variable value:', value);
  }

  // Track an event
  await vwoClient.trackEvent('event_name', userContext);
})();
```

## Summary

To summarize, when running the **VWO FME Javascript SDK** in edge environments, you need to configure the `shouldWaitForTrackingCalls` parameter as follows:

* Set `shouldWaitForTrackingCalls: true` to ensure that tracking calls complete before promises are resolved.
* This configuration is crucial for platforms like **Cloudflare Workers, AWS Lambda**, or similar environments to ensure reliable data tracking.

By making these adjustments, you ensure that your feature management and event tracking work smoothly in distributed, edge-compute environments.