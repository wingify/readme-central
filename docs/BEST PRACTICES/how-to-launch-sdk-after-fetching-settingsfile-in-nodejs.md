---
title: How to launch SDK after fetching SettingsFile in Node.js
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
  pages:
    - type: basic
      slug: event-batching-for-synchronous-langauges-1
      title: Event Batching for Synchronous Langauges
---
Since Node.js or JavaScript SDK fetches settings-file asynchronously, please ensure to launch SDK once the settings-file has fetched.

> ❗️ WRONG WAY
>
> The below example demonstrates the wrong usage.

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

// settingsFile will be a Promise Object, not the actual settings
var settingsFile = vwoSDK.getSettingsFile(accountId, sdkKey);

// This will log that settings-file is corrupted as settingsFile is a Promise Object instead of actual campaigns' settings
vwoClientInstance = vwoSDK.launch({
  settingsFile: settingsFile
});
```

> 👍 IDEAL WAY
>
> The below example demonstrates how to use the SDK correctly.

```javascript Node.js
var vwoSDK = require('vwo-node-sdk');

vwoSDK.getSettingsFile(accountId, sdkKey).then(function (data) {
  // ...launch SDK and call APIs
  
  vwoClientInstance = vwoSDK.launch({
  	settingsFile: data
	});
  
  // Example:
  // vwoClientInstance.activate(campaignKey, userId, options)
});
```
