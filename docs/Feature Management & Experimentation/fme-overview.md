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

With VWO FME, you can perform the testing wherein the variations of a particular test are rendered directly from the web server and are then sent to the visitors’ devices. Implementing directly on the server allows you to run more sophisticated tests that might otherwise hamper the user experience if implemented on the client side. In addition to that, server-side testing is also opted for in cases when it is simply unfeasible to experiment on the client-side. For example, testing two different product recommendation algorithms for an e-commerce website.

<br />

**Typical use cases of VWO FME are:**

* Manage Features' Lifecycle With Feature Flag Management
* Deliver Features Confidently with Staged Feature Rollouts
* You can test multiple variations of the feature with a different set of variables
* A/B Test deep within your stack

VWO FME enables you to test much deeper. Rather than being limited to testing images or buttons on your website, you can test algorithms, architectures, and re-brands. But for complex applications, client-side testing may not be the best option: Layering more JavaScript on top of an already bulky application means an even slower load time and an even more cumbersome user experience.

Consider the following situation. An eCommerce store owner, with an aim to optimize for better conversions, wants to test two different checkout flows on both his/her website and mobile app at the same time. To do so, they need an advanced testing methodology, which is more inherent to the process and integrates with the website to ensure a seamless user experience. Neither of these is possible by running a simple A/B test on the client-side and that is why serverside testing is required.

### FME currently supports the following programming languages:

#### Server-side SDKs

<Cards columns={4}>
  <Card title="" href="https://developers.vwo.com/v2/docs/fme-node">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" width="24" alt="Node.js logo" /> Node.js
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-java">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg" width="24" alt="Java logo" /> Java
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-python">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="24" alt="Python logo" /> Python
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-ruby">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-original.svg" width="24" alt="Ruby logo" /> Ruby
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-dotnet">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg" width="24" alt=".NET logo" /> .NET
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-go">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original.svg" width="24" alt="Go logo" /> Go
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-php">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" width="24" alt="PHP logo" /> PHP
  </Card>
</Cards>

#### Client-side SDKs

<Cards columns={4}>
  <Card title="" href="https://developers.vwo.com/v2/docs/fme-android">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/android/android-original.svg" width="24" alt="Android logo" /> Android
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-ios">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg" width="24" alt="Swift logo" /> iOS
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-react-native">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="24" alt="React-Native logo" /> React-Native
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-flutter">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" width="24" alt="Flutter logo" /> Flutter(Dart)
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-javascript">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="24" alt="JavaScript logo" /> JavaScript(web)
  </Card>

  <Card title="" href="https://developers.vwo.com/v2/docs/fme-react">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="24" alt="React logo" /> React(web)
  </Card>
</Cards>

For any other languages or frameworks you want to use FME with or for a demo of the product, please reach out to us at [support@vwo.com](mailto:support@vwo.com).

The VWO SDKs code is available in various languages on GitHub. All different SDKs published under Wingify Organization on GitHub are licensed under Apache 2.0 License (c) Wingify Software Pvt. Ltd. 2024-2025.