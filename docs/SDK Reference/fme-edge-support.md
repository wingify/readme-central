---
title: Edge Support
excerpt: >-
  Learn how to configure the Wingify FE JavaScript SDK for edge computing
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
### Overview

Modern edge platforms such as Cloudflare Workers, Vercel Edge Functions, and AWS Edge runtimes are optimized for low-latency, short-lived execution. While these environments provide excellent performance, they introduce unique challenges for SDK initialization and configuration management.

The Wingify Feature Experimentation (FE) JavaScript SDK is fully compatible with edge environments. However, to achieve optimal performance and avoid unnecessary network calls, settings management must be handled differently than in traditional long-running servers.

**Supported edge platforms include:**

* Cloudflare Workers
* Vercel Edge Functions
* AWS Lambda{'@'}Edge
* Netlify Edge Functions
* Deno Deploy
* Fastly Compute{'@'}Edge
* and other similar edge environments

***

This document explains:

1. Why default SDK initialization can be inefficient on edge
2. How to **fetch, cache, and reuse settings**
3. How to use **explicit settings injection**
4. How to leverage the **getSettings / setSettings storage connector APIs**
5. Recommended patterns for enterprise-scale deployments

<br />

> For further details on the Wingify FE JavaScript SDK, including specific configuration examples and advanced usage, refer to the [Wingify JavaScript SDK Documentation](https://developers.wingify.com/v2/docs/fme-javascript).

## Default SDK Initialization (Not Recommended for Edge)

By default, the SDK fetches settings during initialization:

```javascript
await.init({
  sdkKey: 'SDK_KEY',
  accountId: 'ACCOUNT_ID'
});
```

**What Happens Internally**

* SDK makes a network request to Wingify servers
* Settings are fetched on every worker execution
* No reuse unless the runtime keeps the worker warm

**Impact**

* Redundant network calls
* Increased tail latency
* Inefficient for high-traffic edge workloads

<br />

## Why Edge Environments Need Special Handling

Edge platforms introduce several behavioral constraints that impact any SDK performing remote calls (like tracking events):

1. **Stateless, Ephemeral Execution**:
   1. Each invocation starts from a clean slate.
   2. In-memory variables may not persist.
   3. Persistence must rely on external storage (KV, Redis, etc.).
   4. Any pending asynchronous operations (e.g., tracking calls) can be terminated early if not awaited properly.
2. **Strict Execution Time Budgets**:
   1. Many edge runtimes terminate execution immediately after returning a response, unless you explicitly signal that work is still pending.
   2. Cold starts are common
3. **Non-blocking HTTP Requests**:
   1. All tracking calls are asynchronous and risk being dropped if the runtime ends the execution loop early.

**Therefore, edge runtimes must explicitly flush tracking events before your function exits.**

<br />

## SDK Configuration for Edge Environments

Use the `edgeConfig` option when initializing the Wingify SDK inside any edge runtime.

### Parameter: edgeConfig

The `edgeConfig` option should only be used in serverless/edge environments (e.g., Cloudflare Workers, Vercel Edge Functions, AWS Lambda{'@'}Edge).

| Parameter                      | Description                                     | Type    | Default | Recommended Value in Edge |
| :----------------------------- | :---------------------------------------------- | :------ | :------ | :------------------------ |
| **shouldWaitForTrackingCalls** | Ensures SDK waits for async tracking operations | Boolean | true    | true                      |

#### Why It Matters

With edgeConfig, core methods like `getFlag`, `trackEvent`, and `setAttribute` resolve quickly, while the actual tracking calls are deferred and handled when you call `flushEvents`.

<Callout icon="🚧" theme="warn">
  **Important Note**

  When using `edgeConfig`, you must call `await flushEvents()` at the end of your code flow to send tracking events to Wingify for reporting purposes.
</Callout>

<br />

### Essential Rule for Edge Environments

Always call **wingifyClient.flushEvents()** before your function exits.

If events are not flushed, they may be dropped entirely.

Edge platforms provide different mechanisms to wait for async operations:

* Cloudflare Workers: `ctx.waitUntil(wingifyClient.flushEvents)`
* Vercel Edge / Fastly: `waitUntil(wingifyClient.flushEvents)`
* Other platforms: standard `await wingifyClient.flushEvents()`

<br />

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

  <Card title="Other Edge Environments" href="#other-edge-environments">
    Jump to Other Edge Environments specific configuration and examples
  </Card>
</Cards>

### Example Configuration

Here's how you can configure the SDK to work properly in an edge environment:

```javascript
const { init } = require('wingify-fme-node-sdk');

// Initialize Wingify client with Edge environment support
async function main() {
  const wingifyClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    // Edge configuration for serverless environments
    edgeConfig: {
      shouldWaitForTrackingCalls: true
    }
  });

  const userContext = { id: 'unique_user_id' };

  // Check if feature is enabled for the user
  const flag = await wingifyClient.getFlag('feature_key', userContext);

  if (flag.isEnabled()) {
    console.log('Feature is enabled!');
    // Get feature variable
    const value = flag.getVariable('feature_variable', 'default_value');
    console.log('Variable value:', value);
  }

  // Track an event
  await wingifyClient.trackEvent('event_name', userContext);

  // IMPORTANT: Flush events before function exits
  await wingifyClient.flushEvents();
}

main();
```

### Code Breakdown

* **init({'{'} edgeConfig: {'{'} shouldWaitForTrackingCalls: true {'}'} {'}'})**: Configures the SDK for edge environments.
* **getFlag, trackEvent, and setAttribute**: These methods return much faster when using `edgeConfig`.
* **flushEvents()**: **Required** - Call this at the end of your function to send all tracking events.
* **Graceful fallback for variables**: Always provide a default value to getVariable() to handle missing configurations.

<br />

## Flushing Events in Edge Environments

When using `edgeConfig`, you **must** call `flushEvents()` at the end of your function to send tracking events to.

### Basic Usage

```javascript
// At the end of your edge function, before returning
await wingifyClient.flushEvents();
```

<br />

## Recommended Approach for Edge: Cached Settings

**Key Idea**

> Fetch settings once, cache them, and reuse them across SDK initializations.

This can be achieved in two ways:

* Explicit settings injection
* Custom storage connector with `getSettings` / `setSettings`

### Option 1: Explicit SDK Settings Injection

Wingify supports initializing the SDK with pre-fetched settings, completely skipping the network call.

> Reference: [https://developers.wingify.com/v2/docs/fme-explicit-sdk-fetch-settings](https://developers.wingify.com/v2/docs/fme-explicit-sdk-fetch-settings)

#### Example

Fetch and Cache Settings (One-Time or Periodic)

```javascript
const response = await fetch(
  `https://dev.visualwebsiteoptimizer.com/server-side-settings?a=${ACCOUNT_ID}&i=${SDK_KEY}`
);

const settings = await response.json();

// Store in KV, Redis, etc.
await KV.put(`wingify_settings_${ACCOUNT_ID}_${SDK_KEY}`, JSON.stringify(settings));
```

Initialize SDK with Cached Settings

```javascript
const cachedSettings = await KV.get(`wingify_settings_${ACCOUNT_ID}_${SDK_KEY}`);

await init({
  accountId: ACCOUNT_ID,
  sdkKey: SDK_KEY,
  settings: JSON.parse(cachedSettings)
});
```

#### Benefits

* Zero network calls during request handling.
* Predictable latency.
* Full control over refresh strategy.

#### When to Use

* You already have a background job or cron job.
* You want explicit control over the settings lifecycle.
* Highly regulated or locked-down environments.

#### Lifecycle

* Wingify Settings API
* Fetch Once (Background / Cron / First Request)
* Store in Edge KV / Redis / Durable Store
* Inject into SDK on init()

### Option 2 (Recommended): Custom Storage Connector with getSettings / setSettings

To simplify settings management, the FE SDK now supports settings **persistence directly via the storage connector**.

> Reference: <Anchor label="[[https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector](https://developers.wingify.com/v2/docs/fme-node-storage#how-to-implement-a-storage-service)](https://developers.wingify.com/v2/docs/fme-node-storage#how-to-implement-a-storage-service)" target="_blank" href="https://developers.wingify.com/v2/docs/fme-node-storage#how-to-implement-a-storage-service"><Anchor label="[https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector](https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector)" target="_blank" href="https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector">[https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector](https://developers.wingify.com/v2/docs/fme-javascript-storage#how-to-implement-a-custom-storage-connector)</Anchor></Anchor>

#### Why This Is Better

* No manual settings injection needed
* SDK automatically:
  * Reads cached settings via `getSettings`
  * Stores fetched settings via `setSettings`
* Cleaner, more maintainable integration
* Ideal for enterprise edge deployments

#### Lifecycle

* SDK initializes
* SDK calls `getSettings()`
* If settings exist → use them
* If not → fetch from Wingify servers
* SDK calls `setSettings()` to persist them

<br />

## Platform-Specific Guidance

#### Cloudflare Workers

Cloudflare worker terminates execution immediately after returning a response. Use `ctx.waitUntil()` to keep async work alive. To know more about `waitUntil`, refer to the official docs <Anchor label="here" target="_blank" href="https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil">here</Anchor>

```javascript
export default {
  async fetch(request, env, ctx) {
    const wingifyClient = await init({
      accountId: env.WINGIFY_ACCOUNT_ID,
      sdkKey: env.WINGIFY_SDK_KEY,
      edgeConfig: {
        shouldWaitForTrackingCalls: true,
      },
    });

    const userContext = { id: 'user123' };
    
    // Your application logic
    const flag = await wingifyClient.getFlag('feature_key', userContext);
    await wingifyClient.trackEvent('event_name', userContext);
    
    // CRITICAL: Flush events using ctx.waitUntil in Cloudflare
    ctx.waitUntil(wingifyClient.flushEvents());
    
    return new Response('OK');
  }
}
```

<br />

### Vercel

Similar to Cloudflare, Vercel Edge requires waitUntil(). To know more about `waitUntil()`, check the official docs <Anchor label="here" target="_blank" href="https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#helper-methods-non-next.js-usage-or-older-next.js-versions">here</Anchor>.

```javascript
import { init } from 'wingify-fme-node-sdk';
import { waitUntil } from '@vercel/functions';

export default async function handler(req, res) {
    const wingifyClient = await init({
      accountId: '123456',
      sdkKey: '32-alpha-numeric-sdk-key',
      edgeConfig: {
        shouldWaitForTrackingCalls: true,
      },
    });

    const userContext = { id: 'user123' };
    
    // Your application logic
    const flag = await wingifyClient.getFlag('feature_key', userContext);
    await wingifyClient.trackEvent('event_name', userContext);
    
    // CRITICAL: Flush events using waitUntil in vercel
    waitUntil(wingifyClient.flushEvents());
    
    return res.status(200).json({status: 'success'})
  }
}
```

### Other Edge Environments

If the platform does not provide “background work” helpers, simply `await` the flush call::

```javascript
export default async function handler(request) {
  const wingifyClient = await init({
    accountId: '123456',
    sdkKey: '32-alpha-numeric-sdk-key',
    edgeConfig: {
      shouldWaitForTrackingCalls: true,
    },
  });

  const userContext = { id: 'user123' };
  const flag = await wingifyClient.getFlag('feature_key', userContext);
  await wingifyClient.trackEvent('event_name', userContext);

  // REQUIRED: Flush events before returning
  await wingifyClient.flushEvents();

  return new Response('OK');
}
```

### Example: Edge KV-Based Storage Connector

#### Custom Storage Connector

```javascript
const storageConnector = {
  async getSettings(accountId, sdkKey) {
    const key = `wingify_settings_${accountId}_${sdkKey}`;
    const cached = await KV.get(key);
    return cached ? JSON.parse(cached) : null;
  },

  async setSettings({ settings }) {
    const key = `wingify_settings_${settings.accountId}_${settings.sdkKey}`;
    await KV.put(key, JSON.stringify(settings), {
      expirationTtl: 3600 * 12 // 12 hours
    });
  }
};
```

#### SDK Initialization

```javascript
await init({
  accountId: ACCOUNT_ID,
  sdkKey: SDK_KEY,
  storage: storageConnector
});
```

<br />

## Best Practices

* **Use edgeConfig**: Optimizes performance and defers tracking calls for batch flushing.
* **Always call flushEvents()**: Ensures event delivery before function termination.
* **Use Cloudflare/Vercel waitUntil()**: Prevents event loss after response is returned.
* **Reuse the SDK instance**: Place initialization at the module level to reduce cold-start overhead.
* **Keep user IDs stable**: User identity consistency ensures correct bucketing.
* **Monitor execution time**: Most edge runtimes enforce 50ms–100ms budgets.
* **Add error handling**: Wrap flush calls in try/catch (optional but recommended).

<br />

By following this guide, you can confidently deploy the Wingify FE JavaScript SDK to distributed, edge platforms while preserving the integrity of your feature flagging and experimentation data.
