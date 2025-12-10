---
title: Edge Support
excerpt: >-
  Learn how to configure the VWO FE JavaScript SDK for edge computing
  environments like Cloudflare Workers, Vercel Edge Functions, and AWS
  Lambda@Edge.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
The VWO Feature Experimentation (FE) JavaScript SDK is fully compatible with modern edge runtimes, enabling feature flag evaluations, experimentation, and event tracking at globally distributed locations with extremely low latency.

Supported edge platforms include:

* Cloudflare Workers
* Vercel Edge Functions
* AWS Lambda{'@'}Edge
* Netlify Edge Functions
* Deno Deploy
* Fastly Compute{'@'}Edge
* and other similar edge environments

Edge runtimes are optimized for low latency, geographically distributed execution, and ephemeral function lifecycles. These characteristics require special handling of asynchronous operations, such as HTTP requests for event tracking and telemetry. This guide outlines the parameters and settings necessary to run the VWO FE JavaScript SDK effectively in edge computing environments.

> For further details on the VWO FE JavaScript SDK, including specific configuration examples and advanced usage, refer to the [VWO JavaScript SDK Documentation](https://developers.vwo.com/v2/docs/fme-javascript).

## Why Edge Environments Need Special Handling

Edge platforms introduce several behavioral constraints that impact any SDK performing remote calls (like tracking events):

1. **Stateless, Ephemeral Execution**: Each invocation starts from a clean slate. Any pending asynchronous operations (e.g., tracking calls) can be terminated early if not awaited properly.
2. **Strict Execution Time Budgets**: Many edge runtimes terminate execution immediately after returning a response—unless you explicitly signal that work is still pending.
3. **Non-blocking HTTP Requests**: All tracking calls are asynchronous and risk being dropped if the runtime ends the execution loop early.

**Therefore, edge runtimes must explicitly flush tracking events before your function exits.**

## SDK Configuration for Edge Environments

Use the `edgeConfig` option when initializing the VWO SDK inside any edge runtime.

### Parameter: edgeConfig

The `edgeConfig` option should only be used in serverless/edge environments (e.g., Cloudflare Workers, Vercel Edge Functions, AWS Lambda{'@'}Edge).

| Parameter                      | Description                                     | Type    | Default | Recommended Value in Edge |
| :----------------------------- | :---------------------------------------------- | :------ | :------ | :------------------------ |
| **shouldWaitForTrackingCalls** | Ensures SDK waits for async tracking operations | Boolean | true    | true                      |

#### Why It Matters

With edgeConfig, core methods like `getFlag`, `trackEvent`, and `setAttribute` resolve quickly, while the actual tracking calls are deferred and handled when you call `flushEvents`.

<Callout icon="🚧" theme="warn">
  **Important Note**

  When using `edgeConfig`, you must call `await flushEvents()` at the end of your code flow to send tracking events to VWO for reporting purposes.
</Callout>

<br />

### Essential Rule for Edge Environments

Always call **vwoClient.flushEvents()** before your function exits.

If events are not flushed, they may be dropped entirely.

Edge platforms provide different mechanisms to wait for async operations:

* Cloudflare Workers: `ctx.waitUntil(vwoClient.flushEvents)`
* Vercel Edge / Fastly: `waitUntil(vwoClient.flushEvents)`
* Other platforms: standard `await vwoClient.flushEvents()`

## Quick Start Configuration

Looking for platform-specific setup instructions?

<Cards columns={3}>
  <Card title="" href="#cloudflare-workers">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cloudflareworkers
    /cloudflareworkers-original-wordmark.svg" width="48" alt="Cloudflare Workers logo" /> Cloudflare Workers

    Jump to Cloudflare Workers specific configuration and examples
  </Card>

  <Card title="" href="#vercel">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vercel/vercel-original-wordmark.svg" width="48" alt="Vercel logo" /> Vercel Edge Functions

    Jump to Vercel Edge Functions specific configuration and examples
  </Card>

  <Card title="" href="#other-edge-environments" icon="fa-anchor">
    Other Edge Environments

    Jump to Other Edge Environments specific configuration and examples
  </Card>
</Cards>

### Example Configuration

Here's how you can configure the SDK to work properly in an edge environment:

```javascript
const { init } = require('vwo-fme-node-sdk');

// Initialize VWO client with Edge environment support
async function main() {
  const vwoClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    // Edge configuration for serverless environments
    edgeConfig: {
      shouldWaitForTrackingCalls: true
    }
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

  // IMPORTANT: Flush events before function exits
  await vwoClient.flushEvents();
}

main();
```

### Code Breakdown

* **init({'{'} edgeConfig: {'{'} shouldWaitForTrackingCalls: true {'}'} {'}'})**: Configures the SDK for edge environments.
* **getFlag, trackEvent, and setAttribute**: These methods return much faster when using `edgeConfig`.
* **flushEvents()**: **Required** - Call this at the end of your function to send all tracking events.
* **Graceful fallback for variables**: Always provide a default value to getVariable() to handle missing configurations.

## Flushing Events in Edge Environments

When using `edgeConfig`, you **must** call `flushEvents()` at the end of your function to send tracking events to VWO.

### Basic Usage

```javascript
// At the end of your edge function, before returning
await vwoClient.flushEvents();
```

### Platform-Specific Guidance

#### Cloudflare Workers

Cloudflare worker terminates execution immediately after returning a response. Use `ctx.waitUntil()` to keep async work alive. To know more about `waitUntil`, refer to the official docs <Anchor label="here" target="_blank" href="https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil">here</Anchor>

```javascript
export default {
  async fetch(request, env, ctx) {
    const vwoClient = await init({
      accountId: env.VWO_ACCOUNT_ID,
      sdkKey: env.VWO_SDK_KEY,
      edgeConfig: {
        shouldWaitForTrackingCalls: true,
      },
    });

    const userContext = { id: 'user123' };
    
    // Your application logic
    const flag = await vwoClient.getFlag('feature_key', userContext);
    await vwoClient.trackEvent('event_name', userContext);
    
    // CRITICAL: Flush events using ctx.waitUntil in Cloudflare
    ctx.waitUntil(vwoClient.flushEvents());
    
    return new Response('OK');
  }
}
```

### Vercel

Similar to Cloudflare, Vercel Edge requires waitUntil(). To know more about `waitUntil()`, check the official docs <Anchor label="here" target="_blank" href="https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#helper-methods-non-next.js-usage-or-older-next.js-versions">here</Anchor>.

```javascript
import { init } from 'vwo-fme-node-sdk';
import { waitUntil } from '@vercel/functions';

export default async function handler(req, res) {
    const vwoClient = await init({
      accountId: '123456',
      sdkKey: '32-alpha-numeric-sdk-key',
      edgeConfig: {
        shouldWaitForTrackingCalls: true,
      },
    });

    const userContext = { id: 'user123' };
    
    // Your application logic
    const flag = await vwoClient.getFlag('feature_key', userContext);
    await vwoClient.trackEvent('event_name', userContext);
    
    // CRITICAL: Flush events using waitUntil in vercel
    waitUntil(vwoClient.flushEvents());
    
    return res.status(200).json({status: 'success'})
  }
}
```

### Other Edge Environments

If the platform does not provide “background work” helpers, simply `await` the flush call::

```javascript
export default async function handler(request) {
  const vwoClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    edgeConfig: {
      shouldWaitForTrackingCalls: true,
    },
  });

  const userContext = { id: 'user123' };
  const flag = await vwoClient.getFlag('feature_key', userContext);
  await vwoClient.trackEvent('event_name', userContext);

  // REQUIRED: Flush events before returning
  await vwoClient.flushEvents();

  return new Response('OK');
}
```

## Best Practices

* ✔ **Use edgeConfig**: Optimizes performance and defers tracking calls for batch flushing.
* **✔ Always call flushEvents()**: Ensures event delivery before function termination.
* **✔ Use Cloudflare/Vercel waitUntil()**: Prevents event loss after response is returned.
* **✔ Reuse the SDK instance**: Place initialization at the module level to reduce cold-start overhead.
* **✔ Keep user IDs stable**: User identity consistency ensures correct bucketing.
* **✔ Monitor execution time**: Most edge runtimes enforce 50ms–100ms budgets.
* **✔ Add error handling**: Wrap flush calls in try/catch (optional but recommended).

<br />

By following this guide, you can confidently deploy the VWO FE JavaScript SDK to distributed, edge platforms while preserving the integrity of your feature flagging and experimentation data.
