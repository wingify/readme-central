---
title: Variation resource representation
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
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
        Int
      </td>

      <td style={{ textAlign: "left" }}>
        Variation Id

        Note: Please ensure that variation Id is serial. For eg, if you have variations with ids 1,2,3 and you delete variation id 2, now you would have the variation ids 1, 2; 3 would be updated to 2
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
        Variation Name
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        isControl
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Flag which signifies if the variation is control variation
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        isDisabled
      </td>

      <td style={{ textAlign: "left" }}>
        boolean
      </td>

      <td style={{ textAlign: "left" }}>
        Flag which signifies if the variation is disabled

        Note: Please set the percentSplit to 0 for the given variation to disable it
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        percentSplit
      </td>

      <td style={{ textAlign: "left" }}>
        float
      </td>

      <td style={{ textAlign: "left" }}>
        Percentage Traffic allocated for variation
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        editorData
      </td>

      <td style={{ textAlign: "left" }}>
        Nested Object
      </td>

      <td style={{ textAlign: "left" }}>
        Contains the JS/CSS changes created for the variation
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        editorData.stack
      </td>

      <td style={{ textAlign: "left" }}>
        list
      </td>

      <td style={{ textAlign: "left" }}>
        stack contains the list of the changes for the variation
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        heatmapThumbUrl
      </td>

      <td style={{ textAlign: "left" }}>
        link
      </td>

      <td style={{ textAlign: "left" }}>
        Link for the heatmap thumbnail
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        screenshots
      </td>

      <td style={{ textAlign: "left" }}>
        list
      </td>

      <td style={{ textAlign: "left" }}>
        Contains the link of screenshots for the selected browsers for the variation
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        sectionId
      </td>

      <td style={{ textAlign: "left" }}>
        int
      </td>

      <td style={{ textAlign: "left" }}>
        Section Id

        Note: This would be 1 except the MULTIVARIATE campaign. It would be meaningful in that case only.
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Note:
>
> For adding js/css changes in variations, please use `changes` property in request body. These changes will be override any previous changes, if any.

> 📘 Note
>
> Variation splitPercent will be equally distributed among all variations on the creation of a new variation, which can be updated via update request
