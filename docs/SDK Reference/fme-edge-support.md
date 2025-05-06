---
title: Edge Support
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The VWO Feature Management and Experimentation (FME) SDK enables feature flagging, experimentation, and event tracking for modern applications. JavaScript is fully supported on edge platforms, making the **VWO FME JavaScript SDK**, a VWO FME Node SDK port, fully compatible with the following edge environments.

* Cloudflare Workers
* Vercel Edge Functions
* AWS Lambda\@Edge
* Netlify Edge Functions
* Deno Deploy
* Fastly Compute\@Edge
* and other similar edge environments

Edge runtimes are optimized for low latency, geographically distributed execution, and ephemeral function lifecycles. These characteristics require special handling of asynchronous operations such as HTTP requests for event tracking and telemetry. This guide outlines configuring and using the VWO FME JavaScript SDK effectively in such environments. It outlines the required parameters and settings to run the SDK successfully in edge computing environments.

For further details on the VWO FME JavaScript SDK, including specific configuration examples and advanced usage, refer to the [VWO JavaScript SDK Documentation](https://developers.vwo.com/v2/docs/fme-javascript).

## Why Edge Environments Need Special Handling

Edge environments introduce several unique challenges:

* **Stateless Execution**: Functions are short-lived and stateless, meaning any delay or unresolved operation might be terminated early.
* **Asynchronous Nature**: Tracking events involve HTTP requests, which are asynchronous. Without waiting for these to complete, events may be dropped.
* **Execution Time Constraints**: Edge functions are optimized for performance and often impose strict limits on execution time.

These factors necessitate careful handling of all asynchronous operations within your application code.

## Key Configuration for Edge Environments

In edge environments, the SDK has to ensure that tracking calls are properly managed before resolving promises. To achieve this, the `shouldWaitForTrackingCalls` Parameter must be explicitly set.

### Parameter: shouldWaitForTrackingCalls

The `shouldWaitForTrackingCalls` Parameter is designed to ensure that tracking calls complete before the promise resolves, which is important for edge environments where asynchronous operations like HTTP requests may be handled differently.

| Parameter                      | Type    | Default | Recommended Value in Edge |
| :----------------------------- | :------ | :------ | :------------------------ |
| **shouldWaitForTrackingCalls** | Boolean | False   | True                      |

When `shouldWaitForTrackingCalls` is set to true, the SDK will wait for the tracking calls (such as event tracking or feature flag tracking) to finish before returning control to the application. This ensures that all tracking data is sent successfully before continuing execution, which is particularly useful when using edge functions, where immediate resolution of promises might bypass crucial asynchronous actions like data transmission.

### Example Configuration

Here’s how you can configure the SDK to work properly in an edge environment:

```javascript
const { init } = require('vwo-fme-node-sdk');

// Initialize VWO client with Edge environment support
async function main() {
  const vwoClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    // Ensures VWO tracking calls complete before exiting Edge cloud functions
    shouldWaitForTrackingCalls: true
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
}

main();
```

### Code Breakdown

* \*\*init(\{ shouldWaitForTrackingCalls: true })\*\*: Ensures the SDK waits for tracking HTTP calls before returning control.
* **getFlag, trackEvent, and setAttribute**: These return promises that should be awaited in edge runtimes.
* **Graceful fallback for variables**: Always provide a default value to getVariable() to handle missing configurations.

## Best Practices

* **Always await** SDK methods (*getFlag*, *trackEvent*) to ensure calls complete before the edge function exits.
* **Minimize cold starts** by reusing SDK initialization where possible (e.g., in shared scopes or cached module instances).
* **Monitor execution time** to stay within limits imposed by edge providers (typically under 50ms to 100ms).
* **Log or handle tracking errors** (e.g., using try/catch) to improve observability.

## Summary

| Recommendation                              | Why It Matters                                          |
| :------------------------------------------ | :------------------------------------------------------ |
| shouldWaitForTrackingCalls: true            | Ensures all telemetry is sent before the function exits |
| Use await for all SDK calls                 | Prevents lost impressions or incomplete events          |
| Provide user ID in context                  | Enables targeting and consistent evaluations            |
| Use proper bundler if targeting the browser | Ensures compatibility with edge environments            |

By following this guide, you can confidently deploy the VWO FME JavaScript SDK to distributed, edge platforms while preserving the integrity of your feature flagging and experimentation data.

> 📘 VWO FME JavaScript Documentation
>
> [Read here](https://developers.vwo.com/v2/docs/fme-javascript)