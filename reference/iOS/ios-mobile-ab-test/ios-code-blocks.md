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
Code blocks is a powerful way to run custom logic for different variations. For tests which are not based on the existing variables of your app, code block offers a developer-friendly approach to test different variations.

The VWO SDK identifies a test by its test key. The test key should match the key you created while setting up the A/B test on the VWO web portal.

The ```variationName``` function returns the name of the variation you created on the VWO web portal.
[block:code]
{
  "codes": [
    {
      "code": "NSString *variationName = [VWO variationNameForTestKey:@\"test_key\"];\nif ([variationName isEqualToString:@\"Control\"]) {\n    // Code for Control\n} else if ([variationName isEqualToString:@\"Variation 1\"]) {\n    // Code for Variation 1\n} else {\n\n}",
      "language": "objectivec"
    },
    {
      "code": "if let variation = VWO.variationNameFor(testKey: \"test_key\") {\n    switch variation {\n        case \"Control\":\n            // Code for Control\n            break\n        case \"Variation 1\":\n            // Code for Variation 1\n            break\n        default: break\n    }\n}",
      "language": "swift"
    }
  ]
}
[/block]
The variation name should match the name you used on the VWO web portal.
Use the last else or default section to code the behavior of your app if this A/B test is not running.
If your control and default behaviors are the same, you can remove the control condition.