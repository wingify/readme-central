---
title: Are there any repercussions of changing campaign settings mid-campaign?
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
Changing the campaign settings like changing the campaign traffic or changing the traffic distribution of the variations might result in an inconsistent experience for the already tracked users if no persistent user storage service system is integrated with the VWO SDK. This will result in the same user being tracked into multiple variations and the same would be reflected in the respective campaign reports.

Changing campaign settings without impacting the tracked users, please refer to the section. Please check how to implement a [persistent Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) and the FAQ - [Why is it important to use Persistent Storage when deploying to Production](https://developers.vwo.com/reference#fullstack-why-is-it-important-to-use-persistent-storage-when-deploying-to-production)?