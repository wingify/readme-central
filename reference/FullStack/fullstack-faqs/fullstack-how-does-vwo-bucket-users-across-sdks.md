---
title: How does VWO bucket users across SDKs?
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
All the computation like deciding user eligibility for a campaign and variation assignment to a user are carried out by smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/reference#section-how-bucketing-works).

VWO also ensures that all of our SDKs give the same output. The bucketing user is language-agnostic.
