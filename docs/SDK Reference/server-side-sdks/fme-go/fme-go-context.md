---
title: User Context
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: fme-go-flags
      title: Feature Flags
---
The user context is a crucial component in VWO's Feature Management and Experimentation SDK. It provides information about the current user, which is used for targeting and segmentation.

## Usage

When calling methods like `GetFlag()`, you need to provide a user context:

```go
userContext := map[string]interface{}{
    "userId":          "user123",
    "customVariables": map[string]interface{}{
        "age":    25,
        "country": "US",
    },
    "userAgent": "Mozilla/5.0...",
    "ipAddress": "127.0.0.1",
}

flag, err := vwoClient.GetFlag("feature_key", userContext)
if err != nil {
    // Handle error
}

 
```

<br />

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Paramter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **userId**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management)  .
      </td>
    </tr>

    <tr>
      <td>
        **userAgent**\
        *Optional*
      </td>

      <td>
        String
      </td>

      <td>
        The userAgent object for the current user, can be used for targeting & segmentation. 
      </td>
    </tr>

    <tr>
      <td>
        **ipAddress**\
        *Optional*
      </td>

      <td>
        String
      </td>

      <td>
        IP Address of the current user, can be used for targeting & segmentation.
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**\
        *Optional*
      </td>

      <td>
        map[string]interface\{}
      </td>

      <td>
        Any additional details of the current user that you want to push to VWO can be added here as key-value pairs, can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>

The userId is required for all SDK calls. Other properties are optional but can be used for more precise targeting and segmentation.
