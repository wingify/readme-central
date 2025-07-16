---
title: Salting
excerpt: Bucketing users into the same variation across multiple rules
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

**Salting** refers to the process of incorporating a specific deterministic seed value into the user bucketing algorithm. This salt serves as an additional input to the hash function, which assigns users to variations within an experiment or feature flag rule. By modifying the salt value, we influence the resulting hash and, consequently, the variation assignment for a given user.

When the same salt is used across multiple rules or experiments, the hash function produces consistent output for a given user identifier. This ensures that the user is assigned to the **same variation** across all rules that share the same salt, a crucial behaviour when uniform variation assignment is required across different parts of an application.

Conversely, when different salts are used, the hash outputs will differ, resulting in potentially different variation assignments for the same user across different rules. This is useful when variation assignments should be independent across experiments or features.

By default, the system generates **unique salts** for each rule, promoting random and independent variation assignment. However, if your use case demands consistency, such as when multiple rules represent different stages of the same experiment or must maintain a coherent experience across modules, you should configure the system to use a shared salt across those rules.

<br />

## Bucketing Seed Calculation and the Role of Salt

By default, the bucketing seed used to assign a user to a variation is derived using the following format:

```
seed = ruleCampaignId_userId
```

This means the seed is composed of the unique identifier for the rule (referred to as `ruleCampaignId`) concatenated with the user’s unique identifier (`userId`). For example, if the rule has an ID of `3` and the user ID is `abc123`, the resulting seed would be:

```
3_abc123
```

If the same user is evaluated against another rule with a different ID, say, 5, the seed becomes:

```
5_abc123
```

Since the seeds are different across these two rules (`3_abc123` vs `5_abc123`), the hash outputs used for bucketing will also differ. As a result, the user could be assigned to **different variations** in each rule—for instance, `variation 1` in rule `3` and `variation 2` in rule `5`. This behavior is intentional and aligns with the typical use case where users are expected to encounter **distinct experiences** across different experiments or feature rollouts.

<br />

## Overriding the Default: Using a Custom Salt

However, if a **salt value** is explicitly defined for a rule, the bucketing seed is no longer based on the rule ID. Instead, the seed is generated using the following format:

```
seed = salt_userId
```

Returning to the same example: if both rules (`3` and `5`) are configured with the same salt value, say `xyz`, and the user ID is still `abc123`, then the resulting seed for **both rules** becomes:

```
xyz_abc123
```

Because the bucketing seed is identical across these rules, the hash output will also be the same, and the user will be bucketed into the **same variation** in both rules. This approach is particularly useful when consistency in user experience is required across multiple rules, such as when coordinating multiple features within a cohesive user journey or ensuring deterministic behavior across test environments.

<br />

## Structural Limitations

When leveraging consistent bucketing behavior across multiple rules (e.g., by using a shared salt), there are important structural constraints that must be considered to ensure correctness and predictability:

1. **Bucketing Requires Variations**\
   Bucketing logic applies **only to rules that define variations**. This mechanism does not apply to Rollouts, as **Rollouts** do not involve multiple variations between which a user must be assigned. Instead, Rollouts typically represent a single experience being gradually exposed to a percentage of users, and therefore, the concept of bucketing into variations does not apply.
2. **Consistent Variation Count Across Rules**\
   To achieve consistent variation assignment across multiple rules using the same salt, **each rule must define the same number of variations**.
   The bucketing process involves computing a hash based on the seed and mapping that hash to one of the available variations. If the number of variations differs between rules, the same hash value will resolve to **different variation indices**, resulting in inconsistent behavior even when the seed is the same.
   <br />
   For example, if Rule A has 3 variations and Rule B has only 2, a user who is consistently bucketed into index `2` using the same seed would land in `variation 3` in Rule A but might wrap around or be excluded in Rule B, depending on the implementation. This breaks the assumption of cross-rule consistency.

<br />

## How to enable

To enable consistent bucketing across multiple rules, you can explicitly define a **salt value**. This configuration is available under the **Advanced Settings** section of the following rule types:

* **A/B Testing Rules**
* **Personalization Rules**
* **Multivariate Testing (MVT) Rules**

By specifying the same salt value across multiple rules, you ensure that the bucketing seed (`salt_userId`) remains consistent for a given user, enabling deterministic variation assignment across those rules.

<br />

> **Note**: If the salt field is left blank, the system defaults to using the `ruleCampaignId_userId` format for bucketing, which results in independent variation assignment per rule.

<br />

<Image align="center" border={true} caption="How To Set Salt Value" src="https://files.readme.io/5250eebd216b815e7ba33680b03a45c93fb76a14f2760713a26e66abcd33581a-Screenshot_2025-07-16_at_16.10.21.png" />