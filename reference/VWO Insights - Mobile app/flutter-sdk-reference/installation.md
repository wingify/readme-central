---
title: Installation
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
The library is published in pub.dev. You can check it [here](https://pub.dev/packages/vwo_insights_flutter_sdk).

<br />

To install it, run the command below.

```shell
$ flutter pub add vwo_insights_flutter_sdk
```

<br />

This will add a line like the one below to your package's pubspec.yaml file. Use the latest SDK version for new features and improvements.

> dependencies:  
> vwo_insights_flutter_sdk: ^1.0.12

<br />

<br />

Now, run the command below to fetch all dependencies.

```shell
$ flutter pub get
```

<br />

---

## Flutter Impeller compatibility

From **Flutter 3.27** onwards, **Impeller** is the default rendering engine on **Android (API 29+)** and has been default on **iOS** since Flutter 3.10. Impeller precompiles shaders at build time and uses Vulkan (Android) or Metal (iOS), which can affect compatibility with some native SDKs.

**To avoid issues with VWO Insights on Flutter apps using Impeller:**

1. **Use the latest VWO Insights Flutter SDK** — update to the newest version that supports Impeller.
2. **Android only:** Call `VWOInsights.enableFlutterPerformanceMode()` **before** `VWOInsights.init()` (see [Application class](https://developers.vwo.com/v2/reference/android-integration#application-class)).
3. **Release builds:** Add the required ProGuard rules so the SDK and Flutter embedding are not stripped (see [ProGuard (release builds)](https://developers.vwo.com/v2/reference/android-integration#proguard-release-builds)).

<br />

---