---
title: Feature resource representation
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
<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Property
      </th>

      <th style={{ textAlign: "left" }}>
        Type
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Editable
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        id
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Feature Id
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        name
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Feature Name
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdOn
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Feature Creation Time
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        modifiedOn
      </td>

      <td style={{ textAlign: "left" }}>
        timestamp
      </td>

      <td style={{ textAlign: "left" }}>
        Feature Modified Time
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        createdBy
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Contains the information of user who created the feature
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variables
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Variables created
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variables[index].id
      </td>

      <td style={{ textAlign: "left" }}>
        integer
      </td>

      <td style={{ textAlign: "left" }}>
        Variable Id
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variables[index].variableName
      </td>

      <td style={{ textAlign: "left" }}>
        string
      </td>

      <td style={{ textAlign: "left" }}>
        Variable name
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variables[index].dataType
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Variable Type
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variables[index].defaultValue
      </td>

      <td style={{ textAlign: "left" }}>
        any
      </td>

      <td style={{ textAlign: "left" }}>
        Variable Default value
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        setting
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Whether a feature is editable or not
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>
  </tbody>
</Table>
