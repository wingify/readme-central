---
title: Event Hooks
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Event Hooks

### Overview

The `addPreHook` and `addPostHook` APIs register callbacks that run **before and after certain event sync requests** are sent. They are **not** a single global wrapper around every `window.Wingify.*` call or every outbound HTTP request.

- **Pre-hook (**`addPreHook`**)**: Runs before the eligible sync request is sent. You can read or change the outgoing payload for that sync. If you register more than one pre-hook, they run in **registration order**. Return `-1` to cancel that sync (see **example 3**).

- **Post-hook (**`addPostHook`**)**: Runs **after the network request completes** for that sync. The callback's **return value does not change** what was already sent; use post-hooks for side effects (tags, logging, forwarding).

Scope details are summarized under **Notes** below.

### API Signature

```javascript
window.Wingify = window.Wingify || [];
window.Wingify.push(['addPreHook', <callback_function>]);

window.Wingify.push(['addPostHook', <callback_function>]);
```

### Parameters

| Parameter           | Type     | Required | Description                                              |
| ------------------- | -------- | -------- | -------------------------------------------------------- |
| `callback_function` | Function | Yes      | Called for each **eligible** event sync (see **Notes**). |

### Callback Data

Hooks receive the **outgoing event sync payload** (the object that will be sent on the wire). Read `payload.d.event.name` and `payload.d.event.props`. For eligible custom-event syncs, keys from the `attributes` argument of `window.Wingify.event(eventName, attributes)` appear under `props`. Which syncs qualify is summarized under **Notes** below.

| Location                | Type   | Description                    |
| ----------------------- | ------ | ------------------------------ |
| `payload.d.event.name`  | String | Event name for this sync.      |
| `payload.d.event.props` | Object | Event properties on this sync. |

Older snippets may refer to top-level `event` / `props`; prefer `payload.d.event` as above.

### Examples

#### 1. Pre-hook: adjust custom attributes on a custom event sync

```javascript
window.Wingify.push(['addPreHook', function (payload) {
    if (!payload || !payload.d || !payload.d.event) return payload;
    var props = payload.d.event.props || {};
    if (payload.d.event.name === 'newsletterSignup') {
        props.signupSource = 'footer_form'; // custom attribute on your custom event
        payload.d.event.props = props;
    }
    // Returning undefined/null would keep the same payload object (library uses cb(payload) || payload).
    return payload;
}]);
```

#### 2. Post-hook: forward a custom event sync (GA4)

```javascript
window.Wingify.push(['addPostHook', function (payload) {
    if (!payload || !payload.d || !payload.d.event) return;
    if (payload.d.event.name === 'purchaseCompleted') {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'custom_event',
            eventName: payload.d.event.name,
            eventProps: JSON.stringify(payload.d.event.props || {})
        });
    }
}]);
```

#### 3. Pre-hook: cancel a sync with `return -1`

```javascript
window.Wingify.push(['addPreHook', function (payload) {
    if (!payload || !payload.d || !payload.d.event) return payload;
    if (payload.d.event.name === 'debugPing') {
        return -1; // numeric -1 cancels this sync; request is not sent
    }
    return payload;
}]);
```

#### 4. Fire a custom event (custom attributes)

```javascript
window.Wingify = window.Wingify || [];
// Event name and attribute keys must match how you configured the custom event in the product.
window.Wingify.event('purchaseCompleted', {
    cartValue: 199.99,
    currency: 'USD'
});
```

### Use Cases

- **Custom Data Capture**: Enhance event payloads by dynamically adding properties such as user segments, session attributes, or experiment metadata. This can improve reporting and analytics accuracy by including business-specific data points.

- **Cross-Platform Integration**: Extend event tracking by forwarding Wingify events to external marketing and analytics platforms such as Google Analytics, Segment, or Mixpanel. This ensures a unified view of user behavior across multiple tools.

### Notes

- **Supported:** **Custom events** sent via `window.Wingify.event(eventName, attributes)` are eligible for hooks and appear in the dashboard as **My Events** / **Unregistered Events**; see [Working with events in Wingify](https://help.wingify.com/hc/en-us/articles/58830916613529-Working-with-Events-in-Wingify).<br />**Custom attributes** passed with `window.Wingify.event(eventName, attributes)` (the `attributes` keys mapped to `payload.d.event.props`) are also hook-eligible, appear as **My Attributes** / **Unregistered Attributes**, and include visitor custom-attribute sync via `window.Wingify.visitor({...})`; see [Working with attributes in Wingify](https://help.wingify.com/hc/en-us/articles/58830858331929-Working-with-Attributes-in-Wingify).

- **Not supported:** **Standard events** are outside this hook surface (for example: **Page visit**, **Click**, **Form submission**).<br />**Standard attributes** are also outside this hook surface; ABM-style identity attributes (for example `identifyVisitor`, commonly `POST .../abm/identify...`) do not run through these generic hooks.<br />Other lifecycle/identity flows also bypass generic hooks in typical setups, such as `setVisitorId`, `setSessionId`, `visitorConfig.destroySession()`, and `listenTo` names like `newSessionCreated`.

- If the payload after all pre-hooks is an empty object (`{}` with no enumerable keys at the top level), the request may still be sent with an **empty body**; avoid returning `{}` unless you intend that behavior.

- If a hook callback **throws**, the runtime catches it, skips applying that hook's return value, and **continues** with the next hook.

<br />
