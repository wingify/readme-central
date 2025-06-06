---
title: Cache Settings
deprecated: false
hidden: true
metadata:
  robots: index
---
We’ve introduced enhanced storage configuration options to give more flexibility in managing how settings are cached and refreshed in browser environments. These new configurations allow for more granular control over the storage mechanism, improving performance and enabling better control over cache duration.

### Key Features:

1. **Custom ttl (Time To Live) Option**
   * The ttl setting allows to specify how long the settings should remain valid in the storage. If not specified, the default TTL is set to 2 hours. This helps in controlling the frequency with which settings are refreshed from the server.\
     Note - The TTL value is specified in milliseconds.
   * This is especially useful when you want to limit the frequency of network requests and instead rely on cached settings for performance.
2. **`alwaysUseCachedSettings`Option**
   * When enabled, the SDK will always use cached settings, regardless of the TTL value. This means the settings stored in the browser will be used even if they have expired based on the TTL.
   * By default, this option is disabled. If disabled, the SDK will check the TTL and refresh settings as per the specified interval.
3. **Background Refresh**
   * When valid cached settings are returned and the TTL has not expired, the SDK will use the cached settings immediately. While doing so, it will asynchronously refresh the settings in the background. This helps in ensuring the settings are up to date without introducing delays in loading or performance bottlenecks.
   <br />

### Usage

```javascript
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  
  clientStorage: {
    // Custom key used to store SDK data, default is 'vwo_fme_data'
    key: 'vwo_data',
    // Storage mechanism to use: can be sessionStorage or localStorage (default)
    provider: sessionStorage,
    // If true, disables client-side in-built storage altogether. Though can connect Storage Connector still
    isDisabled: false,
  },
});
```