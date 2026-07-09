---
title: Cross-System Identity Synchronization
deprecated: false
hidden: false
metadata:
  robots: index
next:
  pages:
    - slug: fme-hybrid-testing-conversion-tracking
      title: Conversion Tracking Across Platforms
      type: basic
---
## Need for Cross-System Identity Synchronization

If Web Testing and Feature Experimentation operate independently:

- A user bucketed client-side may be unknown to server-side systems
- Backend experiments cannot be correlated with frontend experiments
- Funnel-level analysis becomes fragmented
- Attribution becomes inaccurate

In other words:

> Without shared identity, experimentation becomes siloed.

Connectivity ensures:

> One user → One identity → One journey → Unified insights

## Core Design Principle: UUID-Based Identity

The unifying principle is:

<Callout icon="📘" theme="info">
  ###

  **A canonical UUID must represent the same user across all evaluation layers.**<br />Check [what is a UUID](https://developers.wingify.com/v2/docs/fme-user-id-management)  for more details.
</Callout>

Whether evaluation occurs:

- In the browser (SmartCode)
- In the backend (FE SDK)
- In mobile apps (FE SDK)
- In APIs (Payload)

The identity must remain stable.

Wingify achieves this by ensuring that:

- FE SDKs can generate/read and reuse UUIDs
- SmartCode can generate/read and preserve the same UUID
- Both systems communicate identity through cookies or server headers
- All events flow into Web Insights under the same visitor profile

```mermaid
flowchart TB

    User[User]

    subgraph Experience Layer
        Client[Client Application]
        Server[Backend Service]
    end

    subgraph Identity Layer
        UUID[Shared UUID]
    end

    subgraph Wingify Platform
        WT[Wingify Web Testing]
        FE[Wingify Feature Experimentation]
        VI[Wingify Insights]
    end

    User --> Client
    User --> Server

    Client --> UUID
    Server --> UUID

    UUID --> WT
    UUID --> FE
    UUID --> VI

```

<br />

## Step-by-step guide

### SmartCode Installation (Web Experimentation Example)

A minimal SmartCode installation looks like this:

```javascript
<!-- Start Wingify Async V3.0 SmartCode -->
<link rel="preconnect" href="https://edge.wingify.net"/>
<script type="text/javascript">
window._wingify_code || (function() {        
    var account_id = REPLACE_WITH_WINGIFY_ACCOUNT_ID,
        version = 3.0,
        settings_tolerance = 2000,
        hide_element = 'body',
        hide_element_style =
        'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important';
    /* DO NOT EDIT BELOW THIS LINE */
    var t=window,n=document;if(-1<n.URL.indexOf('__wingify_disable__')||t._wingify_code)return;var i=!1,o=n.currentScript,e={sT:settings_tolerance,hES:hide_element_style,hE:hide_element};try{e=Object.assign(e,JSON.parse(localStorage.getItem('_wingify_'+account_id+'_config')))}catch(e){}var code={script:o,nonce:o.nonce,settings_tolerance:function(){return e.sT},hide_element:function(){return performance.getEntriesByName('first-contentful-paint')[0]?'':e.hE},hide_element_style:function(){return'{'+e.hES+'}'},getVersion:function(){return version},finish:function(){var e;!i&&(i=!0,e=n.getElementById('_vis_opt_path_hides'))&&e.parentNode.removeChild(e)},finished:function(){return i},addScript:function(e){var t=n.createElement('script');t.src=e,o.nonce&&t.setAttribute('nonce',o.nonce),t.fetchPriority='high',n.head.appendChild(t)},init:function(){t._settings_timer=setTimeout(function(){code.finish()},this.settings_tolerance());var e=n.createElement('style');e.id='_vis_opt_path_hides',o.nonce&&e.setAttribute('nonce',o.nonce),e.textContent=this.hide_element()+this.hide_element_style(),n.head.appendChild(e),this.addScript('https://edge.wingify.net/tag/'+account_id+'.js')}};t._wingify_code=code;code.init();})();
</script> 
<!--End Wingify Async SmartCode -->
```

Once installed on web pages:

- Wingify can identify visitors
- Bucketing happens client-side
- Cookies are set automatically
- Visual experiments can be launched without code changes

### Feature Experimentation Example (Server-Side)

A simple Node.js server-side Feature Experimentation example:

```javascript
import { init } from 'vwo-fme-node-sdk';

const vwoClient = await init({
  sdkKey: 'VWO_SDK_KEY',
  accountId: 'VWO_ACCOUNT_ID'
});

const userContext = {
  id: 'unique_user_id' // can be email, CRM ID, etc.
};

const flag = vwoClient.getFlag('new_checkout_flow', userContext);

if (flag.isEnabled()) {
  enableNewCheckout();
} else {
  enableOldCheckout();
}
```

Here:

- The SDK buckets the user locally based on the unique ID for the user
- Decisions happen before the response is sent to the front-end
- Perfect for backend-controlled flows

<br />

## Experiment Evaluation Entry Points

There are only two logical ways a user can enter the experimentation system:

1. **Server-first flow**
2. **Client-first flow**

> Wingify supports both symmetrically.

Before we dive into how UUID synchronization works between server-side Feature Experimentation and client-side Web Testing, it is important to understand a more fundamental concept: **How do servers and browsers generally exchange information?**

The mechanisms used for UUID propagation are not unique to experimentation systems. They rely on standard web communication patterns used across modern applications.

Below are the most common and industry-standard ways information flows between the server and the client.

### How Server and Client Exchange Information(Passing UUID Between Server and Client)

#### UUID Generation

A UUID can be generated by either system:

| Entry Point  | UUID Generated By |
| ------------ | ----------------- |
| Server-first | FE SDK            |
| Client-first | SmartCode         |

> Once generated, the UUID becomes the source of truth.

To keep the same UUID across server-side and client-side experiments, the identifier must be transferable in both directions, from server to client and from client back to server. The following mechanisms support this bidirectional flow.

1. Cookies `(Recommended)`
2. HTTP Response / Request Headers
3. Injecting into the window Object

#### 1. Cookies `(Recommended)`

Cookies are the most reliable way to share a UUID between server and client.

- **Server → Client**: Server sets the UUID using the `Set-Cookie` header
- **Client → Server**: Browser automatically sends the cookie with every request
- **Client access**: Available via JavaScript if not marked HttpOnly

Cookies persist across page refreshes and navigations, making them ideal for keeping server and client experiments in sync.

#### 2. HTTP Response / Request Headers

Custom headers can be used to pass the UUID explicitly.

- **Server → Client**: Server sends the UUID in a response header (e.g., `X-VWO-Visitor-ID`)
- **Client → Server**: Client includes the same header in subsequent API requests

This approach works well for API-driven applications but requires explicit handling and persistence on the client.

#### 3. Injecting into the window Object

The server embeds the UUID into the page during rendering:

```html
<script>
  window.__VWO_UUID__ = "12345-uuid";
</script>
```

- **Server → Client**: UUID is injected during SSR
- **Client → Server**: Client reads the value and sends it back via cookies or headers

This method provides immediate client-side access but relies on another mechanism for persistence.

<Callout icon="📘" theme="info">
  ### Recommendation

  There can be other ways too, depending on the requirements. For consistent experiment identity, use cookies as the primary bidirectional channel, optionally combined with HTML injection (window or JSON script) for immediate client-side availability during initialization.
</Callout>

<br />

## Server-First Architecture

This is common in:

- Authenticated applications
- API-driven products
- Backend-rendered pages
- SaaS dashboards

### Theoretical Flow

1. User request hits the server.
2. Server calls FE SDK.
3. SDK:
   1. Converts the provided user ID to a UUID.
   2. Evaluates rules.
4. UUID is attached to the response (cookie or header).
5. Browser loads SmartCode.
6. SmartCode reads UUID.
7. Client-side experiments align with server-side decisions.

```mermaid
sequenceDiagram
    participant User
    participant Server
    participant FE_SDK as Wingify FE SDK
    participant Browser
    participant SmartCode

    User->>Server: 1. HTTP request
    Server->>FE_SDK: 2. Evaluate user (userId)
    FE_SDK->>FE_SDK: 3a. Convert userId → UUID
    FE_SDK->>FE_SDK: 3b. Evaluate feature rules
    FE_SDK-->>Server: Evaluation result + UUID
    Server->>Browser: 4. Response (UUID via cookie/header)
    Browser->>SmartCode: 5. Page load
    SmartCode->>Browser: 6. Read UUID
    SmartCode->>SmartCode: 7. Align client-side experiments

```

### Conceptual Outcome

- The server becomes the primary authority.
- Browser inherits identity.
- Cross-layer alignment is automatic.

#### Server-side Example

```javascript
const userContext = { id: 'crm_987' };
const flag = vwoClient.getFlag('feature_key', userContext);

const sessionId = flag.getSessionId();
const uuid = vwoClient.getUUID(userContext);

// Pass sessionId and uuid to front-end either via cookies, window,
```

#### Client-side Example

> Add the below code before Wingify SmartCode Script

```javascript
window.VWO.push(['setSessionId', () => {
  // Read sessionId from cookie or request headers
  return sessionId;
}]);

window.VWO.push(['setVisitorId', () => {
  // Read uuid from cookie or request headers
  return uuid;
}]);
```

<br />

## Client-First Architecture

Common in:

- Marketing websites
- SEO landing pages
- Anonymous traffic
- Static sites

### Theoretical Flow

1. SmartCode loads first.
2. SmartCode:

- Generates a UUID.
- Stores it in a cookie.

3. User performs an action, triggering a server request.
4. Server reads UUID from cookie or request headers.
5. Server passes UUID into FE SDK.
6. Backend experiments now align with client-side identity.

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant SmartCode
    participant Server
    participant FE_SDK as Wingify FE SDK

    User->>Browser: Visit page
    Browser->>SmartCode: 1. Load SmartCode
    SmartCode->>SmartCode: 2a. Generate UUID
    SmartCode->>Browser: 2b. Store UUID in cookie

    User->>Browser: 3. Trigger action
    Browser->>Server: Request (UUID cookie/header)
    Server->>Server: 4. Read UUID
    Server->>FE_SDK: 5. Evaluate using UUID
    FE_SDK->>FE_SDK: Use existing UUID
    FE_SDK-->>Server: 6. Evaluation result

```

### Conceptual Outcome

- The browser becomes the identity authority.
- Server reuses existing identity.
- No duplication occurs.

#### Server-side Example

```javascript
const VWO_WEB_UUID_COOKIE_NAME = '_vwo_uuid';
const uuidFromCookie = req.cookies[VWO_WEB_UUID_COOKIE_NAME];

const userContext = {
  id: uuidFromCookie
};

const flag = vwoClient.getFlag('recommendation_algo', userContext);
```

<br />

## Why Bidirectional Identity Synchronization Is Critical

In real-world systems:

- Some users land on marketing pages first.
- Some users enter through authenticated deep links.
- Some traffic originates via APIs.
- Some flows are SPA-based.

If experimentation only supported one direction, identity fragmentation would occur.

Wingify’s model ensures:

| Entry Mode   | Identity Authority | System Alignment |
| ------------ | ------------------ | ---------------- |
| Server-first | Backend            | Browser inherits |
| Client-first | Browser            | Backend inherits |
| Repeat visit | Cookie persistence | Full alignment   |

<br />

## Architecture: Isolated vs Unified Systems

### Isolated Architecture (Not Recommended)

```mermaid
flowchart LR
    Browser --> SmartCode
    SmartCode --> Wingify_Web[Wingify Web Testing]

    Server --> FE_SDK[Wingify FE SDK]
    FE_SDK --> Wingify_FE[Wingify Feature Experimentation]

    Browser -. separate identity .- Server

```

Problems

- Separate visitor identities
- No shared attribution
- Fragmented analytics
- Incomplete funnel visibility

### Unified Architecture (Recommended)

```mermaid
flowchart LR
    Browser -->|UUID Cookie| Server
    Server --> FE_SDK[Wingify FE SDK]
    FE_SDK --> Wingify

    Browser --> SmartCode
    SmartCode --> Wingify

    FE_SDK -. shared UUID .- SmartCode

```

**Benefits**

- Single UUID across systems
- Unified experimentation
- Reliable attribution
- End-to-end journey tracking

<br />

## End-to-End Execution Architecture

The diagram below illustrates:

- FE SDK communicates with Wingify for configuration
- SmartCode communicates independently with Wingify
- UUID is the shared binding identity

```mermaid
sequenceDiagram
    participant User
    participant Server
    participant FE_SDK as Wingify FE SDK
    participant Wingify
    participant Browser
    participant SmartCode

    User->>Server: Initial request
    Server->>FE_SDK: Pass user ID / context
    FE_SDK->>Wingify: Fetch settings / evaluate rule
    Wingify-->>FE_SDK: Campaign & flag configuration
    FE_SDK-->>Server: Decision + UUID
    Server->>Browser: Response + UUID (cookie)

    Browser->>SmartCode: Load page
    SmartCode->>Browser: Read UUID cookie
    SmartCode->>Wingify: Evaluate visual tests
    Wingify-->>SmartCode: Variation decision

    Note over User,SmartCode: Same UUID used across server & client

```

<br />

## What This Enables

### True Omni-Channel Experimentation

A single user could experience:

- Visual homepage test
- Server-side pricing experiment
- Feature-flagged recommendation engine
- Mobile push personalization

> All attributed to one identity.

### Unified Web Insights

Because both FE SDK events and SmartCode events use the same UUID:

- Funnels remain intact
- Cross-experiment impact can be measured
- Combined revenue lift can be calculated

> Attribution is reliable

<br />

## Conceptual Example: E-Commerce Platform Migration

#### Scenario: E-commerce Funnel

1. User lands on homepage (web)
2. Sees a visual hero banner test (Web Testing)
3. Proceeds to checkout
4. Backend applies a pricing or recommendation experiment (Feature Experimentation)
5. Conversion is tracked holistically

#### Without connectivity:

- These appear as two different users
- Insights are fragmented

#### With connectivity:

- One visitor profile (Same user → same UUID → same journey)
- Full funnel visibility (Analyze impact, not isolated tests)
- Clear insight into how frontend + backend experiments interact

<br />
