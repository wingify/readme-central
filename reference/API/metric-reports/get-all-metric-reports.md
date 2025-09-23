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

### cURL Command

```bash
curl --location 'https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics?limit=100&offset=0&order=asc&status=running&meta=true' \
--header 'accept: application/json, text/plain, */*' \
--header 'TOKEN: Your-API-Token' \
--header 'Cookie: Your-Cookie-Data' 
```

### API Endpoint

- **URL**: `https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics`
- **Method**: `GET`
- **Query Parameters**:
  - **limit**: 100
  - **offset**: 0
  - **order**: asc
  - **status**: running
  - **meta**: true

### Headers

- **Accept**: `application/json, text/plain, */*`
- **TOKEN**: `Your-API-Token`
- **Cookie**: Contains multiple `GCP_IAP_XSRF_NONCE` tokens and `XSRF-TOKEN`

### Description

This API request retrieves insights metrics for a specific account. The request supports pagination and ordering, with additional options to filter by status and include metadata. Ensure to replace `Your-API-Token` and `Your-Cookie-Data` with valid values before executing the request.