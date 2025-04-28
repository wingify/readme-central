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

The `addPreHook` and `addPostHook` APIs allow you to register callback functions that execute before and after a VWO event occurs, respectively. Together, these hooks enable complete control over event lifecycles, allowing developers to modify event payloads before transmission and respond to events after they occur.  

- **Pre-hook (`addPreHook`)**: Executes before an event request is made, offering an opportunity to modify, add, or remove event properties. This is particularly useful for customizing event payloads for accurate reporting.  

- **Post-hook (`addPostHook`)**: Executes after an event occurs, enabling actions like syncing events with third-party platforms, triggering additional workflows, or performing analytics operations. Post-hooks ensure seamless integration with external systems and provide a unified view of visitor interactions.  

By combining pre- and post-hooks, developers can ensure enriched event tracking while maintaining flexibility for cross-platform integrations.  

### API Signature

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['addPreHook', <callback_function>]);

window.VWO.push(['addPostHook', <callback_function>]);
```

### Parameters

| Parameter           | Type     | Required | Description                               |
| ------------------- | -------- | -------- | ----------------------------------------- |
| `callback_function` | Function | Yes      | Function to execute on the event trigger. |

### Callback Data

| Parameter | Type              | Description                                  |
| --------- | ----------------- | -------------------------------------------- |
| `event`   | String            | Name of the triggered event.                 |
| `props`   | Object (optional) | Custom properties associated with the event. |

### Examples

#### 1. Pre-hook: Modify Event Payload

```javascript
window.VWO.push(['addPreHook', function(vwoEventPayload) {
    vwoEventPayload.newProp = 'newValue'; // Add custom properties
    delete vwoEventPayload.existingProp; // Remove unnecessary properties
    vwoEventPayload.existingProp2 = 'maskedValue'; // Modify properties as needed
    return vwoEventPayload;
}]);
```

#### 2. Post-hook: Sync VWO Events with GA4

```javascript
window.VWO.push(['addPostHook', function(vwoEventPayload) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'vwoEvent',
        data: JSON.stringify(vwoEventPayload)
    });
}]);
```

### Use Cases

- **Custom Data Capture**: Enhance event payloads by dynamically adding properties such as user segments, session attributes, or experiment metadata. This can improve reporting and analytics accuracy by including business-specific data points.  

- **Cross-Platform Integration**: Extend event tracking by forwarding VWO events to external marketing and analytics platforms such as Google Analytics, Segment, or Mixpanel. This ensures a unified view of user behavior across multiple tools.