---
title: Get all campaigns in an account / sub-account
excerpt: ''
api:
  file: api.json
  operationId: get-the-campaigns-of-an-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
GET /accounts/40505/campaigns
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>

Get the campaigns of an account

> 📘 **Note**
> 
> Note
> >
> > Data will be returned wrapped in the `partialCollection` along with count of total campaigns if the campaign count exceed the limit.