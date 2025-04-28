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
[block:api-header]
{
  "title": "JavaScript SDK Installation"
}
[/block]

To integrate VWO JavaScript SDK into your web application, you first need to install the SDK through a package manager for JavaScript. VWO JavaScript SDK can be installed using either [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/).

There's one common repository since code is almost the same, written in JavaScript. VWO JavaScript SDK shares the code with our VWO Node.js SDK, build, and packaged differently. But the installation is the same as VWO Node.js SDK.
[block:api-header]
{
  "title": "Requirements"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "Latest browsers:\nChrome >= 60.0, Firefox >= 60.0, Safari >= 10.1, Edge >= 12, Opera >= 50",
  "title": "Note:"
}
[/block]

[block:api-header]
{
  "title": "Installation via npm"
}
[/block]
To integrate VWO JavaScript SDK into your web application through [npm](https://www.npmjs.com/), run the following command through the command line. Make sure you run this command in the correct directory where your app resides.
[block:code]
{
  "codes": [
    {
      "code": "npm install vwo-node-sdk --save",
      "language": "shell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Installation via yarn"
}
[/block]
To integrate VWO JavaScript SDK into your web application through [yarn](https://yarnpkg.com/en/), run the following command through the command line. Make sure you run this command in the correct directory where your app resides.
[block:code]
{
  "codes": [
    {
      "code": "yarn add vwo-node-sdk",
      "language": "shell"
    }
  ]
}
[/block]

[block:api-header]
{
  "title": "Installation via script tag"
}
[/block]
For client-side, VWO JavaScript SDK can also be used by directly downloading the SDK and using script tags in HTML
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"/path/to/vwo-javascript-sdk\" />",
      "language": "html"
    }
  ]
}
[/block]
Or can be downloaded from CDNs like [jsdelivr](https://www.jsdelivr.com/). For eg:
[block:code]
{
  "codes": [
    {
      "code": "<script src=\"https://cdn.jsdelivr.net/npm/vwo-node-sdk@1.7.2/dist/vwo-javascript-sdk.min.js\" />",
      "language": "html"
    }
  ]
}
[/block]

[block:callout]
{
  "type": "info",
  "title": "Note",
  "body": "Please check the official documentation of different CDNs on how to reference the library/SDK version when using it as *script's src*."
}
[/block]

[block:api-header]
{
  "title": "Source Code"
}
[/block]
The VWO SDK code is available in various languages on GitHub. All different SDKs published under Wingify Organization on GitHub are licensed under Apache 2.0 License (c) Wingify Pvt. Ltd. 2019-2020.

[block:parameters]
{
  "data": {
    "h-0": "Language",
    "h-1": "Repository",
    "0-0": "JavaScript",
    "0-1": "https://github.com/wingify/vwo-node-sdk"
  },
  "cols": 2,
  "rows": 1
}
[/block]