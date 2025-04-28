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
Code blocks is a powerful way to run custom logic for different variations. For tests which are not based on existing variables of your app, code block offers the developer-friendly approach to test different variations.

The VWO SDK identifies a test by its test key. The test key should match the key you created when you set up the A/B test in the VWO web portal.

The `VWO.getVariationNameForTestKey(String testKey)` function returns the name of the variation you created in VWO web portal.

```java
String variationName = VWO.getVariationNameForTestKey("test_key");
if (variationName != null && variationName.equals("Control")) {
   // code for Control variation
} else if(variationName != null && variationName.equals("Variation 1")) {
   // code for Variation 1
} else {
   // default case
}
```
```kotlin
val variationName = VWO.getVariationNameForTestKey("test_key")
if (variationName != null && variationName == "Control") {
  // code for Control variation
} else if (variationName != null && variationName == "Variation 1") {
  // code for Variation 1
} else {
  // default case
}
```

The variation name should match the name you used in VWO web portal.\
Use the last else or default section to code the behaviour of your app if this A/B test is not running.\
If your control and default behaviour are same, you can remove the control condition.
