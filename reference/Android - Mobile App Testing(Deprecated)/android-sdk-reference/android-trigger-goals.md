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

We can define goals in the VWO web portal during the campaign setup.

```text Goal Identifier
test_goal
```

Whenever a user completes the action which we want to optimize, we can trigger a goal.

```java
VWO.trackConversion("test_goal");
```
```java Kotlin
VWO.trackConversion("test_goal")
```

If you trigger the above code multiple times, the SDK takes care to count the conversions only once per user.

## Type of goals

* Triggers custom conversion\
  The custom conversion goal is used for generic events when we want to record an event for a conversion. The above example was for this goal type.

* Generates Revenue\
  This goal is useful when we want to track a revenue value using the conversion event.\
  For example, if we are testing the purchase button, we would want to track the item value.\
  Here is the code sample for generating the revenue goal:

```java
VWO.trackConversion("test_goal", 100.0);
```
```kotlin Kotlin
VWO.trackConversion("test_goal", 100.0)
```

> 📘 Note
>
> Your code can trigger a goal multiple times for a user, but the SDK makes sure that a conversion is counted only once per user.\
> This is done to avoid multiple instances of counting the same goal and to keep the campaign results consistent.
