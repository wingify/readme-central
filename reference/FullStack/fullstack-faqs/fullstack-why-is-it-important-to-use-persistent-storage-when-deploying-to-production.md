---
title: Why is it important to use Persistent Storage when deploying to Production?
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
VWO FullStack testing offers multi-platform testing i.e. you can run omnichannel tests to track and boost conversions. For this, VWO SDKs only require a unique identifier for the user using your application. As long as the identifier is the same, SDKs will provide consistent results without any need for storing anything either at your end or VWO's end.

We recommend using a [Persistent Storage Service](https://developers.vwo.com/reference#fullstack-sdk-customization-implement-a-user-storage-service) at your end in the following scenarios:

* If your campaign's traffic distribution is changing from time-to-time. 
* If the campaign's variation distribution is changing from time-to-time.
* You want to track only unique visitors and conversions.

In all the above-mentioned scenarios, VWO SDKs may not provide consistent results for the users that became part of the campaign. In order to show your users' consistent behavior throughout the journey, use a persistent data store and connect it with the VWO SDK.