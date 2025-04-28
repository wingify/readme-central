---
title: Offline Conversions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
VWO SDK allows you to track conversions using ***track*** API. There could be scenarios when you would like to track conversions without using the SDK.

To understand this in detail, let's take an example, where you have your own centralized data-storage service which stores the information of all the events.  Whenever a conversion happens at your application, you store the data in the storage service but the integrated tools like VWO do not know about this conversion. Let's assume you do not prefer real-time syncing of this data with VWO and therefore, you run a [cron job](https://en.wikipedia.org/wiki/Cron) at the end of the day to sync conversions data with VWO. To achieve this,  you would want an HTTP API to send the conversions data of all the users who became part of the campaign back to VWO.

VWO offers an endpoint that you can use to mark a conversion for a particular user who became part of the campaign earlier, by calling it with the required parameters.

## Endpoint Details

**Endpoint** - [https://dev.visualwebsiteoptimizer.com/server-side/track-goal](https://dev.visualwebsiteoptimizer.com/server-side/track-goal)

**Query Parameters**

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Description
      </th>

      <th>
        Data Type
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        account\_id  

        * Required\_
      </td>

      <td>
        VWO Account ID
      </td>

      <td>
        Number\
        Example: 123456
      </td>
    </tr>

    <tr>
      <td>
        experiment\_id  

        * Required\_
      </td>

      <td>
        ID of the running Mobile campaign
      </td>

      <td>
        Number\
        Example: 123
      </td>
    </tr>

    <tr>
      <td>
        sId\
        *Required*
      </td>

      <td>
        Session ID ie. current UNIX timestamp
      </td>

      <td>
        Number\
        Example: 1626431681
      </td>
    </tr>

    <tr>
      <td>
        u\
        *Required*
      </td>

      <td>
        UUID v5
      </td>

      <td>
        String\
        Example: 5d7c94a905a54ae0ab3d6221c8f76f1d
      </td>
    </tr>

    <tr>
      <td>
        combination\
        *Required*
      </td>

      <td>
        The variation ID assigned to the User which he became part of the campaign(can be extracted from the detailed report CSV)
      </td>

      <td>
        Number\
        Example: 2(Variation-1), 1(Control), 10, etc.
      </td>
    </tr>

    <tr>
      <td>
        goal\_id  

        * Required\_
      </td>

      <td>
        The goal ID you want the conversion data to be associated with.
      </td>

      <td>
        Number\
        Example: 201
      </td>
    </tr>

    <tr>
      <td>
        env\
        *Required for env-level reporting*
      </td>

      <td>
        SDK Key
      </td>

      <td>
        Alphanumeric\
        Example: 11041d99974c0d637e603bbbcfe64c99
      </td>
    </tr>

    <tr>
      <td>
        random\
        *Required*
      </td>

      <td>
        A unique random number to bust the caching
      </td>

      <td>
        Number | Double\
        Example: 0.25227311885823933
      </td>
    </tr>

    <tr>
      <td>
        ap\
        *Required*
      </td>

      <td>
        VWO Platform
      </td>

      <td>
        server
      </td>
    </tr>

    <tr>
      <td>
        sdk\
        *Optional*
      </td>

      <td>
        Name of the SDK
      </td>

      <td>
        Example: vwo-node-sdk
      </td>
    </tr>

    <tr>
      <td>
        sdk-v\
        *Optional*
      </td>

      <td>
        Version of the SDK used
      </td>

      <td>
        Example: 1.18.0
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Retrieving Data for the Endpoint
>
> Please refer to the Integrations section inside the [SDK Reference](https://developers.vwo.com/docs/sdk-quickstart) to know how you can get ***u, combination***, and ***experiment\_id***. For example: you can refer [Node.js Integrations](https://developers.vwo.com/docs/nodejs-integrations) section.

## Example Usage

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-goal?experiment_id=84&combination=1&sId=1626431508&u=4EB8C94E0DE95A609C5811B8A176F72E&sdk=vwo-node-sdk&sdk-v=1.17.2&env=11041d99974c0d637e603bbbcfe64c99&account_id=3000204&random=0.6871404163737733&ap=server&goal_id=242&
```

## References

1. [Download the detailed report of a campaign](https://help.vwo.com/hc/en-us/articles/360019594933-How-to-Email-or-Download-a-Test-Report-in-VWO-)
2. [Integrating VWO with Google Cloud Storage](https://help.vwo.com/hc/en-us/articles/900006484803-Integrating-VWO-with-Google-Cloud-Storage)
3. [Integrating VWO with Amazon S3](https://help.vwo.com/hc/en-us/articles/900006485423-Integrating-VWO-with-Amazon-S3)
