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
[block:callout]
{
  "type": "danger",
  "title": "WRONG WAY",
  "body": "The below example demonstrates the wrong usage."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "var vwoSDK = require('vwo-node-sdk');\n\n// settingsFile will be a Promise Object, not the actual settings\nvar settingsFile = vwoSDK.getSettingsFile(accountId, sdkKey);\n\n// This will log that settings-file is corrupted as settingsFile is a Promise Object instead of actual campaigns' settings\nvwoClientInstance = vwoSDK.launch({\n  settingsFile: settingsFile\n});",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "success",
  "title": "IDEAL WAY",
  "body": "The below example demonstrates how to use the SDK correctly."
}
[/block]

[block:code]
{
  "codes": [
    {
      "code": "var vwoSDK = require('vwo-node-sdk');\n\nvwoSDK.getSettingsFile(accountId, sdkKey).then(function (data) {\n  // ...launch SDK and call APIs\n  \n  vwoClientInstance = vwoSDK.launch({\n  \tsettingsFile: data\n\t});\n  \n  // Example:\n  // vwoClientInstance.activate(campaignKey, userId, options)\n});\n\n",
      "language": "javascript",
      "name": "Node.js"
    }
  ]
}
[/block]