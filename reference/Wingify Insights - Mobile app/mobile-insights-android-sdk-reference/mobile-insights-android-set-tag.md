---
title: Set Tag
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
A developer can set the same/multiple tags to multiple views for dynamic view hiding functionality as below:

<br />

```java

viewObject.setTag(com.wingify.insights.R.id.hideViewId, "Tag Name");

```
```kotlin

viewObject.setTag(com.wingify.insights.R.id.hideViewId, "Tag Name");

```

> Note: Tag do not apply to Compose nodes. For Compose, use the [modifier](./hide-views#jetpack-compose) (or hide a containing Android View if hybrid).