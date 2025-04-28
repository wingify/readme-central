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
window.VWO.push(['onVariationApplied',
    <callback_function>                   // Callback function to be called when any campaign runs on the page.
]);
```

#### Arguments

| Parameter          | Data Type  | Required | Description                                          |
| ------------------ | ---------- | -------- | ---------------------------------------------------- |
| callback\_function | `Function` | Yes      | The callback function executes when a campaign runs. |

### Callback Data

The callback function receives an array with the following structure:

**Type**: `Array` - `['vS', <exp_id>, <variation_id>]`

| Index | Element           | Data Type | Description                                                                                                                                               |
| ----- | ----------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | **CallbackName**  | `string`  | A constant string identifier representing the callback type, always `'vS'`.                                                                               |
| 1     | **Experiment ID** | `string`  | A unique string representing the experiment ID (`<exp_id>`). This ID is used to track the specific experiment in which the variation was applied.         |
| 2     | **Variation ID**  | `string`  | A unique string representing the variation ID (`<variation_id>`). This ID is used to identify which variation of the experiment was shown to the visitor. |

This array structure ensures that the callback function can easily access the specific details of the campaign applied to the visitor.

### Sample Data

```javascript
[
    'vS',    // Callback name
    12,      // Experiment ID
    2        // Variation ID
]
```

### Basic Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onVariationApplied', function (data) {
    if (!data) { // data will be an array, [<callback_name>, <exp_id>, <variation_id>]
        return;
    }
    var expId = data[1],                 // Index 1 of data contains experiment ID
        variationId = data[2];           // Index 2 of data contains variation ID
    if (typeof(_vwo_exp[expId].comb_n[variationId]) !== 'undefined') {
        // This is an example for pushing data into GA4.
        window.dataLayer.push({
            "CampaignId": expId,
            "CampaignName": _vwo_exp[expId].name,
            "VariationId": variationId,
            "VariationName": _vwo_exp[expId].comb_n[variationId]
        });
        window.dataLayer.push({event: 'VWO-data-push'});
    }
}]);
```

### Use-case

* **Analytics Integration**: Automatically push variation data to Google Tag Manager or other analytics platforms to track which variations visitors are exposed to and how they affect their behavior.
* **CRM Integration**: Sync variation data with CRM systems to tailor follow-up communications based on the variations visitors have seen, enhancing the personalization of marketing efforts.
* **Feature Flag Management**: Use the variation data to toggle features on or off in your application based on the variation a visitor is bucketed into.
