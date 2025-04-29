---
title: Retrieve timeline feeds of a workspace
excerpt: ''
api:
  file: api.json
  operationId: retrieve-account-timeline
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI

```
GET /accounts/current/feeds
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>

> 📘 **Note**
> 
> Note:
>
> The most recent feeds are returned in the API. If the number of feeds available for a workspace is more than the provided limit, the most recent feeds in the given time range will be returned. Additional feeds can be retrieved by adjusting the offset.