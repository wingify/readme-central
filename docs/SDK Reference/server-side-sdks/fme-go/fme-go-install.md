---
title: Installing the SDK
excerpt: ''
deprecated: false
hidden: false
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
To integrate the VWO Feature Management and Experimentation SDK into your Go project, you can use Go modules to install it directly from GitHub.

## Requirements

- Go version 1.16 or higher

## Installation

Run the following command in your project directory:

```go
go get github.com/wingify/vwo-fme-go-sdk
```

This command will download and install the VWO FME SDK and its dependencies in your project.  
Import the SDK

After installation, you can import the SDK in your Go files:

```go
import vwo "github.com/wingify/vwo-fme-go-sdk"
```

<br />

Now, you're ready to initialize and use the SDK in your Go application.

Please note that the Go SDK requires the use of a Gateway Service. Make sure to set up the Gateway Service before initializing the SDK. For more information, see our [Gateway Service documentation](https://developers.vwo.com/v2/docs/gateway-service).