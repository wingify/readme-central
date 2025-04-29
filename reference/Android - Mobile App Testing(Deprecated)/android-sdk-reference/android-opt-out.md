---
title: Opt Out
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
To opt out of tracking by VWO, use the following code:

```java
VWOConfig vwoConfig = new VWOConfig.Builder()
                             .setOptOut(true)     // set your opt out flag here
                             .build();
                             
VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);
```
```kotlin Kotlin
val vwoConfig = VWOConfig.Builder()
                .setOptOut(true)     // set your opt out flag here
                .build()

VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)
```

If you disable tracking for a user, and later decided to enable tracking for him, please use:

```java
VWOConfig vwoConfig = new VWOConfig.Builder()
                             .setOptOut(false)     // set your opt out flag here
                             .build();
                             
VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null);
```
```kotlin Kotlin
val vwoConfig = VWOConfig.Builder()
                .setOptOut(false)     // set your opt out flag here
                .build()

VWO.with(Context, VWO_APP_KEY).config(vwoConfig).launch(null)
```

A user by default will be tracked by VWO.
