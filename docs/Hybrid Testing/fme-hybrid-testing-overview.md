---
title: Overview
excerpt: >-
  A Conceptual Guide to Connecting VWO Feature Experimentation, VWO Web Testing,
  and VWO Web Insights
deprecated: false
hidden: true
metadata:
  robots: index
---
# Unifying Server-Side and Client-Side Experimentation in VWO

Modern experimentation is no longer limited to a single platform or touchpoint. Users interact with your product across **web, mobile, backend services, and APIs**—and experimentation must follow the user seamlessly across this entire journey.

A user journey typically spans:

* CDN → Web Server → Backend Services
* Browser → SPA Framework → APIs
* Web → Mobile → Backend
* Marketing pages → Auth flows → Application dashboards

To experiment effectively across this ecosystem, one foundational problem to be solved is:

> How do we ensure that the same user is consistently identified and evaluated across all systems?

This section explains how **VWO Feature Experimentation (FE)** connects with **VWO Web Testing** and **VWO Web Insights**, enabling:

* Consistent user identification across client and server
* Combined client-side and server-side experimentation
* Omni-channel user journey tracking
* Unified analytics and insights

We’ll cover **concepts, architecture, step-by-step integration, code examples**, and **real-world scenarios**.

<br />

## The Fundamental Architectural Difference

Before understanding connectivity, we must understand the philosophical difference between the two experimentation models.

At a high level, VWO offers two complementary experimentation models:

### VWO Web Testing (Client-Side)

Works via **SmartCode**, a JavaScript snippet added to your website

* Best suited for **visual UI** changes
* Enables non-technical users to create experiments using a **Visual Editor**
* Runs entirely in the **browser**

Conceptually:

* Code executes in the browser
* User identity is created in the browser
* Variations are applied to the DOM
* Bucketing happens client-side
* Cookies store visitor identity

> This follows a presentation-layer experimentation model.

Reference: [What is VWO SmartCode?](https://help.vwo.com/hc/en-us/articles/360019420774-What-is-VWO-SmartCode)

### VWO Feature Experimentation (FE)

Works via **SDKs** (server-side and client-side)

* Best suited for:
  * Feature flags
  * Gradual rollouts
  * Server-side A/B tests
  * Backend logic experiments
* Runs in **backend services, mobile apps, SPAs, and IoT**

Conceptually:

* Code executes before the UI renders
* Decisions are made in business logic
* Bucketing can occur on the server
* Feature flags control application behavior

> This follows a decision-layer experimentation model.

Reference: [List of VWO Feature Experimentation SDKs](https://developers.vwo.com/v2/docs/list-of-fme-sdks)

### Key Difference

| Aspect      | Web Testing            | Feature Experimentation   |
| ----------- | ---------------------- | ------------------------- |
| Integration | SmartCode (JS snippet) | SDKs                      |
| Execution   | Browser                | Server / App / Browser    |
| Audience    | Marketers, CRO teams   | Developers                |
| Use cases   | UI & UX testing        | Business logic & rollouts |

### VWO Web Insights (Behavioral Analytics)

Works via **SmartCode-based data collection**, capturing visitor interactions on your website.

* Best suited for:
  * Session recordings
  * Heatmaps (click, scroll, movement)
  * Funnel analysis
  * Form analytics
  * On-page surveys
* Runs in the browser, passively capturing behavioral data

Conceptually:

* User interactions are recorded at the browser level
* Behavioral events (clicks, scrolls, navigation) are tied to visitor identity
* Data is aggregated into visual insights (heatmaps) and replayable sessions
* Visitor sessions can be filtered by experiment variation or feature flag state (when UUID is consistent)

> This follows a behavioral-analytics model, complementing experimentation by explaining why users behaved the way they did.

Reference: [What is VWO Insights](https://help.vwo.com/hc/en-us/articles/900000051286-What-is-VWO-Insights)