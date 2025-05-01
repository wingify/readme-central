---
title: Measuring impact
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
      slug: caching-your-settingsfile
      title: Caching Your settingsFile
---
VWO SDKs make different types of network calls to VWO server depending on the API method used.

* *getSettingsFile* - To fetch settings before SDK initialization.
* *activate* - To send an impression to the VWO server when a user becomes part of a campaign to count a new visitor. Only for A/B Campaign.
* *getVariationName* - Does not send any impression call.
* track - To send an impression to the VWO server when a user converts a goal of a campaign to count a conversion corresponding to a new visitor.
* *isFeatureEnabled* - To send an impression to the VWO server when a feature is enabled for a user to count a new visitor. Only for Feature Test Campaigns.
* *getFeatureVariableValue* - Does not send any impression call.