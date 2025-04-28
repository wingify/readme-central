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

The API method accepts a custom dimension key - *customDimensionKey*, custom dimension value - *customDimensionValue*, and user-id - *userId*.

*customDimensionKey* is the unique key associated with a particular custom dimension made in VWO application.\
*customDimensionValue* is the value you want to tag a custom dimension with.\
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
        **customDimensionKey**
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
        **customDimensionValue**\
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
        **userId**\
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

```php
<?php

$vwoClientInstance->push($customDimensionKey, $customDimensionValue, $userId);
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
        **customDimensionMap**
        *Required*
      </td>

      <td>
        Associate Array
      </td>

      <td>
        A map to provide different custom dimensions associated with the user in form of key-value pairs.
      </td>
    </tr>

    <tr>
      <td>
        **userId**\
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

```php
$customDimensionMap = [
  "browser" => "chrome",
  "price" => "20"
];

$vwoClientInstance->push($customDimensionMap, $userId);
```

> 📘 Note
>
> This will make multiple tracking calls to the VWO server corresponding to each key-value pair.
