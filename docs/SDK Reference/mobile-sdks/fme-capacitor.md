---
title: Capacitor(JavaScript)
excerpt: >-
  This guide provides step-by-step instructions to integrate the FE JavaScript
  SDK into a Capacitor-based mobile application.
deprecated: false
hidden: false
metadata:
  robots: index
---
### What is Capacitor?

[Capacitor](https://capacitorjs.com/) is an open-source native runtime developed by the Ionic team that allows you to build cross-platform mobile applications using web technologies like `HTML`, `CSS`, and `JavaScript`. It enables web apps to run natively on iOS, Android, and the web with a single codebase.

<br />

### Compatibility with FE JavaScript SDK

The FE JavaScript SDK is designed to work seamlessly within web environments. Since Capacitor wraps web applications in a native container, the FE JavaScript SDK can be integrated directly into the web portion of your Capacitor app. This integration allows you to leverage FE’s features without needing native SDKs.

<br />

## Integration Steps

### 1. Create a Capacitor Project

If you haven’t already set up a Capacitor project, follow these steps:

```shell
npm init @capacitor/app
```

Follow the prompts to set up your app. For detailed instructions, refer to the [Capacitor Getting Started Guide](https://capacitorjs.com/docs/getting-started).

<br />

### 2. Add FE JavaScript SDK

Include the FE JavaScript SDK in your index.html file, typically located in your project's public or www directory. Insert the SDK script tag within the \<head> section:

```javascript
<head>
  <!-- Other head elements -->
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/wingify-fme-node-sdk@1/dist/client/wingify-fme-javascript-sdk.min.js" />
</head>
```

Replace the `src` attribute with the actual URL if you want to use the downloaded version.

<br />

### 3. Initialize FE SDK

After embedding the SDK, initialize it in your main JavaScript file or within a script tag in your HTML:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  wingifySdk.init({
    accountId: 'WINGIFY_ACCOUNT_ID',
    sdkKey: 'WINGIFY_SDK_KEY'
    // Additional configuration options
  });
});
```

Replace `WINGIFY_ACCOUNT_ID` and `WINGIFY_SDK_KEY` with your actual FE account ID. Refer to the [FE JavaScript documentation](https://developers.wingify.com/v3/docs/fme-javascript) for additional configuration options.

<br />

### 4. Build and Sync Your Project

After setting up your project and integrating the FE SDK, build your project and sync it with the native platforms:

```shell
npm run build

npx cap sync
```

This will copy your web assets into the native iOS and Android projects.

<br />

## Platform-Specific Setup

### Android

1. Add the Android platform to your project:

```shell
npx cap add android
```

2. Open the Android project in Android Studio:

```shell
npx cap open android
```

3. Run your app on an emulator or connected device.

<br />

### iOS

1. Add the iOS platform to your project:
   ```shell
   npx cap add ios
   ```
2. Open the iOS project in Xcode:
   ```shell
   npx cap open ios
   ```
3. Run your app on a simulator or connected device.

<br />
