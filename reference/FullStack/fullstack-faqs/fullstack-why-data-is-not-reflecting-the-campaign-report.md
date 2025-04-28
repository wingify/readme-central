---
title: Why data is not reflecting the campaign report?
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
Please check the following:

* The development flag should **not** be ON(while launching the SDK).
* The settings-file on your server is up-to-date. For real-time updates, use [Webhooks](https://developers.vwo.com/reference#fullstack-configure-webhooks) or [Polling](https://developers.vwo.com/reference#fullstack-configure-polling).  
* The tracking calls are not reaching the VWO server because of some firewall settings at your end. 

For detailed information on how SDK is working, please check the logs by [enabling them logs or writing a custom logger](https://developers.vwo.com/reference#fullstack-sdk-customization-configure-the-logger).
