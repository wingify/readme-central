---
title: Integrating Wingify FE With Wingify Web Insights
deprecated: false
hidden: true
metadata:
  robots: index
---
# **Integrating Wingify FE With Wingify Web Insights**

## **Overview**

Wingify Feature Experimentation (FE) evaluates feature flags and experiments and Web Insights performs behavioral analysis (session recordings, heatmaps) in the browser via SmartCode. If the two systems assign different identifiers to the same visitor, Wingify cannot match the two — session recordings and heatmaps won't correlate correctly with the flag decisions that visitor received.

 

The solution is a shared identity: the same **UUID** and the same **sessionId**, recognized by both systems for the same visitor, on every request.

 

There are two flows, depending on which system sees the visitor first:

> * **Server-First Flow** — the FE SDK sees the user first (e.g. during SSR or an API call), and the resulting identity must be handed to SmartCode
> * **Client-First Flow** — SmartCode sees the user first, and the resulting identity must be handed to the FE SDK

## Flag Methods

The `Flag` object returned by `getFlag()` exposes two accessor methods for retrieving the identity used during that evaluation. These are the same `uuid` and `sessionId` values referenced throughout the implementation flows below.

### `flag.getUUID()`

```javascript
const flag = await wingifyClient.getFlag('feature-key', context);
const uuid = flag.getUUID();
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type     | Description                                                                                                                                                                                                                                                                                    |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string` | The UUID associated with the visitor for this flag evaluation. If a valid web-generated UUID (format: `D` or `J` followed by 32 hex characters) was passed as `context.id`, that value is returned as-is. Otherwise, a UUID is deterministically derived from `context.id` and the account ID. |

### `flag.getSessionId()`

```javascript
const flag = await wingifyClient.getFlag('feature-key', context);
const sessionId = flag.getSessionId();
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type     | Description                                                                                                                                                                                                          |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `number` | The session identifier used for this flag evaluation. If `context.sessionId` was provided when calling `getFlag()`, that value is returned. Otherwise, it defaults to the Unix timestamp at which the session began. |

## **How to Implement**

### **Server-First Flow**

1\. The user is evaluated by the FE SDK. Their userId is converted into a UUID, and a sessionId is generated for them.

```javascript
require('wingify-fme-node-sdk');

const userId = 'user-123';
const accountId = '123456'; // your VWO account ID

const context = { id: userId };
const flag = await wingifyClient.getFlag('feature-key', context);

// Get the sessionId used for this evaluation and the generated uuid
const sessionId = flag.getSessionId();
const uuid = flag.getUUID();
```

2\. Pass this uuid and sessionId to the frontend (e.g. as SSR props or an API response), then push them into SmartCode **before** the SmartCode script initializes.

```javascript
// NOTE: add this before the SmartCode script tag
window.VWO = window.VWO || [];

// set visitorId
window.VWO.push(['setVisitorId', () => {
  return uuid;
}]);

// set sessionId
window.VWO.push(['setSessionId', () => {
  return sessionId;
}]);
```

Once this runs, the same user and session are connected across both FE and Web Insights — session recordings and heatmaps for this visitor will correctly reflect the feature flag decisions they received.

### **Client-First Flow**

1\. The user is first evaluated by Web Insights. SmartCode assigns a UUID (stored as a cookie and available inside a JS object) and a sessionId.

 

```javascript
window.VWO = window.VWO || [];

// get the sessionId and the uuid
const sessionId = window.VWO.get('visitor.sessionId');
const uuid = window.VWO.get('visitor.id');
```

2\. Pass this uuid and sessionId to your backend, and use them in the context object when calling the FE SDK:

```javascript
const context = {
  id: uuid,
  sessionId: sessionId,
  useIdForWeb: true
};

const flag = await wingifyClient.getFlag('feature-key', context);
```

Once this runs, the same user and session are connected across both FE and Web Insights, the same as the server-first flow.

 

## Resources:

1. [Cross-System Identity Synchronization](https://developers.wingify.com/v2/docs/fme-unified-experimentation-identity-synchronization)
