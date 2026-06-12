---
title: Start/Stop Recording
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
If you want to start recording as soon as the application launches, start the session recording during the SDK initialization. Refer to the instructions here for [Android](https://developers.vwo.com/reference/android-integration) & [IOS](https://developers.vwo.com/reference/ios-integration).

<br />

If you want to **start** recording based on a user action, such as tapping a button, use the following code snippet:

```javascript Dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
 
VwoFlutter.startRecording();
```

> ***startRecording()*** is not required in Flutter web. 

<br />

If you want to **stop** recording based on a user action, such as tapping a button, use the following code snippet:

```javascript Dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
 
VwoFlutter.stopRecording();
```

> ***stopRecording()*** is not required in Flutter web.
