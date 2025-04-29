---
title: Feature Flag Rule Resource Representation
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
| Property                       | Type           | Description                                                       | Editable |
| :----------------------------- | :------------- | :---------------------------------------------------------------- | :------- |
| id                             | integer        | Feature Id                                                        | No       |
| featureKey                     | string         | Unique identifier for the feature                                 | No       |
| name                           | string         | Feature Name                                                      | Yes      |
| description                    | string         | Feature description                                               | Yes      |
| featureType                    | string         | Feature Type i.e. Temporary or Permanent                          | No       |
| variables                      | Array | Variables created                                                 | Yes      |
| variables`[<code>{index}</code>]`.id           | integer        | Variable Id                                                       | Yes      |
| variables`[`{index}`]`.variableName | string         | Variable name                                                     | Yes      |
| variables`[<code>{index}</code>]`.dataType     | boolean        | Variable Type                                                     | Yes      |
| variables`[`{index}`]`.defaultValue | any            | Variable Default value                                            | Yes      |
| rulesCount                     | integer        | Number of rules in the feature                                    | Yes      |
| variations                     | Array | Feature variations                                                | Yes      |
| goals                          | Array | Feature Metric(s)                                                 | Yes      |
| goals`[`{index}`]`.metricId         | integer        | Metric ID created under Data360, associated with the Feature Flag | Yes      |