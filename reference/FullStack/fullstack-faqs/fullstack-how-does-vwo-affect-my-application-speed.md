---
title: How does VWO affect my application speed?
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
The benefits of using FullStack campaigns are that these are lightning-fast. With the help of our SDKs, you can get the variation assignment without making any blocking requests to VWO servers. All the computation like deciding user eligibility for a campaign and assigning variation to a user is carried out by our smart SDKs. We use a hashing algorithm [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash) to carry out our [bucketing logic](https://developers.vwo.com/reference#section-how-bucketing-works).

The only thing that could be blocking is [fetching settingsFile](https://developers.vwo.com/reference#full-stack-get-settings). The VWO SDK requires *settings file* for its instantiation. Either you can cache it or fetch it just after the server is up, if possible. See how to [manage settingsFIle](https://developers.vwo.com/reference#fullstack-get-settings).

As there is no client-side custom code execution, using a FullStack campaign is much faster.