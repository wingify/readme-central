---
title: Explicit SDK Settings Configuration
deprecated: false
hidden: false
metadata:
  robots: index
---
This page describes how to retrieve settings from the server and pass them to the SDKs. By following these steps, you can optimize your SDK initialization by reducing the time spent fetching settings on each request.

## Fetching Settings from the Server

The settings required for SDK initialization can be retrieved from the server via a special endpoint. To get the settings, you can make a GET request to the following URL:

```text
https://dev.visualwebsiteoptimizer.com/server-side/v2-settings?i={sdkKey}&a={accountId}&sn={sdkName}&sv={skdVersion}&r={randomValue}
```

Where:

* `{sdkKey}`:  VWO SDK key.
* `{accountId}`: VWO Account ID.
* `{skdName}`: VWO FE SDK Name
* `{sdkVersion}`: VWO FE SDK Version
* `{randomValue}`: A random value used to prevent caching. You can generate a random value using `Math.random()` (or any other suitable method in your environment). For eg: `0.342411122`

<Callout icon="📘" theme="info">
  The URL provided above is the official VWO endpoint for retrieving the settings of your active feature flags.
</Callout>

#### Example Response:

The server will return the settings in JSON format. Example:

```json
{
    "accountId": "123456",                  // VWO Account ID
    "sdkKey": "32-chars-alphanumeric-key",  // VWO SDK Key
    "features": {                           // features configurations here 
        // ...
    },
    "campaigns": {                          // campaigns configuration here
       // ...
    },
    "version": 1
}
```

### Passing the Settings to the SDK Initialization

Once you have fetched the settings, you can directly pass them to your SDK's `init` method. This allows you to bypass the automatic settings fetching process, significantly improving initialization time.

```node
const vwoInstance = await init({
  settings: settings
});
```

<br />

### Benefits of Passing Settings Explicitly

* **Faster Initialization**: By passing pre-fetched settings, the SDK doesn't need to fetch them automatically, reducing initialization time.
* **Customization**: You can pre-load the settings or customize them before passing them to the SDK.

<Callout icon="🚧" theme="warn">
  **Handling Expired or Stale Settings**: If the settings fetched from the server are time-sensitive, make sure to implement logic to refresh them periodically.
</Callout>
