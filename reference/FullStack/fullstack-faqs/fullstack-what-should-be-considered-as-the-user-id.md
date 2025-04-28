---
title: What should be considered as the User ID?
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
User Identifier, also abbreviated as User ID, is a way to uniquely identify a user. Since campaigns are directly associated with users, our SDK relies on a User ID that you provide. User ID is simply a string and can have any value as per your business requirements.

You can use a client-side first-party cookie which will be available when any request to your server is made or device ID or use universal user identifier (UUID) to identify each user. But make sure, if you want a consistent behavior for a user, the same User ID should be provided each time.

For example, a user comes on the website for the first time and you assigned a User ID as ***f34c3d91-a66e-4389-92fb-595fa9874725*** to that user. Let's assume our SDK buckets the user into *Variation-1*. Now, if the same user comes back, please make sure to provide the same User ID for getting the consistent result from the VWO SDKs.

Choosing an IP address is not recommended as the IP address of a user might change over a period of time and thus, VWO SDKs will operate the same user differently as the User ID you would pass in different APIs will keep on changing. Following are the cases where IP address does not fit:

* You want to show consistent behavior to the same user across different platforms. The IP address of the user might vary across different devices.
* The user might change the networks, thereby getting a different IP address.
* The user might be using a VPN, thereby chances of getting a different IP address time-to-time.
