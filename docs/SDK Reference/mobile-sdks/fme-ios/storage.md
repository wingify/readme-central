---
title: Storage
deprecated: false
hidden: true
metadata:
  robots: index
---
Mobile SDKs for feature management and experimentation are designed to operate efficiently on iOS devices. Unlike server-side SDKs, mobile SDKs utilize built-in storage to manage feature flags and experimentation data.

## Purpose of of Storage

The primary purpose of using storage in mobile SDKs is to enhance performance and ensure a consistent user experience. By caching feature flag decisions locally, mobile applications can quickly access necessary data without repeatedly querying the server.

### Key Benefits

* Persisting feature flag decisions ensures that users have a consistent experience, even if they close and reopen the app.
* Once a decision is made for a user, it remains consistent, even if campaign settings are modified. This stability is crucial for accurate A/B testing and controlled feature rollouts.
* Caching decisions locally reduces the need for constant server communication, leading to faster response times and a smoother user experience.