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

## Benefits

* **Improved Performance:** By customizing the TTL and cache usage, you can optimize how often settings are fetched from the server, reducing unnecessary network requests and improving load times.
* Better Control: You can fine-tune how settings are stored and refreshed, ensuring that your application behaves exactly as needed depending on the environment and the use case.
* Flexible Caching: This update allows for a balance between always using fresh settings and reducing the reliance on server fetches, giving you more control over your caching strategy.
* Non-Blocking Updates: The background refresh feature ensures that the user experiences no delay in getting the settings, while the SDK silently keeps them updated in the background.

### Usage

```javascript
const vwoClient = await init({
  accountId: '123456',
  sdkKey: '32-alpha-numeric-sdk-key',
  clientStorage: {
    key: 'vwo_data', // Custom key used to store SDK data, default is 'vwo_fme_data'
    provider: sessionStorage, // Storage mechanism to use: can be sessionStorage or localStorage (default)
    isDisabled: false, // If true, disables client-side in-built storage altogether. Though can connect Storage Connector still
    alwaysUseCachedSettings: true, // Use cached settings regardless of TTL, defaults to false
    ttl: 3600000, // Custom TTL value in milliseconds (1 hour), defaults to 2 hours
  },
});

```