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
  pages:
    - type: basic
      slug: impression-events
      title: Impression Events
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
        [https://dev.visualwebsiteoptimizer.com/server-side/settings](https://dev.visualwebsiteoptimizer.com/server-side/settings)
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
        [https://dev.visualwebsiteoptimizer.com/server-side/track-user](https://dev.visualwebsiteoptimizer.com/server-side/track-user)
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
        [https://dev.visualwebsiteoptimizer.com/server-side/track-goal](https://dev.visualwebsiteoptimizer.com/server-side/track-goal)
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
        [https://dev.visualwebsiteoptimizer.com/server-side/push](https://dev.visualwebsiteoptimizer.com/server-side/push)
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

    <tr>
      <td style={{ textAlign: "left" }}>
        Batch Events
      </td>

      <td style={{ textAlign: "left" }}>
        [https://dev.visualwebsiteoptimizer.com/server-side/batch-events](https://dev.visualwebsiteoptimizer.com/server-side/batch-events)
      </td>

      <td style={{ textAlign: "left" }}>
        VWO SDK batches different events like track-user, track-goal, and push and sends to VWO.
      </td>

      <td style={{ textAlign: "left" }}>
        VWO SDK batches different events and sends them in a single POST call.
      </td>

      <td style={{ textAlign: "left" }}>

      </td>
    </tr>
  </tbody>
</Table>

If you enable the DEBUG or INFO logs, all such information can be seen there. Read more on how to set log level and customize the logger.

## Fetching Settings File

**URL** - GET [https://dev.visualwebsiteoptimizer.com/server-side/settings](https://dev.visualwebsiteoptimizer.com/server-side/settings)

**Query Params** 

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Param
      </th>

      <th>
        Description
      </th>

      <th>
        Type
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **a**
        (*Required*)
      </td>

      <td>
        VWO Account ID
      </td>

      <td>
        Number
      </td>

      <td>
        12345
      </td>
    </tr>

    <tr>
      <td>
        **i**\
        (*Required*)
      </td>

      <td>
        SDK Key
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        aa87170ad94079aa190bc7c9b85d26zz
      </td>
    </tr>
  </tbody>
</Table>

**Response** - JSON - has the account and campaigns configuration. Otherwise the error message.

**Example**

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/settings?a=12345&i=aa87170ad94079aa190bc7c9b85d26zz
```

## Tracking a User in a Campaign

**URL** - GET [https://dev.visualwebsiteoptimizer.com/server-side/track-user](https://dev.visualwebsiteoptimizer.com/server-side/track-user)

**Query Params** 

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Param
      </th>

      <th>
        Description
      </th>

      <th>
        Type
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **account\_id**
        (*Required*)
      </td>

      <td>
        VWO Account ID
      </td>

      <td>
        Number
      </td>

      <td>
        12345
      </td>
    </tr>

    <tr>
      <td>
        **sId**\
        (*Required*)
      </td>

      <td>
        Session ID / Current UTC Timestamp
      </td>

      <td>
        Number
      </td>

      <td>
        1641218854
      </td>
    </tr>

    <tr>
      <td>
        **u**\
        (*Required*)
      </td>

      <td>
        32 characters long UUID
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        O33C4BA1CB0C53CDB32B51AF403B344P
      </td>
    </tr>

    <tr>
      <td>
        **experiment\_id**\
        (*Required*)
      </td>

      <td>
        VWO Experiment ID
      </td>

      <td>
        Number
      </td>

      <td>
        10
      </td>
    </tr>

    <tr>
      <td>
        **combination**\
        (*Required*)
      </td>

      <td>
        Variation ID in which User got bucketed
      </td>

      <td>
        Number
      </td>

      <td>
        2
      </td>
    </tr>

    <tr>
      <td>
        **env**\
        (*Required*)
      </td>

      <td>
        SDK/environment Key\
        This is for viewing reports based on the project's environment
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        aa87170ad94079aa190bc7c9b85d26zz
      </td>
    </tr>

    <tr>
      <td>
        **ap**\
        (*Required*)
      </td>

      <td>
        Platform
      </td>

      <td>
        String
      </td>

      <td>
        server
      </td>
    </tr>

    <tr>
      <td>
        **random**\
        (*Required*)
      </td>

      <td>
        For cache busting
      </td>

      <td>
        Float
      </td>

      <td>
        0.6375406415765388
      </td>
    </tr>

    <tr>
      <td>
        **sdk**\
        (*Optional*)
      </td>

      <td>
        Name of SDK used
      </td>

      <td>
        String
      </td>

      <td>
        * vwo-node-sdk\_ or  
        * vwo-java-sdk\_ and so on
      </td>
    </tr>

    <tr>
      <td>
        **sdk-v**\
        (*Optional*)
      </td>

      <td>
        The version of SDK used
      </td>

      <td>
        Semver
      </td>

      <td>
        1.30.0
      </td>
    </tr>
  </tbody>
</Table>

**Response** - JSON 

**Example** - 

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-user?experiment_id=480&combination=1&sId=1641218854&u=O33C4BA1CB0C53CDB32B51AF403B344P&sdk=vwo-node-sdk&sdk-v=1.28.0&account_id=60781&random=0.6375406415765388&ed=%7B%22p%22:%22server%22%7D&env=b243e464740be856d35d4da72c02a15d
```

## Tracking a User Conversion in a campaign

**URL** - GET [https://dev.visualwebsiteoptimizer.com/server-side/track-goal](https://dev.visualwebsiteoptimizer.com/server-side/track-goal)

**Query Params** 

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Param
      </th>

      <th>
        Description
      </th>

      <th>
        Type
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **account\_id**
        (*Required*)
      </td>

      <td>
        VWO Account ID
      </td>

      <td>
        Number
      </td>

      <td>
        12345
      </td>
    </tr>

    <tr>
      <td>
        **sId**\
        (*Required*)
      </td>

      <td>
        Session ID / Current UTC Timestamp
      </td>

      <td>
        Number
      </td>

      <td>
        1641218854
      </td>
    </tr>

    <tr>
      <td>
        **u**\
        (*Required*)
      </td>

      <td>
        32 characters long UUID
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        O33C4BA1CB0C53CDB32B51AF403B344P
      </td>
    </tr>

    <tr>
      <td>
        **experiment\_id**\
        (*Required*)
      </td>

      <td>
        VWO Experiment ID
      </td>

      <td>
        Number
      </td>

      <td>
        10
      </td>
    </tr>

    <tr>
      <td>
        **combination**\
        (*Required*)
      </td>

      <td>
        Variation ID in which User got bucketed
      </td>

      <td>
        Number
      </td>

      <td>
        2
      </td>
    </tr>

    <tr>
      <td>
        **goal\_id**\
        (*Required*)
      </td>

      <td>
        Goal ID of a campaign
      </td>

      <td>
        Number
      </td>

      <td>
        1
      </td>
    </tr>

    <tr>
      <td>
        **env**\
        (*Required*)
      </td>

      <td>
        SDK/environment Key\
        This is for viewing reports based on the project's environment
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        aa87170ad94079aa190bc7c9b85d26zz
      </td>
    </tr>

    <tr>
      <td>
        **ap**\
        (*Required*)
      </td>

      <td>
        Platform
      </td>

      <td>
        String
      </td>

      <td>
        server
      </td>
    </tr>

    <tr>
      <td>
        **random**\
        (*Required*)
      </td>

      <td>
        For cache busting
      </td>

      <td>
        Float
      </td>

      <td>
        0.6375406415765388
      </td>
    </tr>

    <tr>
      <td>
        **sdk**\
        (*Optional*)
      </td>

      <td>
        Name of SDK used
      </td>

      <td>
        String
      </td>

      <td>
        * vwo-node-sdk\_ or  
        * vwo-java-sdk\_ and so on
      </td>
    </tr>

    <tr>
      <td>
        **sdk-v**\
        (*Optional*)
      </td>

      <td>
        The version of SDK used
      </td>

      <td>
        Semver
      </td>

      <td>
        1.31.0
      </td>
    </tr>
  </tbody>
</Table>

**Response** - JSON 

**Example** 

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/track-goal?experiment_id=481&combination=1&sId=1643870500&u=C13C4BA1CB0C53CDB32B51AF403B3352&sdk=vwo-node-sdk&sdk-v=1.32.1&env=aa43e464740be856d35d4da72c02a15d&account_id=12345&random=0.38654106039749414&goal_id=343&ap=servevr
```

## Pushing a Custom Dimension

**URL** - GET [https://dev.visualwebsiteoptimizer.com/server-side/push](https://dev.visualwebsiteoptimizer.com/server-side/push)

**Query Params** 

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Param
      </th>

      <th>
        Description
      </th>

      <th>
        Type
      </th>

      <th>
        Example
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **account\_id**
        (*Required*)
      </td>

      <td>
        VWO Account ID
      </td>

      <td>
        Number
      </td>

      <td>
        12345
      </td>
    </tr>

    <tr>
      <td>
        **sId**\
        (*Required*)
      </td>

      <td>
        Session ID / Current UtC Timestamp
      </td>

      <td>
        Number
      </td>

      <td>
        1641218854
      </td>
    </tr>

    <tr>
      <td>
        **u**\
        (*Required*)
      </td>

      <td>
        32 characters long UUID
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        O33C4BA1CB0C53CDB32B51AF403B344P
      </td>
    </tr>

    <tr>
      <td>
        **env**\
        (*Required*)
      </td>

      <td>
        SDK/environment Key\
        This is for viewing reports based on the project's environment
      </td>

      <td>
        Alphanumeric
      </td>

      <td>
        aa87170ad94079aa190bc7c9b85d26zz
      </td>
    </tr>

    <tr>
      <td>
        **tags**
      </td>

      <td>
        Custom Dimension Data
      </td>

      <td>
        JSON
      </td>

      <td>
        \{"u":\{"key":"value"}}
      </td>
    </tr>

    <tr>
      <td>
        **random**\
        (*Required*)
      </td>

      <td>
        For cache busting
      </td>

      <td>
        Float
      </td>

      <td>
        0.6375406415765388
      </td>
    </tr>

    <tr>
      <td>
        **ap**
      </td>

      <td>
        Platform
      </td>

      <td>
        String
      </td>

      <td>
        server
      </td>
    </tr>

    <tr>
      <td>
        **sdk**\
        (*Optional*)
      </td>

      <td>
        Name of SDK used
      </td>

      <td>
        String
      </td>

      <td>
        * vwo-node-sdk\_ or  
        * vwo-java-sdk\_ and so on
      </td>
    </tr>

    <tr>
      <td>
        **sdk-v**\
        (*Optional*)
      </td>

      <td>
        The version of SDK used
      </td>

      <td>
        Semver
      </td>

      <td>
        1.30.0
      </td>
    </tr>
  </tbody>
</Table>

**Response** - JSON - have the account and campaigns configuration. Otherwise, the error message.

**Example**

```text URL
https://dev.visualwebsiteoptimizer.com/server-side/push?sId=1643870764&u=4F3FE0FB2FF05CE19233BF181D81DE27&sdk=vwo-node-sdk&sdk-v=1.32.1&env=aa43e464740be856d35d4da72c02a15d&account_id=12345&random=0.1516327177576584&ap=server&tags={"u":{"browser":"chrome"}}&
```
