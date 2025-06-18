---
title: Auto-configured GatewayService
deprecated: false
hidden: true
metadata:
  robots: index
---
In traditional VWO implementations, when using a gateway service, the SDK communicates with the gateway to evaluate different user segments like Location, Operating System, Browser, UserAgent, and attributes. This adds an extra layer of communication, resulting in multiple network requests and potential delays, especially in client-side environments where speed is crucial.

### Key Features:

1. **Out-of-the-box Targeting** : The JavaScript SDK now includes built-in targeting options, such as location and user agent (UA), without needing additional configuration. This means you don't have to manually set up complex segmentation rules.
2. **Faster Performance** : In the past, the SDK had to contact a gateway service to evaluate user segments before fetching data. With the new setup, the SDK communicates directly with VWO's DACDN (Delivery and Content Distribution Network), which handles segmentation and evaluation in real time. This significantly reduces delays and improves performance.

### UseCase

For a typical client-side SDK implementation, the SDK would first query the gateway service for segmentation (location, OS, etc.) and then fetch the settings. Client-side SDKs are typically used to deliver fast responses (such as personalized content or A/B test variations) directly to the user's browser. Adding an intermediate gateway service only delays this process. With direct communication to DACDN, if no gateway is configured, DACDN will perform the evaluation and segmentation in real-time, streamlining the entire process and speeding up data retrieval.