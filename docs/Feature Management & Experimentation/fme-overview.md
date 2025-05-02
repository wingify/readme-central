---
title: Overview
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This version of the documentation (v2) is for the new **FME (Feature Management & Experimentation)** product of VWO.

Please note that this is different from the ServerSide or FullStack Testing product that VWO already offered.

**FME** is a full-stack solution that integrates VWO's SDK into your server or mobile codebase and allows you to run feature tests, rollouts, personalization, and experimentation campaigns.

<br />

VWO FME lets you do the enterprise-grade testing of your product by deploying code behind features, experimenting with A/B tests, and rolling out or rolling back features immediately. With VWO FME, you can literally test anything - be it the search algorithms or recommendation engine for your e-commerce store or subscription workflows for your SaaS business. VWO FME is built to help you execute even the most complex tests. It enables you to test on any platform and not just limited to devices that have a browser. Think native apps, beacons, and connected devices.

With VWO FME, you can perform the testing wherein the variations of a particular test are rendered directly from the web server and are then sent to the visitors’ device. Implementing directly on the server allows you to run more sophisticated tests that might otherwise hamper the user experience if implemented on the client side. In addition to that, serverside testing is also opted for in cases when it is simply unfeasible to experiment on the client-side. For example, testing two different product recommendation algorithms for an eCommerce website.

<br />

**Typical use cases of VWO FME are:**

* Manage Features' Lifecycle With Feature Flag Management
* Deliver Features Confidently with Staged Feature Rollouts
* You can test multiple variations of the feature with a different set of variables
* A/B Test deep within your stack

VWO FME enables you to test much deeper. Rather than being limited to testing images or buttons on your website, you can test algorithms, architectures, and re-brands. But for complex applications, client-side testing may not be the best option: Layering more JavaScript on top of an already bulky application means an even slower load time and an even more cumbersome user experience.

Consider the following situation. An eCommerce store owner, with an aim to optimize for better conversions, wants to test two different checkout flows on both his/her website and mobile app at the same time. To do so, they need an advanced testing methodology, which is more inherent to the process and integrates with the website to ensure a seamless user experience. Neither of these is possible by running a simple A/B test on the client-side and that is why serverside testing is required.

### FME currently supports the following programming languages:

The VWO SDKs code is available in various languages on GitHub. All different SDKs published under Wingify Organization on GitHub are licensed under Apache 2.0 License (c) Wingify Software Pvt. Ltd. 2024.

| Language                                                                                          | Repository                                                                                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Server-side SDKs**                                                                              |                                                                                                                                                                                                                                                                                  |
| .NET                                                                                              | [https://github.com/wingify/vwo-fme-dotnet-sdk](https://github.com/wingify/vwo-fme-dotnet-sdk)                                                                                                                                                                                   |
| GO(thin-client, requires [*Gateway Service*](https://developers.vwo.com/v2/docs/gateway-service)) | [https://github.com/wingify/vwo-fme-go-sdk](https://github.com/wingify/vwo-fme-go-sdk)                                                                                                                                                                                           |
| Java                                                                                              | [https://github.com/wingify/vwo-fme-java-sdk](https://github.com/wingify/vwo-fme-java-sdk)                                                                                                                                                                                       |
| Node.js                                                                                           | [https://github.com/wingify/vwo-fme-node-sdk](https://github.com/wingify/vwo-fme-node-sdk)                                                                                                                                                                                       |
| JavaScript(client-side)                                                                           | [https://github.com/wingify/vwo-fme-node-sdk](https://github.com/wingify/vwo-fme-node-sdk)                                                                                                                                                                                       |
| React(web)                                                                                        | [https://github.com/wingify/vwo-fme-react-sdk](https://github.com/wingify/vwo-fme-react-sdk)                                                                                                                                                                                     |
| PHP                                                                                               | [https://github.com/wingify/vwo-fme-php-sdk](https://github.com/wingify/vwo-fme-php-sdk)                                                                                                                                                                                         |
| Python                                                                                            |                                                                                                                                                                                                                                                                                  |
| Ruby                                                                                              |                                                                                                                                                                                                                                                                                  |
| **Client-side SDKs**                                                                              |                                                                                                                                                                                                                                                                                  |
| Android                                                                                           |                                                                                                                                                                                                                                                                                  |
| iOS                                                                                               |                                                                                                                                                                                                                                                                                  |
| Flutter                                                                                           |                                                                                                                                                                                                                                                                                  |
| React Native                                                                                      | [https://github.com/wingify/vwo-fme-react-native-sdk](https://github.com/wingify/vwo-fme-react-native-sdk)                                                                                                                                                                       |
| React(web)                                                                                        | \[[https://github.com/wingify/vwo-fme-react-sdk\](tps://github.com/wingify/vwo-fme-react-sdkhttps://github.com/wingify/vwo-fme-react-sdk](https://github.com/wingify/vwo-fme-react-sdk]\(tps://github.com/wingify/vwo-fme-react-sdkhttps://github.com/wingify/vwo-fme-react-sdk) |

For any other languages or frameworks you want to use FME with or for a demo of the product, please reach out to us at [support@vwo.com](mailto:support@vwo.com).