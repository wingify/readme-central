---
title: Switch User
excerpt: >-
  Set or update the current user identifier for VWO Insights. - Available from
  SDK version 2.2.0
deprecated: false
hidden: false
metadata:
  robots: index
---
`VwoFlutter.setUserId` switches identity when the logged-in user changes in the same app session. Call it only after VWO Insights initialization is complete.

**Signature**

```dart
static Future<bool> setUserId(String userId)
```

**Parameters**

* `userId` — Non-blank string. Blank values return `false`.

**Returns**

`Future<bool>`

* `true` — User switch and configuration refresh succeeded.
* `false` — Request rejected (blank `userId`, SDK not initialized) or refresh failed.

**Behavior**

* Stops the current recording/session for the previous user.
* Updates client identity and refreshes server configuration for the new `userId`.
* If recording was active before the switch, it automatically resumes after configuration refresh completes. If recording was stopped, it remains stopped.

**Example**

```dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';

Future<void> handleLogin(String userId) async {
  final success = await VwoFlutter.setUserId(userId);
  
  if (success) {
    // User switch complete
    print('User ID updated to: $userId');
  } else {
    // Handle failure
    print('Failed to update user ID');
  }
}
```

**Common Use Case**

```dart
// After user authentication
final user = await authenticateUser(email, password);
if (user != null) {
  await VwoFlutter.setUserId(user.id);
  // Recording resumes automatically if it was active before
}
```
