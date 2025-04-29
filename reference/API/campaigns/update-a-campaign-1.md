---
title: Update campaign status
excerpt: ''
api:
  file: api.json
  operationId: update-a-campaign-1
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI for Sub Account

```
PATCH /accounts/40505/campaigns/status
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>

Request Format

```json
{
    "ids": [
        14,
        15
    ],
    "status": "TRASHED"
}
```

Update campaign status

> 📘 **Note**
> 
> Note
> >
> > ValID status changes include `TRASHED`, `RESTORED`, `RUNNING`, `STOPPED`, `PAUSED`