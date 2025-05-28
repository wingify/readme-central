---
title: Impact Analysis
deprecated: false
hidden: true
metadata:
  robots: index
---
# FME SDK Performance and Optimization Guide

This page tracks the impact of VWO SDK for different parameters on your app.

## Launch Time 

The SDK is initialized asynchronously.

Asynchronous Initialisation:
- The SDK is initialized in the background using Kotlin coroutines on an IO dispatcher.
- Has minimal impact on your app's launch time as initialization happens off the main thread.
- Provides a callback interface (IVwoInitCallback) to handle success and failure scenarios asynchronously.

## API Calls

The FME SDK makes below API calls to VWO's servers:

### Settings Fetch
The SDK needs settings when it starts. It calls VWO servers one time to get them. It can also use settings it saved earlier (cached settings). You can decide how long these saved settings last. This means fewer calls to the server. The SDK works even if it's online or offline.

### Event Tracking
When users become part of feature flags and tracking events this API is called. Failed requests are stored locally and retried later. The SDK supports both online and offline batching where events are grouped and sent asynchronously to optimize API calls.

### Event Batch Processing
Event batching includes configurable batch size and upload interval with an automatic retry mechanism for failed uploads. The processing automatically stops when all events are successfully uploaded, using WorkManager for reliable background processing.

### Error Reporting
When the SDK encounters errors, relevant error details are uploaded for diagnostics and troubleshooting purposes.

### Location and In-List Segmentation Evaluation
For feature flags with pre-segmentation enabled, the SDK gathers information including approximate location and user agent, then evaluates pre-segmentation results based on both custom variables and gathered contextual information.

The SDK is designed to be efficient with network usage while ensuring reliable data delivery. It uses batching and background processing to minimize the impact on app performance and battery life.

## Increase in APK file size

When an Android app is integrated with the VWO SDK, the increase in the size of APK file is around ~2 MB without Proguard and ~1.8 MB with Proguard.

## Dex Method count

| Dependencies            |       Method count       |
|-------------------------|:------------------------:|
| com.vwo                 |           402            |
| com.github.eprst:murmur |            38            |
| com.fasterxml.jackson   |          11759           |
| com.google.code.gson    |           1239           |
| com.google.guava        |          16499           |
| androidx.work           |           1694           |
| androidx.core           |           7122           |

## Time taken (in milliseconds approx)

| Method         | Wifi |  4G  |  2G  |
|----------------|:----:|:----:|:----:|
| Initialization | 400  | 1260 | 2360 |
| GetFlag        |  10  |  11  |  12  |  
| GetVariable    |  4   |  4   |  5   |  
| TrackEvent     |  9   |  9   |  10  |  
| SetAttribute   |  10  |  11  |  12  |   

## RAM Usage

| Method         | Memory usage (in KBs approx) |
|----------------|:----------------------------:|
| Initialization |             1250             |
| GetFlag        |             390              |  
| GetVariable    |              30              |  
| TrackEvent     |              30              |  
| SetAttribute   |              30              |   

## Data consumed

| Method         | Data Consumed (in KBs approx) |
|----------------|:-----------------------------:|
| Initialization |              10               |
| GetFlag        |               1               |
| TrackEvent     |              0.5              |
| SetAttribute   |              0.5              |
