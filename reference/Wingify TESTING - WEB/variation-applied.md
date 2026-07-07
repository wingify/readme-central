---
title: Variation Applied
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
## Variation Applied

### Overview

The `onVariationApplied` callback is triggered when a campaign is applied to the page. This callback provides access to the experiment and variation details, allowing for custom functionality based on the variation a visitor is exposed to. Always check if the data parameter exists before accessing its properties.

### Signature

```javascript
window.Wingify = window.Wingify || [];
window.Wingify.push(['onVariationApplied', function (data) {
    // Callback logic here
}]);
```

#### Arguments

| Parameter          | Data Type  | Required | Description                                          |
| ------------------ | ---------- | -------- | ---------------------------------------------------- |
| callback\_function | `Function` | Yes      | The callback function executes when a campaign runs. |

### Callback Data

The callback function receives an object with the following structure:

**Type**:

| Property | Type | Description |
| -------- | ---- | ----------- |
| `visId` | `string` | Visitor identity |
| `campType` | `string` | Campaign type, e.g. `VISUAL_AB`, `VISUAL`, `SPLIT_URL` |
| `campId` | `string` | Campaign identity |
| `campName` | `string` | Campaign name |
| `varId` | `string` | Campaign's variation identity that was shown to the visitor |
| `varName` | `string` | Campaign's variation name that was shown to the visitor |
| `targetId` | `string` | Campaign's target identity whose variation was shown to the visitor. This is applicable for Peronsalize product only! |
| `targetName` | `string` | Campaign's target name whose variation was shown to the visitor. This is applicable for Peronsalize product only! |

This array structure ensures that the callback function can easily access the specific details of the campaign applied to the visitor.

### Example

```javascript
window.Wingify = window.Wingify || [];
window.Wingify.push(['onVariationApplied', function (data) {
    if (!data || !data.campId) return;

    var visitorIdentity = data.visId;
    var campaignType = data.campType;
    var campaignIdentity = data.campId;
    var campaignName = data.campName;
    var variationIdentity = data.varId;
    var variationName = data.varName;
    var targetIdentity = data.targetId;   // null unless Personalize holdback
    var targetName = data.targetName;   // null unless Personalize holdback

    console.log({
        visitorIdentity,
        campaignType,
        campaignIdentity,
        campaignName,
        variationIdentity,
        variationName,
        targetIdentity,
        targetName
    });
}]);
```

### Use cases

- **Analytics Integration**: Automatically push variation data to Google Tag Manager or other analytics platforms to track which variations visitors are exposed to and it affects their behavior.
- **CRM Integration**: Sync variation data with CRM systems to tailor follow-up communications based on the variations visitors have seen, enhancing the personalization of marketing efforts.
- **Feature Flag Management**: Use the variation data to toggle features on or off in your application based on the variation a visitor is bucketed into.

### Notes

- If the listener is registered after the variation applied event is fired, previously queued events are replayed to the callback.
- When consent gating is enabled on the account, the callback may be deferred until consent is granted.