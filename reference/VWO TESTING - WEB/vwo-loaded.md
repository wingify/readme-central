---
title: VWO Loaded
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Overview

VWO loading on a page can be broken down into three main steps:

- **Loading Campaigns**: The VWO SmartCode retrieves all campaigns eligible for the current URL from the server.
- **Library Initialization**: The VWO library is loaded. As it loads, it executes all eligible campaigns for which the relevant page elements have already been loaded.
- **Loading Remaining Campaigns**: The VWO library fetches the remaining campaigns in the account. This includes campaigns eligible for other pages and any active Insights campaigns.

The following callbacks are triggered on different steps of VWO loading on the page:

- The `onVWOLoaded` callback is triggered when Step 2 (library initialization and campaign execution) is completed.
- The `onVWOCampaignsLoaded` callback is triggered when Step 3 (loading of remaining campaigns) is completed.

Note: This API would work only when there are active campaigns in the account. If there is no active campaign in the account, we would not serve the library on the page.

### Library Loaded

#### Signature

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onVWOLoaded', function(data) {
    // Callback logic here
}]);
```

#### Arguments

| Parameter         | Type       | Required | Description                                            |
| ----------------- | ---------- | -------- | ------------------------------------------------------ |
| callback_function | `Function` | Yes      | Function executed once the VWO library is fully loaded |

#### Callback Data

**Type**: `Array` containing two elements: `[executedCampaigns, delayedCampaigns]`  

| Element             | Type     | Description                                                                                                                       |
| ------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `executedCampaigns` | `Object` | JSON object with campaign IDs as keys and their selected variation/combination IDs as values                                      |
| `delayedCampaigns`  | `Array`  | List of campaign IDs that are yet to execute on the page                                                                          |
| `smartCode`         | `Object` | SmartCode config object currently containing only timeout property as boolean and this is undefined if there has been no timeout. |

##### Sample Data

```javascript
[
    {   // executedCampaigns
        "123": "1",
        "456": "2",
        "789": "2"
    },
    [   // delayedCampaigns
        "234",
        "567",
        "890"
    ]
]
```

##### Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onVWOLoaded', function(data) {
    if (!data) return;
    
    var executedCampaigns = data[0]; 
    var delayedCampaigns = data[1]; 
    var smartCode = data[2];

    console.log('Executed Campaigns:', executedCampaigns);
    console.log('Delayed Campaigns:', delayedCampaigns);
    console.log('SmartCode:', smartCode);
  	
  	// Custom logic like opting out visitors where SmartCode timed out to ensure persistent experience.
    if(data && data[2] && data[2].timeout) {
      var date = new Date(new Date().getTime() + 30 * 60 * 1000); //30 mins
      document.cookie = "_vis_opt_out=1; path=/; expires=" + date.toGMTString() + ";domain=." + window.location.host; 
    }
}]);
```

### Campaigns Loaded

#### Signature

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onVWOCampaignsLoaded', function (data) {
    // Your implementation here
}]);
```

#### Arguments

| Parameter         | Type       | Required | Description                                      |
| ----------------- | ---------- | -------- | ------------------------------------------------ |
| callback_function | `Function` | Yes      | Function executed after all campaigns are loaded |

#### Callback Data

**Type**: `Object` containing campaign information  

| Property             | Type    | Description                                    |
| -------------------- | ------- | ---------------------------------------------- |
| `bucketed_campaigns` | `Array` | List of campaigns the visitor is bucketed into |

Each campaign object in `bucketed_campaigns` contains:  

| Property        | Type     | Description             |
| --------------- | -------- | ----------------------- |
| `<campaign_id>` | `string` | Assigned variation id   |
| `name`          | `string` | Campaign name           |
| `variation`     | `string` | Assigned variation name |

##### Sample Data

```json
{
    "bucketed_campaigns": [
        {
            30: 2, // campaign id is 30 for which visitor got bucketed into with the changes application of variation id 2
            "name": "Campaign A",
            "variation": "Variation 1"
        }
    ]
}
```

##### Example

```javascript
window.VWO = window.VWO || [];
window.VWO.push(['onVWOCampaignsLoaded', function (data) {
    for (var campaign of data.bucketed_campaigns) {
        for (var campProps of Object.keys(campaign)) {
            if (parseInt(campProps) == campProps) {
                console.log("Campaign ID", campaign[campProps]);
                continue;
            }
            console.log("Campaign " + campProps, campaign[campProps]);
        }
    }
}]);
```

### Use Cases

- **Analytics Integration**  
  Sync campaign performance data with platforms like Google Analytics or Mixpanel to measure conversion rates, engagement, and campaign success.

- **Persistent experience**  
  Ensure visitors have a uniform experience by opting them out of VWO if the SmartCode times out, preventing unexpected variations.