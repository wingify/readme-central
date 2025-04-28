---
title: Code Blocks
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
Code blocks is a powerful way to run custom logic for different variations. For tests that are not based on existing variables of your app, code block offers a developer-friendly approach to test different variations.

The VWO SDK identifies a test by its campaign key. The campaign key should match the key you created when you set up the A/B test in the VWO web portal.

The ```VWO.getVariationNameForTestKey(String testKey)``` function returns the name of the variation you created in VWO web portal.
[block:code]
{
  "codes": [
    {
      "code": "String variationName = VWO.getVariationNameForTestKey(\"campaign_key\");\nif (variationName != null && variationName.equals(\"Control\")) {\n   // code for Control variation\n} else if(variationName != null && variationName.equals(\"Variation 1\")) {\n   // code for Variation 1\n} else {\n   // default case\n}",
      "language": "java"
    },
    {
      "code": "val variationName = VWO.getVariationNameForTestKey(\"campaign_key\")\nif (variationName != null && variationName == \"Control\") {\n  // code for Control variation\n} else if (variationName != null && variationName == \"Variation 1\") {\n  // code for Variation 1\n} else {\n  // default case\n}",
      "language": "kotlin"
    }
  ]
}
[/block]
The variation name should match the name you used in VWO web portal.
Use the last else or default section to code the behaviour of your app if this A/B test is not running.
If your control and default behaviour are same, you can remove the control condition.