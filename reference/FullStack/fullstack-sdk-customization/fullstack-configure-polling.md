---
title: Configure Polling
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
[Settings-file](https://developers.vwo.com/reference#fullstack-get-settings) is the representation of the VWO campaigns settings and is responsible for running campaigns with up-to-date configurations. As mentioned in the sections - [Caching](https://developers.vwo.com/reference#fullstack-best-practices-caching-your-settingsfile) and [Updating](https://developers.vwo.com/reference#fullstack-updating-cached-settings-file) the settings-file is an essential step in preventing the settings network requests to be made every time a user comes.

[block:api-header]
{
  "title": "Ways of Detecting Changes in Settings File"
}
[/block]
One way to detect a change in the settings-file is by polling VWO servers frequently, and when detected, update the settings file.

Another way to detect a change in the settings-file is by using Webhooks. Refer [Configure Webhooks](https://developers.vwo.com/reference#fullstack-configure-webhooks) to know about it.

[block:api-header]
{
  "title": "Polling of Settings File"
}
[/block]
Polling of settings-file is a mechanism of continuously fetching the settings from VWO and updating the old one with the latest version. It is a continuous process and hence, requires an input which tells after how long settings should be fetched.
Fetching the settings-file after a regular interval of time and using it helps in synchronizing the VWO Campaigns state with the server's state and helps in delivering a consistent and deterministic result.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/3481821-Polling.png",
        "Polling.png",
        1700,
        1242,
        "#eae6ee"
      ],
      "caption": "Polling",
      "sizing": "smart"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Drawbacks of using Polling"
}
[/block]
The polling comes with its own limitations.

* **How frequently to poll?**
If you set the polling interval too short, there would be consequences like more TCP connections, bandwidth consumption, CPU and other resources consumption, and draining of batteries on mobile users.
If you set the polling interval too high, chances are you might end up using a stale version of settings for a longer duration.
[block:callout]
{
  "type": "info",
  "body": "Finding the optimal polling interval is tricky as it depends on how frequently VWO campaign settings are changed and how much you're willing to compromise with the real-time updates.",
  "title": "Optimal Polling Interval"
}
[/block]

[block:api-header]
{
  "title": "Usage"
}
[/block]
Certain SDKs have in-built support of polling functionality. You simply have to provide the polling interval in order to allow these SDKs to register a polling mechanism internally and fetch the settings after the defined interval.

[block:code]
{
  "codes": [
    {
      "code": "var settingsFile = await vwoSdk.getSettingsFile(accountId, sdkKey);\n\nvwoSdk.lanuch({\n  settingsFile: settingsFile,\n  pollInterval: 1000 // in milliseconds\n  sdkKey: sdkKey\n})",
      "language": "javascript",
      "name": "Node.js"
    },
    {
      "code": "String settingsFile = VWOHelper.getSettingsFile(accountId, sdkKey);\n\nVWO vwoInstance = VWO.launch(settingsFile)\n  .withPollingInterval(1000) // in milliseconds\n  .withSdkKey(sdkKey)\n  .build();",
      "language": "java"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "warning",
  "title": "SDK Support",
  "body": "As of now, only **Node.js** and **Java** SDKs support this from **v1.8.2+** onwards."
}
[/block]
For other SDKs, please refer to [Updating your Settings File](https://developers.vwo.com/reference#fullstack-updating-cached-settings-file).