---
title: Masking using WingifyWrapper
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
If you want to mask a widget on a screen, use WingifyWrapper. Place the widget you want to hide as a child of WingifyWrapper.

<br />

e.g. hide a text widget

```javascript Dart
import 'package:wingify_insights_flutter_sdk/wingify_insights_flutter_sdk.dart';
 
WingifyWrapper(child: Text("This will be hidden."));
```

<br />

e.g. hide a button

```javascript Dart
WingifyWrapper(
    child: TextButton(
      onPressed: () {},
      child: const Text("Press Me"),
    ),
)
```

<br />

e.g. hide a card containing images and texts

```javascript Dart
WingifyWrapper(
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
