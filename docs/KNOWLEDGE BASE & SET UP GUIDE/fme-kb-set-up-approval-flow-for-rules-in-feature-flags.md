---
title: Set Up Approval Flow for Rules in Feature Flags
deprecated: false
hidden: false
metadata:
  robots: index
---
The approval flow for feature flag rules provides governance by ensuring that no rule changes go live in your production environments without proper checks and balances. It operates at the rule level, ensuring that any modification to feature flag rules, such as targeting conditions, rollout percentages, or environment-specific configurations, is reviewed and approved before being published.

Approvals are granted by users explicitly defined as approvers, ensuring accountability and controlled decision-making throughout the release process. By enforcing approvals at the rule level, teams can make iterative changes safely while maintaining visibility and accountability over what is released to production.

This approach is valuable for organizations managing complex deployments across multiple environments, where even minor rule changes can significantly impact the end-user experience.

For example, a developer might configure a new rollout rule for a feature flag. Instead of deploying it immediately, they send it for approval. A designated reviewer then checks the configuration to ensure it aligns with business goals before authorizing the live deployment.

This feature enables you to:

* Maintain strict control over account changes to prevent unauthorized deployments.
* Review changes in an unpublished state to catch potential configuration errors before they impact users.
* Ensure all production environment modifications undergo a verified check-and-balance process.

<Callout icon="📘" theme="info">
  Read more [here](https://help.vwo.com/hc/en-us/articles/55476557405721-Set-Up-Approval-Flow-for-Rules-in-Feature-Flags) 
</Callout>
