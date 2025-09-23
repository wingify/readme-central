---
title: get insights metrics by id
api:
  file: api.json
  operationId: get_new-endpoint
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
### Insights Metrics API Document

This guide covers the usage of the `Insights Metrics` API, allowing users to retrieve insights metrics for an account.

#### Endpoint

```
GET /api/v2/accounts/{account_id}/insights-metrics
```

**Base URL:** `https://vwotestapp20.vwo.com`

### Authentication

* **Header:** `TOKEN`
* **Value:** API Key for accessing the account

### Parameters

* **limit** (integer): Maximum number of metrics to return. Example: `25`
* **offset** (integer): Starting point within the list. Example: `0`
* **order** (string): Order of results, either `asc` or `desc`. Example: `asc`
* **status** (string): Filter metrics by status (e.g., `running`). Example: `running`
* **startTime** (integer): Start time for fetching metrics, in epoch seconds. Example: `1755030400`
* **endTime** (integer): End time for fetching metrics, in epoch seconds. Example: `1758014340`

### Headers

* `accept`: `application/json, text/plain, */*`
* `TOKEN`: Your access token

### Example cURL Request

```sh
curl --location 'https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics?limit=25&offset=0&order=asc&status=running&startTime=1755030400&endTime=1758014340' \
--header 'accept: application/json, text/plain, */*' \
--header 'TOKEN: efc82ed02e6abbf78dbc11203ded2c51e0b7dd5324e03fd496eb55173318e838' \
--header 'Cookie: [Your cookies here]'
```

### Description

This API call retrieves insights metrics from the specified account based on parameters such as limit, offset, order, status, and time range.

### Response

A successful response will return a list of insights metrics, including detailed performance and engagement statistics.

### Related Links

* [How to Access VWO API](https://help.vwo.com/hc/en-us/articles/360020559993-How-to-Access-VWO-API?utm_source=openai)
* [VWO API Documentation](https://developers.vwo.com/reference/get-page-overview-details?utm_source=openai)