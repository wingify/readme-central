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

> * **Server-First Flow** — the FE SDK sees the user first (e.g. during SSR or an API call), and the resulting identity must be handed to SmartCode
> * **Client-First Flow** — SmartCode sees the user first, and the resulting identity must be handed to the FE SDK

<br />

## Relevant Feature Flag Methods

The flag object returned by `GetFlag()` exposes two methods for retrieving the identity used during that evaluation. These are the same `uuid` and `sessionId` values referenced throughout the implementation flows below.

### `flag.GetUUID()`

```go
flag, err := vwoInstance.GetFlag("feature-key", context)
if err != nil {
    log.Fatalf("Error getting feature flag: %v", err)
}

uuid := flag.GetUUID()
fmt.Println("Visitor UUID:", uuid)
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type     | Description                                                                                                                                                                                                                                                                                          |
| :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string` | The UUID associated with the visitor for this flag evaluation. If a valid web-generated UUID (format: `D` or `J` followed by 32 hex characters) was passed as `context["id"]`, that value is returned as-is. Otherwise, a UUID is deterministically derived from `context["id"]` and the account ID. |

### `flag.GetSessionId()`

```go
flag, err := vwoInstance.GetFlag("feature-key", context)
if err != nil {
    log.Fatalf("Error getting feature flag: %v", err)
}

sessionID := flag.GetSessionId()
fmt.Println("Session ID:", sessionID)
```

#### Parameters

This method does not accept any parameters.

#### Returns

| Type    | Description                                                                                                                                                                                                             |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `int64` | The session identifier used for this flag evaluation. If `context["sessionId"]` was provided when calling `GetFlag()`, that value is returned. Otherwise, it defaults to the Unix timestamp at which the session began. |

<br />

## **How to Implement**

### **Server-First Flow**

1\. The user is evaluated by the FE SDK. Their userId is converted into a UUID, and a sessionId is generated for them.

```go
package main

import (
    "fmt"
    "log"

    vwo "github.com/wingify/vwo-fme-go-sdk"
)

func main() {
    options := map[string]interface{}{
        "sdkKey":    "32-alpha-numeric-sdk-key", // Replace with your SDK key
        "accountId": "123456",                   // Replace with your VWO account ID
    }

    vwoInstance, err := vwo.Init(options)
    if err != nil {
        log.Fatalf("Failed to initialize VWO client: %v", err)
    }

    userId := "user-123"

    context := map[string]interface{}{
        "id": userId,
    }

    flag, err := vwoInstance.GetFlag("feature-key", context)
    if err != nil {
        log.Fatalf("Error getting feature flag: %v", err)
    }

    // Get the sessionId used for this evaluation and the generated uuid
    sessionID := flag.GetSessionId()
    uuid := flag.GetUUID()
    fmt.Println("Session ID:", sessionID, "| Visitor UUID:", uuid)

    // Pass sessionID and uuid to the frontend (see step 2 below)
}
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

<br />

### **Client-First Flow**

1\. The user is first evaluated by Web Insights. SmartCode assigns a UUID (stored as a cookie and available inside a JS object) and a sessionId.

```javascript
window.VWO = window.VWO || [];

// get the sessionId and the uuid
const sessionId = window.VWO.get('visitor.sessionId');
const uuid = window.VWO.get('visitor.id');
```

2\. Pass this uuid and sessionId to your backend, and use them in the context map when calling the FE SDK:

```go
context := map[string]interface{}{
    "id":          uuid,      // uuid received from the frontend
    "sessionId":   sessionID, // sessionId received from the frontend
    "useIdForWeb": true,
}

flag, err := vwoInstance.GetFlag("feature-key", context)
if err != nil {
    log.Fatalf("Error getting feature flag: %v", err)
}

fmt.Println("Feature enabled:", flag.IsEnabled())
```

Once this runs, the same user and session are connected across both FE and Web Insights, the same as the server-first flow.

<br />

## Resources:

1. [Cross-System Identity Synchronization](https://developers.wingify.com/v2/docs/fme-unified-experimentation-identity-synchronization)
