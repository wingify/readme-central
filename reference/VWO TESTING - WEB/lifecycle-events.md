---
title: Lifecycle Events
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
## Lifecycle Events

### Overview

The `onEventReceive` API enables listening to key VWO lifecycle events and executing custom actions when these events occur. This is useful for tracking conversions, handling variations, managing redirections, and optimizing user experience dynamically.

### API Signature

```javascript
window.VWO = window.VWO || [];
VWO.push(['onEventReceive', <event_name>, <callback_function>]);
```

### Parameters

| Parameter           | Type       | Required | Description                                                     |
| ------------------- | ---------- | -------- | --------------------------------------------------------------- |
| `event_name`        | `string`   | Yes      | The event to listen for (e.g., `'vA'` for "Variation Applied"). |
| `callback_function` | `Function` | Yes      | Function executed when the event is triggered.                  |

### Callback Data

**Type:** `Array` - `[<eventName>, <experimentId>, <goalId>]`

| Element        | Type     | Description                                        |
| -------------- | -------- | -------------------------------------------------- |
| `eventName`    | `string` | Name of the triggered VWO event.                   |
| `experimentId` | `string` | ID of the experiment the visitor is bucketed into. |
| `goalId`       | `string` | ID of the campaign goal that gets triggered.       |

### VWO Lifecycle Events and Use Cases

| Event Name                                       | Description                                                 | Use Cases                                                                           |
| ------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `vA` (Variation Applied)                         | Fired when a variation is successfully applied.             | Ensure visual changes are applied, trigger UI updates.                              |
| `vAE` (Variation Application Error)              | Fired when errors occur when variation changes are applied. | Track errors for rectifying custom variation changes and fallback execution if any. |
| `rC` (Goal Conversion)                           | Fired when a visitor triggers a goal.                       | Send conversion data to analytics, log server-side events.                          |
| `uC` (URL Change)                                | Fired when a tracked URL change occurs.                     | Update tracking parameters, adjust single-page app (SPA) URLs dynamically.          |
| `uAV` (Unhide All Variations)                    | Fired when all hidden variations are revealed.              | Ensure variation visibility for debugging or custom logic.                          |
| `hC` (Post URL Change)                           | Fired after a URL change is detected.                       | Execute post-navigation actions like analytics tracking.                            |
| `bRTR` (Before Redirect to URL Unhide Variation) | Fired before a redirect where a variation is unhidden.      | Handle pre-redirect processing or adjustments.                                      |
| `rD` (Redirect Decision)                         | Fired when a redirect decision is made.                     | Log or modify redirect behavior based on campaign logic.                            |
| `nR` (Not Redirecting)                           | Fired when a redirection does not happen.                   | Track cases where expected redirection is skipped.                                  |
| `hCl` (Heatmap Click)                            | Fired when a visitor clicks on a heatmap-tracked element.   | Analyze user behavior, trigger session recording.                                   |
| `tSC` (Track Session Created)                    | Fired when a new session is tracked.                        | Log session creation, initialize session-based tracking.                            |
| `nS` (New Session)                               | Fired when a visitor starts a new session.                  | Personalize experience based on session status.                                     |
| `sE` (Segmentation Evaluated)                    | Fired when segmentation conditions are evaluated.           | Modify experience dynamically based on user segments.                               |
| `tNR` (Test Not Running)                         | Fired when a test is determined to be inactive.             | Ensure fallback behavior when experiments are off.                                  |
| `hE` (Hide Elements)                             | Fired when elements are hidden.                             | Track hidden elements and adjust UI dynamically.                                    |

### Examples

#### Example 1: Handle URL Changes in an SPA

```javascript
window.VWO.push(['onEventReceive', 'uC', function () {
    window._vis_opt_url = ''; // Reset custom URL
}]);
```

#### Example 2: Track Goal Conversions

```javascript
window.VWO.push(['onEventReceive', 'rC', function (data) {
    const [eventName, experimentId, goalId] = data;
    console.log(`Goal ${goalId} triggered in Experiment ${experimentId}`);
}]);
```

#### Example 3: Preemptive Variation Bucketing

```javascript
window.VWO.push(['onEventReceive', 'cC', function (data) {
    const [eventName, experimentId] = data;
    console.log(`User bucketed in Experiment ${experimentId} before applying changes.`);
}]);
```

#### Example 4: Ensure Variation is Applied

```javascript
window.VWO.push(['onEventReceive', 'vA', function (data) {
    const [eventName, experimentId] = data;
    console.log(`Variation applied for Experiment ${experimentId}`);
}]);
```

#### Example 5: Track errors when variation changes are applied

```javascript
window.VWO.push(['onEventReceive', 'vAE', function (data) {
    const [eventName, experimentId, variationId, error] = data;
    console.log(`${error.toString()} occured in ${variationId} variation of campaign id ${experimentId}`);
}]);
```

```javascript
window.VWO.push(['onEventReceive', 'vA', function (data) {
    const [eventName, experimentId] = data;
    console.log(`Variation applied for Experiment ${experimentId}`);
}]);
```

#### Example 5: Track errors when variation changes are applied

```javascript
window.VWO.push(['onEventReceive', 'vAE', function (data) {
    const [eventName, experimentId, variationId, error] = data;
    console.log(`${error.toString()} occured in ${variationId} variation of campaign id ${experimentId}`);
}]);
```