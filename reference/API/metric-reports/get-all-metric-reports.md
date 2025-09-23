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
| limit     | integer | Number of records to retrieve (optional, default is 100)                   |
| offset    | integer | The starting point in the list to retrieve data from (optional)            |
| order     | string  | The order of the records, possible values are `asc` or `desc` (optional)   |
| status    | string  | Filter metrics based on their status (e.g., running, completed) (optional) |
| meta      | boolean | Include metadata in the response (optional)                                |

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
  "status": "success",
  "data": [
    {
      "metric_id": 1,
      "name": "Example Metric",
      "status": "running",
      "data": {}
    }
  ]
}
```

### Notes

Ensure to replace `Your-API-Token` and `Your-Cookie-Data` with valid values before executing the request.

This format uses markdown tables for path and query parameters to provide clear and structured information.