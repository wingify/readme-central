---
title: Variation resource representation
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
    "1-0": "name",
    "1-1": "string",
    "2-0": "isControl",
    "3-0": "isDisabled",
    "2-1": "boolean",
    "3-1": "boolean",
    "4-0": "percentSplit",
    "4-1": "float",
    "9-0": "sectionId",
    "9-1": "int",
    "5-0": "editorData",
    "5-1": "Nested Object",
    "6-0": "editorData.stack",
    "6-1": "list",
    "7-0": "heatmapThumbUrl",
    "8-0": "screenshots",
    "8-1": "list",
    "7-1": "link",
    "0-2": "Variation Id\n\nNote: Please ensure that variation Id is serial. For eg, if you have variations with ids 1,2,3 and you delete variation id 2, now you would have the variation ids 1, 2; 3 would be updated to 2",
    "0-3": "No",
    "1-2": "Variation Name",
    "1-3": "Yes",
    "4-2": "Percentage Traffic allocated for variation",
    "2-3": "No",
    "3-3": "No",
    "4-3": "Yes",
    "6-3": "No",
    "7-3": "No",
    "8-3": "No",
    "9-3": "No",
    "2-2": "Flag which signifies if the variation is control variation",
    "3-2": "Flag which signifies if the variation is disabled\n\nNote: Please set the percentSplit to 0 for the given variation to disable it",
    "5-2": "Contains the JS/CSS changes created for the variation",
    "6-2": "stack contains the list of the changes for the variation",
    "7-2": "Link for the heatmap thumbnail",
    "8-2": "Contains the link of screenshots for the selected browsers for the variation",
    "9-2": "Section Id\n\nNote: This would be 1 except the MULTIVARIATE campaign. It would be meaningful in that case only.",
    "5-3": "No"
  },
  "cols": 4,
  "rows": 10
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note:",
  "body": "For adding js/css changes in variations, please use `changes` property in request body. These changes will be override any previous changes, if any."
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "Variation splitPercent will be equally distributed among all variations on the creation of a new variation, which can be updated via update request"
}
[/block]