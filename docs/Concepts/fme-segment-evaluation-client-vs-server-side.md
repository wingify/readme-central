---
title: Segment Evaluation in Client-Side vs Server-Side SDKs
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide details how VWO's Feature Experimentation (FE) SDKs handle segmentation, particularly based on **Location**, **User Agent (UA)**, and **User Attributes** — differently for **client-side** and **server-side** implementations.

## Overview

Segmentation is a critical part of delivering personalized experiences. VWO supports advanced segmentation based on:

* 🌍 Location (derived via IP)
* 🧭 User Agent (device/browser type)
* 🧑‍💼 User Attributes (e.g., logged-in state, subscription plan)

Depending on whether you use client-side or server-side SDKs, the evaluation workflow varies. Here's a visual representation:

## Client-side vs Server-side Complex Segment Evaluation

```mermaid
flowchart TD
    A[User's Browser / Mobile App] --> B[SDK Requires Complex Segmentation Evaluation]
    B --> C[Client-side SDK]
    B --> C2[Server-side SDK]

    %% Client-Side SDK Branch
    C --> D[Communicates with VWO CDN]
    D --> E[DaCDN auto-evaluates IP, UA]
    E --> F[Segments Evaluated at Edge]
    F --> G[Evaluate Feature Flag]

    %% Server-Side SDK Branch
    C2 --> H[Requires VWO Gateway Setup]
    H --> I[Your Server Extracts IP/UA]
    I --> J[Forwards Context to Gateway]
    J --> K[Gateway Evaluates Segmentation]
    K --> L[Returns Segment Info to SDK]
    L --> M[Evaluate Feature Flag]

    %% Styling
    class B,D,E,F,G,H,I,J,K,L,M step;
    class C decision;
    class C2 decision;

    classDef step fill:#eef,stroke:#333,stroke-width:1px,color:#000;
    classDef decision fill:#cfe2f3,stroke:#333,stroke-width:1px,color:#000;

```

<br />

## Client-Side SDKs: Automatic Segmentation via DaCDN

### How it Works

VWO’s client-side SDKs leverage the **VWO DaCDN**, an intelligent CDN layer, **to automatically evaluate segments** using the request's IP and User-Agent. These values are implicitly available to DaCDN because it is invoked directly from the user's browser/device.

> ⚙️ Note
>
> No extra code is needed to pass IP or UA from your application.

### Benefits

* Zero configuration required
* Automatic targeting on geo/location and device/browser
* Fast, edge-based evaluation
* No backend setup required

### Ideal Use Cases

* A/B testing or personalization for web/mobile users
* Segmentation based on country/region/device/browser
* Experiments running at scale with minimal infrastructure overhead

<br />

## Server-Side SDKs: Requires Gateway Service

In server environments (e.g., Node.js, Python, Java, Ruby, PHP, .NET, and Go), IP and UA are **not available by default** to the SDK. These attributes live in your server's request context.

To support complex segments like Location and User Agent, you must:

1. Set up [Gateway Service](doc:gateway-service).
2. Forward IP/UA headers to the Gateway via SDK APIs.
3. Let Gateway handle segment evaluation.

### Why This Difference?

Server-side SDKs run in a backend context without automatic access to:

* Client IP addresses (due to proxies/load balancers)
* User agent strings (only available in incoming HTTP requests)

### Ideal For

* Teams needing complete control over request flows.
* Advanced integrations where client context is manually passed.

> 📘 Note
>
> For fast and frictionless implementation of advanced segment targeting (location, user-agent, and more), we strongly recommend using Client-Side SDKs wherever feasible. If you're using server-side SDKs, ensure VWO Gateway is correctly set up for similar capabilities.
