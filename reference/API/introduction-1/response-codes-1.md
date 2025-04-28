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
[block:parameters]
{
  "data": {
    "0-0": "400\n(Bad Request)",
    "0-1": "If the request is not sent in valid JSON. Specify a Content-Type: application/json header in your request. If you sent valid JSON, the error may also mean specific fields that were invalid.",
    "1-0": "401\n(Unauthorized)",
    "1-1": "If your API token was missing or included in the body rather than the header.",
    "2-0": "403\n(Forbidden)",
    "2-1": "If you provided an API token but it was invalid or revoked, or if you don't have read/write access to the entity you're trying to view/edit.",
    "3-0": "404\n(Not Found)",
    "3-1": "If the id used in the request was inaccurate or you don't have permission to view/edit it.",
    "4-0": "429\n(Too Many Requests)",
    "4-1": "If you hit a rate limit for the API. If you receive this response, we recommend waiting at least 60 seconds before re-attempting the request.",
    "5-0": "503\n(Service Unavailable)",
    "5-1": "If the API is overloaded or down for maintenance. If you receive this response, we recommend waiting at least 60 seconds before re-attempting the request.",
    "h-0": "Response",
    "h-1": "What triggers the response?"
  },
  "cols": 2,
  "rows": 6
}
[/block]