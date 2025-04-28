---
title: Push
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
Pushes a custom dimension for a particular user to the VWO server. It is used for post-segmenting the data in the campaign reports.

## Description

The API method:

* Validates the parameters passed
* Sends a call to the VWO server for associating custom dimensions for the user to the same users that are part of the FullStack campaign.

The API method accepts a custom dimension key - *custom\_dimension\_key*, custom dimension value - *custom\_dimension\_value*, and user-id - *user\_id*.

*custom\_dimension\_key* is the unique key associated with a particular custom dimension made in VWO application.\
*custom\_dimension\_value* is the value you want to tag a custom dimension with.\
*userId* is the unique id associated with the user for identification.

## Parameter Definitions

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
        **custom\_dimension\_key**
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The custom dimension key to uniquely identify a custom dimension.
      </td>
    </tr>

    <tr>
      <td>
        **custom\_dimension\_value**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        The custom dimension value for a custom dimension.
      </td>
    </tr>

    <tr>
      <td>
        **user\_id**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        User ID, which uniquely identifies each user.

        * \*Important\*\*: This User ID must match the User ID provided to activate or getVariation API.
      </td>
    </tr>
  </tbody>
</Table>

## Returns

A boolean value based on whether the call was made to the VWO server.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Value
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
        true
      </td>

      <td>
        Boolean
      </td>

      <td>
        If call is successfully being made to the VWO server for post-segmentation
      </td>
    </tr>

    <tr>
      <td>
        false
      </td>

      <td>
        Boolean
      </td>

      <td>
        If validation fails or call is not made
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```python
vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)
```

## Tracking Multiple Custom Dimensions simultaneously

There would be instances when you would like to push more than one custom dimension associated with a particular user. To solve this, you can refer to the below docs and make sure you're using the latest SDK.

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
        **custom\_dimension\_map**
        *Required*
      </td>

      <td>
        Dictionary
      </td>

      <td>
        A map to provide different custom dimensions associated with the user in form of key-value pairs.
      </td>
    </tr>

    <tr>
      <td>
        **user\_id**\
        *Required*
      </td>

      <td>
        String
      </td>

      <td>
        User ID, which uniquely identifies each user.

        * \*Important\*\*: This User ID must match the User ID provided to activate or isFeatureEnabled API
      </td>
    </tr>
  </tbody>
</Table>

## Usage

```python
custom_dimension_map = {
  "tag_key_1": "tag_value_1",
  "tag_key_2": "tag_value_2",
  "tag_key_3": "tag_value_3"
}

# positional parameters
vwo_client_instance.push({"tag_key_1": "tag_value_1"}, "user_id")

# using named parameters/kwargs
vwo_client_instance.push(custom_dimension_map = custom_dimension_map, user_id = user_id)
```

> 📘 Note
>
> This will make multiple tracking calls to the VWO server corresponding to each key-value pair.
