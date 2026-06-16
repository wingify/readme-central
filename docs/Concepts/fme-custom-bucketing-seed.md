---
title: Custom Bucketing Seed
deprecated: false
hidden: true
metadata:
  robots: index
---
## **Overview**

By default, Wingify assigns variations based on each user's unique ID — meaning different users may see different variations. **Custom Bucketing Seed** lets you override this by passing a shared `bucketingSeed` string, so that all users with the same seed are guaranteed to see the **same variation**.

This is useful whenever you need a group of users to share a consistent experience, rather than being individually randomized.

## **How It Works**

When you provide a `bucketingSeed` in the user context, the SDK uses it **instead of the user ID** as the input to the MurmurHash function that determines:

1. Whether the user is within the campaign's traffic percentage (traffic gate)
2. Which variation the user is assigned to

**Hashing Logic:**

* `bucketingId` = `bucketingSeed` (if provided and non-empty) OR `userId` (fallback)
* `bucketKey` = `campaignId` + "_" + `bucketingId` (standard)
* `bucketKey` = `salt` + "_" + `bucketingId` (if campaign has a salt)
* `bucketKey` = `groupId` + "_" + `bucketingId` (if campaign is in a MEG group)
* `bucketValue` = MurmurHash(`bucketKey`) → 0–10000

**Note:**  
`bucketingSeed` is an override, not a replacement for `id`. The `id` field is always required and is used for UUID generation (`_vwo_uuid`), storage lookups, and log messages.

### **Behavior Rules**

1. **Same seed → same variation:** Two users with different IDs but the same `bucketingSeed` always get the same variation.
2. **Different seeds → may differ:** The same user with different seeds may receive different variations, since the hash input changes.
3. **No seed → falls back to user ID:** If `bucketingSeed` is not provided (or is invalid), the user's `id` is used for bucketing as usual.
4. **Forced variations (whitelisting) take priority:** If a user is whitelisted to a specific variation, they always receive that variation. `bucketingSeed` has no effect on whitelisted users. This ensures that QA and internal testing overrides are never broken by a seed.
5. **Works with aliasing:** When aliasing is enabled, the Gateway service resolves the real user ID first. If a `bucketingSeed` is also provided, the seed overrides the resolved ID for bucketing. This means two aliased users that resolve to different real IDs will still get the same variation if they share the same seed.
6. **Interaction with campaign salt:** Salt is a server-side property on campaigns. It modifies the campaign-side of the hash key:

| Configuration          | Hash Key Format                |
| :--------------------- | :----------------------------- |
| **No salt, no seed**   | `{campaignId}_{userId}`        |
| **Salt, no seed**      | `{salt}_{userId}`              |
| **No salt, with seed** | `{campaignId}_{bucketingSeed}` |
| **Salt + seed**        | `{salt}_{bucketingSeed}`       |

**Note:** The salt is managed by the Wingify platform — it is not something you set in the SDK context. Your `bucketingSeed` always replaces the `bucketingId` portion of the key, regardless of whether a salt is present.

## **Usage Examples**

### **1. Standard bucketing — no seed**

Different users are bucketed independently based on their own id.

```javascript
import { init } from 'vwo-fme-node-sdk';

const vwoClient = await init({ accountId: 'YOUR_ACCOUNT_ID', sdkKey: 'YOUR_SDK_KEY' });

const user1Flag = await vwoClient.getFlag('feature_key', { id: 'user_001' });
const user2Flag = await vwoClient.getFlag('feature_key', { id: 'user_002' });

// user_001 and user_002 may receive different variations
console.log(user1Flag.getVariables()); // e.g. { color: 'blue' }
console.log(user2Flag.getVariables()); // e.g. { color: 'red' }


```

### **2. Same seed → same variation for different users**

Two different users with the same `bucketingSeed` will always receive the same variation. **Use case:** household/device bucketing, shared sessions, A/B tests grouped by account rather than individual user.

```javascript
const SHARED_SEED = 'household-abc-123';

const user1Flag = await vwoClient.getFlag('feature_key', {
  id: 'user_001',
  bucketingSeed: SHARED_SEED,
});
const user2Flag = await vwoClient.getFlag('feature_key', {
  id: 'user_002',
  bucketingSeed: SHARED_SEED,
});
// Both users get the same variation because the seed is identical
console.log(user1Flag.getVariables()); // { color: 'blue' }
console.log(user2Flag.getVariables()); // { color: 'blue' }  ← same 
```

### **3. Different seeds → different variations for the same user**

The same user ID, given two different seeds, may bucket into different variations

```javascript
const flagA = await vwoClient.getFlag('feature_key', {
  id: 'user_001',
  bucketingSeed: 'seed-variant-A',
});

const flagB = await vwoClient.getFlag('feature_key', {
  id: 'user_001',
  bucketingSeed: 'seed-variant-B',
});

// The same user may land in different variations based on the seed
console.log(flagA.getVariables()); // e.g. { color: 'blue' }
console.log(flagB.getVariables()); // e.g. { color: 'red' }
```

**4. Forced variation overrides seed**

```javascript
// If 'user-vip' is whitelisted, the seed has no effect
const flag = await vwoClient.getFlag('checkout-redesign', {
  id: 'user-vip',
  bucketingSeed: 'org-acme',
});
// Returns the whitelisted variation, not the seed-based one
```

## **Points that you must know:**

1. ### **Seed does not affect pre-segmentation or whitelisting**  
   `bucketingSeed` only controls the **traffic gate** (is the user in the campaign?) and **variation assignment** (which variation do they get?). It does **not** affect pre-segmentation rules (evaluated using `customVariables`) or whitelisting / forced variations (evaluated using `variationTargetingVariables`). A user can still be excluded from a campaign by failing segment rules, even if a `bucketingSeed` is provided.
2. ### **Changing the seed for a returning user breaks consistency**  
   If a user was previously bucketed with seed `A` and their result was stored, a subsequent call with seed `B` will not match the stored result. If you are using a persistent storage layer, ensure the `bucketingSeed` is consistent for the same logical entity across all calls. Treat the seed as part of the user's stable identity.
3. ### **bucketingSeed Validation & Fallback**  
   `bucketingSeed` must be a non-empty, non-whitespace string. Invalid values are silently discarded with a warning log, and bucketing falls back to the user ID
