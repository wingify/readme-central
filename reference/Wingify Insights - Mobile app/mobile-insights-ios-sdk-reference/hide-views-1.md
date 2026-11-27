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

> **Note:** Call `VWO.hideView` / `VWO.hideViews` from `viewWillAppear` (after `super.viewWillAppear(animated)`), not from `viewDidLoad`. The SDK tracks hidden views for each screen appearance and clears them when the screen disappears, so registering on every appearance keeps masking accurate when users navigate back to the screen.

**Lifecycle difference**

| | `viewDidLoad` | `viewWillAppear` |
| :--- | :--- | :--- |
| When it runs | Once, the first time the view controller's view is accessed | Every time the screen is about to appear |
| Runs again on... | Never, unless the view is unloaded and reloaded | Popping back to the screen, dismissing a full-screen modal over it, switching back to its tab |
| View in a window yet? | No | Usually yes (about to be) |

<br />

```swift
override func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)

    // pass multiple views at once
    var views: [UIView] = []
    views.append(view1)
    views.append(view2)
    // .. and so on
    VWO.hideViews(views: views)
    // OR
    VWO.hideViews(views: [view1, view2])

    // or simply pass each view separately
    VWO.hideView(view: view1)
    VWO.hideView(view: view2)
    // .. and so on
}
```
