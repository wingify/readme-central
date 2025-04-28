---
title: Goal resource representation
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
[block:parameters]
{
  "data": {
    "h-0": "Property",
    "h-1": "Type",
    "h-2": "Description",
    "h-3": "Editable",
    "0-0": "id",
    "0-1": "Int",
    "2-0": "name",
    "2-1": "string",
    "3-0": "isPrimary",
    "4-0": "urls",
    "3-1": "boolean",
    "4-1": "Nested Object",
    "0-2": "Goal Id",
    "0-3": "No",
    "2-2": "Goal Name",
    "2-3": "Yes",
    "3-3": "No",
    "4-3": "Yes",
    "3-2": "Flag which signifies if the goal is primary goal or not",
    "4-2": "Contains the url related information on which goal will be triggered. \n\nSee Campaign resource for more details on this",
    "5-0": "cssSelectors",
    "5-1": "list",
    "5-2": "Goal path",
    "5-3": "",
    "7-0": "isCreatedInEditor",
    "7-1": "boolean",
    "7-2": "Flag if the goal was created in editor or not",
    "7-3": "No",
    "1-0": "type",
    "1-1": "string",
    "1-2": "Goal Type\n\nValid values include `visitPage`, `engagement`, `formSubmit`, `clickLink`, `clickElement`, `revenue`, `custom-conversion`\n\nNote:Please take caution while changing type, it might impact the data collection",
    "1-3": "Yes",
    "6-0": "cssSelector.0",
    "6-1": "string",
    "6-2": "selector path",
    "6-3": "Yes"
  },
  "cols": 4,
  "rows": 8
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "urls is not required for `engagement` type goal"
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "Multiple cssSelectors should be added as array values, like [\"selector1, selector2\"]"
}
[/block]