---
title: Impact Analysis
deprecated: false
hidden: true
metadata:
  robots: index
---
The VWO FME iOS SDK is designed with performance optimization as a core principle. Through asynchronous initialization, intelligent caching mechanisms, and efficient resource management, the SDK minimizes its impact on application performance while delivering robust feature management and experimentation capabilities.

## Asynchronous Initialization

The SDK initializes asynchronously

* Initialization happens in the background using GCD (Grand Central Dispatch).
* Minimal impact on app launch time as initialization is off the main thread.
* Uses completion handler to notify success or failure of initialization.

<br />

## Network Operations & API Architecture

The SDK implements a sophisticated network layer designed for efficiency and reliability:

### Settings Management

**Endpoint**: VWO Settings API

* **Frequency**: Single request per session with intelligent caching
* **Caching Strategy**: Configurable cache duration with offline fallback support
* **Behavior**: Operates seamlessly in both online and offline modes
* **Optimization**: Minimizes server requests through persistent local storage

### Event Tracking System

**Endpoint**: VWO Event Tracking API

* **Processing Mode**: Asynchronous batch processing with asynchronous uploads to optimize network usage
* **Retry Logic**: Automatic retry mechanism for failed requests with exponential backoff
* **Offline Support**: Local storage for events during network unavailability
* **Batching Strategy**: Configurable batch sizes for optimal network utilization

### Event Batch Processing

**Technical Implementation:**

* **Batch Configuration**: Customizable batch size and upload intervals
* **Background Processing**: Uses DispatchSourceTimer on a background queue to schedule periodic event uploads reliably
* **Automatic Management**: The timer self-manages event syncing and continues until all events are successfully uploaded
* **Resource Efficiency**: Optimized for minimal battery and data consumption

### Advanced Segmentation Processing

**Pre-Segmentation Evaluation:**

* **Location Intelligence**: Approximate geographical data for targeting
* **User Agent Analysis**: Device and operating system fingerprinting for segmentation
* **Custom Variables**: Integration with client-defined segmentation criteria
* **Attribute List**: A customizable set of user or device attributes that enable more granular targeting and evaluation of feature flags

**Impact on Evaluation**:

* **Latency**: The API call introduces a small delay (in the order of milliseconds), which can vary depending on network conditions
* **Mitigation**: Uses caching to minimize blocking and repeated requests

<br />

## Application Size Impact

| Metric                 | Size     | Notes                                     |
| :--------------------- | :------- | :---------------------------------------- |
| Raw SDK Framework Size | \~1.1 MB | Size of framework binary in app bundle    |
| Archive Size Increase  | \~4.1 MB | Includes debug symbols and build overhead |

> 🚧 Archive size
>
> This difference is larger than the raw framework size due to additional components included during the build and archive process. Debug symbols (dSYM files) which are used for symbolicating crash reports and debugging can significantly increase the archive size but do not affect the size of the app installed on user devices.

<br />

## Performance Benchmarks

### Response Time Analysis

| SDK Method     | WiFi (ms) | 4G (ms) | 2G (ms) |
| -------------- | :-------: | :-----: | :-----: |
| Initialization |   1.385   |  1,260  |  2,360  |
| GetFlag        |     10    |    11   |    12   |
| GetVariable    |     4     |    4    |    5    |
| TrackEvent     |     9     |    9    |    10   |
| SetAttribute   |     10    |    11   |    12   |

*All measurements represent average response times across multiple test scenarios*

### Memory Utilization

| SDK Method     | Memory Usage (MB) |
| -------------- | :---------------: |
| Initialization |       1.766       |
| GetFlag        |       0.063       |
| GetVariable    |       0.016       |
| TrackEvent     |       0.016       |
| SetAttribute   |       0.016       |

*Measurements may vary slightly due to system activity and background processes*

### Network Data Consumption

| SDK Method     | Data Usage (KB) |
| -------------- | :-------------: |
| Initialization |        10       |
| GetFlag        |        1        |
| TrackEvent     |       0.5       |
| SetAttribute   |       0.5       |

*Data consumption measured for typical operation scenarios*

## Integration Considerations

### Performance Best Practices

1. **Initialize Early**: Call SDK initialization during application startup
2. **Cache Utilization**: Configure appropriate cache durations for your use case
3. **Batch Events**: Leverage built-in batching for high-frequency event tracking

***

*This performance analysis is based on VWO FME iOS SDK version 1.6.0. Performance characteristics may vary based on device specifications, network conditions, and implementation patterns.*