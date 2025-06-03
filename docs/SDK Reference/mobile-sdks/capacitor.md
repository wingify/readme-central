---
title: Capacitor
excerpt: >-
  This guide provides step-by-step instructions to integrate the FME JavaScript
  SDK into a Capacitor-based mobile application.
deprecated: false
hidden: true
metadata:
  robots: index
---
### What is Capacitor?

[Capacitor](https://capacitorjs.com/) is an open-source native runtime developed by the Ionic team that allows you to build cross-platform mobile applications using web technologies like HTML, CSS, and JavaScript. It enables web apps to run natively on iOS, Android, and the web with a single codebase.

<br />

### Compatibility with FME JavaScript SDK

The FME JavaScript SDK is designed to work seamlessly within web environments. Since Capacitor wraps web applications in a native container, the FME JavaScript SDK can be integrated directly into the web portion of your Capacitor app. This integration allows you to leverage FME’s features without the need for native SDKs.

<br />

## Integration Steps

### 1. Create a Capacitor Project

If you haven’t already set up a Capacitor project, follow these steps:

```shell
npm init @capacitor/app
```

Follow the prompts to set up your app. For detailed instructions, refer to the [Capacitor Getting Started Guide](https://capacitorjs.com/docs/getting-started).

<br />

### 2. Add FME JavaScript SDK

Include the FME JavaScript SDK in your index.html file, typically located in the public or www directory of your project. Insert the SDK script tag within the \<head> section:

```javascript
<head>
  <!-- Other head elements -->
  <script src="https://cdn.jsdelivr.net/npm/vwo-fme-node-sdk@1/dist/client/vwo-fme-javascript-sdk.min.js"></script>
</head>
```

Replace the src attribute with the actual URL provided by FME for the SDK.

<br />

### 3. Initialize FME SDK

After including the SDK, initialize it in your main JavaScript file or within a script tag in your HTML:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  FME.init({
    accountId: 'YOUR_ACCOUNT_ID',
    // Additional configuration options
  });
});

```

Replace 'YOUR\_ACCOUNT\_ID' with your actual FME account ID. Refer to the [FME documentation](https://developers.vwo.com/v2/docs/fme-javascript) for additional configuration options.

<br />

### 4. Build and Sync Your Project

After setting up your project and integrating the FME SDK, build your project and sync it with the native platforms:

```shell
npm run build

npx cap sync
```

This will copy your web assets into the native iOS and Android projects.

<br />

<br />

## Platform-Specific Setup

### Android

1. Add the Android platform to your project:

```shell
npx cap add android
```

<br />

2. Open the Android project in Android Studio:

```shell
npx cap open android
```

<br />

3. Run your app on an emulator or connected device.

<br />

### iOS

1. Add the iOS platform to your project:
   ```shell
   npx cap add ios
   ```
   <br />
2. Open the iOS project in Xcode:
   ```shell
   npx cap open ios
   ```

<br />

3. Run your app on a simulator or connected device.