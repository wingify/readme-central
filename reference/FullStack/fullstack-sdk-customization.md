---
title: Customize SDK
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
The VWO SDK provides built-in functionality of some key services like [logging](https://developers.vwo.com/reference#fullstack-sdk-customization-configure-the-logger), and [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service). These services are generic in nature and are fully extendable. The default implementation of these services is good for experimenting with things. 

For production, we encourage you to learn about these services and recommend implementing your own per your business requirements.

  * [Environment](https://developers.vwo.com/reference#fullstack-sdk-customization-set-environment): Configure your environment mode. The default is set to **production**.
  * [Logger](https://developers.vwo.com/reference#fullstack-sdk-customization-configure-the-logger): Configure how an SDK logs messages when certain events occur.
  * [User Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service): Configure how to save and look up stored data and SDK will use it.
  * [Configure Polling](ref:configure-polling) 
  * [Configure Event Batching](ref:configure-event-batching): Configure how and when to send impression events as a batch request