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

This document provides details on the API request to retrieve insights metrics. Below is the specific setup for the API call.

### cURL Command

```bash
curl --location 'https://vwotestapp20.vwo.com/api/v2/accounts/20001773/insights-metrics?limit=100&offset=0&order=asc&status=running&meta=true' \
--header 'accept: application/json, text/plain, */*' \
--header 'TOKEN: efc82ed02e6abbf78dbc11203ded2c51e0b7dd5324e03fd496eb55173318e838' \
--header 'Cookie: GCP_IAP_XSRF_NONCE_0WPzKJfmSqUQpEEifLqoWg=1; GCP_IAP_XSRF_NONCE_0pxXpz_9HVA2w3rqITfLXw=1; GCP_IAP_XSRF_NONCE_2Ev09fkC1J7SfrihGThxXg=1; GCP_IAP_XSRF_NONCE_327nZrXxfZy6o8wbblxODQ=1; GCP_IAP_XSRF_NONCE_CdF72749HkPaou832cj76A=1; GCP_IAP_XSRF_NONCE_I3bQ888voYNyE9rcGNYUdA=1; GCP_IAP_XSRF_NONCE_MOToi0ozMkLwP120Lw94vg=1; GCP_IAP_XSRF_NONCE_NpDcVZBmtbBUjAeMM45jBg=1; GCP_IAP_XSRF_NONCE_SZK6qRA2D0yFErrRNRdntw=1; GCP_IAP_XSRF_NONCE_VjBHS5bjOqFXlH-CZ4m3tw=1; GCP_IAP_XSRF_NONCE__5SeUM33ft4qrJlkJOYvpA=1; GCP_IAP_XSRF_NONCE_aJExxntx8OA-oTQ1MjN2eg=1; GCP_IAP_XSRF_NONCE_iO_QjUzEZ8mA5Ut38hMyJg=1; GCP_IAP_XSRF_NONCE_l4KIrSYgPfFr0LhvF7yLGw=1; GCP_IAP_XSRF_NONCE_ngfi2xArF0ZCBPkB-ZwXgg=1; GCP_IAP_XSRF_NONCE_pxlYLJ45gHifEo54zrsT_A=1; GCP_IAP_XSRF_NONCE_qbN_PTMfLHwKjYgWQTbeGQ=1; GCP_IAP_XSRF_NONCE_vh1R885JfCXT_pzJ58ubGQ=1; GCP_IAP_XSRF_NONCE_vrtdcvnNF8VNA9u6NVydWQ=1; XSRF-TOKEN=3d238cee21f46a8202eebcedea86a14c505f1ec5; __Host-GCP_IAP_AUTH_TOKEN_9BEC35030EC433E8=Ad41--bMPwxKExPHt9RhmgbSDXpny8cixJMQ-JPBEZxq2g7DUL1t6RjdtasXqmnMhmDrRKuIId-Ke5Jujg1S790bTnmads9W4mhQeGQCfkvCjCJ_I8dTLDxPUeXwNDjpKYAc8oOwVxIVILvHLe2SdIWTbMDk5NZ_JVq452aKVJCQlgOJyOou9CjfLmxVmXyvg3yIDr19XMwnX6FL0xvmomVTCSH2Cte_SvuS-v-A3te9A2OGsimHwi7NgqHHGKSHqm--UEX7kspt8V7cKVaB46f1aQ0LiZXZCl9mIALBl-bsXyyer-xGJQLp2Fqwv_UKWJojeXrr6uZg8G-VYa9F7IHSQE0w3vPobVM6mq_8nZHOvavMlhIfk7HlYNIND7phZVOj4JCMPwfUFtp4_KTbh6_Zi53QrPs9WJYOSozfJcIy0J3m2pSieONdOYxQmZtL3qCzkYbz2Mmwp32LI7jRlK4Z9YmW0M9ukQZKIeFwO5anWLCC-ViOVJQUd4IfolFCPMCw9m6paQDOneY3T6-SRXiLCkrpeO3jqjsNgRxNJo8eHDz-ARTY3ZRABcgCIPj2Nj0vkX1plcT4F4xfxQYZhwbEmHEZkgla-uPTay-BbswG1ba9eXWa1uEswonC4oB-uYbk8epFdx6VWXoavUSkzIPZMgWCYA3s6UeHj2I0F7cl5eGLVXO54Yu1m7OLFOs4vMUqIGSJD2Kz_6dIprmo_8srcdfF_HEkLp9HRyhSOEdtjS-f1olNxTyU70mXRUYB4W7uaMLB_a4IDBCZt8u0t4OedRAR4pyhzr-Pu8fFUdHFyNrYH7mLcqETaduuFI3FdSs0LmVg72dM6mQHxJhrhf_Q0ONgXtlQaCYk87znXxI7Kr0Z6jkTRTR4P1DyWCa1jWiKZMc7EB6BM3I9P4o1tgjo8xX4HD6mkVFFejPC7CFHBL7WzZVGtrIp-tz7D3R8lkfhnJoD8nxuyOVYgY03RJ2idTtz_8YJTLZS6vwTYhJOn1F3gxke0PSKNsWXBSZ_0EogkEh6IuAmyMmKwG7vJEWP2tIAGPqRLstikyyqbBRkm-RpVONDybwbcJXY-9_w6DOfhHaSoUwtHOUbvjCt5n5crkiSBrc0vJDNln_N_oOEd621ng1ry0SsZ0z6ska7z3-N2kmXsbkcesXEVUIBtMyUIxoxjhSYPLk8w0RGbPU2Hz-RRB6hhvdlCbuyTD4U6Md5Dtv8F83sjBgmF6PXM05lsW9ykOzBVYo-hcewNGCh_xPR0hNxYLD3zoTBWUHs8cWjPWaE0YLLwjp8hLh3g3zsq6EEHRVXUCYzVOo9VeJcxmKdiMjAZBIRM8Jv0ao5ZKpQJpgjCsofMboXcJe_TMT-5K-CxEN4E3ONnyyrhFOS3IFtD-DCSLe6ZgCUCgrHyFBVZKaShX5CXc2yKgeSER8oQejbafWXgBowMpJqstPYLxArmjluJcoX38Y3onb-X6fh2nutR3Ky7_WWg_iD9Zq-m_-gzt7B8eKbtZimejkvUztoaFz7UbWd4fskp5k_E6wzJpoZ5dy0i7ID34YzgwTv_zws_NpuNyQ15_LwblRTtCdv9TRG1rME5RxMR8xLcjQFXC1tNGbRSrxJbuos3WcH7dqomyhOFVJQa4XJCXnzYgkn7ep1VRvhT093ed_5GetP_VwmHMb7MwyJCwh0Nbjd7RFLyFJNIfPrzJwTcTOxw2LKfdFjwnQswNEz6U1ve_OlOBiT4phQ9iusPqQDHqaSYOO6c1OH29nP7em2P1Y7mB9XI_F2SF8tKw7JZMR9DQ-nDtUEC7aS; lang=en' 
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

This API request retrieves insights metrics for a specific account. The request supports pagination and ordering, with additional options to filter by status and include metadata. Ensure to replace `Your-API-Token` with a valid token before executing the request.