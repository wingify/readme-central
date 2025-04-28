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
[block:code]
{
  "codes": [
    {
      "code": "test_goal",
      "language": "text",
      "name": "Goal Identifier"
    }
  ]
}
[/block]
Whenever a user completes the action which we want to optimize, we can trigger a goal.
[block:code]
{
  "codes": [
    {
      "code": "VWO.trackConversion(\"test_goal\");",
      "language": "java"
    },
    {
      "code": "VWO.trackConversion(\"test_goal\")",
      "language": "java",
      "name": "Kotlin"
    }
  ]
}
[/block]
If you trigger the above code multiple times, the SDK takes care to count the conversions only once per user.

## Type of goals
 * Triggers custom conversion
The custom conversion goal is used for generic events when we want to record an event for a conversion. The above example was for this goal type.

* Generates Revenue
This goal is useful when we want to track a revenue value using the conversion event.
For example, if we are testing the purchase button, we would want to track the item value.
Here is the code sample for generating the revenue goal:
[block:code]
{
  "codes": [
    {
      "code": "VWO.trackConversion(\"test_goal\", 100.0);",
      "language": "java",
      "name": null
    },
    {
      "code": "VWO.trackConversion(\"test_goal\", 100.0)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "Your code can trigger a goal multiple times for a user, but the SDK makes sure that a conversion is counted only once per user.\nThis is done to avoid multiple instances of counting the same goal and to keep the campaign results consistent."
}
[/block]