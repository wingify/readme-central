---
title: Request Types
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
## Request Types

The most commonly-used HTTP methods are POST, GET, PATCH, and DELETE that correspond to create, read, update, and delete (or CRUD) operations. You can add the following endpoints after the version in the API URL.

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th style={{ textAlign: "left" }}>
        Method
      </th>

      <th style={{ textAlign: "left" }}>
        Description
      </th>

      <th style={{ textAlign: "left" }}>
        Result
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td style={{ textAlign: "left" }}>
        ### GET
      </td>

      <td style={{ textAlign: "left" }}>
        Used to retrieve an entity or list of entities. GET requests are always read-only. To retrieve a single entity, use its id in the URL. To retrieve multiple entities, leave it blank.
      </td>

      <td style={{ textAlign: "left" }}>
        Upon successful execution, GET method returns the data in the body and a `200 OK` code.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ### POST
      </td>

      <td style={{ textAlign: "left" }}>
        Used to create an entity in VWO. For example, a variation in a campaign.\
        POST requests have a JSON encoded body and the Content-Type: application/json header.
      </td>

      <td style={{ textAlign: "left" }}>
        Upon successful execution, POST method returns the created entity as JSON in the body, including a new id argument, and a `201 CREATED` code.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ### PATCH
      </td>

      <td style={{ textAlign: "left" }}>
        Used to update an entity in VWO.  The URL includes the id of the entity to update.
      </td>

      <td style={{ textAlign: "left" }}>
        Upon successful execution, PATCH method returns a `200 OK` code and the data in the body.
      </td>
    </tr>

    <tr>
      <td style={{ textAlign: "left" }}>
        ### DELETE
      </td>

      <td style={{ textAlign: "left" }}>
        Used to remove an entity in VWO. The URL includes the id of the entity to delete. No data is sent in the body.
      </td>

      <td style={{ textAlign: "left" }}>
        The response includes a `204 NO CONTENT` code.
      </td>
    </tr>
  </tbody>
</Table>
