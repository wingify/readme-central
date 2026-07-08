---
title: Using Web Testing Visitor UUID as userId in FE
excerpt: >-
  Use the Web Testing _vwo_uuid cookie as the Feature Experimentation
  userContext.id to align visitor identity across Wingify products.
deprecated: false
hidden: true
metadata:
  robots: index
---
Use the Wingify Web Testing visitor UUID as the Feature Experimentation `userContext.id` so both products identify the same browser visitor consistently.

Wingify Web Testing and Feature Experimentation (FE) are separate products that can coexist on the same page. When both run together, they identify users independently: Web Testing uses the `_vwo_uuid` browser cookie, while FE uses the `id` value passed in `userContext`.

By default, these identifiers are different. To align them, read the Web Testing UUID from the browser cookie and pass it as the FE `userContext.id`.

<Callout icon="fa-circle-info" theme="info">
  Matching the UUID across products does not guarantee the same experience. Web Testing and FE render experiences according to their own campaign, flag, and rule configurations.
</Callout>

## Prerequisites

Before you start, confirm the following:

1. Install Wingify SmartCode on your website so Web Testing can generate the `_vwo_uuid` cookie.
2. Use a browser-based flow where cookies are available.
3. Configure a fallback user ID for cases where `_vwo_uuid` is not available yet.

<Callout icon="fa-triangle-exclamation" theme="warning">
  This flow depends on browser cookies. It is best suited for client-side SDKs, such as JavaScript and React, and server-side SDKs, such as Node, Java, and Python, when they are used alongside the Web Testing product. It does not apply to mobile SDKs.
</Callout>

## How Web Testing identifies visitors

Wingify Web Testing automatically sets a first-party cookie named `_vwo_uuid` in the visitor's browser after the Wingify SmartCode loads.

| Cookie detail | Value |
| --- | --- |
| Name | `_vwo_uuid` |
| Format | A 33-character string: a prefix letter (`D` for desktop/browser or `J` for JavaScript environments) followed by 32 hexadecimal characters. Example: `D3F2504E04F8911D39A0C0305E82C330` |
| Scope | Set on your domain as a first-party cookie |

This UUID is the primary visitor identifier that Web Testing uses for bucketing, analytics, and reporting.

<Callout icon="fa-circle-info" theme="info">
  The `_vwo_uuid` cookie is generated only after Wingify SmartCode is installed on the website and a visitor loads the page for the first time.
</Callout>

## How FE handles `userContext.id`

When you call `getFlag()`, you pass a `userContext` object that contains an `id` value. FE normally converts this user ID into an internal UUID using UUIDv5 hashing. The hash is derived from the user ID and your account ID namespace.

This protects user privacy and ensures Wingify servers do not store personally identifiable information (PII), even accidentally.

```text
userId string → UUIDv5 hash(userId + accountId namespace) → internal UUID
```

FE uses this internal UUID for bucketing, feature rollouts, and reporting.

## Web Testing UUID passthrough

FE SDKs include a special detection mechanism for Web Testing UUIDs. If the `userContext.id` value matches the Web Testing UUID format, the SDK skips the hashing step and uses the provided value directly as the internal UUID.

The value must match this format:

```text
D or J + exactly 32 hexadecimal characters
```

For example:

```text
D3F2504E04F8911D39A0C0305E82C330
```

This passthrough behavior is what aligns identity across Web Testing and FE.

## Step 1: Read the Web Testing UUID from the cookie

Read the `_vwo_uuid` cookie from client-side JavaScript running on the same domain.

```javascript
function getWingifyUuid() {
  const match = document.cookie.match(/(?:^|;\s*)_vwo_uuid=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

const wingifyUuid = getWingifyUuid();

console.log(wingifyUuid);
// Example: "D3F2504E04F8911D39A0C0305E82C330"
```

<Callout icon="fa-circle-info" theme="info">
  If the visitor has not yet been tracked by Web Testing, such as on their first page load, this function returns `null`. Always provide a fallback user ID.
</Callout>

## Step 2: Pass the UUID as `userContext.id`

Pass the Web Testing UUID as the FE `userContext.id`. If the cookie is missing, use your fallback user ID.

```javascript
import { init } from 'wingify-fme-node-sdk';

async function run() {
  const wingifyClient = await init({
    sdkKey: 'YOUR_SDK_KEY',
    accountId: 'YOUR_ACCOUNT_ID',
  });

  const wingifyUuid = getWingifyUuid();

  const userContext = {
    id: wingifyUuid || 'fallback_user_id',
  };

  const flag = await wingifyClient.getFlag('your_feature_key', userContext);

  if (flag.isEnabled()) {
    // Serve the feature.
  }
}

run().catch((error) => {
  console.error('Failed to evaluate feature flag:', error);
});
```

Because the value of `id` matches the Web Testing UUID format, FE uses it as-is without hashing. The same UUID that Web Testing uses for this visitor becomes the identifier in FE.

## Complete example

Use this helper to evaluate a feature flag and track whether the request used the Web Testing UUID or the fallback user ID.

```javascript title="wingify-helper.js"
function getWingifyUuid() {
  const match = document.cookie.match(/(?:^|;\s*)_vwo_uuid=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function evaluateFeatureFlag(wingifyClient, featureKey, fallbackUserId) {
  const wingifyUuid = getWingifyUuid();
  const userId = wingifyUuid || fallbackUserId;

  const userContext = { id: userId };
  const flag = await wingifyClient.getFlag(featureKey, userContext);

  return {
    isEnabled: flag.isEnabled(),
    variables: flag.getVariables(),
    userId,
    usingWebUuid: Boolean(wingifyUuid),
  };
}
```

Example response:

```json
{
  "isEnabled": true,
  "variables": {
    "buttonColor": "blue"
  },
  "userId": "D3F2504E04F8911D39A0C0305E82C330",
  "usingWebUuid": true
}
```

## How the flow fits together

1. Wingify SmartCode loads on your website.
2. Web Testing creates the `_vwo_uuid` cookie for the browser visitor.
3. Your application reads `_vwo_uuid` from `document.cookie`.
4. Your application passes that value as `userContext.id` to the FE SDK.
5. The FE SDK detects the Web Testing UUID format and skips UUIDv5 hashing.
6. FE uses the same UUID for bucketing, rollouts, and reporting.

## Important considerations

<Callout icon="fa-circle-info" theme="info">
  <strong>Cookie availability:</strong> The `_vwo_uuid` cookie is only set after Wingify SmartCode has run on the page. For brand-new visitors on their first page view, the cookie may not exist yet. Always provide a fallback user ID.
</Callout>

<Callout icon="fa-triangle-exclamation" theme="warning">
  Do not modify the raw cookie value before passing it to FE. Trimming, lowercasing, encoding, or otherwise changing the value can cause validation to fail. If validation fails, the SDK hashes the value instead of using it as-is.
</Callout>

## Troubleshooting

| Issue | What to check |
| --- | --- |
| `getWingifyUuid()` returns `null` | Confirm Wingify SmartCode is installed and has loaded before your FE evaluation runs. Also confirm the visitor has loaded the site at least once after SmartCode was installed. |
| FE appears to use a different identifier | Confirm you are passing the raw `_vwo_uuid` value as `userContext.id` without changing its case or format. |
| The visitor sees different experiences in Web Testing and FE | Confirm the Web Testing campaign and FE flag configurations. Matching identity does not force both products to serve the same experience. |
| The flow does not work in a mobile SDK | This approach depends on browser cookies and is not supported for mobile SDK flows. |
