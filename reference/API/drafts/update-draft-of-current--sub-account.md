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
[block:code]
{
  "codes": [
    {
      "code": "{\n  \"draftId\": 14597,\n  \"createdBy\": 1,\n  \"platform\": \"website\",\n  \"isAdvancedMode\": false,\n  \"currentDraftStepIndex\": 3,\n  \"type\": \"ab\",\n  \"urls\": [\n    {\n      \"type\": \"url\",\n      \"value\": \"http://wingify.com\"\n    }\n  ],\n  \"primaryUrl\": \"http://wingify.com\",\n  \"globalSegment\": {\n    \"segmentationType\": \"pre\",\n    \"platform\": \"website\",\n    \"id\": \"1\",\n    \"type\": \"predefined\",\n    \"name\": \"Direct\",\n    \"description\": \"Segment to allow only direct traffic\"\n  },\n  \"variations\": [\n    {\n      \"platform\": \"website\",\n      \"id\": 1,\n      \"name\": \"Control\",\n      \"editorData\": {\n        \"stack\": []\n      },\n      \"deployContent\": [],\n      \"segmentEligibility\": \"ALL\",\n      \"segment\": {\n        \"type\": \"custom\",\n        \"eligibility\": \"ALL\"\n      },\n      \"percentSplit\": 50\n    },\n    {\n      \"platform\": \"website\",\n      \"id\": 2,\n      \"name\": \"Variation 1\",\n      \"editorData\": {\n        \"stack\": [\n          {\n            \"el\": 0,\n            \"op\": {\n              \"opName\": \"html\",\n              \"html\": \"The company pioneered easy A/B testing\"\n            },\n            \"depending\": false,\n            \"XPath\": \"BODY > NOSCRIPT:first-child + SCRIPT + HEADER#top_header + SECTION > DIV:first-child > DIV:first-child > H2:first-child\",\n            \"parentTag\": \"DIV\"\n          }\n        ]\n      },\n      \"deployContent\": [\n        {\n          \"jsString\": \"var ctx=vwo_$(x);ctx.html(\\\"The company pioneered easy A/B testing\\\");\",\n          \"cssSelector\": \"HEADER#top_header + SECTION > DIV:first-child > DIV:first-child > H2:first-child\"\n        }\n      ],\n      \"segmentEligibility\": \"ALL\",\n      \"segment\": {\n        \"type\": \"custom\",\n        \"eligibility\": \"ALL\"\n      },\n      \"percentSplit\": 50\n    }\n  ],\n  \"status\": \"draft\",\n  \"goals\": [\n    {\n      \"id\": 1,\n      \"name\": \"Goal 1\",\n      \"type\": \"visitPage\",\n      \"isPrimary\": true,\n      \"urls\": [\n        {\n          \"type\": \"url\",\n          \"value\": \"http://wingify.com\"\n        }\n      ],\n      \"cssSelectors\": []\n    }\n  ],\n  \"name\": \"test Campaign\",\n  \"newCampaignName\": \"Campaign 142\",\n  \"percentTraffic\": 100,\n  \"isHeatmapEnabled\": true,\n  \"numVariationsWithEligibilitySeg\": 0,\n  \"isCustomSplitEnabled\": false,\n  \"integrations\": {\n    \"ga\": {\n      \"enabled\": false,\n      \"slot\": 4,\n      \"prefix\": \"\"\n    },\n    \"clicktale\": {\n      \"enabled\": false\n    },\n    \"ua\": {\n      \"enabled\": false,\n      \"dimension\": 1,\n      \"prefix\": \"\"\n    },\n    \"gtm\": {\n      \"enabled\": false\n    },\n    \"isGaPremium\": false\n  },\n  \"isPostSegmentationEnabled\": false\n}",
      "language": "json"
    }
  ]
}
[/block]
Update draft of Current / Sub Account.
[block:api-header]
{
  "type": "basic"
}
[/block]

[block:textarea]
{
  "text": "Request URI for Sub Account\n```\nPATCH /accounts/1/drafts/14597\n```",
  "sidebar": true
}
[/block]