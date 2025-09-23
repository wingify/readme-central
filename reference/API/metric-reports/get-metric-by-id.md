---
title: Get details of a specific Metric Report
excerpt: >-
  Retrieve comprehensive details for a specific metric report, including its
  historical data, status, and associated metadata.
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
# Get details of a specific Metric Report

<Accordion title="GET" icon="icon--code">

Retrieve comprehensive details for a specific metric report, including its historical data, status, and associated metadata.

### Endpoint

`GET https://vwotestapp20.vwo.com/api/v2/accounts/{account_id}/insights-metrics/{metric_id}`

### Path Parameters

| Parameter    | Type      | Description                                                                                         |
| :----------- | :-------- | :-------------------------------------------------------------------------------------------------- |
| `account_id` | `string`  | Use 'current' keyword to refer to the Main Workspace or the Integer Workspace Id (e.g., `20001753`) |
| `metric_id`  | `integer` | The ID of the metric report (e.g., `16`)                                                            |

### Query Parameters

| Parameter   | Type      | Description                                                    | Default   |
| :---------- | :-------- | :------------------------------------------------------------- | :-------- |
| `limit`     | `integer` | Limit the number of data points to be returned.                | `100`     |
| `offset`    | `integer` | Offset where data points should be fetched from.               | `0`       |
| `order`     | `string`  | Order of data points (e.g., `asc`, `desc`).                    | `asc`     |
| `status`    | `string`  | Filter by report status (e.g., `running`, `completed`).        | `running` |
| `meta`      | `boolean` | Include metadata in the response.                              | `true`    |
| `startTime` | `integer` | UTC timestamp in epoch seconds for filtering data points from. |           |
| `endTime`   | `integer` | UTC timestamp in epoch seconds for filtering data points to.   |           |

### Headers

| Header   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `accept` | `string` | `application/json`            |
| `TOKEN`  | `string` | Your API authentication token |

### Sample Request

```python
import requests

url = "https://vwotestapp20.vwo.com/api/v2/accounts/20001753/insights-metrics/16?limit=100&offset=0&order=asc&status=running&meta=true&startTime=1755030400&endTime=1758014340"

headers = {
    'accept': "application/json, text/plain, */*",
    'TOKEN': "YOUR_API_TOKEN",
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### Sample Response

```json
{
    "_data": {
        "id": 24,
        "name": "click metrics Report",
        "status": "RUNNING",
        "createdOn": 1758607246,
        "modifiedOn": 1758607246,
        "codeToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXhwZXJpbWVudF9pZCI6MjQsImNyZWF0ZWRfb24iOjE3NTg2MDcyNDYsInR5cGUiOiJ0cmFja2luZ0NvZGUiLCJ2ZXJzaW9uIjoxLCJoYXNoIjoiYWZkYjgzMTY4YmU2ZTkwYmZkOWI1ZDJjODdmZWVhYTkiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
        "shareToken": "eyJhY2NvdW50X2lkIjoyMDAwMTc3MywiZXhwZXJpbWVudF9pZCI6MjQsImNyZWF0ZWRfb24iOjE3NTg2MDcyNDYsInR5cGUiOiJjYW1wYWlnbiIsInZlcnNpb24iOjEsImhhc2giOiIzNTFjM2Y0ZDQwZDg2YzQxYTZiZjUzYTJlODMyMTlmNSIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
        "isGlobalSegmentEnabled": false,
        "isPostSegmentationEnabled": false,
        "isCodeShareView": false,
        "isDeleted": false,
        "createdBy": {
            "name": "VWO Support",
            "imageUrl": "/assets/images/vwo-support.svg"
        },
        "startedOn": "2025-09-23 06:00:47",
        "globalSegment": "",
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
                "type": "custom-conversion",
                "urls": [
                    {
                        "type": "pattern",
                        "value": "*"
                    }
                ],
                "excludedUrls": [],
                "metricReportId": 24
            }
        ],
        "metricData": {
            "conversionRate": 100,
            "visitorCount": 27,
            "conversionCount": 27,
            "totalRevenue": 0,
            "totalSumSquaredRevenue": null,
            "totalConversion": 0,
            "totalSessions": 0,
            "totalConversionRate": 0
        },
        "funnels": [],
        "variationGoalData": [
            {
                "aggregated": {
                    "customVariables": [],
                    "totalRevenue": 0,
                    "conversionCount": 27,
                    "totalSumSquaredRevenue": 0,
                    "totalConversion": 0,
                    "totalSessions": 0,
                    "conversionRate": 0,
                    "visitorCount": 0,
                    "totalConversionRate": 0
                },
                "intervalWise": [
                    {
                        "totalRevenue": 0,
                        "conversionCount": 27,
                        "totalConversion": 0,
                        "totalSessions": 0,
                        "conversionRate": 0,
                        "visitorCount": 0,
                        "totalConversionRate": 0,
                        "interval": 1758585600
                    }
                ]
            }
        ]
    }
}
```

</Accordion>