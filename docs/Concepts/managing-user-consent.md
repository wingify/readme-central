---
title: Managing User Consent
deprecated: false
hidden: true
metadata:
  robots: index
---
# User Consent via Cookie

## Overview

Due to privacy concerns and GDPR requirements, customers often need to obtain explicit consent from their users before tracking their data — especially when a third-party source like Wingify is involved. The recommended approach is to use a **consent cookie** that the customer drops for every user, and to check it before invoking the Wingify Feature Experimentation (FE) SDK for that user.

## Typical Flow

* The customer asks for consent on their website and stores the decision in a cookie (for example, `_abc_consent`).  
* The cookie typically stores two pieces of information: the consent value (`1` for given, `0` for not given) and the timestamp at which the **consent expires**.  
  * Example cookie value: `isConsentGiven=1&ts=1725878400`  
* Before calling the FE SDK flow — which typically starts with initializing the `userContext` — the application checks the consent cookie and validates it:  
  * Read the cookie and check its validity.  
  * Instantiate `UserContext` only if the consent value above is still valid.  
* This ensures, that only if the user has given explicit consent, FE SDK is invoked for them, and their data is stored in Wingify’s servers

### Reading the Cookie and Checking Validity

```javascript
function getVwoUserContext(req, userId) {

&nbsp;

    const cookies \= Object.fromEntries(

&nbsp;

        (req.headers.cookie || '')

&nbsp;

            .split(';')

&nbsp;

            .map(cookie \=\> cookie.trim().split('='))

&nbsp;

    );

&nbsp;

    // Get the consent cookie

&nbsp;

    const consentCookie \= cookies.vwoConsent;

&nbsp;

    // Check if consent given and still valid

&nbsp;

    if (\!consentCookie) {

&nbsp;

        return null;

&nbsp;

    }

&nbsp;

    const consent \= new URLSearchParams(

&nbsp;

        decodeURIComponent(consentCookie)

&nbsp;

    );

&nbsp;

    const isConsentGiven \= consent.get('isConsentGiven');

&nbsp;

    const expiryTimestamp \= Number(consent.get('ts'));

&nbsp;

    const currentTimestamp \= Math.floor(Date.now() / 1000);

&nbsp;

    // Consent not given or consent has expired

&nbsp;

    if (

&nbsp;

        isConsentGiven \!== '1' ||

&nbsp;

        \!expiryTimestamp ||

&nbsp;

        currentTimestamp \> expiryTimestamp

&nbsp;

    ) {

&nbsp;

        return null;

&nbsp;

    }

&nbsp;

    return {

&nbsp;

        id: userId

&nbsp;

    };

&nbsp;

}
```

### Instantiating the User Context

const userContext \= getVwoUserContext(req, userId);

&nbsp;

if (userContext) {

&nbsp;

    const flag \= await vwoClient.getFlag(

&nbsp;

        'feature\_key',

&nbsp;

        userContext

&nbsp;

    );

&nbsp;

}

## Reusing the Wingify Web Testing Consent Cookie

If the customer is already using Wingify's Web Testing product, they can reuse the consent cookie dropped by that tool instead of creating a separate one for FME.

## Consent Cookie Fields

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| `isConsentGiven` | string (`"1"` or `"0"`) | Yes | Whether the user has given consent. Only `"1"` is treated as valid consent. |
| `ts` | number (Unix timestamp, seconds) | Yes | The time at which consent expires (customer can set the offset according to their privacy policy) |

&nbsp;

&nbsp;