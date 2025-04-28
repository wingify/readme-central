---
title: Launch Configuration
excerpt: Launching the SDK with configuration
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
You can setup VWO Config while initializing your VWO SDK. This is helpful if you want to do the following:
  *  [Targeting Visitor Groups](ref:android-targeting-visitor-groups).
  *  [Opt Out](ref:android-opt-out)
  *  [Disable Preview Mode](ref:android-preview-mode)

[block:code]
{
  "codes": [
    {
      "code": "Map<String, String> userSegmentationMapping = new HashMap<>();\nuserSegmentationMapping.put(\"user_type\", \"paid\");\n\nVWOConfig vwoConfig = new VWOConfig\n  .Builder()\n  .setCustomVariables(userSegmentationMapping)\n  .disablePreview()\n  .setOptOut(true)\n  .build();",
      "language": "java"
    },
    {
      "code": "val userSegmentationMapping = mutableMapOf<String, String>()\nuserSegmentationMapping[\"key\"] = \"value\"\n  \nval vwoConfig = VWOConfig.Builder()\n  .setCustomVariables(userSegmentationMapping)\n  .disablePreview()                               // To disable preview mode\n  .setOptOut(true)                                // To opt out of VWO SDK\n  .build()",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]
This configuration can set during SDK initialization as follows:
[block:code]
{
  "codes": [
    {
      "code": "VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);",
      "language": "java"
    },
    {
      "code": "VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)",
      "language": "kotlin",
      "name": "Kotlin"
    }
  ]
}
[/block]