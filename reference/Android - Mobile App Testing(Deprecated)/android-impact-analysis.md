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
This page tracks the impact of VWO SDK for different parameters on your app.

## Launch Time

The SDK can be initialized in two ways: synchronous and asynchronous.

* Asynchronous Initialisation: has no impact on the launch time of your app, as SDK is launched in the background. Asynchronous initialisation is the recommended method.
* Synchronous Initialisation: In Synchronous initialization, the SDK makes a networking call to fetch settings from VWO's CDN. This can block the main thread for a maximum of three seconds. The thread resumes to normal execution after the response from the CDN.

## API Calls

VWO SDK makes three types of API calls to VWO CDN. 

* To fetch settings at the time of SDK initialization. The SDK makes only one call to fetch settings. If this call fails, the SDK does not retry to fetch settings during an ongoing app session. This is done to keep the app behaviour consistent during an ongoing session.
* To inform VWO when a user becomes part of a campaign. If this call fails, the SDK keeps a track of it and try to send it again after some time.
* To inform VWO when a user converts a goal in a campaign.  If this call fails, the SDK keeps a track of it and try to send it again after some time.

## Increase in APK file size

When an Android app is integrated with the VWO SDK, the increase in the size of APK file is around `~300 KB` without Proguard and `~200 KB` with Proguard.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Dependencies
      </th>

      <th>
        Uncompressed Size (in KB)(Without proguard)
      </th>

      <th>
        Uncompressed Size (in KB)(With proguard)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        com.vwo:mobile
      </td>

      <td>
        98.1
      </td>

      <td>
        92.6
      </td>
    </tr>

    <tr>
      <td>
        io.socket:socket.io-client
      </td>

      <td>
        392
      </td>

      <td>
        203
      </td>
    </tr>

    <tr>
      <td>
        com.android.support:support-core-utils
      </td>

      <td>
        385.4
      </td>

      <td>
        2.5
      </td>
    </tr>
  </tbody>
</Table>

## Dex Method count

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Dependencies
      </th>

      <th>
        Method count (Without Proguard)
      </th>

      <th>
        Method count (With Proguard)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        com.vwo:mobile
      </td>

      <td>
        705
      </td>

      <td>
        705
      </td>
    </tr>

    <tr>
      <td>
        io.socket:socket.io-client
      </td>

      <td>
        2781
      </td>

      <td>
        2018
      </td>
    </tr>

    <tr>
      <td>
        com.android.support:support-core-utils
      </td>

      <td>
        3390
      </td>

      <td>
        12
      </td>
    </tr>
  </tbody>
</Table>

## RAM Usage

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Method
      </th>

      <th>
        Memory usage(in KBs approx)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        VWO.launch(VWOStatusListener listener)
      </td>

      <td>
        55
      </td>
    </tr>

    <tr>
      <td>
        VWO.launchSynchronously()
      </td>

      <td>
        560
      </td>
    </tr>

    <tr>
      <td>
        VWO.getObjectForKey(String key, Object defaultValue);
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.getIntegerForKey(String key, int defaultValue);
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.getDoubleForKey(String key, double defaultValue);
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.getStringForKey(String key, String defaultValue);
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.getBooleanForKey(String key, boolean defaultValue);
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.getVariationNameForTestKey(String testKey)
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.trackConversion()
      </td>

      <td>
        \< 1
      </td>
    </tr>

    <tr>
      <td>
        VWO.trackConversion(double value)
      </td>

      <td>
        \< 1
      </td>
    </tr>
  </tbody>
</Table>

If you want to know the impact of any other parameter or if you are interested in detail of any parameter, please reach out to us: [support@vwo.com](mailto:support@vwo.com)
