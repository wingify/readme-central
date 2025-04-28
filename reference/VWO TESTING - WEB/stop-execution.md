---
title: Stop execution/session
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
## Stop execution/session

### Overview

The `destroy` function completely stops and removes VWO's operation on a page. It halts all timers, removes all callback listeners, and cleans up objects created by VWO. This action is irreversible, meaning VWO cannot be re-enabled on the same page without a refresh. This is applicable for VWO test campaigns!

The `destroySession` API clears all session data for the visitor, including cookies, UUID, and local storage, fully resetting the session. It's an asynchronous operation that can be awaited based on the given use cases.

**Note**: This will be applicable for Insights too soon.

### Stop library execution

#### Signature

```javascript
window.VWO.push(['destroy']);
```

#### Arguments

| Parameter | Data Type | Required | Description                                   |
| --------- | --------- | -------- | --------------------------------------------- |
| None      | N/A       | No       | This function does not accept any parameters. |

#### Example

```javascript
// Destroy the VWO instance, stop all timers, and remove callback listeners
window.VWO = window.VWO || [];
window.VWO.push(['destroy']);
```

#### Use-cases

- **Single-Page Application (SPA) Navigation**: Completely stop VWO's operations when navigating to a different section of an SPA where VWO is not needed.
- **Performance Optimization**: Free up memory and prevent unnecessary processing by destroying VWO when it's no longer required on the page.
- **Testing and Debugging**: Use `destroy` to reset the VWO environment during development without refreshing the page.

### Destory visitor session

#### Signature

```javascript
window.VWO.visitorConfig.destroySession();
```

#### Arguments

| Parameter | Data Type | Required | Description                              |
| --------- | --------- | -------- | ---------------------------------------- |
| None      | N/A       | No       | This API does not accept any parameters. |

#### Example

```javascript
window.VWO.push(['onVWOCampaignsLoaded', () => {
    window.VWO.visitorConfig.destroySession();
}, { count: 1 }]);
```

#### Use-cases

- **Post-Purchase Session Reset**: Clear visitor session data after completing a purchase and redirect to a thank-you page. This ensures future visits are treated as fresh sessions.
- **Multi-Step Form Completion**: Reset session data after the visitor completes a multi-step form or registration process to maintain data hygiene.
- **Visitor Logout**: Clear VWO-specific data when a visitor logs out of your application to ensure a clean slate for the next login.

### Notes

- Invoke `destroySession` API only after the VWO library has finished processing. Use the `onVWOCampaignsLoaded` callback to ensure all dependencies are ready before destroying the session. Set the `count` configuration to execute the callback only once, avoiding repeated triggers during SPA navigation.