---
title: Cache Management
deprecated: false
hidden: true
metadata:
  robots: index
---
The `cachedSettingsExpiryTime` parameter allows you to manage how long the cached settings remain valid before the system fetches latest configuration from the VWO server.

By default, the SDK does not cache settings, meaning it fetches the latest configuration data from the VWO server every time on initialization.

### How to Use `cachedSettingsExpiryTime`

To utilize the `cachedSettingsExpiryTime` parameter, you need to initialize the VWO SDK with this option. Below is an example of how to set this up:

**Example usage**

```Text Swift
let options = VWOInitOptions(sdkKey: SDK_KEY, 
                             accountId: ACCOUNT_ID, 
                             cachedSettingsExpiryTime: 600000) // in milliseconds

```