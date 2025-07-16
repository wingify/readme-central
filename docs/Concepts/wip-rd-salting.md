---
title: '[WIP - RD] Salting'
excerpt: The key to bucketing users into variations
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

Salting refers to the seed that we use to determine how we [bucket](https://developers.vwo.com/v2/update/docs/how-user-bucketing-works) a user into variations. If the salt used is same across multiple campaigns, then the user will be bucketed into the same variation in all those campaigns. Else, it will be different. The default behaviour is to have different salts when bucketing the user across different campaigns. But if your usecase requires the same user to get the same variation across different campaigns, then this is what you will want to use.