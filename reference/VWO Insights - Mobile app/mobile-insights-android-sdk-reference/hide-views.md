---
title: Hide Views
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
A developer can either pass multiple views at once or pass each view separately to utilize the view-hiding functionality. Here’s how to hide views directly from the source code:

<br />

```java
// pass multiple views at once
ArrayList<View> views = new ArrayList<>();
views.add(view1);
views.add(view2);
// .. and so on
VWOInsights.hideViews(views);


// or simply pass each view separately
VWOInsights.hideView(view1)
VWOInsights.hideView(view2)
// .. and so on
```
```kotlin
// pass multiple views at once
val views = ArrayList<View>()
views.add(view1)
views.add(view2)
// .. and so on
VWOInsights.hideViews(views)


// or simply pass each view separately
VWOInsights.hideView(view1)
VWOInsights.hideView(view2)
// .. and so on
```