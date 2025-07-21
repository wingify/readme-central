---
title: Next.js(web)
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide walks you through integrating VWO Feature Management & Experimentation(FME) React SDK with a Next.js application. With this integration, you can manage feature rollouts, perform A/B tests, and track custom user metrics directly from your React components in a Next.js environment.

## Next.js & React

* **React.js**: UI library that enables component-driven UI development.
* **Next.js**: A React framework offering SSR/SSG, file-based routing, API routes, and performance optimizations.
* **VWO Integration**: Next.js uses React as UI layer; VWO FME React SDK plugs into the React components regardless of SSR or client-side rendering.

<br />

## Installing the SDK

To begin, install the VWO FME React SDK in your Next.js project:

```shell
npm install vwo-fme-react-sdk
# or
yarn add vwo-fme-react-sdk
```

This installs the SDK package required to connect your React app with VWO.

> Refer to the VWO FME React SDK documentation on [Installing the SDK](doc:fme-react-install)

<br />

## Initializing the SDK

You need to wrap your application in the `VWOProvider` and configure the SDK in your `_app.tsx`, ` _app.js` or the *app* file.

```javascript
// pages/_app.tsx
import { VWOProvider } from 'vwo-fme-react-sdk';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const user = {
    id: 'user-123' 
  };

  return (
    <VWOProvider
      config={{
        sdkKey: process.env.NEXT_PUBLIC_VWO_SDK_KEY!,
        accountId: process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID!,
        logger: { level: 'debug' },
      }}
      userContext={user}
      fallbackComponent={<div>Loading VWO...</div>}
    >
      <Component {...pageProps} />
    </VWOProvider>
  );
}

export default MyApp;
```

This sets up VWO across your entire app, with user identification and optional fallback during async loading.

> Refer to the VWO FME React SDK documentation on [Initialization](doc:fme-react-initialization)

<br />

## User Context

You can provide a user ID and custom targeting variables. You can also update this context dynamically using the SDK.

```javascript
function MyApp({ Component, pageProps }: AppProps) {
  const user = {
    id: 'user-123',
    customVariables: { plan: 'premium', region: 'EU' },
  };

  return (
    <VWOProvider
      config={{
        sdkKey: process.env.NEXT_PUBLIC_VWO_SDK_KEY!,
        accountId: process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID!
      }}
      userContext={user}
    >
      <Component {...pageProps} />
    </VWOProvider>
  );
}
```

This lets you update user context when login or profile changes, enabling real-time flag evaluation.

> Refer to the VWO FME React SDK documentation on [User Context](doc:fme-react-context)

<br />

## Feature Flags & Variables

Use `useGetFlag` to evaluate feature enablement and retrieve any variation variables.

```javascript
// Retrieve the flag using the feature key
const { flag, isReady } = useGetFlag('feature_key', userContext);

// Use the flag object returned by useGetFlag to retrieve all variables
const allFlagVariables = useGetFlagVariables(flag);
```

isEnabled() checks if the feature is on for the user, and getVariable() fetches typed variation values like strings or booleans.

> Refer to the VWO FME React SDK documentation on [Feature Flags & Variables](doc:fme-react-flags)

<br />

## Tracking Metrics

To measure key actions like error rates or conversions, use `useTrackEvent` to send metrics to VWO.

```javascript
import { useTrackEvent } from "vwo-fme-react-sdk";

const YourComponent = () => {
  const { trackEvent, isReady } = useTrackEvent();

  const handleClick = () => {
    if (isReady) {
      trackEvent("button_click", { userType: "premium" });
    }
  };

  return <button onClick={handleClick}>Track Click</button>;
};

export default YourComponent;
```

Metrics allow you to define conversion goals within experiments and track success across feature flags.

> Refer to the VWO FME React SDK documentation on [Metrics Tracking](doc:fme-react-metrics)

<br />

## Setting Attributes

Use attributes to add dynamic segmentation criteria during runtime for more precise feature control.

```javascript
import { useSetAttribute } from 'vwo-fme-react-sdk';

function YourComponent() {
  const { setAttribute, isReady } = useSetAttribute();

  return <button onClick={() => setAttribute({ age: 25, location: 'US' })}>Click Me</button>;
}
```

These attributes are used in flag conditions or audience targeting rules in the VWO dashboard.

> Refer to the VWO FME React SDK documentation on [Attributes](doc:fme-react-attributes)

<br />

## Logging, Storage, and Integrations

The VWO React SDK handles logging, storage, and integrations through built-in mechanisms configurable via SDK options.

* **Logging** helps in debugging by exposing SDK activity and can be customized for verbosity.
* **Storage service** allows persisting user data (e.g., variation assignments) locally, using cookies, localStorage, or custom solutions.
* **Integrations** support syncing VWO with external analytics tools like Google Analytics, Segment, or Mixpanel.

> Refer to the VWO FME React SDK documentation on:
>
> 1. [Logging](doc:fme-react-logging)
> 2. [Storage Service](doc:fme-react-storage)
> 3. [Integrations](doc:fme-react-integrations)

<br />

## Next.js Specific Considerations

| Concern               | Recommendation                                                          |
| --------------------- | ----------------------------------------------------------------------- |
| SSR Support           | Evaluate flags only client-side using hooks.                            |
| Dynamic Imports       | Use `dynamic(() => import('./Comp'), { ssr: false })` if needed.        |
| Environment Variables | Use `NEXT_PUBLIC_` prefix for SDK keys.                                 |
| User ID Persistence   | Ensure consistent user ID across sessions.                              |
| Initial Flash         | Use `fallbackComponent` in `VWOProvider` to handle flag loading states. |

<br />

## Reference Example App

Wingify provides a full-featured example app with VWO SDK integrated into a Next.js app:

<Anchor label="VWO FME Next.js Example App" target="_blank" href="https://github.com/wingify/vwo-fme-examples/tree/master/nextjs">VWO FME Next.js Example App</Anchor>

> Includes flag usage, metrics, attributes, and best practices for SSR-safe rendering and environment setup.

<br />

## Further References

1. React SDK Docs: [https://developers.vwo.com/v2/docs/fme-react-web#/](https://developers.vwo.com/v2/docs/fme-react-web#/)
2. React SDK GitHub Repo: [https://github.com/wingify/vwo-fme-react-sdk](https://github.com/wingify/vwo-fme-react-sdk)
3. Example Next.js Integration: [https://github.com/wingify/vwo-fme-examples/tree/master/nextjs](https://github.com/wingify/vwo-fme-examples/tree/master/nextjs)