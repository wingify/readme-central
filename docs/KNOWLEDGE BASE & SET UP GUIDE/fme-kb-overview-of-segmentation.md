---
title: Overview of Segmentation
deprecated: false
hidden: false
metadata:
  robots: index
---
Segmentation refers to the strategic classification of your website or app visitors into distinct cohorts. The classification can be based on shared characteristics such as behavior, demographics, or technology attributes. This targeted grouping enables you to deliver controlled feature rollouts, run targeted experiments, and deliver personalized experiences tailored to each segment’s unique needs and interests. Beyond targeting, you can also use these cohorts during experiment report analysis. This helps in filtering and interpreting results based on user attributes, regardless of how the traffic was initially segmented during rollout.

**Here’s an example to provide more clarity.**

A food delivery app wants to test a new one-click reorder feature. The team first tests it out for users in New York City (pre-segmentation by location), where order frequency is already high.

The feature flag ensures only NYC users see the new reorder option. Next, the team uses post-segmentation by device type to see how adoption differs between desktop users (who often order from offices) and mobile users (who typically order on the go).

**Outcome**

The analysis shows mobile users in NYC adopt the one-click reorder much more than desktop users. This insight confirms that the feature is most valuable for mobile-heavy contexts, and the team decides to optimize the UI for smaller screens before expanding to other regions.

### Types of Segmentation in Wingify Feature Experimentation

Wingify Feature Experimentation supports two types of segmentation to enhance experiment precision and analysis:

* Pre-segmentation is applied during data collection, ensuring that only users who meet specified targeting conditions are exposed to the feature or included in the experiment.
* Post-segmentation is used during analysis, allowing you to filter and interpret experiment results based on user attributes or behavior, regardless of how the traffic was originally segmented.

<Callout icon="📘" theme="info">
  Read more [here](https://help.vwo.com/hc/en-us/articles/50914326504473-Overview-of-Segmentation-in-VWO-Feature-Experimentation) 
</Callout>
