---
title: Delete a campaign variation
excerpt: ''
api:
  file: api.json
  operationId: remove-a-specific-campaign-variation
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
DELETE /accounts/40505/campaigns/7/variations/1
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>
Delete a campaign variation
> ❗️ Note
> >
> > Please ensure that variation ID is serial. For example, if you have variations with ids 1,2,3 and you delete variation ID 2, now you would have the variation ids 1, 2, whereas 3 would be updated to 2. So, issue a GET /variations after the delete which would return the updated variations.