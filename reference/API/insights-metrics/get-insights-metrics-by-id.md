---
title: get insights metrics by id
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: index
---
### Insights Metrics API

This document provides information on the `Insights Metrics` API call for retrieving insights metrics from a specific account.

#### Endpoint

```
GET /api/v2/accounts/{account_id}/insights-metrics
```
**Base URL:** `https://vwotestapp20.vwo.com`

### Authentication

- **Header:** `TOKEN`
- **Value:** API Key for accessing the account

### Parameters

- **limit** (integer): Defines the maximum number of metrics to return. Example: `25`
- **offset** (integer): Indicates the starting point within the list. Example: `0`
- **order** (string): Order of results, either `asc` or `desc`. Example: `asc`
- **status** (string): Filter metrics by status (e.g., `running`). Example: `running`
- **startTime** (integer): The start time for fetching metrics, in epoch seconds. Example: `1755030400`
- **endTime** (integer): The end time for fetching metrics, in epoch seconds. Example: `1758014340`

### Headers

- `accept`: `application/json, text/plain, */*`
- `TOKEN`: Your access token

### Example cURL Request

```sh
curl --location 'https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics?limit=25&offset=0&order=asc&status=running&startTime=1755030400&endTime=1758014340' \
--header 'accept: application/json, text/plain, */*' \
--header 'TOKEN: efc82ed02e6abbf78dbc11203ded2c51e0b7dd5324e03fd496eb55173318e838' \
--header 'Cookie: [Your cookies here]'
```

### Description

This API call retrieves insights metrics from the specified account based on parameters such as limit, offset, order, status, and time range.

#### Response

A successful response will return a list of insight metrics, including detailed performance and engagement statistics.