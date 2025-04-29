---
title: Create a draft
excerpt: ''
api:
  file: api.json
  operationId: create-draft-in-current--sub-account
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: noindex
next:
  description: ''
---
Request URI for Sub Account

```
POST /accounts/1/drafts
```

Request Format

```json
{
    "platform": "website",
    "isAdvancedMode": false,
    "currentDraftStepIndex": 0,
    "type": "ab",
    "urls": [
        {
            "type": "url",
            "value": "http://wingify.com"
        }
    ],
    "primaryUrl": "http://wingify.com",
    "globalSegment": {
        "segmentationType": "pre",
        "platform": "website",
        "id": "1",
        "type": "predefined",
        "name": "Direct",
        "description": "Segment to allow only direct traffic"
    },
    "status": "draft",
    "percentTraffic": 100,
    "isHeatmapEnabled": true
}
```

Create a draft in Current / Sub Account.