---
title: Polling
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### The need for polling

When you initialize an instance of the *vwoClient* on your server, it automatically fetches the latest configurations and settings from your VWO account and makes them available to use within your project. It might happen though, that you make some changes to the feature flags or rules in VWO after having already initialized an instance of *vwoClient* in your server. We need to ensure there's some way for the *vwoClient* on your server to be up-to-date with the latest setup in the VWO dashboard. 

The way to keep the *vwoClient* updated on your server is by *polling* VWO servers at a fixed frequency to check for any changes. If detected, the new changes are fetched and vwoClient is updated.

## Polling of Settings from VWO

Polling is a mechanism of continuously fetching the settings from VWO and updating the old *vwoClient* with the latest settings. It is a continuous process and hence requires an input that specifies the frequency at which the settings should be fetched and checked.

<Image title="Polling.png" alt={1700} align="center" width="smart" src="https://files.readme.io/3481821-Polling.png">
  Polling
</Image>

**How frequently to poll?**

If you set the polling interval too short, there would be consequences like more TCP connections, bandwidth consumption, CPU and other resources consumption, and draining of batteries on mobile users.

If you set the polling interval too high, chances are you might end up using a stale version of settings for a longer duration.

> 📘 Optimal Polling Interval
>
> Finding the optimal polling interval is tricky as it depends on how frequently VWO campaign settings are changed and how much you're willing to compromise with the real-time updates.

## Usage

Our SDKs have built-in support for polling functionality. To allow these SDKs to register a polling mechanism internally and fetch the settings after the defined interval, you simply have to provide the polling interval. This polling interval must be specified as an optional parameter in the initialization step.
