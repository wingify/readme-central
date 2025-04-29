---
title: Create a campaign
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
POST /accounts/40505/campaigns
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>
Request Format

```json
{
    "type": "ab",
    "urls": [
        {
            "type": "url",
            "value": "http://wingify.com"
        }
    ],
    "primaryUrl": "http://wingify.com",
    "goals": [
        {
            "name": "New goal",
            "type": "visitPage",
            "urls": [
                {
                    "type": "url",
                    "value": "http://wingify.com"
                }
            ]
        }
    ],
    "stats": {
        "conversionRate": 0.05,
        "certaintyMode": 0.01,
        "expectedMonthlyVisitors": 300000,
        "expectedRevenuePerVisitor": 2,
        "liftInConversionRate": 0.05
    }
}
```

Create a campaign

> 🚧 **Warning**
> 
> Note
> >
> > If stats are not provided, default value for stats (same as given in this request) are used for the campaign created.

> 🚧 **Warning**
> 
> Note
> >
> > For split campaign creation, two or more variations must be present in the request with urls for which the split campaign needs to be run.