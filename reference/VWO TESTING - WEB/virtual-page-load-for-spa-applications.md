---
title: Trigger virtual page load
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
### Overview

The `activate` API triggers virtual page loads in SPAs, re-running campaigns based on page-matching criteria and other checks without actual navigation. It is useful for dynamic navigation scenarios like tab switches, multi-step checkouts, and component state updates.

### Signature

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['activate', {
    virtualPageUrl: <NEW_VIRTUAL_PAGE_URL>
}]);
```

### Arguments

| Parameter        | Type   | Required | Description                                                               |
| ---------------- | ------ | -------- | ------------------------------------------------------------------------- |
| `virtualPageUrl` | String | Yes      | URL of the virtual page, treated as a new page load to trigger campaigns. |

### Examples

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['activate', {
    virtualPageUrl: '/new-page'
}]);
```

### Use-cases

- **SPAs Without URL Changes**: Trigger virtual pages in SPAs where navigation doesn’t update the URL to rerun campaigns.  
  _Example_: Track tab switches in a dashboard app (e.g., "Analytics" to "Settings").  

- **Checkout Flow Testing**: Activate campaigns for multi-step checkout processes without reloading or URL updates.  
  _Example_: Test button placements or form designs across steps like "Address" and "Payment."  

- **Dynamic Content Updates**: Keep experiments running on pages with frequently added content like feeds.  
  _Example_: Apply experiments to newly loaded articles on a news homepage.

- **Page State Experiments**: Test variations for different web app states like onboarding or gameplay like SPA's component data.  
  _Example_: Experiment with progress indicators during an onboarding tutorial.