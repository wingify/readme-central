---
title: Hide Views
excerpt: VWO Manual Hide for SwiftUI
deprecated: false
hidden: false
metadata:
  robots: index
---
> **Note:** Ensure your deployment target is **iOS 13.0** or later.

<br />

You can manually hide specific views from being recorded using **VWO Manual Hide.**

<br />

**Steps:**

1. Wrap your content inside the VWOHideContainer.
2. Mark the views you want to hide using either of the following methods:

* Apply the .VWOhideView() modifier directly on the SwiftUI view.

        OR

* Call the method VWO.hideView(view: view) programmatically.

<br />

**Example Implementation**

```swift
import SwiftUI

@available(iOS 13.0, *)
struct ExampleScreen: View {
    @State private var hideText = false

    var body: some View {
        VWOHideContainer {
            VStack {
                if !hideText {
                    Text("This can be hidden")
                        .VWOhideView()
                }
                Button("Toggle Hide") {
                    hideText.toggle()
                }
            }
        }
    }
}
```

<br />

This setup ensures that any view marked with .VWOhideView() will be hidden during session recording, providing enhanced privacy and control over sensitive UI elements.
