---
title: Set Navigator Observer
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
> 📘 In web recording sessions, the system automatically detects and logs navigation events based on URL changes, eliminating the need for manual tracking.

<br />

In the main.dart file, change from

```javascript Dart
return MaterialApp(
      title: 'Flutter Demo',
      routes: {
        "/": (context) => const DemoScreen(),
        '/Screen1': (context) => Screen1(),
        '/Screen2': (context) => Screen2(),
      },
    );
```

<br />

To the below.

```javascript Dart
import 'package:wingify_insights_flutter_sdk/wingify_insights_flutter_sdk.dart';
 
return MaterialApp(
      title: 'Flutter Demo',
      routes: {
        "/": (context) => const DemoScreen(),
        '/Screen1': (context) => Screen1(),
        '/Screen2': (context) => Screen2(),
      },
      navigatorObservers: [
        WingifyNavigatorObserver(),
        YourNavigatorObserverIfNeeded(),
      ],
    );
```
