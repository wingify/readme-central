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
You can setup Wingify Config while initializing your Wingify SDK. This is helpful if you want to do the following:

* [Targeting Visitor Groups](ref:android-targeting-visitor-groups).
* [Opt Out](ref:android-opt-out)
* [Disable Preview Mode](ref:android-preview-mode)
* [Push Custom Dimension](ref:android-custom-dimension) 

```java
Map<String, String> userSegmentationMapping = new HashMap<>();
userSegmentationMapping.put("user_type", "paid");

VWOConfig vwoConfig = new VWOConfig
  .Builder()
  .setCustomVariables(userSegmentationMapping)
  .disablePreview()
  .setOptOut(true)
  .setCustomDimension("CUSTOM_DIMENSION_KEY", "CUSTOM_DIMENSION_VALUE")
  .build();
```
```kotlin Kotlin
val userSegmentationMapping = mutableMapOf<String, String>()
userSegmentationMapping["key"] = "value"
  
val vwoConfig = VWOConfig.Builder()
  .setCustomVariables(userSegmentationMapping)
  .disablePreview()                               // To disable preview mode
  .setOptOut(true)                                // To opt out of Wingify SDK
  .setCustomDimension("CUSTOM_DIMENSION_KEY", "CUSTOM_DIMENSION_VALUE")
  .build()
```

This configuration can set during SDK initialization as follows:

```java
VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null);
```
```kotlin Kotlin
VWO.with(this, VWO_API_KEY).config(vwoConfig).launch(null)
```

## Configure Wingify CDN for China

VWO initialization supports Wingify Chinese CDN in order to prevent tracking calls being getting blocked in China. This can be achieved by configuring the SDK at the time of instantiating it. 

```java
VWOConfig vwoConfig = new VWOConfig
  .Builder()
  .isChinaCDN(true)
  .build();
```
```kotlin
val vwoConfig = VWOConfig.Builder()
  .setCustomVariables(userSegmentationMapping)
  .disablePreview()                               // To disable preview mode
  .setOptOut(true)                                // To opt out of Wingify SDK
  .setCustomDimension("CUSTOM_DIMENSION_KEY", "CUSTOM_DIMENSION_VALUE")
  .build()
```
