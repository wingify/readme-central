---
title: '[WIP - RD] Salting'
excerpt: Bucketing users into the same variation across multiple rules
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Salting refers to the seed that we use to determine how we [bucket](https://developers.vwo.com/v2/update/docs/how-user-bucketing-works) a user into variations. If the salt used is same across multiple rules, then the user will be bucketed into the same variation in all of those rules. Else, they will be randomly bucketed into any variation.

The default behaviour is to have different seeds when bucketing the user across different rules. But if your usecase requires the same user to get the same variation across rules, then this is what you will want to use.

<br />

## Bucketing Formula

By default, when determining the bucketing seed, we use ***`seed = ruleCampaignId_userId`***

So, for example, with a ruleCampaignId of `3` and userId of `abc123`, we would get a default seed of `3_abc123`. And for another rule, with id of `5`, for the same user, we get the default seed of `5_abc123`.

With different seed values for both campaigns, it is possible that the same user gets bucketed into `variation 1` in the first campaign, and `variation 2` in the second campaign. This is desirable for most usecases, where customers want the same user to see different experiences, in different campaigns.

But if the salt is explicitly set for a campaign, then the bucketing seed is determined by ***`seed = salt_userId`***

Now, for the same example as above, if the salt is set to `xyz`, for both campaigns the seed is the same, `xyz_abc123`. Which means, that the user will get bucketed into the same variation in both campaigns.

<br />

## Structural Limitations

1. Bucketing into variations is applicable only when variations are present, so this is not applicable for Rollouts
2. The rules need to have the same number of variations, to ensure that the user is bucketed into the same variation across rules

<br />

## How to enable

Salt value can be set inside the Advanced Settings section of a testing or a personalize rule

\<insert image>