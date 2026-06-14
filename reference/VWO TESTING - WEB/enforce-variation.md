---
title: Enforce variation
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
## Enforce variation

### Overview

The `setVariation` API allows you to enforce a specific variation for campaigns based on custom business logic.

### Signature

```javascript
window.VWO.push(['setVariation', [{e: '<campaignId>', v: '<variationId>'}]]);
```

#### Arguments

| Parameter | Data Type | Required | Description                    |
| --------- | --------- | -------- | ------------------------------ |
| e         | string    | Yes      | The Experiment or Campaign ID. |
| v         | string    | Yes      | The Variation ID.              |

### Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['setVariation', [{e: '8', v: '2'}]]);
// This example forces Variation 2 in Campaign ID 8
```

### Use-cases

* **Controlled Testing**: Force a specific variation to test or debug campaigns.
* **A/B Test Consistency**: Enforce same variation for the same visitor across all devices like for the same logged in user.

### Note

* Ensure that this is implemented before SmartCode
* This will only function in live mode and will not function in preview mode.
* This will not track visitors or conversions for disabled campaigns.
