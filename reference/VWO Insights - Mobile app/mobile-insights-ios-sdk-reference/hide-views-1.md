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

```swift
// pass multiple views at once
Var views : [UIView]= []
views.append(view1);
views.append(view2);
// .. and so on
VWOInsights.hideViews(views : views);
OR
VWOInsights.hideViews(views : [view1, view2]);



// or simply pass each view separately
VWOInsights.hideView(view :view1)
VWOInsights.hideView(view :view2)
// .. and so on
```
