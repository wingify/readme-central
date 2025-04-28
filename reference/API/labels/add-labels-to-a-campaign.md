---
title: Add labels to a campaign
excerpt: ''
api:
  file: api.json
  operationId: add-labels-to-a-campaign
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URL for Workspace

```
POST /accounts/1/campaigns/72/labels
```

Request Format

```json
{
    "labels": [
      {
        "name" : "New shiny label"
      }
    ]
}
```

Add labels to a campaign

> 📘 Note: Mention id for associating existing account labels to campaign and name for creating a new label