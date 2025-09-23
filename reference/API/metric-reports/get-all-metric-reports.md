---
title: Get all metric reports
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
## Insights Metrics API Request

This document provides details on constructing a cURL request to retrieve insights metrics using the VWO API.

### Summary

This API request retrieves insights metrics for a specific account. It supports pagination and ordering, with additional options to filter by status and include metadata.

### API Endpoint

* **Summary**: Get all insights metrics for an account.
* **Method**: `GET`
* **URL**: `https://vwotestapp20.vwo.com/api/v2/accounts/{account_id}/insights-metrics`

### Path Parameters

| Parameter  | Type    | Description                      |
| ---------- | ------- | -------------------------------- |
| account_id | integer | ID of the VWO account (required) |

### Query Parameters

| Parameter | Type    | Description                                                                |
| --------- | ------- | -------------------------------------------------------------------------- |
| limit     | integer | Number of records to retrieve (max limit is 25)                            |
| offset    | integer | The starting point in the list to retrieve data from (optional)            |
| order     | string  | The order of the records, possible values are `asc` or `desc` (optional)   |
| status    | string  | Filter metrics based on their status (e.g., running, completed) (optional) |

### Headers

| Header   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `accept` | `string` | `application/json`            |
| `TOKEN`  | `string` | Your API authentication token |

### Sample Request

```bash
curl --location 'https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics?limit=25&offset=0&order=asc&status=running&meta=true' \
--header 'accept: application/json, text/plain, */*' \
--header 'TOKEN: Your-API-Token' \
--header 'Cookie: Your-Cookie-Data' 
```

### Sample Response

```json
{
    "_data": {
        "partialCollection": [
            {
                "id": 27,
                "name": "new Report",
                "status": "RUNNING",
                "createdOn": 1758607258,
                "modifiedOn": 1758607258,
                "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXhwZX9",
                "shareToken": "eyJhY22giOiIxNzM5YTQxN2NiYTdmODhiN2JkNDZmZGI0MTZlZDczNiIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
                "isDeleted": false,
                "createdBy": {
                    "name": "VWO Support",
                    "imageUrl": "/assets/images/vwo-support.svg"
                },
                "startedOn": "2025-09-23 06:00:58",
                "dataIntervalRange": {
                    "intervalSize": 86400,
                    "startTime": 1758585600,
                    "endTime": 1758671999,
                    "limitingStartTime": 1758585600,
                    "limitingEndTime": 1758671999
                },
                "goals": [
                    {
                        "id": 1,
                        "name": "new Report",
                        "isPrimary": true,
                        "type": "custom-conversion",
                        "description": "",
                        "createdAt": 1758607258,
                        "metricId": 1274,
                        "isArchived": false,
                        "attributionTime": "",
                        "calcLogic": {
                            "logic": "triggered"
                        },
                        "events": [
                            {
                                "props": [
                                    {
                                        "id": "112-Property",
                                        "include": [
                                            {
                                                "queryElementType": "partialQuery",
                                                "id": "90-VwoPageGroup",
                                                "operator": 11,
                                                "rOperandValue": "https://bla.com",
                                                "configurations": {
                                                    "ignoreOnlyQueryParams": true,
                                                    "ignoreOnlyHashFrag": true,
                                                    "caseInsensitive": true
                                                }
                                            }
                                        ],
                                        "exclude": [],
                                        "apiName": "event.targetUrl"
                                    }
                                ],
                                "id": "58-Event",
                                "eventDefinitionType": "STANDARD",
                                "apiName": "vwo_dom_click",
                                "name": "Click",
                                "isComputed": false,
                                "queryElementType": "partialQuery"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 26,
                "name": "form submission Report",
                "status": "RUNNING",
                "createdOn": 1758607254,
                "modifiedOn": 1758607254,
                "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXhwZXJpbWVudF9pZCI6MjYsImNyZWF0ZWRfb24iOjE3NTg2MDcyNTQsInR5cGUiOiJ0cmFja2luZ0NvZGUiLCJ2ZXJzaW9uIjoxLCJoYXNoIjoiNTIwYTNhYzRhMzhlMTU1NTY4YjFhYzMwNGZmM2Q3M2YiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
                "shareToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXhwZXJpbWVudF9pZCI6MjYsImNyZWF0ZWRfb24iOjE3NTg2MDcyNTQsInR5cGUiOiJjYW1wYWlnbiIsInZlcnNpb24iOjEsImhhc2giOiJiMjEwOGI5MWM2ZDhkMmMwMGI3N2IxZjU3YTdiZmQxMCIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
                "isDeleted": false,
                "createdBy": {
                    "name": "VWO Support",
                    "imageUrl": "/assets/images/vwo-support.svg"
                },
                "startedOn": "2025-09-23 06:00:54",
                "dataIntervalRange": {
                    "intervalSize": 86400,
                    "startTime": 1758585600,
                    "endTime": 1758671999,
                    "limitingStartTime": 1758585600,
                    "limitingEndTime": 1758671999
                },
                "goals": [
                    {
                        "id": 1,
                        "name": "form submission Report",
                        "isPrimary": true,
                        "type": "custom-conversion",
                        "description": "",
                        "createdAt": 1758607254,
                        "metricId": 1275,
                        "isArchived": false,
                        "attributionTime": "",
                        "calcLogic": {
                            "logic": "triggered"
                        },
                        "events": [
                            {
                                "props": [],
                                "id": "202-Event",
                                "eventDefinitionType": "STANDARD",
                                "apiName": "vwo_dom_submit",
                                "name": "Form submission",
                                "isComputed": false,
                                "queryElementType": "partialQuery"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 25,
                "name": "page-visit-metrics Report",
                "status": "RUNNING",
                "createdOn": 1758607250,
                "modifiedOn": 1758607250,
                "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXI1NzQ4ZmI5MzVmNDY0OGYwNzIyZDE5NjAiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
                "shareToken": "eyJhY2NvdW50X2lkIjoGYzYzY1NDViMWYyOGQyMyIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
                "isDeleted": false,
                "createdBy": {
                    "name": "VWO Support",
                    "imageUrl": "/assets/images/vwo-support.svg"
                },
                "startedOn": "2025-09-23 06:00:51",
                "dataIntervalRange": {
                    "intervalSize": 86400,
                    "startTime": 1758585600,
                    "endTime": 1758671999,
                    "limitingStartTime": 1758585600,
                    "limitingEndTime": 1758671999
                },
                "goals": [
                    {
                        "id": 1,
                        "name": "page-visit-metrics Report",
                        "isPrimary": true,
                        "type": "custom-conversion",
                        "description": "",
                        "createdAt": 1758607250,
                        "metricId": 1276,
                        "isArchived": false,
                        "attributionTime": "",
                        "calcLogic": {
                            "logic": "triggered"
                        },
                        "events": [
                            {
                                "props": [],
                                "id": "201-Event",
                                "eventDefinitionType": "STANDARD",
                                "apiName": "vwo_pageView",
                                "name": "Page visit",
                                "isComputed": false,
                                "queryElementType": "partialQuery"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 24,
                "name": "click metrics Report",
                "status": "RUNNING",
                "createdOn": 1758607246,
                "modifiedOn": 1758607246,
                "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywYmU2ZTkwYmZkOWI1ZDJjODdmZWVhYTkiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
                "shareToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZYTJlODMyMTlmNSIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
                "isDeleted": false,
                "createdBy": {
                    "name": "VWO Support",
                    "imageUrl": "/assets/images/vwo-support.svg"
                },
                "startedOn": "2025-09-23 06:00:47",
                "dataIntervalRange": {
                    "intervalSize": 86400,
                    "startTime": 1758585600,
                    "endTime": 1758671999,
                    "limitingStartTime": 1758585600,
                    "limitingEndTime": 1758671999
                },
                "goals": [
                    {
                        "id": 1,
                        "name": "click metrics Report",
                        "isPrimary": true,
                        "type": "custom-conversion",
                        "description": "",
                        "createdAt": 1758607246,
                        "metricId": 1277,
                        "isArchived": false,
                        "attributionTime": "",
                        "calcLogic": {
                            "logic": "triggered"
                        },
                        "events": [
                            {
                                "props": [],
                                "id": "58-Event",
                                "eventDefinitionType": "STANDARD",
                                "apiName": "vwo_dom_click",
                                "name": "Click",
                                "isComputed": false,
                                "queryElementType": "partialQuery"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 23,
                "name": "temp click metrics Report",
                "status": "RUNNING",
                "createdOn": 1758607221,
                "modifiedOn": 1758607221,
                "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTcZmYmM2MDRmMTNkN2IiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
                "shareToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MTNhYmYwOCIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
                "isDeleted": false,
                "createdBy": {
                    "name": "VWO Support",
                    "imageUrl": "/assets/images/vwo-support.svg"
                },
                "startedOn": "2025-09-23 06:00:22",
                "dataIntervalRange": {
                    "intervalSize": 86400,
                    "startTime": 1758585600,
                    "endTime": 1758671999,
                    "limitingStartTime": 1758585600,
                    "limitingEndTime": 1758671999
                },
                "goals": [
                    {
                        "id": 1,
                        "name": "temp click metrics Report",
                        "isPrimary": true,
                        "type": "custom-conversion",
                        "description": "",
                        "createdAt": 1758607221,
                        "metricId": 1278,
                        "isArchived": false,
                        "attributionTime": "",
                        "calcLogic": {
                            "logic": "triggered"
                        },
                        "events": [
                            {
                                "props": [
                                    {
                                        "id": "112-Property",
                                        "include": [
                                            {
                                                "queryElementType": "partialQuery",
                                                "id": "90-VwoPageGroup",
                                                "operator": 11,
                                                "rOperandValue": "https://www.temp.com",
                                                "configurations": {
                                                    "ignoreOnlyQueryParams": true,
                                                    "ignoreOnlyHashFrag": true,
                                                    "caseInsensitive": true
                                                }
                                            }
                                        ],
                                        "exclude": [],
                                        "apiName": "event.targetUrl"
                                    }
                                ],
                                "id": "58-Event",
                                "eventDefinitionType": "STANDARD",
                                "apiName": "vwo_dom_click",
                                "name": "Click",
                                "isComputed": false,
                                "queryElementType": "partialQuery"
                            }
                        ]
                    }
                ]
            }
        ],
        "totalCount": "5",
        "offset": ""
    }
}
```

### Notes

Ensure to replace `Your-API-Token` and `Your-Cookie-Data` with valid values before executing the request.

This format uses markdown tables for path and query parameters to provide clear and structured information.
