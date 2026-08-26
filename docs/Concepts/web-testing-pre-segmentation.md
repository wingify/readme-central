---
title: Web Testing Pre-Segmentation
excerpt: Pre-Segment users based on Web Testing Rules
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Overview**

Web Testing Pre-Segmentation lets a user be targeted based on their exposure to a **Web Testing** campaign and the variation assigned to them, thereby connecting two important platforms in the Wingify universe. It allows FE rules to be gated on, or exclude, visitors based on an in-flight Web Testing experiment, without an extra network round trip.

## **Key Features**

> - Accepts the visitor's Web Testing assignment via context.platformVariables.webTestingCampaigns, as either a plain object or a JSON string
> - As the web testing assignment is read via cookies, there is no network latency involved and hence response times are not affected
> - Ensures that customers have the option to exclude users from becoming part of experiments from both frontend and backend

<br />

## **Enabling Web Testing Pre-Segmentation in FE**

> 1. Configure the campaign's targeting segmentation in the app dashboard to use the campaignVariation operand for the Web Testing campaign ID(s) you want to gate on
> 2. Inside the context object, populate platformVariables.webTestingCampaigns with the visitor's current Web Testing campaign → variation assignment
> 3. You can do this manually, or you can use our sample scriptsamplescript to read the cookie dropped by the Web Testing product and pass on its values to the context object directly

![](https://files.readme.io/d9b4973d4bd7bca547978d99be30a30bf1988b0f1a2596a23e30e6a7155d50df-Web_Testing_as_Pre-Segment.png)

<br />

## **Usage**

```javascript
const context = {
  id: 'user-123',
  platformVariables: {
    // Map of Web Testing campaign ID -> assigned variation ID
    webTestingCampaigns: {
      123: '4',
      456: '1',
    },
  },
};
const flag = await wingifyClient.getFlag('feature-key', context);
```

<br />

**Flow Diagram \[displayed as Mermaid Diagram in dev docs]**

A\["1. Configure segmentation rule\nin VWO dashboard\n(target/exclude a Web Testing campaign)"] --> B\["2. Get visitor's Web Testing\ncampaign & variation assignment\n(e.g. via cookie-reading

script)"]

B --> C\["3. Pass it in context:\nplatformVariables.webTestingCampaigns"]

C --> D\["4. Call getFlag(featureKey, context)"]

D --> E\["SDK evaluates the rule\nagainst the assignment"]

E -- "Assignment matches rule" --> F\["✅ Feature included"]

E -- "No match / not provided" --> G\["❌ Feature excluded"]

```mermaid
flowchart LR 
 A\["1. Configure segmentation rule\nin VWO dashboard\n(target/exclude a Web Testing campaign)"] --> B\["2. Get visitor's Web Testing\ncampaign & variation assignment\n(e.g. via cookie-reading

script)"]

B --> C\["3. Pass it in context:\nplatformVariables.webTestingCampaigns"]

C --> D\["4. Call getFlag(featureKey, context)"]

D --> E\["SDK evaluates the rule\nagainst the assignment"]

E -- "Assignment matches rule" --> F\["✅ Feature included"]

E -- "No match / not provided" --> G\["❌ Feature excluded"]
```

##

## **Context Field Reference**

| Field                                 | Type                   | Required               | Description                                       |                                                                                                                                                                        |
| :------------------------------------ | :--------------------- | :--------------------- | :------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                       | platformVariables      | object                 | No                                                | Namespaced container for platform-originated signals passed into the FE context.                                                                                       |
| platformVariables.webTestingCampaigns | Record\<string, string | number> or JSON string | Only if the campaign's DSL uses campaignVariation | Map of Web Testing campaign ID to the variation ID the visitor was assigned. Keys and values are coerced to strings; null/undefined values and empty keys are dropped. |

**Script to read cookie value:**<br />/\*\*<br />_Reads Wingify cookies and returns a map of campaigns and variations.<br />_ @returns {Object} Example: { "122": "1", "130": "2" }<br />\*/<br />function getWebTestingCampaigns() \{<br />const cookieVal = {};<br />const nameRe = /^\_vis_op&#x74;_&#x65;xp_(\d+)\_combi$/;<br />const cookies = document.cookie ? document.cookie.split(";") : \[];

for (const entry of cookies) \{<br />const \[name, value] = entry.split("=").map(s => s.trim());<br />const match = nameRe.exec(name);

if (match) \{<br />const campaignId = match\[1];<br />let decodedValue = decodeURIComponent(value);

// Extracts the variation ID (the first numeric token)<br />const variationId = (decodedValue.split(/\[,\\|:%]+/).find(t => /^\d+$/.test(t.trim())) || "").trim();<br />if (variationId) cookieVal\[campaignId] = variationId;<br />\}<br />\}<br />return cookieVal;<br />\}

**Script to send cookie value to FE UserContext:**<br />/\*\*<br />_Sends the cookie value set by Web Testing product inside user context<br />_/<br />**const userContext = {**  
 
{**  
scraped using helper script as above**  
ns: cookieVal**  

;**

**const flag = await wingifyClient.getFlag("feature_key", userContext);**
