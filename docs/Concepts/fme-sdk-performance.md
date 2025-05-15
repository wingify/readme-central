---
title: Performance and Benchmarking
deprecated: false
hidden: true
metadata:
  robots: index
---
## Overview

This document provides insights into the performance characteristics of VWO FME SDKs across environments such as backend and client-side(mobile and browser) applications. It includes benchmarking data, impact on system resources, and network usage during various SDK operations.

<br />

## Local Evaluation

VWO FME SDKs are designed with local decision-making as a core principle. Once initialized with configuration data fetched from VWO DACDN, all flag evaluations, variable resolutions, and targeting decisions are performed entirely within the SDK, without additional network calls. This approach ensures sub-millisecond response times for decision APIs like getFlag() and getVariable(), making our SDKs highly performant and suitable for latency-sensitive applications across backend services, mobile apps, and client-side environments.

We have benchmarked our SDKs across various use cases and environments to validate their low-latency and low-overhead nature. You can find below the detailed benchmark metrics, resource usage stats, and operational characteristics that demonstrate their performance at scale.

<br />

## Metrics

1. Performance Impact on Application
2. Initialization Performance
3. Method Benchmarks
4. Memory and Resource Utilization
5. Network Usage Profile
6. HTTP Endpoint Interactions
7. SDK Footprint

### Performance Impact on Application

<br />

### Initialization Time

VWO FME SDKs are optimized for fast, non-blocking startup. When the init() method is called, the SDK asynchronously fetches the configuration settings from VWO DACDN, a globally distributed CDN. These settings contain all required data for flag evaluations, experiment configurations, targeting rules, and variable definitions.

**Key Points:**

* **Asynchronous fetch**: The SDK **does not block** the main application thread during initialization. The HTTP request to retrieve settings happens in the background, ensuring your application remains responsive and performant.
* **Settings are required for evaluation**: The SDK relies on the fetched settings to make decisions using methods like *getFlag()*, *getVariable()*, and *track()*. These methods cannot return accurate results until the settings are fully loaded and parsed.

#### Cold Start

* **Scenario**: First-time SDK load after process start.
* **Time Taken**: \~70-80ms
* **Size of Settings File Fetched**: \~2-3 kB for 10 running feature flags(depends on the number of running feature flags and their configuration).
* **Network Latency to DaCDN**: \~50ms(Check Uptime and Avg response time - [here](https://status.vwo.com/#/components/P4CJ5YG_lN8Fh07rnB3KSd3ZTTgIxok46ugVHX49GB0Hy_bMBS9kv3d9fS6iXhzH))

#### Warm Start

* **Scenario**: SDK loads with previously cached settings.
* **Time Taken**: \~15-30ms

> 📘 Note
>
> The SDK fetches configuration from VWO DACDN, which serves static, edge-cached settings files with industry-leading low latency. This ensures reliable performance even under large-scale rollouts.
>
> Our Content Delivery Network (CDN) runs using a Global Load Balancer, deployed in Google Cloud Platform (GCP), and the backend servers are spread across 14 locations each in Japan, Australia, Singapore, India, Brazil, Netherlands, Belgium, Germany, 2 cities in the UK, and 4 cities in the US to help us serve dynamic requests for tests. Read more [here](https://help.vwo.com/hc/en-us/articles/360021116194-Where-are-VWO-data-centers-located)

### SDK Methods Benchmarking

To help you understand the performance impact of using the VWO FME SDK in real-world applications, we benchmarked key SDK methods across multiple environments. These benchmarks include execution latency, memory footprint, and whether any external network calls are made.

The results below represent average and worst-case scenarios for commonly used methods such as *init()*, *getFlag()*, *trackEvent()*, *setAttribute*, and others.

* **init**\
  While initialization involves a single HTTP request to VWO DACDN, it’s executed asynchronously. Once initialized, no additional settings fetches are made unless a refresh is triggered manually, via polling, or via webhooks.
* **getFlag / getVariable**\
  These are local-only operations. They resolve decisions from the SDK’s in-memory settings without any delay or network latency. *getFlag()* triggers an asynchronous tracking call for reporting purposes, but this does not affect evaluation time. Events can be batched and dispatched asynchronously by configuring batching parameters while initializing the SDK, minimizing impact on the request lifecycle further.
* **trackEvent**\
  This method records user events like error rates tracking, latency, goal conversions or exposures. It triggers an asynchronous tracking call for reporting purposes, but this does not affect the application. Events can be batched and dispatched asynchronously by configuring batching parameters while initializing the SDK, minimizing impact on the request lifecycle further.
* **setAttribute**\
  This method records user attributes that can also be used inside campaign reports to post-segment the report's data. It triggers an asynchronous tracking call for reporting purposes, but this does not affect the application. Events can be batched and dispatched asynchronously by configuring batching parameters while initializing the SDK, minimizing impact on the request lifecycle further.

<br />

<Table>
  <thead>
    <tr>
      <th>
        Method
      </th>

      <th>
        Avg Time (ms)
      </th>

      <th>
        Memory Used
      </th>

      <th>
        HTTP Call
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `init()`
      </td>

      <td>

      </td>

      <td>

      </td>

      <td>
        For fetching VWO settings asynchronously.
      </td>
    </tr>

    <tr>
      <td>
        `getFlag()`
      </td>

      <td>

      </td>

      <td>

      </td>

      <td>
        Not for evaluation.
        Only asynchronous tracking call.
      </td>
    </tr>

    <tr>
      <td>
        `trackEvent()`
      </td>

      <td>

      </td>

      <td>

      </td>

      <td>
        Not for evaluation.
        Only asynchronous tracking call.
      </td>
    </tr>

    <tr>
      <td>
        `setAttribute()`
      </td>

      <td>

      </td>

      <td>
        *Negligible*
      </td>

      <td>
        Not for evaluation.\\
        Only asynchronous tracking call.
      </td>
    </tr>
  </tbody>
</Table>

### Memory and Resource Utilization

VWO FME SDKs are designed with a strong emphasis on low resource usage, making them suitable for both server-side and client-side applications where memory, CPU, and garbage collection overhead must be minimal.

This section outlines the typical memory footprint and runtime resource behavior of the SDK during different stages of its lifecycle.

### Footprint

| Phase                      | Typical Memory Usage | Description                                                                                                                        |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Post-init (Cold Start)** | *\[XX MB]*           | Memory used after fetching and loading settings from VWO DACDN. Includes parsing and in-memory caching of rules and configuration. |
| **Steady State (Idle)**    | *\[XX MB]*           | Memory usage during regular flag evaluations and event tracking, excluding settings refresh. Remains stable with minimal growth.   |
| **Peak Usage**             | *\[XX MB]*           | Observed when batching large events or refreshing settings. Still remains within acceptable limits for production use.             |

> ⚠️ Note
>
> Memory footprint may vary slightly based on the size of your configuration (number of flags, experiments, etc.) and the programming environment.

### Network Usage Profile

### HTTP Endpoint Interactions

### SDK Footprint

<br />

## Impact Summary

| Area of Impact     | SDK Behavior                                 |
| ------------------ | -------------------------------------------- |
| Request Latency    | Negligible (evaluation is local)             |
| Thread Blocking    | None (all HTTP calls are async)              |
| CPU                | Minimal (rule-based evaluation)              |
| Memory             | Stable and predictable                       |
| Failure Resilience | Settings and Tracking fallback, retry queues |
| Cold Start         | Asynchronous, does not block main execution  |

<br />

## Best Practices

* Initialize the SDK only once per app/server process.
* Use ***getFlag()*** and ***getVariable()*** freely, they perform evaluations locally and do not make any blocking network calls. However, getFlag() does asynchronously trigger a user tracking request to the VWO server in the background, ensuring that application performance and response latency remain unaffected.
* Use event batching to track custom events in backend/mobile applications.