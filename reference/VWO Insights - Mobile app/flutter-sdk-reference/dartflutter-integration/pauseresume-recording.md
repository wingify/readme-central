---
title: Pause/Resume Recording
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
Due to limitations of the Flutter platform on Android, the screen hiding feature from the VWO dashboard's 'Exclude elements/sections from screen recording' section may not work for certain frames. 

To address this, we recommend using the pause and resume feature of our SDK. When you need to hide a screen, pause the recording before the screen appears. Similarly, to unhide a screen, resume the recording after the screen is dismissed. 

<br />

> The mobile SDK will not record events or take screenshots while it is paused. Please note that this implementation is required only for **Android, not for IOS**. 
>
> For **web recordings**, event tracking remains active continuously; only content visibility is subject to pausing.

<br />

To pause session recording before navigating to a screen you want to hide, use the below code.

```javascript Dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
 
if (chosenScreen == "PersonalInformationScreen") {
    VwoFlutter.pauseRecording();
    //Show screen which will be hidden in recording
}
```

<br />

To resume session recording after leaving the screen you wanted to hide, use the below code.

```javascript Dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
 
void didPop(Route<dynamic> route, Route<dynamic>? previousRoute) {
    if (route.settings.name?.contains("/housing") == true) {
      VwoFlutter.resumeRecording();
    }
    super.didPop(route, previousRoute);
}
```