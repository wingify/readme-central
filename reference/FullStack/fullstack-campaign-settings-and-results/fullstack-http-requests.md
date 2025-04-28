---
title: HTTP Requests
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
List of all HTTP requests that are made to VWO server for various purposes.

<Table align={["left","left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Purpose
      </th>

      <th style={{ textAlign: "left" }}>
        Endpoint
      </th>

      <th style={{ textAlign: "left" }}>
        Required params
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Response
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        Get settingsFile
      </td>

      <td style={{ textAlign: "left" }}>
        //dev.visualwebsiteoptimizer.com/server-side/settings
      </td>

      <td style={{ textAlign: "left" }}>
        accountId\
        sdkKey
      </td>

      <td style={{ textAlign: "left" }}>
        This is required for fetching the settingsFile required for [instantiating](https://developers.vwo.com/reference#fullstack-sdk-instantiation) the VWO SDK.
      </td>

      <td style={{ textAlign: "left" }}>
        Status Code: 200\
        Response: JSON - *settingsFile*

        If sdkKey is not valid, then

        Status Code: 400\
        Response: JSON -  \{"message":"Invalid api key"}
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Track visitor
      </td>

      <td style={{ textAlign: "left" }}>
        //dev.visualwebsiteoptimizer.com/server-side/track-user
      </td>

      <td style={{ textAlign: "left" }}>
        VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, along with meta information like sdk-name, sdk-version, etc.
      </td>

      <td style={{ textAlign: "left" }}>
        To send an event to VWO server to track a visitor.
      </td>

      <td style={{ textAlign: "left" }}>
        Status Code: 200\
        Empty response
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Track Conversion
      </td>

      <td style={{ textAlign: "left" }}>
        //dev.visualwebsiteoptimizer.com/server-side/track-goal
      </td>

      <td style={{ textAlign: "left" }}>
        VWO sends the essential params like accountId, campaignId, variation assigned, current time, user ID, UUID of user, goalId and revenue(if revenue goal), along with meta information like sdk-name, sdk-version, etc.
      </td>

      <td style={{ textAlign: "left" }}>
        To send an event to VWO server to track a conversion. Various metrics are calculated and shown in campaign reports based on count of visitors and conversions.
      </td>

      <td style={{ textAlign: "left" }}>
        Status Code: 200\
        Empty response
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        Custom Dimension
      </td>

      <td style={{ textAlign: "left" }}>
        //dev.visualwebsiteoptimizer.com/server-side/push
      </td>

      <td style={{ textAlign: "left" }}>
        VWO sends the essential params like accountId, current time, user ID, UUID of user, custom-dimension-key, custom-dimension-value, along with meta information like sdk-name, sdk-version, etc.
      </td>

      <td style={{ textAlign: "left" }}>
        To categorize and differentiate user. Post-segmentation can be applied on this cutom-dimension to view segmented report data.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>
  </tbody>
</Table>

If you enable the DEBUG or INFO logs, all such information can be seen there. Read more on [how to set log level and customize the logger](https://developers.vwo.com/reference#fullstack-sdk-customization-configure-the-logger).
