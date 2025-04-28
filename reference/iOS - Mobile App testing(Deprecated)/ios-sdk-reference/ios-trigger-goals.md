---
title: Trigger Goals
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
For any campaign, we want to track conversion changes for the A/B test.

We can define goals on the VWO web portal during the campaign setup.

```text Goal Identifier
test_goal
```

Whenever a user completes an action that we want to optimize, we can trigger a goal.

```objectivec
[VWO trackConversion:@"test_goal"];
```
```swift
VWO.trackConversion(goal: "test_goal")
```

If you trigger the above code snippet multiple times, the SDK counts the conversions only **once** per user.

## Types of Goals

* Triggers custom conversion\
  A custom conversion goal is used for generic events when we want to record an event for a conversion. The above example was for this goal type.

* Generates revenue\
  This goal is useful when we want to track a revenue value with the conversion event. For example, if we are testing a purchase button, we would want to track the item value.\
  Code sample for generating the revenue goal:

```objectivec
[VWO trackConversion:@"test_goal" withValue:@100];
```
```swift
VWO.trackConversion(goal: "test_goal", value: 100)
```

> 📘 Note
>
> Your code can trigger a goal multiple times for a user, but the SDK makes sure that a conversion is only counted once per user.\
> This is done to avoid repetitive counting and to keep the campaign results consistent.
