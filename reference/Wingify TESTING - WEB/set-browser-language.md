---
title: Set Browser Language
deprecated: false
hidden: false
metadata:
  robots: index
---
## Set Browser Language

### Overview

The `setBrowserLanguage` API allows you to manually set the browser language for a visitor. This value is stored in localStorage. By setting the browser language explicitly, you can set it programmatically based on your application logic to be used by the survey for fetching questions based on the language set.

### Signature

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['setBrowserLanguage', language]);
```

#### Arguments

| Parameter | Data Type | Required | Description                                                                                                      |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| language  | string    | Yes      | The language code to set (see Supported languages under Usage Notes). This value will be stored in localStorage. |

### Example

```javascript
window.VWO = window.VWO || [];
// Set browser language to English
window.VWO.push(['setBrowserLanguage', 'en']);

// Set browser language to Spanish
window.VWO.push(['setBrowserLanguage', 'es']);

// Set browser language to French
window.VWO.push(['setBrowserLanguage', 'fr']);
```

### Use-cases

* This will be used in surveys to show the question in the set browser language.

### Notes

* Add this API before SmartCode so the language preference is available from the initial survey execution on page load.
* The language value is stored in localStorage with the key `vwo_bL`.
* The value persists across browser sessions until explicitly changed or cleared.
* Use a supported language code from the table below.
* If no custom language is set, Wingify falls back to the default browser language value available in settings.
* This API is intended for Survey language resolution.

#### Supported languages

| Language            | Code      |
| ------------------- | --------- |
| Arabic              | `ar`      |
| Bengali             | `bn`      |
| Chinese Simplified  | `zh-Hans` |
| Chinese Traditional | `zh-Hant` |
| Danish              | `da`      |
| Dutch               | `nl`      |
| English             | `en`      |
| Finnish             | `fi`      |
| French              | `fr`      |
| German              | `de`      |
| Greek               | `gr`      |
| Gujarati            | `gu`      |
| Hebrew              | `he`      |
| Hindi               | `hi`      |
| Hungarian           | `hu`      |
| Indonesian          | `id`      |
| Japanese            | `ja`      |
| Kannada             | `kn`      |
| Korean              | `ko`      |
| Malayalam           | `ml`      |
| Marathi             | `mr`      |
| Norwegian           | `no`      |
| Portuguese (Brazil) | `pt-BR`   |
| Russian             | `ru`      |
| Spanish             | `es`      |
| Swedish             | `sv`      |
| Tamil               | `ta`      |
| Telugu              | `te`      |
| Turkish             | `tr`      |
