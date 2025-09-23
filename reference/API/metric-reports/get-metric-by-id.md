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

GET` https://app.vwo.com/api/v2/accounts/{account_id}/insights-metrics/{metric_report_id}`

Retrieve comprehensive details for a specific metric report, including its historical data, status, and associated metadata.

### Path Parameters

| Parameter          | Type      | Description                                                                                         |
| :----------------- | :-------- | :-------------------------------------------------------------------------------------------------- |
| `account_id`       | `string`  | Use 'current' keyword to refer to the Main Workspace or the Integer Workspace Id (e.g., `20001753`) |
| `metric_report_id` | `integer` | The ID of the metric report (e.g., `16`)                                                            |

### Query Parameters

| Parameter   | Type      | Description                                                    |
| :---------- | :-------- | :------------------------------------------------------------- |
| `startTime` | `integer` | UTC timestamp in epoch seconds for filtering data points from. |
| `endTime`   | `integer` | UTC timestamp in epoch seconds for filtering data points to.   |

### Headers

| Header   | Type     | Description                   |
| :------- | :------- | :---------------------------- |
| `accept` | `string` | `application/json`            |
| `TOKEN`  | `string` | Your API authentication token |

### Sample Request

```php
import requests

url = "https://vwotestapp20.vwo.com/api/v2/accounts/20001753/insights-metrics/16?limit=100&offset=0&order=asc&status=running&meta=true&startTime=1755030400&endTime=1758014340"

headers = {
    'accept': "application/json, text/plain, */*",
    'TOKEN': "YOUR_API_TOKEN",
}

response = requests.request("GET", url, headers=headers)

print(response.text)
```

### Sample Response (200 OK)

```json
{
    "id": 25,
    "name": "page-visit-metrics Report",
    "platform": "website",
    "type": "insights-metric",
    "status": "RUNNING",
    "createdOn": 1758607250,
    "modifiedOn": 1758607250,
    "codeToken": "eyJhY2NvdW50X2lkIjoyMiM2E4YTY5NmI1NzQ4ZmI5MzVmNDY0OGYwNzIyZDE5NjAiLCJzY29wZSI6IiIsImZybiI6ZmFsc2V9",
    "shareToken": "eyJhY2NvdW50X2lkIjoyMDAwMTcYjVkOThlOGYzYzY1NDViMWYyOGQyMyIsInNjb3BlIjoiIiwiZnJuIjpmYWxzZX0=",
    "isGlobalSegmentEnabled": false,
    "isPostSegmentationEnabled": false,
    "isCodeShareView": false,
    "isDeleted": false,
    "createdBy": {
        "name": "test",
        "imageUrl": "/assets/images/test.svg"
    },
    "startedOn": "2025-09-23 06:00:51",
    "globalSegment": null,
    "dataIntervalRange": {
        "intervalSize": 86400,
        "startTime": 1758585600,
        "endTime": 1758671999,
        "limitingStartTime": 1758585600,
        "limitingEndTime": 1758671999
    },
    "maxMindVersion": 2,
    "goals": [
        {
            "id": 1,
            "isPrimary": true,
            "name": "Insights-Metrics Report",
            "type": "custom-conversion",
            "code": null,
            "urls": [
                {
                    "type": "pattern",
                    "value": "*"
                }
            ],
            "pUrls": [],
            "pExcludedUrls": [],
            "excludedUrls": [],
            "description": null,
            "createdAt": 1758607250,
            "metricId": 1276,
            "isArchived": false,
            "attributionTime": null,
            "calcLogic": {
                "logic": "triggered"
            },
            "events": [
                {
                    "props": [],
                    "id": "201-Event",
                    "eventDefinitionType": "STANDARD",
                    "apiName": "vwo_pageView",
                    "name": "Insights-Metrics",
                    "isComputed": false,
                    "queryElementType": "partialQuery"
                }
            ],
            "metricReportId": 25
        }
    ],
    "metricData": {
        "conversionRate": 100,
        "visitorCount": 33,
        "conversionCount": 33,
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
                "conversionCount": 33,
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
                    "conversionCount": 33,
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
```
