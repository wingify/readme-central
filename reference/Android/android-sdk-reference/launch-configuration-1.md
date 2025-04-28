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

* [Targeting Visitor Groups](ref:android-targeting-visitor-groups).
* [Opt Out](ref:android-opt-out)
* [Disable Preview Mode](ref:android-preview-mode)

```java
Map<String, String> userSegmentationMapping = new HashMap<>();
userSegmentationMapping.put("user_type", "paid");

VWOConfig vwoConfig = new VWOConfig
  .Builder()
  .setCustomVariables(userSegmentationMapping)
  .disablePreview()
  .setOptOut(true)
  .build();
```
```kotlin Kotlin
val userSegmentationMapping = mutableMapOf<String, String>()
userSegmentationMapping["key"] = "value"
  
val vwoConfig = VWOConfig.Builder()
  .setCustomVariables(userSegmentationMapping)
  .disablePreview()                               // To disable preview mode
  .setOptOut(true)                                // To opt out of VWO SDK
  .build()
```

This configuration can set during SDK initialization as follows:

```java
VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);
```
```kotlin Kotlin
VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)
```
