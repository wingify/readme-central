---
title: Shopify Headless
deprecated: false
hidden: false
metadata:
  robots: index
---
# Integrating VWO FE SDK with Shopify Headless (Hydrogen + Oxygen)

<br />

Overview

Shopify Headless with **Hydrogen + Oxygen** is a modern, server-centric approach where Hydrogen (React + Remix) renders pages, and Oxygen (Shopify’s Edge environment) executes server-side code.

To run **experiments and feature flags** reliably in this architecture, we need a client that can:

* Execute on the **server **(**Oxygen**)
* Hydrate in the **browser**
* Run at the **Edge** if available

The VWO FE SDK — available at [GitHub](https://github.com/wingify/vwo-fme-node-sdk)  — supports **Node.js, browser, and Edge**, making it ideal.

<br />

Architectural Considerations

| Layer                       | Execution Environment   | Hydration |
| --------------------------- | ----------------------- | --------- |
| Remix Loaders               | Server / Oxygen (Edge)  | N/A       |
| React Rendering & Hydration | Browser                 | Yes       |
| VWO Tracking Scripts        | Browser                 | Yes       |
| Variant Assignment          | Server / Browser / Edge | Varies    |

<br />

**Key Design Principle:**
Always determine feature flags and experiment variations **before sending the HTML**. This avoids flickering and inconsistent UX.

<br />

## Why VWO FE SDK for Headless Shopify

* Multi-environment compatibility: Node, Browser, Edge
* Unified API for feature flags & experiments
* Works well with SSR frameworks like Remix
* Ideal for early variant selection during SSR

<br />

Environment Constraints (Oxygen & Edge)

Oxygen is an **Edge-like environment** with:

* No Node’s native modules (fs, net, etc.)
* Global `fetch` API
* Fast cold starts
* Streaming SSR

This means:  

* ✔ SDK must support Edge execution
* ❌ Cannot rely on Node-only modules

## Hydrogen + Oxygen Compatibility

| Environment          | Can run VWO FE SDK? | Notes                                |
| -------------------- | ------------------- | ------------------------------------ |
| Node.js Server (SSR) | ✅                   | Works normally                       |
| Oxygen Edge          | ⚠️                  | Must await async tracking            |
| Browser JS           | ⚠️                  | SDK key exposed (use read-only keys) |

VWO’s FE SDK is Edge compatible, so we can initialize it server-side during Remix loader execution.

## Step-by-Step Integration

**Prerequisites**

* A Shopify Hydrogen project (Remix routing)
* VWO Account and SDK Key (for the specific environment)
* Unique user identifiers (for consistent assignments)

### Installing the SDK

```shell
npm install vwo-fme-node-sdk --save
# Or:
yarn add vwo-fme-node-sdk
```

This installs the SDK, which will run in both server and browser contexts.

### Initializing the SDK (Server / Oxygen)

Store keys as environment variables:

```shell
VWO_SDK_SERVER_KEY=your_server_key
VWO_SDK_CLIENT_KEY=your_browser_key
```

<br />

<br />

### Server-Side Integration (Hydrogen Loader)

Hydrogen uses Remix loaders to fetch data before rendering.
In this step:

* We initialize VWO FE SDK in the **Hydrogen loader**
* We fetch **experiment assignment**
* We return data for the React UI

<br />

**Goal**: Evaluate flags & experiment variants in the loader so Hydrogen can render page accordingly.

Create a helper file like `vwo.server.js`:

```typescript
import { init } from "vwo-fme-node-sdk";
export async function createVWOClient() {
  const vwoClient = await init({
    accountId: process.env.VWO_ACCOUNT_ID,
    sdkKey: process.env.VWO_SDK_KEY,
  });
  return vwoClient;
}
```

Inside a Remix route’s `loader`:
Example: `app/routes/index.server.ts`

```typescript
import { createVWOClient } from "~/vwo.server";

export async function loader({ request }) {
  const vwoClient = await createVWOClient();
  const userContext = { id: "user_123" };
  const featureFlag = await vwoClient.getFlag("new_checkout", userContext);



  const isEnabled = featureFlag.isEnabled();
  const variableValue = featureFlag.getVariable("rollout_percentage", "default");

  return { isEnabled, variableValue };
}
```

This evaluates feature flags before rendering the page.

### Client-Side Integration (Browser)

Even though assignments are computed server-side, we may want to trigger:

* Event tracking
* Conversion tracking
* Client-only experiments

Hydrate flags in your React component:

```typescript
import { useLoaderData } from "@remix-run/react";

export default function Home() {
  const { experimentAssignment } = useLoaderData();

  return (
    <div>
      <h1>Welcome</h1>
      {experimentAssignment.variation === "variant1" && (
        <div>Variant 1 UI</div>
      )}
    </div>
  );
}
```

After server rendering, you can still track events from the UI:

```typescript
import { init } from "vwo-fme-node-sdk";

if (typeof window !== "undefined") {
  (async function () {
    const vwoClient = await init({
      accountId: process.env.VWO_ACCOUNT_ID,
      sdkKey: process.env.VWO_SDK_BROWSER_KEY,
    });

    vwoClient.trackEvent("add_to_cart", {
      id: "user_123",
    });
  })();
}
```

Use **client SDK keys** for browser embeds, which are read-only and safe (but visible).

<Callout icon="📘" theme="info">
  Important notes:

  * Use browser SDK for event tracking
  * Use server SDK for assignment / experiment variant selection
</Callout>

<br />

## Edge Usage (Oxygen)

Oxygen behaves like Edge (Cloudflare Workers). The FE SDK works there because:

* It uses the browser-fetch API
* Doesn’t rely on Node native modules

Edge runtimes like Oxygen may terminate async work early.

To ensure tracking completes, you must provide **edgeConfig** in init options and call **flushEvents** using **waitUntil**.

```typescript
import { init } from "vwo-fme-node-sdk";

// CRITICAL: provide edgeConfig in init options 
export async function createVWOClient() {
  const vwoClient = await init({
    accountId: process.env.VWO_ACCOUNT_ID,
    sdkKey: process.env.VWO_SDK_KEY,
    edgeConfig: {
	shouldWaitForTrackingCalls: true,
    }
  });
  return vwoClient;
}

export async function loader({context, request}: LoaderFunctionArgs) {
  const vwoClient = await createVWOClient();

  await vwoClient.trackEvent("checkout_completed", { id: "user_123" });

  // CRITICAL: Flush events using waitUntil API
  context.waitUntil(vwoClient.flushEvents());

  return new Response("OK");
}
```

<br />

<Callout icon="🚧" theme="warn">
  ⚠️ Required Vite configuration (Build-time)
  When using Vite-based frameworks (Oxygen), you must also update your `vite.config.ts.`
</Callout>

<br />

### Why is this needed

Vite treats **SSR dependencies differently** from browser dependencies. The vwo-fme-node-sdk has deep internal imports that Vite does not automatically pre-bundle for SSR.

In Edge environments like Oxygen, this can lead to:

* Runtime module resolution errors
* CJS ↔ ESM incompatibilities
* “Module not found” errors during SSR execution

To avoid this, you must explicitly tell Vite to **pre-bundle the vwo-fme-node-sdk and its internal dependencies for SSR**.

<br />

Add the following to your `vite.config.ts`:

```javascript
export default defineConfig({
  ssr: {
    optimizeDeps: {
      include: [
        "vwo-fme-node-sdk",
        "murmurhash",
        "vwo-fme-sdk-log-messages",
      ],
    },
  },
});
```

<Callout icon="🚧" theme="warn">
  Do NOT let un-awaited asynchronous calls hang — they might get dropped.
  Read more on Edge optimizations here - [https://developers.vwo.com/v2/docs/fme-edge-support](https://developers.vwo.com/v2/docs/fme-edge-support)
</Callout>

<br />

Asynchronous Data Fetching & Fallbacks

Experiments happen during SSR, so:

* Wrap SDK calls in error boundaries
* Provide fallback behavior if the SDK fails
* Use cached assignments if reused frequently

### Example:

```javascript
let assignment;
const defaultBehaviorValue;
try {
  const flag = await vwo.getFlag(key, userContext)
  assignment = flag.getVariable(, defaultBehaviorValue);
} catch (err) {
  console.error("VWO assignment failed:", err);
  assignment = defaultBehaviorValue;
}
```

<br />

## Best Practices & Design Patterns

* Use environment-specific SDK keys for dev/staging/production.
* Evaluate features server-side for SSR decisions.
* Hydrate assignments to the client for UI logic.
* Persist consistent user IDs (cookies/localStorage).
* Centralise SDK initialisation (avoid per-component initialisation).

<br />

**❗ SDK Key Exposure** — In browsers, SDK keys are public but read-only. Avoid putting sensitive logic based on them.
**❗ Edge Execution Constraints** — Must await tracking/event calls explicitly or risk drop.
**❗ No built-in caching** — The default client fetches on every init. Consider custom caching/storage for Edge if you have high load.

<br />

Should I run SDK initialization on every request?

Not necessarily — and you shouldn’t if you can avoid it.

VWO FE SDKs support initialising the SDK using already-fetched or cached settings. When you pass pre-fetched settings during initialization:

* ❌ No network call is required during init
* ⚡ Decisioning happens immediately and synchronously
* ✅ Ideal for Edge-like environments (e.g., Shopify Oxygen)

This makes the SDK highly suitable for high-performance SSR and Edge runtimes, where repeated network calls during request handling should be avoided.

<br />

### ✅ Recommended approach (especially for Edge / Oxygen)

* Fetch VWO settings **periodically** (for example, via a scheduled job, cache refresh, or shared storage).
* Initialize the SDK using those cached settings.
* Perform **real-time feature flag and experiment evaluation** without waiting on remote calls.

This ensures:

* Consistent and fast decisioning
* Minimal latency
* Better scalability at the Edge

<Callout icon="📘" theme="info">
  You must ensure that cached settings are refreshed periodically so your application receives the latest changes made in the VWO application (new flags, updated rules, traffic changes, etc.).
</Callout>

<br />

## Conclusion

Integrating **VWO FE SDK with Shopify Headless** (Hydrogen + Oxygen) gives you:

* Consistent SSR feature flag evaluation
* Fast UX with server-rendered variant decisions
* Browser tracking & personalization
* Multi-environment compatibility

By aligning with the official SDK usage and adapting to Remix/Oxygen constraints, you get a robust experimentation layer for your storefront.
