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
If you want to start recording as soon as the application launches, start the session recording during the SDK initialization. Refer to the instructions here for [Android](https://developers.wingify.com/reference/android-integration) & [IOS](https://developers.wingify.com/reference/ios-integration).

If you have enabled performance mode and face any crash or issues with Android / iOS Native implementation, You can control the recording manually using the methods below.

<br />

### Start Recording Manually

```javascript Dart
import 'package:wingify_insights_flutter_sdk/wingify_insights_flutter_sdk.dart';
 
WingifyFlutter.startRecording();
```

> _**startRecording()**_ is not required in Flutter web.

You can also start recording in response to any user action (for example, when a button is tapped).

<br />

### Stop Recording Manually

```javascript Dart
import 'package:wingify_insights_flutter_sdk/wingify_insights_flutter_sdk.dart';
 
WingifyFlutter.stopRecording();
```

> _**stopRecording()**_ is not required in Flutter web.

You can also stop recording based on any user action (for example, when a button is tapped).
