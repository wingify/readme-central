---
title: Installation
excerpt: Latest SDK version is 2.6.1
deprecated: false
hidden: false
link:
  new_tab: false
metadata:
  title: ''
  description: ''
  robots: index
---
The library is published in pub.dev. You can check it [here](https://pub.dev/packages/wingify_insights_flutter_sdk).

<br />

To install it, run the command below.

```shell
$ flutter pub add wingify_insights_flutter_sdk
```

<br />

This will add a line like the one below to your package's pubspec.yaml file. Use the latest SDK version for new features and improvements.

> dependencies:  
> wingify_insights_flutter_sdk: 2.6.1

<br />

Now, run the command below to fetch all dependencies.

```shell
$ flutter pub get
```

<br />

***

## Flutter Impeller compatibility

From **Flutter 3.27** onwards, **Impeller** is the default rendering engine on **Android (API 29+)** and has been default on **iOS** since Flutter 3.10. Impeller precompiles shaders at build time and uses Vulkan (Android) or Metal (iOS), which can affect compatibility with some native SDKs.

**To avoid issues with Wingify Insights on Flutter apps using Impeller:**

1. **Use the latest Wingify Insights Flutter SDK** — update to the newest version that supports Impeller.
2. **Android only:** Call `WingifyInsights.enableFlutterPerformanceMode()` **before** `WingifyInsights.init()` (see [Application class](https://developers.wingify.com/v2/reference/android-integration#application-class)).
3. **Release builds:** Add the required ProGuard rules so the SDK and Flutter embedding are not stripped (see [ProGuard (release builds)](https://developers.wingify.com/v2/reference/android-integration#proguard-release-builds)).

<br />

***
