---
title: Campaign APIs
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
The FullStack A/B campaign requires linking at least one project to create a campaign, while Feature Rollout and Feature Test campaigns require at least one project and one feature. A feature cannot be used in two similar campaigns. You must create projects and features from the App before designing these campaigns so that they can be used in the campaigns.

**FullStack Campaign resource that differs from Web Campaign**
[block:parameters]
{
  "data": {
    "1-0": "testKey",
    "2-0": "projects",
    "3-0": "feature",
    "4-0": "variations",
    "5-0": "goals",
    "h-0": "Property",
    "h-3": "Feature Rollout",
    "h-2": "Feature Test",
    "h-1": "FullStack A/B",
    "2-3": "Yes",
    "4-3": "No",
    "5-3": "No",
    "3-1": "No",
    "1-1": "Yes",
    "2-1": "Yes",
    "4-1": "Yes",
    "5-1": "Yes",
    "5-2": "Yes",
    "4-2": "Yes",
    "3-2": "Yes",
    "3-3": "Yes",
    "2-2": "Yes",
    "1-2": "Yes",
    "1-3": "Yes",
    "0-0": "type",
    "0-1": "server-ab",
    "0-2": "feature-test",
    "0-3": "feature-rollout"
  },
  "cols": 4,
  "rows": 6
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "As stated in the table above, a Feature Rollout does not have Goals and Variations."
}
[/block]