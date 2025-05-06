---
title: VWO FME Node SDK Edge Environment Support
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
When running the VWO Feature Management and Experimentation SDK on edge environments like Cloudflare Workers or similar serverless platforms, certain configurations need to be adjusted for optimal performance and compatibility. This document outlines the required parameters and settings to successfully run the SDK in edge computing environments.

## Key Configuration for Edge Environments

In edge environments, the SDK has to ensure that tracking calls are properly managed before resolving promises. To achieve this, the shouldWaitForTrackingCalls parameter must be explicitly set.

### Parameter: shouldWaitForTrackingCalls