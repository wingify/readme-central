---
title: Set Browser Language
deprecated: false
hidden: false
metadata:
  robots: index
---
### Overview

The `setBrowserLanguage` API allows you to manually set the browser language for a visitor. This value is stored in localStorage. By setting the browser language explicitly, you can set it programmatically based on your application logic to be used by survey for fetching questions based upon the language set.

### Signature

```javascript
window.VWO.push(['setBrowserLanguage', language]);
```

#### Arguments

| Parameter | Data Type | Required | Description                                                                                               |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| language  | string    | Yes      | The language code to set (e.g., 'en', 'es', 'fr', 'de', etc.). This value will be stored in localStorage. |

### Example

```javascript
window.VWO = window.VWO || [];
// Set browser language to English
window.VWO.push(['setBrowserLanguage', 'en']);

// Set browser language to Spanish
window.VWO.push(['setBrowserLanguage', 'es']);

// Set browser language to French
window.VWO.push(['setBrowserLanguage', 'fr']);

// Set browser language based on user selection
const userSelectedLanguage = getUserLanguagePreference();
window.VWO.push(['setBrowserLanguage', userSelectedLanguage]);
```

### Use-cases

* This will be used in surveys to show the question in the set browser language.

### Usage Notes

* The language value is stored in localStorage with the key `vwo_bL`.
* The value persists across browser sessions until explicitly changed or cleared.
* Use standard language codes (e.g., 'en', 'es', 'fr', 'de', 'ja', 'zh', etc.) for consistency.
