---
title: Expo(React-Native)
excerpt: >-
  Easily integrate the VWO FME React Native SDK into your Expo project with this
  step-by-step guide.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
## Steps Required

The VWO FME React Native SDK uses native SDKs for iOS and Android, which require access to the native project files. By default, Expo projects do not expose the native iOS and Android folders.

Running `expo prebuild` generates these folders so the native SDKs can be properly linked and integrated.

***

### Step 1: Prepare Your Expo Project for Native SDK Integration

Run command `npx expo prebuild` in your project root:

* This command creates the ios and Android folders inside your project.
* These folders contain the native code for iOS and Android platforms.
* You only need to run this once or whenever you add or update native code.

### Step 2: Install the VWO FME React Native SDK Package

Install the SDK package using yarn or npm:

```text Bash
#via NPM
npm install vwo-fme-react-native-sdk

#via Yarn
yarn add vwo-fme-react-native-sdk
```

### Step 3: Install iOS Native Dependencies

Navigate to the generated `ios` folder and install CocoaPods dependencies:

```Text Bash
cd ios && pod install
```

* CocoaPods manages native iOS libraries.
* Running pod install ensures the SDK’s native code is properly linked.
* You need to have CocoaPods installed on your machine. If not, install it by running
  ```Text Bash
  # via gem
  sudo gem install cocoapods

  # or via brew
  brew install cocoapods
  ```

### Step 4: Android Setup

No additional steps are required for Android. The native code is linked automatically during the build process.

### Step 5: Verify Expo Architecture Compatibility

The VWO FME React Native SDK is compatible with both old and new React Native architectures in Expo.

* You can use the SDK with Expo SDK versions that have the new architecture enabled.
* To verify if the new architecture is enabled in an Expo project, you should check the app.json file where you can set the newArchEnabled option to true.
* Alternatively, use an Expo SDK version that supports the old architecture if running into issues in Expo SDK.

***

## Summary checklist

| Step                     | Command                             | Notes                                 |
| :----------------------- | :---------------------------------- | :------------------------------------ |
| Generate native folders  | `npx expo prebuild`                 | Required for native SDK integration   |
| Add SDK package          | `yarn add vwo-fme-react-native-sdk` | Adds SDK to your project dependencies |
| Install iOS pods         | `cd ios && pod install`             | Required for iOS native linking       |
| Android setup            | No extra steps                      | Android linking is automatic          |
| Verify Expo architecture | Check app.json file to verify       | Supports both old and new             |

## References

For detailed usage instructions and examples, please refer to links below:

> 📘 [FME React Native SDK documentation](https://developers.vwo.com/v2/docs/fme-react-native-initialization)

> 📘 [Example app](https://github.com/wingify/vwo-fme-examples/tree/master/react-native)