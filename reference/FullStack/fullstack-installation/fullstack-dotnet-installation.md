---
title: .NET SDK Installation
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
  "title": ".NET SDK Installation"
}
[/block]

To integrate VWO .NET SDK into your application, you first need to install the SDK through a package manager for .NET. VWO .NET SDK can be installed using [NuGet](https://www.nuget.org).
[block:api-header]
{
  "title": "Requirements"
}
[/block]

[block:callout]
{
  "type": "info",
  "body": "NetStandar2.0 or later",
  "title": "Note:"
}
[/block]

[block:api-header]
{
  "title": "Installation via NuGet"
}
[/block]
Make sure you run this command in the correct directory where your app resides.
[block:code]
{
  "codes": [
    {
      "code": "PM> Install-Package VWO.Sdk\n",
      "language": "shell"
    }
  ]
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
    "0-0": ".NET",
    "0-1": "https://github.com/wingify/vwo-dotnet-sdk"
  },
  "cols": 2,
  "rows": 1
}
[/block]