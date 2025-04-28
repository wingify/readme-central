---
title: Impact Analysis
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
## API Calls

VWO SDK makes three types of API calls to VWO CDNs depending on the API method used.

* [getSettings](https://developers.vwo.com/reference#fullstack-get-settings) - To fetch settings before SDK initialization.
* [activate](https://developers.vwo.com/reference#fullstack-sdk-activate) - To send an impression to the VWO server when a user becomes part of a campaign to count a new visitor. Only for A/B Campaign.
* [track](https://developers.vwo.com/reference#fullstack-sdk-track) - To send an impression to the VWO server when a user converts the goal of a campaign to count a conversion corresponding to a new visitor.
* [isFeatureEnabled](https://developers.vwo.com/reference#fullstack-sdk-is-feature-enabled) - To send an impression to the VWO server when a feature is enabled for a user to count a new visitor. Only for Feature Test Campaigns.
* [getFeatureVariableValue](https://developers.vwo.com/reference#fullstack-get-feature-variable-value) - does not send any impression call.
