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
VWO SDK allows you to track conversions using [trackConversion](https://developers.vwo.com/reference#android-trigger-goals) API. There could be scenarios when you would like to track conversions without using the SDK.

To understand this in detail, let's take an example, where you have your own centralized data-storage service which stores the information of all the events.  Whenever a conversion happens at your application, you store the data in the storage service but the integrated tools like VWO do not know about this conversion. Let's assume you do not prefer real-time syncing of this data with VWO and therefore, you run a [cron job](https://en.wikipedia.org/wiki/Cron) at the end of the day to sync conversions data with VWO. To achieve this,  you would want an HTTP API to send the conversions data of all the users who became part of the campaign back to VWO.

VWO offers an endpoint that you can use to mark a conversion for a particular user who became part of the campaign earlier, by calling it with the required parameters.

## Endpoint Details

**Endpoint** - [https://dacdn.visualwebsiteoptimizer.com/track-goal](https://dacdn.visualwebsiteoptimizer.com/track-goal)

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
        **account\_id**
        *Required*
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
        u\
        *Required*
      </td>

      <td>
        MD5 UUID
      </td>

      <td>
        String\
        Example: 5d7c94a905a54ae0ab3d6221c8f76f1d
      </td>
    </tr>

    <tr>
      <td>
        user\_id  

        * Optional\_  
        * Required*if \*\*\_u*\*\* is not passed
      </td>

      <td>
        Human readable data  

        * \*Note:\*\* Please ensure you do not pass any sensitive information. Please read our [privacy principles](https://vwo.com/compliance/privacy-principles/).
      </td>

      <td>
        String | Number\
        Example: [hello@world.com](mailto:hello@world.com), vwo-user-123, 12.34.56.78, etc.
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
        r\
        *Optional*
      </td>

      <td>
        Revenue value. This is only required if the VWO campaign goal is of Revenue type.
      </td>

      <td>
        Number | Double\
        Example: 10000, 10.5
      </td>
    </tr>
  </tbody>
</Table>

> 🚧 Please Note
>
> If you pass **user\_id**, then **u** is not required or will not be used by VWO server.

## Example Usage

```text URL
https://dacdn.visualwebsiteoptimizer.com/track-goal?experiment_id=123&account_id=123456&combination=2&uid=1d7c94a905a54ae0ab3d6221c8f76f1f&random=0.25227311885823933&goal_id=201;
```
