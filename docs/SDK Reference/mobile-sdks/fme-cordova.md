---
title: Cordova(Javascript)
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides step-by-step instructions to integrate the Wingify FE JavaScript SDK into a Cordova-based mobile application.

### What is Cordova?

[Apache Cordova](https://cordova.apache.org/) is an open-source mobile development framework that allows you to build cross-platform mobile applications using standard web technologies like HTML, CSS, and JavaScript. It wraps web applications in native containers, enabling them to run on iOS, Android, and other platforms while accessing native device features through plugins.

<br />

### Compatibility with Wingify FE JavaScript SDK

The FE JavaScript SDK integrates seamlessly with Cordova applications through CDN loading and local fallback mechanisms. Since Cordova runs web applications in native containers, the FE JavaScript SDK can be loaded directly via script tags and used throughout your Cordova app.

<br />

## Integration Steps

### 1. Create a Cordova Project

If you haven't already set up a Cordova project, follow these steps:

```shell
npm install -g cordova
cordova create myApp com.example.myapp MyApp
cd myApp
```

For detailed instructions, refer to the [Cordova Getting Started Guide](https://cordova.apache.org/docs/en/latest/guide/cli/).

<br />

### 2. Add Wingify FE JavaScript SDK via CDN

You can add the FE JavaScript SDK to your `www/index.html` within the `<head>` section by:

1. downloading it locally.
2. hosting it on your server.
3. using CDNs like jsDelivr.

> **Note**: If a local copy is used, the downloaded version of the SDK should be updated if the version is changed.

For reference, we're using `jsDelivr` CDN and local copy as backup:

```html
<head>
  <!-- Other head elements -->
  <script
    src="https://cdn.jsdelivr.net/npm/vwo-fme-node-sdk@1/dist/client/vwo-fme-javascript-sdk.min.js"
    onload="console.log('VWO SDK script loaded successfully from CDN')"
    onerror="console.error('Failed to load VWO SDK from CDN, trying local fallback'); loadVwoSdkFallback();">
  </script>
  <script>
    function loadVwoSdkFallback() {
      console.log('Loading VWO SDK from local fallback...');
      var script = document.createElement('script');
      script.src = 'js/vwo-fme-javascript-sdk.min.js';
      script.onload = function() {
        console.log('VWO SDK loaded successfully from local fallback');
      };
      script.onerror = function() {
        console.error('Failed to load VWO SDK from local fallback as well');
      };
      document.head.appendChild(script);
    }
  </script>
</head>
```

<br />

### 3. Create Configuration File

Create a `www/js/config.js` file to store your Wingify configuration:

```javascript
const FME_CONFIG = {
    FME_ACCOUNT_ID: 'your_account_id',
    FME_SDK_KEY: 'your_sdk_key',
    FLAG_NAME: 'your_flag_name',
    EVENT_NAME: 'your_event_name',
    VARIABLE_1_KEY: 'model_name',
    VARIABLE_2_KEY: 'query_answer',
    VARIABLE_2_CONTENT: 'Default response content',
    VARIABLE_2_BG: '#ffffff',
    MAX_LOG_MESSAGES: 200,
    customVariables: {}
};

window.FME_CONFIG = FME_CONFIG;
```

<br />

### 4. Create Wingify Setup File

Create a `www/js/vwo-setup.js` file to handle SDK initialization:

```javascript
let vwoClient = null;
let vwoLogs = [];

// Initialize VWO SDK
async function initVwo() {
    try {
        // Check if VWO SDK is available
        if (typeof vwoSdk === 'undefined') {
            throw new Error('VWO SDK not loaded. Please check your internet connection and try again.');
        }

        // Get configuration from config.js
        const config = window.FME_CONFIG;

        if (!config || !config.FME_SDK_KEY || !config.FME_ACCOUNT_ID) {
            throw new Error('Missing required VWO configuration.');
        }

        vwoClient = await vwoSdk.init({
            accountId: config.FME_ACCOUNT_ID,
            sdkKey: config.FME_SDK_KEY,
            logger: {
                level: 'DEBUG',
                transport: {
                    log: (level, message) => {
                        vwoLogs.push({ level, message, timestamp: new Date().toISOString() });
                    },
                },
            },
            pollInterval: 120000, // 2 minutes
        });

        window.vwoClient = vwoClient;
        return true;
    } catch (error) {
        console.error('Failed to initialize VWO FE SDK:', error);
        return false;
    }
}

// Get flag and track event
async function getVwoFlagAndTrack(userId, query) {
    if (!window.vwoClient) {
        throw new Error('VWO SDK not initialized');
    }

    const config = window.FME_CONFIG;
    const userContext = {
        id: userId,
        customVariables: config.customVariables || {}
    };

    try {
        // Get the flag
        const flag = await window.vwoClient.getFlag(config.FLAG_NAME, userContext);
        const isEnabled = flag.isEnabled();

        // Get variables
        const modelName = flag.getVariable(config.VARIABLE_1_KEY, '');
        const queryAnswer = flag.getVariable(config.VARIABLE_2_KEY, {
            background: '#ffffff',
            content: 'Default response content'
        });

        // Track event
        window.vwoClient.trackEvent(config.EVENT_NAME, userContext, {
            model: modelName,
            query: query,
            response: queryAnswer.content
        });

        return {
            isEnabled,
            modelName,
            content: queryAnswer.content,
            background: queryAnswer.background
        };
    } catch (error) {
        console.error('Error getting feature flag:', error);
        throw error;
    }
}
```

<br />

### 5. Initialize SDK

Call the initialization function when your app starts. Add this to your main JavaScript file or in a script tag:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize VWO SDK
    initVwo().then(success => {
        if (success) {
            console.log('VWO SDK initialized successfully');
        } else {
            console.error('Failed to initialize VWO SDK');
        }
    });
});
```

<br />

### 6. Use Wingify FE JavaScript SDK

Call the FE functions from your application logic:

```javascript
async function handleUserInteraction(userId, query) {
    try {
        const result = await getVwoFlagAndTrack(userId, query);

        if (result.isEnabled) {
            // Use feature flag variables
            displayResponse(result.content, result.background);
            console.log('Using model:', result.modelName);
        } else {
            // Use default behavior
            displayDefaultResponse();
        }
    } catch (error) {
        console.error('Error handling user interaction:', error);
        displayDefaultResponse();
    }
}

function displayResponse(content, background) {
    // Update UI with feature flag content
    document.getElementById('response').innerHTML = content;
    document.getElementById('response').style.backgroundColor = background;
}
```

<br />

<Callout icon="💡" theme="default">
  ### The Wingify Feature Experimentation (FE) SDK provides a range of APIs for managing feature flags and tracking user behavior. Key APIs include

  * [getFlag()](https://developers.vwo.com/v2/docs/fme-javascript-flags#/) to retrieve feature flag status and getting variables values
  * [trackEvent()](https://developers.vwo.com/v2/docs/fme-javascript-metrics#/) to send custom events for reporting
  * [setAttribute()](https://developers.vwo.com/v2/docs/fme-javascript-attributes#/) to send user attributes to Wingify
</Callout>

<br />

### 7. Add Platforms and Build

Add the platforms you want to target and build your project:

```shell
# Add platforms
cordova platform add browser

# Build the project
cordova build
```

<br />

## Platform-Specific Setup

### Android

1. Add Android platform:
   ```shell
   cordova platform add android
   ```

2. Build and run:
   ```shell
   cordova build android
   cordova run android
   ```

<br />

### iOS

1. Add iOS platform:
   ```shell
   cordova platform add ios
   ```

2. Build and run:
   ```shell
   cordova build ios
   cordova run ios
   ```

<br />

### Browser

1. Add browser platform:
   ```shell
   cordova platform add browser
   ```

2. Build and run:
   ```shell
   cordova build browser
   cordova run browser
   ```

<br />

## Code Reference

The complete source code for the Cordova example is available on [GitHub](https://github.com/wingify/vwo-fme-examples/tree/master/cordova).
