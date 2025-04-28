---
title: Response Codes
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
## Response

Upon successful request, the response includes data and `200 OK (GET)`, `201 CREATED (POST)`, `200 OK (PATCH)`, or `204 NO CONTENT (DELETE)` as the HTTP code. If the request fails, the response is one of the following error codes:

<Table align={["left","left"]}>
  <thead>
    <tr>
      <th>
        Response
      </th>

      <th>
        What triggers the response?
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        400
        (Bad Request)
      </td>

      <td>
        If the request is not sent in valid JSON. Specify a Content-Type: application/json header in your request. If you sent valid JSON, the error may also mean specific fields that were invalid.
      </td>
    </tr>

    <tr>
      <td>
        401\
        (Unauthorized)
      </td>

      <td>
        If your API token was missing or included in the body rather than the header.
      </td>
    </tr>

    <tr>
      <td>
        403\
        (Forbidden)
      </td>

      <td>
        If you provided an API token but it was invalid or revoked, or if you don't have read/write access to the entity you're trying to view/edit.
      </td>
    </tr>

    <tr>
      <td>
        404\
        (Not Found)
      </td>

      <td>
        If the id used in the request was inaccurate or you don't have permission to view/edit it.
      </td>
    </tr>

    <tr>
      <td>
        429\
        (Too Many Requests)
      </td>

      <td>
        If you hit a rate limit for the API. If you receive this response, we recommend waiting at least 60 seconds before re-attempting the request.
      </td>
    </tr>

    <tr>
      <td>
        503\
        (Service Unavailable)
      </td>

      <td>
        If the API is overloaded or down for maintenance. If you receive this response, we recommend waiting at least 60 seconds before re-attempting the request.
      </td>
    </tr>
  </tbody>
</Table>
