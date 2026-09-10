---
title: Integrating Wingify FE With Wingify Web Insights
deprecated: false
hidden: true
metadata:
  robots: index
---
## **Overview**

Wingify Feature Experimentation (FE) evaluates feature flags and experiments and Web Insights performs behavioral analysis (session recordings, heatmaps) in the browser via SmartCode. If the two systems assign different identifiers to the same visitor, Wingify cannot match the two — session recordings and heatmaps won't correlate correctly with the flag decisions that visitor received.

The solution is a shared identity: the same **UUID** and the same **sessionId**, recognized by both systems for the same visitor, on every request.

There are two flows, depending on which system sees the visitor first:

> * **Server-First Flow** — the FE SDK (React) sees the user first (e.g. it evaluates the flag on mount, before SmartCode has initialized), and the resulting identity must be handed to SmartCode
> * **Client-First Flow** — SmartCode sees the user first, and the resulting identity must be handed to the FE SDK

<br />

## Relevant Feature Flag Methods

The `useGetFlag` hook returns a `flag` object (an instance of the same `Flag` class used by the underlying Wingify SDK) that exposes two methods for retrieving the identity used during that evaluation. These are the same `uuid` and `sessionId` values referenced throughout the implementation flows below.

### `flag.getUUID()`

```tsx
const { flag, isReady } = useGetFlag('feature-key', context);

if (isReady) {
  const uuid = flag.getUUID();
}
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type     | Description                                                                                                                                                                                                                                                                                    |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string` | The UUID associated with the visitor for this flag evaluation. If a valid web-generated UUID (format: `D` or `J` followed by 32 hex characters) was passed as `context.id`, that value is returned as-is. Otherwise, a UUID is deterministically derived from `context.id` and the account ID. |

### `flag.getSessionId()`

```tsx
const { flag, isReady } = useGetFlag('feature-key', context);

if (isReady) {
  const sessionId = flag.getSessionId();
}
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type     | Description                                                                                                                                                                                                             |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The session identifier used for this flag evaluation. If `context.sessionId` was provided when calling `useGetFlag()`, that value is returned. Otherwise, it defaults to the Unix timestamp at which the session began. |

<br />

## **How to Implement**

### **Server-First Flow**

1\. The user is evaluated by the FE SDK. Their userId is converted into a UUID, and a sessionId is generated for them.

```tsx
import React, { useEffect } from 'react';
import { WingifyProvider, IWingifyOptions, IWingifyContextModel, useGetFlag } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your SDK Key
  accountId: '123456', // Your account ID
};

const userId = 'user-123';
const userContext: IWingifyContextModel = { id: userId };

const YourComponent = () => {
  const { flag, isReady } = useGetFlag('feature-key');

  useEffect(() => {
    if (!isReady) return;

    // Get the sessionId used for this evaluation and the generated uuid
    const sessionId = flag.getSessionId();
    const uuid = flag.getUUID();

    // Push these into the SmartCode queue as early as possible in the app's
    // lifecycle (e.g. a top-level layout component), ideally before SmartCode's
    // async script has finished its own visitor-identification bootstrap.
    // `window.VWO` isn't declared on the DOM `Window` type, hence the cast.
    const w = window as any;
    w.VWO = w.VWO || [];

    // set visitorId
    w.VWO.push(['setVisitorId', () => uuid]);

    // set sessionId
    w.VWO.push(['setSessionId', () => sessionId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only run once, when the flag becomes ready
  }, [isReady]);

  return null;
};

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={userContext}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

Once this runs, the same user and session are connected across both FE and Web Insights — session recordings and heatmaps for this visitor will correctly reflect the feature flag decisions they received.

<br />

### **Client-First Flow**

1\. The user is first evaluated by Web Insights. SmartCode assigns a UUID (stored as a cookie and available inside a JS object) and a sessionId.

```javascript
window.VWO = window.VWO || [];

// get the sessionId and the uuid
const sessionId = window.VWO.get('visitor.sessionId');
const uuid = window.VWO.get('visitor.id');
```

2\. Pass this uuid and sessionId into the context used by `WingifyProvider` (or the `useGetFlag` hook):

```tsx
const YourComponent = () => {
  // NOTE: don't annotate this object literal as `IWingifyContextModel` — `useIdForWeb`
  // isn't part of the published interface yet, so TypeScript's excess-property
  // check would reject it. Let the type be inferred, then pass the variable in.
  const userContext = {
    id: uuid,
    sessionId: sessionId,
    useIdForWeb: true,
  };

  const { flag, isReady } = useGetFlag('feature-key', userContext);

  if (!isReady) return null;

  return <div>{flag.isEnabled() ? 'Feature Enabled' : 'Feature Disabled'}</div>;
};
```

Once this runs, the same user and session are connected across both FE and Web Insights, the same as the server-first flow.

<br />

## Resources:

1. [Cross-System Identity Synchronization](https://developers.wingify.com/v2/docs/fme-unified-experimentation-identity-synchronization)
