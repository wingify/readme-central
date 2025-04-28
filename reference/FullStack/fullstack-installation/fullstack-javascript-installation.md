---
title: JavaScript SDK Installation
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
## JavaScript SDK Installation

To integrate VWO JavaScript SDK into your web application, you first need to install the SDK through a package manager for JavaScript. VWO JavaScript SDK can be installed using either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/).

There's one common repository since code is almost the same, written in JavaScript. VWO JavaScript SDK shares the code with our VWO Node.js SDK, build, and packaged differently. But the installation is the same as VWO Node.js SDK.

## Requirements

> 📘 Note:
>
> Latest browsers:\
> Chrome >= 60.0, Firefox >= 60.0, Safari >= 10.1, Edge >= 12, Opera >= 50

## Installation via npm

To integrate VWO JavaScript SDK into your web application through [npm](https://www.npmjs.com/), run the following command through the command line. Make sure you run this command in the correct directory where your app resides.

```shell
npm install vwo-node-sdk --save
```

## Installation via yarn

To integrate VWO JavaScript SDK into your web application through [yarn](https://yarnpkg.com/en/), run the following command through the command line. Make sure you run this command in the correct directory where your app resides.

```shell
yarn add vwo-node-sdk
```

## Installation via script tag

For client-side, VWO JavaScript SDK can also be used by directly downloading the SDK and using script tags in HTML

```html
<script src="/path/to/vwo-javascript-sdk" />
```

Or can be downloaded from CDNs like [jsdelivr](https://www.jsdelivr.com/). For eg:

```html
<script src="https://cdn.jsdelivr.net/npm/vwo-node-sdk@1.7.2/dist/vwo-javascript-sdk.min.js" />
```

> 📘 Note
>
> Please check the official documentation of different CDNs on how to reference the library/SDK version when using it as *script's src*.

## Source Code

The VWO SDK code is available in various languages on GitHub. All different SDKs published under Wingify Organization on GitHub are licensed under Apache 2.0 License (c) Wingify Pvt. Ltd. 2019-2020.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Language
      </th>

      <th>
        Repository
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        JavaScript
      </td>

      <td>
        [https://github.com/wingify/vwo-node-sdk](https://github.com/wingify/vwo-node-sdk)
      </td>
    </tr>
  </tbody>
</Table>
