---
title: Storage
deprecated: false
hidden: true
metadata:
  robots: index
---
React Native SDK utilize native SDKs (iOS and Android) to manage feature flags and experimentation data efficiently. These SDKs use a bridge to communicate between the native and hybrid layers, ensuring seamless integration and performance.

## Purpose of of Storage

The primary purpose of using storage in mobile SDKs is to enhance performance and ensure a consistent user experience. By caching feature flag decisions locally, mobile applications can quickly access necessary data without repeatedly querying the server.

## Storage Mechanisms by Platform

| **Functionality**                                                                        | **iOS Storage Mechanism** | **Android Storage Mechanism** |
| ---------------------------------------------------------------------------------------- | ------------------------- | ----------------------------- |
| **Fast-access caching of feature flag decisions**                                        | UserDefaults              | SharedPreferences             |
| **Persistent storage of offline event tracking data and when event batching configured** | Core Data                 | SQLite                        |

> 📘 Note
>
> Although the underlying storage technologies differ between platforms, their functionality is consistent. Both platforms use fast-access key-value stores for caching feature flag decisions and robust databases for persisting offline event data until it can be synced.

***

## Key Benefits

* Persisting feature flag decisions ensures that users have a consistent experience, even if they close and reopen the app.
* Once a decision is made for a user, it remains consistent, even if campaign settings are modified. This stability is crucial for accurate A/B testing and controlled feature rollouts.
* Caching decisions locally reduces the need for constant server communication, leading to faster response times and a smoother user experience.