---
title: Opt-out
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
## Opt-Out of Tracking

### Overview

The Wingify `opt-out` API allows visitors to stop tracking on a specific browser by default, clearing all cookies except for `_vis_opt_out`. This cookie ensures Wingify recognizes that the visitor should not be tracked. The API also provides an option to retain data for previously experienced campaigns. It can be used directly or to generate opt-out links for integration into the website.

### Signature

```javascript
// Opt-Out with Experiences Maintained: Retains the visitor's previous campaign experience while stopping new tracking.
window.Wingify = window.Wingify || [];
Wingify.push(['optOutVisitor', options]);
```

#### Arguments

| Parameter                     | Type    | Required | Description                                                                                                              |
| ----------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `options`                     | Object  | No       | An optional configuration object.                                                                                        |
| `options.maintainExperiences` | boolean | No       | If `true`, preserves the visitor's previous campaign variations. If `false` (default), removes all campaign experiences. |

### Example

```javascript
// Basic Opt-Out: Immediately stops tracking for the visitor.
window.Wingify = window.Wingify || [];
Wingify.push(['optOutVisitor']);
```

Use this API when you want to opt a visitor out of Wingify tracking and stop all campaign changes. This deletes all Wingify cookies and halts tracking. If the visitor returns, they will not be tracked, and no campaign changes will be applied on subsequent visits.

```javascript
// Opt-Out with Experiences Maintained: Retains the visitor's previous campaign experience while stopping new tracking.
window.Wingify = window.Wingify || [];
Wingify.push(['optOutVisitor', { maintainExperiences: true }]);
```

Use this API when you want to stop new tracking but still show the campaign variation previously seen by the visitor. For example, if a visitor viewed a specific campaign variation, they will continue seeing the same variation after opting out.

### Notes

* If a user opts out by mistake, they can opt back in by deleting the cookie named `_vis_opt_out`.