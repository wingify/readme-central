---
title: Storage
deprecated: false
hidden: true
metadata:
  robots: index
---
React Native SDK utilize native SDKs (iOS and Android) to manage feature flags and experimentation data efficiently. These SDKs use a bridge to communicate between the native and hybrid layers, ensuring seamless integration and performance.

## Purpose of of Storage

The VWO FME SDK operates in a stateless mode by default, meaning each `getFlag` call triggers a fresh evaluation of the flag against the current user context.

To optimize performance and maintain consistency, the SDK provides both built-in storage. This allows you to persist feature flag decisions, mobile applications can quickly access necessary data without repeatedly querying the server.

## Storage Mechanisms by Platform

| **Functionality**                                                                        | **iOS Storage Mechanism** | **Android Storage Mechanism** |
| ---------------------------------------------------------------------------------------- | ------------------------- | ----------------------------- |
| **Fast-access caching of feature flag decisions**                                        | UserDefaults              | SharedPreferences             |
| **Persistent storage of offline event tracking data and when event batching configured** | Core Data                 | SQLite                        |

> **Note:** Although the underlying storage technologies differ between platforms, their functionality is consistent. Both platforms use fast-access key-value stores for caching feature flag decisions and robust databases for persisting offline event data until it can be synced.

***

## Key Benefits of Storage

1. **Improved Performance**: Reduces network calls and latency by caching decisions locally
2. **Consistent User Experience**: Ensures users get the same experience across app sessions
3. **Reduced Server Load**: Minimizes the number of requests to VWO servers
4. **Decision Stability**: Once a decision is made for a user, it remains consistent even if campaign settings are modified in the VWO Application
5. **Offline Functionality**: Allows the SDK to function even when the device is offline