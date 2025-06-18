---
title: Auto-configured GatewayService
deprecated: false
hidden: true
metadata:
  robots: index
---
In traditional VWO implementations, when using a gateway service, the SDK communicates with the gateway to evaluate different user segments like Location, Operating System, Browser, UserAgent, and attributes. This adds an extra layer of communication, resulting in multiple network requests and potential delays, especially in client-side environments where speed is crucial.

### Key Features:

1. **Direct Communication with DACDN** : When no gateway service is configured, the SDK now communicates directly with VWO's DACDN where all the necessary segmentation and evaluation (Location, Operating System, Browser, UserAgent, attributes) are handled.
2. **Faster Performance** : By eliminating the intermediate gateway service, the SDK fetches data from DACDN directly, reducing network latency and improving page load times, making it ideal for client-side use cases where speed and responsiveness are crucial.

### UseCase

For a typical client-side SDK implementation, the SDK would first query the gateway service for segmentation (location, OS, etc.) and then fetch the settings. Client-side SDKs are typically used to deliver fast responses (such as personalized content or A/B test variations) directly to the user's browser. Adding an intermediate gateway service only delays this process. With direct communication to DACDN, if no gateway is configured, DACDN will perform the evaluation and segmentation in real-time, streamlining the entire process and speeding up data retrieval.