---
title: Does VWO support User aliasing?
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
There might be scenarios when you have a situation like the following:

* Initially, users who land on my website are not logged in what User ID should I use for them? 
* Once they log in I have a different User ID for them. How do I manage this situation?

VWO SDKs operate on User ID. As long as the user ID is the same, SDKs will output consistent results, thereby, providing omnichannel testing support. If you have different IDs associated with the same user, please pass only one of them always or create another unique identifier that identifies the same user(logged-out vs logged-in) and pass it always. VWO currently does not provide a way to alias the multiple User IDs associated with the same user.
