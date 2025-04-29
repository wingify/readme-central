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
This page tracks the impact of VWO SDK on different parameters for an app.

## **Launch Time**

The SDK is designed to be launched in the background, ensuring that it does not impact the launch time of your app. Asynchronous initialization is the recommended approach for optimal performance.

## Increase in APK file size

When an Android app is integrated with the VWO SDK, the increase in the size of the APK file is around \~800 KB without Proguard and **\~300 KB with Proguard**.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Dependencies
      </th>

      <th>
        Uncompressed Size (in KB)




        (Without proguard)
      </th>

      <th>
        Uncompressed Size (in KB)




        (With proguard)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [com.vwo.insights](https://mvnrepository.com/artifact/com.vwo/insights)
      </td>

      <td>
        \~500 KB
      </td>

      <td>
        \~260 KB
      </td>
    </tr>

    <tr>
      <td>
        [net.lingala.zip4j.zip4j](https://mvnrepository.com/artifact/net.lingala.zip4j/zip4j)
      </td>

      <td>
        \~92 KB
      </td>

      <td>
        \~27 KB
      </td>
    </tr>

    <tr>
      <td>
        [com.squareup.okhttp3.okhttp](https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp)
      </td>

      <td>
        \~550 KB
      </td>

      <td>
        \~140 KB
      </td>
    </tr>
  </tbody>
</Table>

## Dex Method count

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Dependencies
      </th>

      <th>
        Method count




        (With Proguard)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        [com.vwo.insights](https://mvnrepository.com/artifact/com.vwo/insights)
      </td>

      <td>
        \~1200
      </td>
    </tr>

    <tr>
      <td>
        [net.lingala.zip4j.zip4j](https://mvnrepository.com/artifact/net.lingala.zip4j/zip4j)
      </td>

      <td>
        \~310
      </td>
    </tr>

    <tr>
      <td>
        [com.squareup.okhttp3.okhttp](https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp)
      </td>

      <td>
        \~750
      </td>
    </tr>
  </tbody>
</Table>

## Android Application Analysis

Here is a summary of the Android application analysis. This analysis includes a sample APK with and without the Insights SDK.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>

      </th>

      <th>
        Proguard Disabled
      </th>

      <th>
        Proguard Enabled
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        ```
                    APK Size  
        ```

        **(without SDK integration)**
      </td>

      <td>
        5.5 MB
      </td>

      <td>
        2.1 MB
      </td>
    </tr>

    <tr>
      <td>
        ```
                   APK Size  
        ```

        **(with SDK integration)**
      </td>

      <td>
        6.3 MB
      </td>

      <td>
        2.4 MegaBytes
      </td>
    </tr>

    <tr>
      <td>
        Increase in APK size
      </td>

      <td>
        \~700KB
      </td>

      <td>
        \~300KB
      </td>
    </tr>
  </tbody>
</Table>

## API Calls

VWO SDK makes two types of API calls to VWO CDN.

1. ***AppSettings***-  During SDK initialization, a single request is made to fetch settings, with two retry attempts. If this initial request fails, the SDK does not make any further attempts to fetch settings. This approach ensures consistent app behavior throughout an ongoing session.
2. ***DataSync*** - Data synchronization for session recording and heatmaps is facilitated through a dedicated request. In the event of a failure, the SDK keeps track of the issue and will attempt to resend the data after a specified interval.

Please note that these mechanisms are implemented to maintain the stability and reliability of the SDK's functionality.

## Network Usage & Response time

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        API
      </th>

      <th>
        Network Type
      </th>

      <th>
        Bandwidth(Usage)
      </th>

      <th>
        Time Taken
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        AppSettings
      </td>

      <td>
        3G
      </td>

      <td>
        \~1KB
      </td>

      <td>
        \< 0.5 sec
      </td>
    </tr>

    <tr>
      <td>
        AppSettings
      </td>

      <td>
        4G / 5G
      </td>

      <td>
        \~1KB
      </td>

      <td>
        \< 0.5 sec
      </td>
    </tr>

    <tr>
      <td>
        AppSettings
      </td>

      <td>
        WiFi
      </td>

      <td>
        \~1KB
      </td>

      <td>
        \< 0.5 sec
      </td>
    </tr>

    <tr>
      <td>
        DataSync(per API-request)
      </td>

      <td>
        3G
      </td>

      <td>
        min:- \~50KB\
        average:- \~130KB\
        max:- \~180KB
      </td>

      <td>
        \< 2 sec
      </td>
    </tr>

    <tr>
      <td>
        DataSync(per API-request)
      </td>

      <td>
        4G / 5G
      </td>

      <td>
        min:- \~50KB\
        average:- \~130KB\
        max:- \~180KB
      </td>

      <td>
        \< 1 sec
      </td>
    </tr>

    <tr>
      <td>
        DataSync(per API-request)
      </td>

      <td>
        WiFi
      </td>

      <td>
        min:- \~50KB\
        average:- \~130KB\
        max:- \~180KB
      </td>

      <td>
        \< 1 sec
      </td>
    </tr>
  </tbody>
</Table>
