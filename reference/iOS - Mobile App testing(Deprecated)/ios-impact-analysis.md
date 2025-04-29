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
This page tracks the impact of VWO iOS SDK for different parameters on your app.

## Launch Time

The SDK can be initialised in two ways: synchronous and asynchronous.

* Asynchronous Initialisation: has no impact on the launch time of your app, as SDK is launched in the background. Asynchronous initialisation is the recommended method.
* Synchronous Initialisation: In Synchronous initialisation the SDK makes a networking call to fetch settings from VWO's CDN. This can block the main thread. The thread resumes to normal execution after response from the CDN.

## API Calls

VWO SDK makes three types of API calls to VWO CDN. 

* To fetch settings at the time of SDK initialization. The SDK makes only one call to fetch settings. If this call fails, the SDK does not retry to fetch settings during an ongoing app session. This is done to keep the app behaviour consistent during an ongoing session.
* To inform VWO when a user becomes part of a campaign. If this call fails, the SDK keeps a track of it and try to send it again after some time.
* To inform VWO when a user converts a goal in a campaign.  If this call fails, the SDK keeps a track of it and try to send it again after some time.

The SDK makes call to CDN every 20 seconds.

## Disk Space

After adding VWO to you Xcode project the size of Xcode project changes as follows

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Installation type
      </th>

      <th>
        Size
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        VWO/Core
      </td>

      <td>
        \~ 284 KB
      </td>
    </tr>

    <tr>
      <td>
        VWO
      </td>

      <td>
        \~ 800 KB
      </td>
    </tr>
  </tbody>
</Table>

## Increase in IPA file size

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Installation type
      </th>

      <th>
        Size
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        VWO/Core
      </td>

      <td>
        \~ 100 KB
      </td>
    </tr>

    <tr>
      <td>
        VWO
      </td>

      <td>
        \~ 700 KB
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
        Memory usage (in KBs approx)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        launchForAPIKey:config:completion:
      </td>

      <td>
        300
      </td>
    </tr>

    <tr>
      <td>
        launchSynchronouslyForAPIKey:config:timeout
      </td>

      <td>
        350
      </td>
    </tr>

    <tr>
      <td>
        objectForKey: defaultValue:\
        intForKey:defaultValue:\
        floatForKey:defaultValue\
        boolForKey:defaultValue
      </td>

      <td>
        less than 1
      </td>
    </tr>

    <tr>
      <td>
        trackConversion
      </td>

      <td>
        less than 1
      </td>
    </tr>

    <tr>
      <td>
        trackConversion: withValue:
      </td>

      <td>
        less than 1
      </td>
    </tr>
  </tbody>
</Table>

If you want to know the impact of any other parameter or if you want to understand anything around it, please reach out to us: [support@vwo.com](mailto:support@vwo.com)
