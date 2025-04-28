---
title: Feature Flag Rules(FME)
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
The Feature Management and Experimentation (FME) REST APIs also enable developers to manage feature flag rules programmatically. Feature flag rules define how and when a feature is delivered to users—based on conditions such as audience segmentation, rollout percentages, or experiment variations.

Using the APIs, you can:

- Create a new rule for an existing feature flag, including rollout, A/B test, or personalization logic
- Retrieve the configuration details of a specific feature flag rule
- Update an existing rule to reflect changes in targeting strategy or experiment design
- Delete a rule that is no longer required
- List all rules associated with a given feature flag to get a complete view of its behavior and targeting logic

This API access provides fine-grained control over how features are rolled out and tested, enabling teams to dynamically adjust their strategies without relying on the user interface.

> 📘 Please Note
> 
> **These APIs are applicable only to the [Feature Management and Experimentation](https://developers.vwo.com/v2/docs/fme-overview)(FME) Product.** Ensure your project is configured accordingly before making API requests.