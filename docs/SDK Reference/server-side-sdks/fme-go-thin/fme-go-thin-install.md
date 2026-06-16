---
title: Installing the SDK
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-initialization
      title: Initialization
---
To integrate the VWO Feature Experimentation SDK into your Go project, you can use Go modules to install it directly from GitHub.

## Requirements

* Go version 1.16 or higher

## Installation

Run the following command in your project directory:

```shell
go get github.com/wingify/vwo-fme-go-sdk
```

This command will download and install the VWO FE SDK and its dependencies in your project.\
Import the SDK

After installation, you can import the SDK in your Go files:

```go
import vwo "github.com/wingify/vwo-fme-go-sdk"
```

<br />

You're ready to initialize and use the SDK in your Go application.

> 📘 Note
>
> The Go SDK requires the use of VWO Gateway Service. Make sure to set up the Gateway Service before initializing the SDK. For more information, see our [Gateway Service documentation](https://developers.wingify.com/v2/docs/gateway-service).

## Source Code

| Language | Repository                                                                             |
| :------- | :------------------------------------------------------------------------------------- |
| Go       | [https://github.com/wingify/vwo-fme-go-sdk](https://github.com/wingify/vwo-fme-go-sdk) |

The FE SDK code is available in various languages on GitHub. All the SDKs published under Wingify Organization on GitHub are licensed under Apache 2.0 License (c) Wingify Pvt. Ltd. 2024.