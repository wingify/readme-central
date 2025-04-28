---
title: Survey set thank you page timeout
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
## Survey set thank you page timeout

### Overview

The `survey.setThankyouTimeout` API allows you to modify the default timeout for the survey's "Thank You" page. By default, the survey popup auto-closes after 5 seconds, but you can set a custom timeout based on your requirements.

### Signature

```javascript
window.VWO.push(['survey.setThankyouTimeout', <time_in_ms>]);
```

#### Callback Data

**Type**: `Object` containing below information

| Parameter  | Data Type | Required | Description                                                                                         |
| ---------- | --------- | -------- | --------------------------------------------------------------------------------------------------- |
| time_in_ms | number    | Yes      | Time in milliseconds for how long the thank you page stays open (e.g., for 10 seconds, pass 10000). |

### Example

```javascript
// Example: Set thank you page timeout to 10 seconds
window.VWO = window.VWO || [];
window.VWO.push(['survey.setThankyouTimeout', 10000]);
```

### Use-cases

- **Customer Engagement**: Extend the time the thank you page remains open to allow customers more time to engage with follow-up content, such as special offers or additional information.
- **Content Consumption**: Give visitors more time to read and interact with the thank-you message without feeling rushed.

### Notes

- **APP-CONFIG**: Configurable globally for all surveys.
- **CAMP-CONF**: Can be set at the campaign level, affecting only the specific survey campaign.
- **Default Timeout**: The default timeout is 5 seconds, but it can be customized using this API.