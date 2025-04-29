---
title: FAQs
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
### Q. What's the minimum Android version supported by the SDK?

Android SDK Android 4.0 (Ice cream sandwich) and later.

### Q. What happens if there is no internet connectivity?

A user will become part of a test only if the device has internet connectivity. If there is no connectivity, the user sees the default version (Control) of the app.

If the user is part of the test and connectivity is lost,  the user will see locally cached changes. In this case, the VWO SDK captures the user data, stores it locally, and resends the data to the VWO server when the device gets connected to the Internet again.

### Q. How much size does the VWO Mobile SDK add to my app size?

Please refer to [Android Impact Analysis](ref:android-impact-analysis) section to see the impact of different parameters on your app.

### Q. How do I deactivate the SDK?

Please refer to [Opt Out](ref:android-opt-out) section to deactivate VWO SDK

### Q. Can I run simultaneous tests on the same app?

Yes, you can run simultaneous tests on the same app. A user accessing the app automatically becomes a part of all the tests running on your app, subject to target segment conditions.

### Q. Can I test multiple apps?

Yes, you can test unlimited apps and create unlimited campaigns on these apps.
