---
title: Tagging Screens
deprecated: false
hidden: false
metadata:
  robots: index
---
You can tag screens using the following method:

> Note: In SwiftUI applications, specifying a screen name is mandatory for accurate event tracking and screen-level analytics.

<br />

**For SwiftUI View:**

```swift
var body: some View {
    ZStack {
        // Your view content
    }
    .wingifyTagScreenName(screenName: "ScreenName")
}
```

<br />

This helps in identifying user interactions and analyzing behavior at the screen level.
