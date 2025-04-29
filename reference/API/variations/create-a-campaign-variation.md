---
title: Create a campaign variation
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-variation
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
POST /accounts/40505/campaigns/7/variations
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>
Request Format

```json
{
    "variations": {
        "name": "New shiny variation"
    }
}
```

Create a campaign variation

> 📘 **Note**
> 
> Info
> >
> > To add changes to the variation, please add changes under the key 'changes'. For e.g. to show an alert in variation
> 
> ```
> {
>  "variations" : {
> 	.
>     .
>     "changes" : "<script>alert('Hello World');</script>"
>     .
>     .
>   }
> }
> ```