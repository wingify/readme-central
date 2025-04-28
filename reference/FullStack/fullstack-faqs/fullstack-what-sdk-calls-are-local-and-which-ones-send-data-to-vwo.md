---
title: What SDK calls are local and which ones send data to VWO?
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
Following calls are responsible for tracking data from the server where SDK is implemented to the VWO server:

* **[activate](https://developers.vwo.com/reference#fullstack-sdk-activate)** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running A/B campaigns' report along with providing the variation assigned for a particular user. 

* **[isFeatureEnabled](https://developers.vwo.com/reference#fullstack-sdk-is-feature-enabled
)** API sends a visitor-tracking call to the VWO server so that the same could be reflected in the respective server-side running Feature Test campaigns report along with providing the decision whether the feature is enabled for a particular user. 

* **[track](https://developers.vwo.com/reference#fullstack-sdk-track)** API sends a conversion-tracking call to the VWO server so that the same could be reflected in the respective server-side running campaigns report. This API is applicable for A/B and Feature Test both.