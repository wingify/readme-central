---
title: Set Up Multivariate Rules
deprecated: false
hidden: false
metadata:
  robots: index
---
Multivariate rules are experimentation rules that enable you to run sophisticated multivariate tests directly on flag-controlled features. Multivariate Testing (MVT) is a technique in which multiple elements are changed to determine the optimal combination of those changes. It helps you identify not just which individual changes work best, but how they work together. The objective of MVT is to determine which combination of elements works best for your audience.

**For example**, an e-commerce brand wants to test two pricing models and a feature flag for a promotional banner.

Using MVT, they can define two variables:

Variable 1 (Pricing): $10, $20

Variable 2 (Promo Banner Flag): False, True

Wingify automatically generates four combinations (2 variables x 2 values) as follows:

| Combinations  | Pricing | Promo Banner Flag |
| ------------- | ------: | ----------------- |
| Combination 1 |      10 | False             |
| Combination 2 |      10 | True              |
| Combination 3 |      20 | False             |
| Combination 4 |      20 | True              |


Wingify shows each combination to a different set of visitors to identify which pair performs best. The multivariate test helps you understand how changes to one element affect the performance of another. For example, the $20 price might lead to more conversions, but only when the Promo Banner Flag is enabled. On the other hand, the $10 price might work better when shown without the banner.

This article further explains how you can set up a multivariate test in Wingify Feature Experimentation.

<Callout icon="📘" theme="info">
  Read more [here](https://help.vwo.com/hc/en-us/articles/49510408484889-Set-Up-Multivariate-Rules-in-Feature-Experimentation) 
</Callout>