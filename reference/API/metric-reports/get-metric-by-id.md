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

`GET https://vwotestapp20.vwo.com/api/v2/accounts/{account_id}/insights-metrics/{metric_id}`

Retrieve comprehensive details for a specific metric report, including its historical data, status, and associated metadata.

### Path Parameters

| Parameter  | Type    | Description                                                                     |
| :--------- | :------ | :------------------------------------------------------------------------------ |
| `account_id` | `string`  | Use 'current' keyword to refer to the Main Workspace or the Integer Workspace Id (e.g., `20001753`) |
| `metric_id`  | `integer` | The ID of the metric report (e.g., `16`)                                        |

### Query Parameters

| Parameter   | Type      | Description                                                    | Default |
| :---------- | :-------- | :------------------------------------------------------------- | :------ |
| `limit`     | `integer` | Limit the number of data points to be returned.                | `100`   |
| `offset`    | `integer` | Offset where data points should be fetched from.               | `0`     |
| `order`     | `string`  | Order of data points (e.g., `asc`, `desc`).                  | `asc`   |
| `status`    | `string`  | Filter by report status (e.g., `running`, `completed`).      | `running` |
| `meta`      | `boolean` | Include metadata in the response.                              | `true`  |
| `startTime` | `integer` | UTC timestamp in epoch seconds for filtering data points from. |         |
| `endTime`   | `integer` | UTC timestamp in epoch seconds for filtering data points to.   |         |

### Headers

| Header  | Type    | Description               |
| :------ | :------ | :------------------------ |
| `accept`  | `string`  | `application/json`          |
| `TOKEN`   | `string`  | Your API authentication token |

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

### Sample Response (200 OK)

```json
{
  "_data": {
    "metricId": 16,
    "name": "Conversion Rate",
    "description": "Overall conversion rate for the specified period",
    "value": 0.05,
    "unit": "percent",
    "dataPoints": [
      {
        "timestamp": 1755030400,
        "value": 0.045
      },
      {
        "timestamp": 1755030400,
        "value": 0.052
      }
    ],
    "campaignId": null,
    "status": "running",
    "metaData": {
      "totalVisitors": 10000,
      "totalConversions": 500
    }
  }
}
```