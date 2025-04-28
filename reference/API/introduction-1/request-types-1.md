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
[block:parameters]
{
  "data": {
    "0-0": "### GET",
    "0-1": "Used to retrieve an entity or list of entities. GET requests are always read-only. To retrieve a single entity, use its id in the URL. To retrieve multiple entities, leave it blank.",
    "h-0": "Method",
    "h-1": "Description",
    "h-2": "Result",
    "0-2": "Upon successful execution, GET method returns the data in the body and a `200 OK` code.",
    "1-0": "### POST",
    "1-1": "Used to create an entity in VWO. For example, a variation in a campaign. \nPOST requests have a JSON encoded body and the Content-Type: application/json header.",
    "1-2": "Upon successful execution, POST method returns the created entity as JSON in the body, including a new id argument, and a `201 CREATED` code.",
    "2-0": "### PATCH",
    "2-1": "Used to update an entity in VWO.  The URL includes the id of the entity to update.",
    "2-2": "Upon successful execution, PATCH method returns a `200 OK` code and the data in the body.",
    "3-0": "### DELETE",
    "3-1": "Used to remove an entity in VWO. The URL includes the id of the entity to delete. No data is sent in the body.",
    "3-2": "The response includes a `204 NO CONTENT` code."
  },
  "cols": 3,
  "rows": 4
}
[/block]