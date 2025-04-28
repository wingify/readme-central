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
### Q. What's the minimum iOS version supported by the SDK?
iOS SDK supports iOS version 8.0 and later.

### Does VWO support apps written in Swift?
Yes, the SDK works with Swift. This documentation mentions all the Swift methods.

### Q. What happens if there is no internet connectivity?
A user will become part of a test only if the device has internet connectivity. If there is no connectivity, the user sees the default version (Control) of the app.

If the user is part of the test and connectivity is lost,  the user will see locally cached changes. In this case, the VWO SDK captures the user data, stores it locally, and resends the data to the VWO server when the device gets connected to the Internet again.

### Q. How much size does the VWO Mobile SDK add to my app size?
Please refer to [iOS Impact Analysis](ref:ios-impact-analysis)  section to see the impact of different parameters on your app.

### Q. How do I deactivate the SDK?
You can either comment out the SDK initialization function call or remove the VWO SDK for deactivating the SDK.

### Q. Can I run simultaneous tests on the same app?
Yes, you can run simultaneous tests on the same app. A user accessing the app will automatically become part of all the tests running on your app, subject to target segment conditions.

### Q. Can I test multiple apps?
Yes, you can test unlimited apps and create unlimited campaigns on these apps.