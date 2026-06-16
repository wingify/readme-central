---
title: Auto-Deploy Winning Variations from A/B Tests
deprecated: false
hidden: false
metadata:
  robots: index
---
When configuring A/B tests in Feature Experimentation, you can choose to automate the winning variation's rollout using the Auto-Deploy Winning Variation option. After you enable this option, when the test concludes and Wingify identifies a statistically significant winner, a new Personalization rule will automatically be created using the same configuration as the test. The new rule is placed above the test campaign in the rule evaluation order to ensure the winning variation is served. The automated workflow eliminates the manual effort and delay between discovering a winning variation and deploying it, allowing you to maximize the impact of your optimizations immediately.

Let’s say a SaaS company is A/B testing two variations of a dashboard widget, one with a simplified layout and another with advanced analytics filters.

During the experiment, Variation B (with advanced filters) shows a significant uplift in user engagement and retention. With Auto-Deploy Winning Variation enabled:

* Wingify automatically creates a Personalization rule using the original test’s targeting conditions, without requiring manual intervention from product or engineering teams.
* The new campaign is automatically placed above the test campaign in the rule evaluation order to ensure the winning variation (Variation B) is served to all users who match the original test’s targeting conditions.

<Callout icon="📘" theme="info">
  Read more [here](https://help.vwo.com/hc/en-us/articles/49511106623897-Auto-Deploy-Winning-Variations-from-A-B-Tests-in-Feature-Experimentation) 
</Callout>
