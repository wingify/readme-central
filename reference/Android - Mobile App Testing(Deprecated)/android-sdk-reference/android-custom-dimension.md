---
title: Push Custom Dimension
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

Read [here](https://help.vwo.com/hc/en-us/articles/360038019054-Creating-a-Custom-Dimension-in-VWO) on how to create custom dimension in VWO

> 📘 Note:
>
> This is available from version **2.6.0** onwards.

## Description

The API method:

* validates the parameters passed
* sends a call to VWO server for associating the custom dimension for the same user that became part of the campaign.

The API method accepts a custom dimension key - *customDimensionKey* and custom dimension value - *customDimensionValue*.

*customDimensionKey* is the unique key associated with a particular custom dimension made in VWO application.

*customDimensionValue* is the value you want to tag a custom dimension with.

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
  </tbody>
</Table>

## Usage

```java
// Replace custom dimension key and value with actual values
VWO.pushCustomDimension("CUSTOM_DIMENSION_KEY", "CUSTOM_DIMENSION_VALUE");
```
```kotlin
// Replace custom dimension key and value with actual values
VWO.pushCustomDimension("CUSTOM_DIMENSION_KEY", "CUSTOM_DIMENSION_VALUE")
```
