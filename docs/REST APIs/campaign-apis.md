---
title: Campaign APIs
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
      slug: demo-apps
      title: Usage
---
The FullStack A/B campaign requires linking at least one project to create a campaign, while Feature Rollout and Feature Test campaigns require at least one project and one feature. A feature cannot be used in two similar campaigns. You must create projects and features from the App before designing these campaigns so that they can be used in the campaigns.

**FullStack Campaign resource that differs from Web Campaign**

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Property
      </th>

      <th style={{ textAlign: "left" }}>
        FullStack A/B
      </th>

      <th style={{ textAlign: "left" }}>
        Feature Test
      </th>

      <th style={{ textAlign: "left" }}>
        Feature Rollout
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        type
      </td>

      <td style={{ textAlign: "left" }}>
        server-ab
      </td>

      <td style={{ textAlign: "left" }}>
        feature-test
      </td>

      <td style={{ textAlign: "left" }}>
        feature-rollout
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        testKey
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        projects
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        feature
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        variations
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        goals
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        Yes
      </td>

      <td style={{ textAlign: "left" }}>
        No
      </td>
    </tr>
  </tbody>
</Table>

> 📘 Note:
>
> As stated in the table above, a Feature Rollout does not have Goals and Variations.
