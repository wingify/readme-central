---
title: What latency do activate and track API calls add to my backend?
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
For **asynchronous languages** like Node.js, Java, .NET, and Go, the tracking calls are asynchronous. Thereby, there's no significant impact on the latency when using such APIs.

For **synchronous languages** like PHP, Python, and Ruby, ~150 ms of latency is added to each such API call as these APIs send tracking calls from your server to the VWO server.

Note: For PHP, we have [optimized our tracking approach](https://vwo.com/product-updates/improvements-in-vwo-fullstack/) for sending the calls which reduced the overall latency by one-third.