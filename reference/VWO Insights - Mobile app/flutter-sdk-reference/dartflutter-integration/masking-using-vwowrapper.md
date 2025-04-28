---
title: Masking using VwoWrapper
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
If you want to mask a widget on a screen, use VwoWrapper. Place the widget you want to hide as a child of VwoWrapper.

<br />

e.g. hide a text widget

```javascript Dart
import 'package:vwo_insights_flutter_sdk/vwo_insights_flutter_sdk.dart';
 
VwoWrapper(child: Text("This will be hidden."));
```

<br />

e.g. hide a button

```javascript Dart
VwoWrapper(
    child: TextButton(
      onPressed: () {},
      child: const Text("Press Me"),
    ),
)
```

<br />

e.g. hide a card containing images and texts

```javascript Dart
VwoWrapper(
    child: Card(
      child: Column(
        children: [
          Image.asset("assets/house_images/h2.jpg"),
          const Text(StringConstant.SKILLS_TITLE),
          const Text(StringConstant.CHOOSE_CAMPAIGN),
        ],
      ),
    ),
)
```