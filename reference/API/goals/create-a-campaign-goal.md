---
title: Create a campaign goal
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-goal
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
POST /accounts/40505/campaigns/7/goals
```

Request Format

```json
{  
   "goals":{  
      "name":"New goal",
      "type":"visitPage",
      "urls":[  
         {  
            "type":"url",
            "value":"http://wingify.com"
         }
      ]
   }
}
```

Create a campaign goal

> 📘 Note:
>
> * valid **type** includes `visitPage`,  `engagement`,  `formSubmit`,  `clickLink`,  `clickElement`,  `revenue`, `custom-conversion`
> * **name** is a required property
> * for type `clickElement`, **cssSelectors** is required
> * for type `visitPage`, `formSubmit`, `clickLink`, `revenue`, `custom-conversion`, **urls** is required
> * valid **url type** includes `url`, `startsWith`, `endsWith`, `contains`, `pattern`, `regex`,  `cssSelector`

*
