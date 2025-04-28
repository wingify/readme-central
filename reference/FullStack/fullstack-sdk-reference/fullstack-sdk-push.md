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

* validates the parameters passed
* sends a call to the VWO server for associating custom dimensions for the user to the same users that are part of the FullStack campaign.

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

```javascript Node.js
vwoClientInstance.push(customDimensionKey, customDimensionValue, userId);
```
```php
<?php

$vwoClientInstance->push($customDimensionKey, $customDimensionValue, $userId);
```
```python
vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)
```
```csharp .NET
bool isSuccessful = vwoClientInstance.Push(customDimensionKey, customDimensionValue, userId);
```
```java
boolean isSuccessful = vwoClientInstance.push(customDimensionKey, customDimensionValue, userId);
```
```ruby
vwo_client_instance.push(custom_dimension_key, custom_dimension_value, user_id)
```
```go
isSuccessful = vwoClientInstance.Push(customDimensionKey, customDimensionValue, userId)
```
