---
title: Create a campaign section
excerpt: ''
api:
  file: api.json
  operationId: create-a-campaign-section
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request URI for Sub Account

```
POST /accounts/40505/campaigns/8/sections
```

<HTMLBlock>{`
<div></div>

<style></style>
`}</HTMLBlock>

Request Format

```json
{
    "sections": {
        "name": "New shiny section",
        "cssSelector": "DIV#js-header-fixed-trigger + SECTION > DIV:first-child > DIV:first-child > DIV:first-child",
        "variations": [
            {
                "name": "New shiny variation"
            }
        ]
    }
}
```

Create a campaign section