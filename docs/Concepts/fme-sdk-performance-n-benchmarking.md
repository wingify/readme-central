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

### Benchmarking Environment

To ensure accurate and consistent performance evaluation, all benchmarks presented in this document were conducted on a dedicated server with the following configuration:

* **CPU**: 16-core (x86\_64 architecture)
* **Memory**: 32 GB RAM
* **Operating System**: Debian GNU/Linux 10 (buster) 10.13

> 📘 Note
>
> Benchmarks are representative of high-performance production environments and help assess SDK behavior under typical backend and service workloads.

To help you understand the performance characteristics of the VWO FME SDKs across different environments, we’ve broken down key technical dimensions that are critical for evaluating SDK integration in production systems.

In the following sections, you'll find detailed insights on:

1. [Performance Impact on Application](#performance-impact-on-application) - Understand how SDK operations affect your app’s responsiveness and runtime performance.
2. [Initialization Time](#initialization-time)  - Learn about the startup behavior of the SDK and how it handles configuration loading.
3. [SDK Method Benchmarks](#sdk-method-benchmarks)  - Dive into micro-benchmarks for common methods like getFlag, track, and others.
4. [Memory and Resource Utilization](#memory-and-resource-utilization) - Explore the runtime memory and CPU characteristics under typical workloads.
5. [Network Usage Profile](#network-usage-profile) - See how the SDK communicates over the network, what calls are made, and how frequently.
6. [SDK Footprint](#sdk-footprint) - Evaluate the size, CPU usage, and runtime behavior of the SDK in constrained environments.
7. [Deployment Suitability](#deployment-suitability) - Get recommendations on where and how the SDK can be safely deployed across serverless, mobile, edge, and backend stacks.

These insights will help engineering teams make informed decisions about SDK usage in performance-sensitive applications.

<br />

## Performance Impact on Application

SDK Overhead (During Request Lifecycle)

| Operation         | Latency Added (approx.) | Blocking? | Description                                                               |
| ----------------- | ----------------------- | --------- | ------------------------------------------------------------------------- |
| Initialization    | \< 100 ms               | No        | Fetches and caches settings                                               |
| Flag Evaluation   | \~ 5-25 ms              | No        | Done in-memory; no HTTP involved                                          |
| Event Tracking    | \< 5 ms                 | No        | Actual dispatch happens out-of-band                                       |
| Attribute Updates | \< 2 ms                 | No        | Updates user attributes used for post-segmenting the VWO campaign reports |

<br />

> 📘 Note
>
> The SDK does not introduce measurable latency into HTTP servers or rendering flows when used as recommended (initialize once, evaluate per request, batch events).

<br />

## Initialization Time

VWO FME SDKs are optimized for fast, non-blocking startup. When the init() method is called, the SDK asynchronously fetches the configuration settings from VWO DACDN, a globally distributed CDN. These settings contain all required data for flag evaluations, experiment configurations, targeting rules, and variable definitions.

**Key Points:**

* **Asynchronous fetch**: The SDK **does not block** the main application thread during initialization. The HTTP request to retrieve settings happens in the background, ensuring your application remains responsive and performant.
* **Settings are required for evaluation**: The SDK relies on the fetched settings to make decisions using methods like *getFlag()*, *getVariable()*, and *track()*. These methods cannot return accurate results until the settings are fully loaded and parsed.

### Cold Start

* **Scenario**: First-time SDK load after process start.
* **Time Taken**: \~70-80ms
* **Size of Settings File Fetched**: \~2-3 kB for 10 running feature flags(depends on the number of running feature flags and their configuration).
* **Network Latency to DaCDN**: \~50ms(Check Uptime and Avg response time - [here](https://status.vwo.com/#/components/P4CJ5YG_lN8Fh07rnB3KSd3ZTTgIxok46ugVHX49GB0Hy_bMBS9kv3d9fS6iXhzH))

### Warm Start

* **Scenario**: SDK loads with previously cached settings.
* **Time Taken**: \~15-30ms

<br />

> 📘 Note
>
> The SDK fetches configuration from VWO DACDN, which serves static, edge-cached settings files with industry-leading low latency. This ensures reliable performance even under large-scale rollouts.
>
> Our Content Delivery Network (CDN) runs using a Global Load Balancer, deployed in Google Cloud Platform (GCP), and the backend servers are spread across 14 locations each in Japan, Australia, Singapore, India, Brazil, Netherlands, Belgium, Germany, 2 cities in the UK, and 4 cities in the US to help us serve dynamic requests for tests. Read more [here](https://help.vwo.com/hc/en-us/articles/360021116194-Where-are-VWO-data-centers-located)

<br />

## SDK Methods Benchmarks

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

<Table align={["left","left","left","left"]}>
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
        \< 100 ms
      </td>

      <td>
        \< 10 MB (depends upon flag configurations)
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
        5-20 ms
      </td>

      <td>
        \< 2 MB (depends upon flag configurations)
      </td>

      <td>
        No call for evaluation.
        Only asynchronous tracking call.
      </td>
    </tr>

    <tr>
      <td>
        `trackEvent()`
      </td>

      <td>
        2-5 ms
      </td>

      <td>
        \< 1 MB (depends upon flag configurations)
      </td>

      <td>
        No call for evaluation.
        Only asynchronous tracking call.
      </td>
    </tr>

    <tr>
      <td>
        `setAttribute()`
      </td>

      <td>
        \< 2 ms
      </td>

      <td>
        \< 1 MB (depends upon flag configurations)
      </td>

      <td>
        No call for evaluation.
        Only asynchronous tracking call.
      </td>
    </tr>
  </tbody>
</Table>

<br />

## Memory and Resource Utilization

VWO FME SDKs are designed with a strong emphasis on low resource usage, making them suitable for both server-side and client-side applications where memory, CPU, and garbage collection overhead must be minimal.

This section outlines the SDK's typical memory footprint and runtime resource behavior during different stages of its lifecycle.

#### Footprint

| Phase                      | Typical Memory Usage | Description                                                                                                                        |
| -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Post-init (Cold Start)** | \< 2 MB              | Memory used after fetching and loading settings from VWO DACDN. Includes parsing and in-memory caching of rules and configuration. |
| **Steady State (Idle)**    | \< 0.5 MB            | Memory usage during regular flag evaluations and event tracking, excluding settings refresh. Remains stable with minimal growth.   |

<br />

> ⚠️ Note
>
> Memory footprint may vary slightly based on the size of your configuration (number of flags, experiments, etc.) and the programming environment.

<br />

## Network Usage Profile

The Network Usage Profile defines how and when the VWO FME SDK communicates with external servers over the network. Understanding this helps developers assess the SDK’s impact on bandwidth, latency, and reliability, especially in environments like serverless functions, mobile apps, or edge infrastructure where network calls are sensitive and often limited.

In the Feature Management and Experimentation (FME) context, many tools require frequent communication with backend servers to fetch flag decisions, send telemetry, or synchronize states. VWO FME SDKs, however, are designed to minimize such overhead through offline, local decision-making and asynchronous, batched network interactions.

### VWO Settings from VWO CDN(DaCDN)

* **Endpoint**: [https://dev.visualwebsiteoptimizer.com/server-side/v2-settings](https://dev.visualwebsiteoptimizer.com/server-side/v2-settings)
* **Size**: Depends on the number of running feature flags and their configurations. For example: 2-3 kB for 10 feature flags and their rule configurations
* **Caching**: Edge-cached via CDN
* **Fallback behavior**: Uses stale settings if fetch fails(built-in for FME client-side SDKs only)

### Tracking Events API

* **Endpoint**: [https://dev.visualwebsiteoptimizer.com/events/t](https://dev.visualwebsiteoptimizer.com/events/t)
* **Retry Strategy**: Exponential backoff, max 3 retries

### Network Efficiency Highlights

* **One-time config fetch**: Only a single network call is made during SDK initialization to retrieve configuration from VWO DACDN.
* **Async-only traffic**: All runtime network operations (e.g., tracking) are performed asynchronously, ensuring zero impact on application latency or main thread execution.
* **No polling by default**: VWO FME SDKs do not poll the server for updates unless explicitly configured to do so.
* **Batched requests**: Tracking user, metric events, and setting user attributes events are queued and dispatched in batches to optimize throughput and reduce network chatter. You need to pass event batching configuration while initializing the SDK to enable batching of events.
* **Webhook support for updates**: VWO supports webhooks that can notify your system when settings are updated. This allows applications to refresh SDK settings on-demand rather than relying on polling or scheduled fetches, ensuring timely updates with minimal network overhead.

> 📘 Note
>
> Note: All calls that involve HTTP (like *init()*, *getFlag()*, *trackEvent()*, and *setAttribute()* are non-blocking and won’t delay request/response cycles in backend services.

<br />

## SDK Footprint

VWO FME SDKs offer a minimal footprint and are engineered for maximum efficiency. Whether you're deploying on high-scale infrastructure or embedded platforms, the SDK will not introduce meaningful bloat or performance drag. This makes it a safe and scalable choice for modern product experimentation and feature flagging.

<Table>
  <thead>
    <tr>
      <th>
        Footprint Aspect
      </th>

      <th>
        Details
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **Package Size**
      </td>

      <td>
        Mostly applicable for client-side SDKs.

        \~40 KB  - JavaScript/React(gzipped)

        \~250 KB - Android(aar)

        \~1.5 MB - iOS

        \~75 KB - Flutter(tar)

        \~2 KB - React Native(excluding native bindings)

        Server-side SDKs size:

        \~35 KB - Node.js

        \~50 KB - Ruby

        \~75 KB - .NET

        \~80 kB - Python

        \~300 KB - PHP

        \~200 KB - Java(jar)
      </td>
    </tr>

    <tr>
      <td>
        **Memory Usage**
      </td>

      <td>
        \< 1 MB – Varies based on the number of flags/experiments in your settings.
      </td>
    </tr>

    <tr>
      <td>
        **CPU Usage**
      </td>

      <td>
        Negligible – Flag evaluations and attribute matching are simple conditional logic.
      </td>
    </tr>

    <tr>
      <td>
        **Blocking Calls**
      </td>

      <td>
        None – All network calls are asynchronous; decision-making is local.
      </td>
    </tr>

    <tr>
      <td>
        **Thread Safety**
      </td>

      <td>
        Yes – SDK methods are safe to use in concurrent environments (e.g., multi-threaded backends, web workers).
      </td>
    </tr>

    <tr>
      <td>
        **Settings Size**
      </td>

      <td>
        Depends on configuration – Average \< 5-10 kB for most flag setups, compressed via CDN.
      </td>
    </tr>

    <tr>
      <td>
        **Tracking Overhead**
      </td>

      <td>
        Minimal – Events are batched and sent in the background with retry support.
      </td>
    </tr>

    <tr>
      <td>
        **Startup Overhead**
      </td>

      <td>
        Very Low – Single async settings fetch during init, negligible load on app boot.
      </td>
    </tr>

    <tr>
      <td>
        **Disk I/O (if applicable)**
      </td>

      <td>
        Optional – SDKs can cache settings locally (if enabled) to persist across restarts(applicable for client-side SDKs only).
      </td>
    </tr>
  </tbody>
</Table>

<br />

Understanding the SDK footprint is critical when integrating into environments with constrained resources—such as mobile devices, edge functions, or serverless platforms—where every byte and millisecond counts.

<br />

### Deployment Suitability

| Environment                       | Footprint Suitability                                               |
| --------------------------------- | ------------------------------------------------------------------- |
| **Serverless (e.g., AWS Lambda)** | Ideal – No cold start penalty, small size, async network I/O        |
| **Mobile Apps**                   | Efficient – Lightweight, low memory, and no frequent network use    |
| **Edge Devices / IoT**            | Compatible – Minimal resource usage, offline decision-making        |
| **Client-side Web Apps**          | Optimized – Tree-shakable builds, no blocking calls, async tracking |

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