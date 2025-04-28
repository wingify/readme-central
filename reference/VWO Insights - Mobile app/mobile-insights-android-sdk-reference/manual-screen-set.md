---
title: Manual Screen Set
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
NOTE:

The existing auto screen view functionality remains unchanged. However, developers should ensure they trigger the screen view event appropriately when navigating between multiple screens.

<br />

<br />

**Native Android**

**Method**: VWOInsights.setScreenViewed(String screenName)

**Description**: Use this API to trigger a screen viewed or screen change event at any point in the code.

<br />

**Usage (Kotlin & Java):**

```kotlin
// For fragments/activities, add this in onResume()
VWOInsights.setScreenViewed("Your_Screen_Name")
```