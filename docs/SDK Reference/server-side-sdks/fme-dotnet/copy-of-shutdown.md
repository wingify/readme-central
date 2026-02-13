---
title: Copy of Shutdown
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

The `Shutdown()` method provides a graceful way to stop all SDK background activities and ensure all pending events are sent before your application terminates.

## Purpose

The `Shutdown()` API is designed to:

* **Stop polling**: Terminates the background settings polling mechanism
* **Flush batching**: If batching is enabled, synchronously flushes all pending events to the server
* **Clean up resources**: Clears timers and releases background resources

## When to Use

You should call `Shutdown()` when:

* Your application is shutting down or restarting
* You want to ensure all pending events are sent before termination
* You need to clean up SDK resources gracefully

## Usage

### Basic Example

```csharp
using VWOFmeSdk;
using VWOFmeSdk.Models.User;

// Initialize VWO SDK
var vwoInitOptions = new VWOInitOptions
{
    SdkKey = "YOUR_SDK_KEY",
    AccountId = YOUR_ACCOUNT_ID
};

var vwoInstance = VWO.Init(vwoInitOptions);

// Use the SDK...
var getFlag = vwoInstance.GetFlag("feature-key", context);

// Before application shutdown, call Shutdown()
vwoInstance.Shutdown();
```

## Behavior

### Without Batching

* Stops polling immediately
* Returns quickly after stopping background activities

### With Batching

* Stops polling
* **Waits synchronously** for all pending events in the batch queue to be sent
* Clears timers and releases resources
* Returns after all events are flushed

## Error Handling

The `Shutdown()` method includes built-in error handling:

* If an error occurs during shutdown, it is logged but does not throw an exception
* This ensures your application can continue shutting down even if SDK cleanup encounters issues

## Important Notes

1. **Synchronous Operation**: When batching is enabled, `Shutdown()` will block until all events are flushed. This ensures no data loss during application termination.

2. **No Return Value**: The method returns `void`. Check logs for shutdown status if needed.

3. **Best Practice**: Call `Shutdown()` in your application's cleanup/shutdown handlers (e.g., `Application_Exit`, `Dispose`, or signal handlers).

* `FlushEvents()`: Manually flush batched events without shutting down the SDK
* `UpdateSettings()`: Update SDK settings without shutting down

## Version

This API was introduced in version **1.16.0**.