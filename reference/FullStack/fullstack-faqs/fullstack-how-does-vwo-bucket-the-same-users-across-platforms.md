---
title: How does VWO bucket the same users across platforms?
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
We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to get the hash value. This algorithm always returns the same hash value for the same User ID provided. So, even if your visitor comes from any platform, as long as you identify the user and provide us the same userId, we will provide him the same experience across platforms.