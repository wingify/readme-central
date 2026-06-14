---
title: Impact Analysis
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
This page tracks the impact of Wingify SDK on different parameters for an app.

## **Launch Time**

The SDK is designed to be launched in the background, ensuring that it does not impact the launch time of your app. Asynchronous initialization is the recommended approach for optimal performance.

## Increase in IPA file size

When an IOS app is integrated with the Wingify SDK, the increase in the size of the IPA file is around \~850 KB.

| Installation Type          | Size (in KB) |
| :------------------------- | :----------- |
| VWO\_insights              | \~800 KB     |
| VWO\_insights/SSZipArchive | \~58 KB      |

## IOS Application Analysis

Here is a summary of the IOS application analysis. This analysis includes a sample IPA with and without the Insights SDK.

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>

      </th>

      <th>
        Size
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ```
                    IPA Size  
        ```

        **(without SDK integration)**
      </td>

      <td>
        5.5 MB
      </td>
    </tr>

    <tr>
      <td>
        ```
                   IPA Size  
        ```

        **(with SDK integration)**
      </td>

      <td>
        6.3 MB
      </td>
    </tr>

    <tr>
      <td>
        ```
        Increase in IPA size
        ```
      </td>

      <td>
        \~850KB
      </td>
    </tr>
  </tbody>
</Table>

## API Calls

Wingify SDK makes two types of API calls to Wingify CDN.

1. **_AppSettings_**-  During SDK initialization, a single request is made to fetch settings, with two retry attempts. If this initial request fails, the SDK does not make any further attempts to fetch settings. This approach ensures consistent app behavior throughout an ongoing session.
2. **_DataSync_** - Data synchronization for session recording and heatmaps is facilitated through a dedicated request. In the event of a failure, the SDK keeps track of the issue and will attempt to resend the data after a specified interval.

Please note that these mechanisms are implemented to maintain the stability and reliability of the SDK's functionality.

## Network Usage & Response time

| API                       | Network Type | Bandwidth(Usage)                                       | Time Taken |
| :------------------------ | :----------- | :----------------------------------------------------- | :--------- |
| AppSettings               | 3G           | \~1KB                                                  | \< 0.5 sec |
| AppSettings               | 4G / 5G      | \~1KB                                                  | \< 0.5 sec |
| AppSettings               | WiFi         | \~1KB                                                  | \< 0.5 sec |
| DataSync(per API-request) | 3G           | min:- \~50KB<br />average:- \~130KB<br />max:- \~180KB | \< 2 sec   |
| DataSync(per API-request) | 4G / 5G      | min:- \~50KB<br />average:- \~130KB<br />max:- \~180KB | \< 1 sec   |
| DataSync(per API-request) | WiFi         | min:- \~50KB<br />average:- \~130KB<br />max:- \~180KB | \< 1 sec   |

<br />
