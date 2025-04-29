---
title: Update draft campaigns
excerpt: ''
api:
  file: api.json
  operationId: update-draft-of-current--sub-account
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: noindex
---
Request Format

```json
{
  "draftId": 14597,
  "createdBy": 1,
  "platform": "website",
  "isAdvancedMode": false,
  "currentDraftStepIndex": 3,
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
  "variations": [
    {
      "platform": "website",
      "id": 1,
      "name": "Control",
      "editorData": {
        "stack": []
      },
      "deployContent": [],
      "segmentEligibility": "ALL",
      "segment": {
        "type": "custom",
        "eligibility": "ALL"
      },
      "percentSplit": 50
    },
    {
      "platform": "website",
      "id": 2,
      "name": "Variation 1",
      "editorData": {
        "stack": [
          {
            "el": 0,
            "op": {
              "opName": "html",
              "html": "The company pioneered easy A/B testing"
            },
            "depending": false,
            "XPath": "BODY > NOSCRIPT:first-child + SCRIPT + HEADER#top_header + SECTION > DIV:first-child > DIV:first-child > H2:first-child",
            "parentTag": "DIV"
          }
        ]
      },
      "deployContent": [
        {
          "jsString": "var ctx=vwo_$(x);ctx.html("The company pioneered easy A/B testing");",
          "cssSelector": "HEADER#top_header + SECTION > DIV:first-child > DIV:first-child > H2:first-child"
        }
      ],
      "segmentEligibility": "ALL",
      "segment": {
        "type": "custom",
        "eligibility": "ALL"
      },
      "percentSplit": 50
    }
  ],
  "status": "draft",
  "goals": [
    {
      "id": 1,
      "name": "Goal 1",
      "type": "visitPage",
      "isPrimary": true,
      "urls": [
        {
          "type": "url",
          "value": "http://wingify.com"
        }
      ],
      "cssSelectors": []
    }
  ],
  "name": "test Campaign",
  "newCampaignName": "Campaign 142",
  "percentTraffic": 100,
  "isHeatmapEnabled": true,
  "numVariationsWithEligibilitySeg": 0,
  "isCustomSplitEnabled": false,
  "integrations": {
    "ga": {
      "enabled": false,
      "slot": 4,
      "prefix": ""
    },
    "clicktale": {
      "enabled": false
    },
    "ua": {
      "enabled": false,
      "dimension": 1,
      "prefix": ""
    },
    "gtm": {
      "enabled": false
    },
    "isGaPremium": false
  },
  "isPostSegmentationEnabled": false
}
```

Update draft of Current / Sub Account.
[block:api-header]
{
  "type": "basic"
}
[/block]

Request URI for Sub Account

```
PATCH /accounts/1/drafts/14597
```