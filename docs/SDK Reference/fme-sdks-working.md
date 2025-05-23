---
title: FME SDK Flow
deprecated: false
hidden: true
metadata:
  robots: index
---
## High Level SDK Architecture

The diagram below represents the core workflow of the VWO Feature Management and Experimentation SDK, designed to enable dynamic feature delivery, experimentation, and behavioral analytics within an application. The flow is centered around initialization, flag evaluation, event tracking, and user attribute handling, emphasising asynchronous communication with the VWO backend.

```mermaid
flowchart TD
    A0(["VWO FME SDK"]) --> A("Initialize using<br/>configurable options")
    A --> Y("getFlag(featureKey, userContext)")
    A --> X("trackEvent(eventName, userContext, eventProperties)")
    A --> Z("setAttribute(attributes, userContext)")

    %% getFlag & getVariable Flow
    Y --> Y1{"Is Flag Enabled?"}
    Y1 -- Yes --> Y2("Return True")
    Y1 -- No --> Y4("Return False")
    Y2 --> Y22("Send user-tracking event<br/>to VWO asynchronously")
    Y2 --> Y3("getVariable(variableKey, defaultValue)")
    Y3 --> Y5("Return Variable Value<br/>based on Variation<br/>or default value")
    Y4 --> Y5

    %% trackEvent Flow
    X --> X1{"Is event present<br/>in running flags?"}
    X1 -- Yes --> X2("Send custom event to<br/>VWO asynchronously")
    X1 -- No --> X3("Return")

    %% setAttribute Flow
    Z --> Z1("Send attrubtes event<br/>to VWO asynchronously")
    Z1 ..-> Z2("Segment VWO reports<br/>based on these attributes")

    %% Assign classes
    class Y getFlag
    class X trackEvent
    class Z setAttribute

    %% Define styles
    classDef getFlag fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef trackEvent fill:#bbf,stroke:#333,stroke-width:1px,color:#000
    classDef setAttribute fill:#bbf,stroke:#333,stroke-width:1px,color:#000

    style X2 stroke:#7373ff,stroke-width:2px
    style Y22 stroke:#7373ff,stroke-width:2px
    style Z1 stroke:#7373ff,stroke-width:2px

```

<br />

### 1. Initialization as the Foundation

The SDK starts with an initialization phase, where configuration options like API keys, user context providers, and polling strategies are set. This establishes the SDK’s runtime environment, allowing it to consistently evaluate flags and track user activity.

### 2. Feature Evaluation and Experimentation

The core of the SDK is feature flag evaluation via the *getFlag*() method. When this is called:

* The SDK checks if a given feature is enabled for a specific user context.
* If the flag is active, it may also retrieve dynamic configuration values (via *getVariable*()).
* A **user exposure event is sent asynchronously** to VWO, capturing whether a user saw a specific variation or experience.
* If the flag is not enabled, the fallback behavior is returned without triggering tracking.

This mechanism supports **controlled rollouts, A/B testing, and personalized** experiences.

### 3. Behavioral and Conversion Event Tracking

The SDK also allows applications to report custom events using the *trackEvent*() method. These events are only reported to VWO if they’re relevant to ongoing experiments. This ensures:

* Only experiment-related events are captured, reducing noise.
* Events like "clicked CTA" or "error rates" can be used to measure experiment goals.

All tracking is handled **asynchronously**, ensuring no performance bottlenecks.

### 4. User Attribute Management

To enable user segmentation and deeper insights, the SDK includes a *setAttribute*() method. This lets developers send custom user attributes (like location, device type, or plan) to VWO. These are used to:

* **Segment experiment reports**
* **Target users more precisely** in feature rollouts and experiments

Again, this data is sent in the background, maintaining a lightweight client footprint.

### Asynchronous Communication & Decoupled Design

Across all core functions — flag checks, event tracking, and attribute setting- the SDK communicates with VWO asynchronously except PHP SDK due to the synchronous behavior of PHP language.. This design ensures that:

* App performance is not affected
* Network activity is minimized and batched

> Please refer [Server-side SDKs](doc:server-side-sdks) or [Client-side SDKs](doc:mobile-sdks) reference guides to know

<br />

## Event Batching in SDKs

The following diagram illustrates how the event batching mechanism works internally:

```mermaid
flowchart TD
    A0(["SDK Initialization<br/>(with batching options)"]) --> A1("Setup Event Queue<br/>+ Batching Config<br/>(size, interval)")
    
    subgraph Event API Calls
        A2("getFlag / trackEvent / setAttribute") --> A3("Create Impression Event")
        A3 --> A4("Push Event to Queue")
    end

    A1 --> A2

    subgraph Batching Trigger
        B1("Timer Reached<br/>OR<br/>Queue Size Met?")
        A4 --> B1
        B1 -- Yes --> B2("Batch Events from Queue")
        B2 --> B3("Send Batched Events<br/>to VWO Server")
        B3 --> B4("Call flushCallback<br/>if provided")
        B4 --> B5("Clear Sent Events from Queue")
        B1 -- No --> C1("Wait Until Next Trigger")
    end

    style A0 fill:#dff,stroke:#333,stroke-width:1px
    style A2 fill:#bbf,stroke:#333
    style B2 fill:#bfb,stroke:#333
    style B3 fill:#bfb,stroke:#333
    style B1 fill:#ffe,stroke:#333

```

* To improve performance and reduce network overhead, the VWO FME SDK supports **event batching**. When batching options are provided during initialization (such as the maximum number of events to batch and the flush interval), the SDK no longer sends tracking or impression events immediately. Instead, events generated from calls like *getFlag*, *trackEvent*, or *setAttribute* are **pushed into an internal queue**.
* The SDK monitors this queue and flushes events under two conditions: either when the **number of queued events reaches** the defined threshold, or when the **configured time interval elapses**. Once triggered, all queued events are **batched together into a single payload** and sent asynchronously to the VWO backend, significantly reducing the number of network calls and improving efficiency, especially in high-interaction environments.

<br />

## Caching in SDKs

> Please refer the [Caching Layer](doc:fme-sdks-caching) document to understand more on caching.

<br />

### How Storage Connector for server-side SDKs work

To optimize performance and reduce repeated computation, the VWO FME SDK supports **custom storage integration** via a pluggable ***Storage Connector***. This allows the SDK to **persist and retrieve flag evaluation results**, reducing the need to re-evaluate feature flags for the same user context repeatedly. The diagram below illustrates how the SDK uses this connector during the *getFlag* call. If a decision is already available in storage, it's returned immediately. Otherwise, the SDK evaluates the feature flag, sends the tracking event asynchronously, and stores the decision for future use.

```mermaid
flowchart TD
    A0(["SDK Initialization<br/>(with storageConnector)"]) --> A1("Define connector:<br/>get(key), set(key, value)")

    A2("getFlag(featureKey, userContext)") --> B1("Check storageConnector.get<br/>for existing decision")
    
    B1 -->|Found| B2("Return stored decision")
    
    B1 -->|Not Found| C1("Evaluate flag rules<br/>with user context")
    C1 --> C2("Generate decision result")
    C2 --> C3("Send async tracking call<br/>to VWO backend")
    C2 --> C4("Call storageConnector.set<br/>to store decision")
    C2 --> C5("Return decision")

    A1 --> A2

    style A0 fill:#dff,stroke:#333
    style A2 fill:#bbf,stroke:#333
    style B1 fill:#ffe,stroke:#333
    style B2 fill:#bfb,stroke:#333
    style C1 fill:#bbf,stroke:#333
    style C2 fill:#bbf,stroke:#333
    style C3 fill:#bbf,stroke:#333
    style C4 fill:#bfb,stroke:#333

```

When a *storageConnector* is provided during SDK initialization, the SDK uses it **to cache feature flag decisions:**

* On each *getFlag* call, the SDK first checks the storage (via ***get*** method) for a previously evaluated decision.
* If a cached decision exists, it’s returned immediately, avoiding recomputation.
* If not found, the SDK evaluates the flag rules using the latest config and user context, then:
  * **Returns the decision**
  * **Tracks the exposure asynchronously** to VWO
  * **Caches the result** using the connector’s ***set*** method

This approach improves performance, reduces compute and I/O overhead, and supports **pluggable caching/storage layers** (e.g., memory, Redis, file system).

> Please refer to Storage section of server-side SDKs. Foe example: [Storage Service](doc:fme-node-storage) in Node.js.