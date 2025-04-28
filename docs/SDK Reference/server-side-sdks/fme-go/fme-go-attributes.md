---
title: Attributes
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
      slug: fme-go-storage
      title: Storage Service
---
Attributes allow you to update user properties dynamically. These can be used for user segmentation and targeting in your VWO campaigns.

## SetAttribute()

Use the `SetAttribute()` method to set a custom attribute for a user:

```go
err := vwoClient.SetAttribute("attribute-key", "attribute-value", userContext)
if err != nil {
    // Handle error
}
```

<br />

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
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
        **attributeKey**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The key of the attribute to set
      </td>
    </tr>

    <tr>
      <td>
        **attributeValue**\
        *Required*
      </td>

      <td>
        interface\{}
      </td>

      <td>
        The value of the attribute.
      </td>
    </tr>

    <tr>
      <td>
        **userContext**\
        *Required*
      </td>

      <td>
        map[string]interface\{}
      </td>

      <td>
        Contains information about the current user, including a required unique identifier for each user. Read more about userContext [here](https://developers.vwo.com/v2/docs/fme-node-context)  .
      </td>
    </tr>
  </tbody>
</Table>
