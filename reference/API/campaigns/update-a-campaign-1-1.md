---
title: Copy of Update campaign status
api:
  file: api.json
  operationId: update-a-campaign-1-1
deprecated: false
hidden: true
link:
  new_tab: false
metadata:
  robots: noindex
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