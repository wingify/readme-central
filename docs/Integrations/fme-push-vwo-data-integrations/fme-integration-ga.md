---
title: Google Analytics
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

**Integrating VWO Feature Experimentation with GA4** offers powerful benefits. VWO Feature Experimentation sends feature flag and event data directly to GA4, allowing you to see which feature flag variations users encounter during their sessions. This enables you to correlate user behaviour and performance metrics with specific experiments and feature rollouts. As a result, you can better understand how new features impact key KPIs like retention, engagement, and conversion:

<br />

## Prerequisites

### VWO FME SDK Installation and Configuration

* Ensure you have the VWO Feature Management and Experimentation product enabled for your VWO account.
* The VWO FME SDK should be properly installed in your Node.js project.
* Set your VWO account ID and SDK key in your application's constants in `.env` file:
  ```
  VWO_ACCOUNT_ID=vwo_account_id
  VWO_SDK_KEY=vwo_sdk_key
  VWO_FLAG_KEY=flag_key
  VWO_FLAG_VARIABLE_1_KEY=flag_variable1
  VWO_FLAG_VARIABLE_2_KEY=flag_variable2
  VWO_EVENT_NAME=event_name
  VWO_LOG_LEVEL= DEBUG # DEBUG, INFO, WARN, ERROR
  ```

### GA4 Account Setup

* Create a GA4 account at analytics.google.com if you don't already have one
* Create a new project in your GA4 dashboard
* Obtain your GA4 ***api\_secret*** and ***measurement\_id*** from the project settings,
  * *api\_secret* can be ound under `Admin > Data Streams > Choose your stream > Measurement Protocol > Create` .
  * *Measurement\_id* can be found under `Admin > Data Streams > Choose your stream > Measurement ID`.
* Configure ***api\_secret*** and ***measurement\_id*** in the following curl.
  ```curl
  curl --location 'https://www.google-analytics.com/mp/collect?api_secret=apiSecret&measurement_id=measurementId' \
  --header 'Content-Type: application/json' \
  --data '{
      "client_id": "REPLACE_WITH_ACTUAL_CLIENT_ID",
      "events": [
          {
              "name": "jsonEvent",
              "params": {
                  "campaign_id": "properties.campaignId",
                  "variation_id": "properties.variationId",
                  "campaign_name": "properties.campaignName",
                  "variation_name": "properties.variationName"
              }
          }
      ]
  }'

  ```

<Callout icon="📘" theme="info">
  Refer to this google [doc](\[https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference]\(https://developers.google.com/analytics/devguides/collection/protocol/ga4/reference\)) to get more information.
</Callout>

### Required Dependencies

Add the following dependencies to your app:

```shell
# via npm
npm install vwo-fme-node-sdk --save

# via yarn
yarn add vwo-fme-node-sdk
```

<br />

## Integration Steps

Integrating the VWO FME SDK with analytics platforms like GA4 allows you to automatically send feature flag evaluation and event tracking data to your analytics dashboard. This is achieved using the `IntegrationCallback` provided by the FME SDK.

* Clone the VWO FME Examples from [GitHub](https://github.com/wingify/vwo-fme-examples)
  ```shell
  git clone https://github.com/wingify/vwo-fme-examples.git
  ```
* Change directory to `node`
  ```
  cd vwo-fme-examples/node
  ```
* Open the project in an IDE and open the file `vwoHelper.ts` . It's located inside`src > utils`
* Inside the `vwoHelper.ts` file, you will find the `initVwoClient` method. Within this method, there is a constant named `sdkConfig`. Within sdkConfig, there is an integration object that requires the GA4 API to be invoked through the integration callback to send events to GA4.

<Image align="center" className="border" border={true} width="800px" src="https://files.readme.io/d5f79b66eb0120ccd613fc3833e61d4362d998510d0a70b58efa42b4acd78634-vwo_fme_integrations_ga.png" />

### Integration Data

The `IntegrationCallback` receives a `properties: Record<string, unknown>` containing details about the VWO SDK action:

* For flag evaluations (i.e.  `getFlag`):
  ```json
  {
    featureName: "flag_name",
    featureId: 5,
    featureKey: "flag_key",
    userId: "user_id",
    ...
  }
  ```
* For event tracking (`trackEvent`):
  ```json
  {
    eventName: "yourEventName",
    api: "track"
  }
  ```

<br />

## How to see the data in the analytics tool

To see real-time events flowing into your Google Analytics 4 (GA4) property, follow these steps:

* **Log in to Google Analytics**:\
  Go to the [Google Analytics website](https://analytics.google.com/)  and log in with your Google account that has access to the GA4 property.
* **Select Your GA4 Property**:\
  Once logged in, ensure you have selected the correct GA4 property from the dropdown menu at the top left of the interface (usually next to the Analytics logo). It will typically show the property name and ID.
* **Navigate to Realtime Report**:
  * In the left-hand navigation menu, look for the `Reports` section.
  * Under `Reports`, click on `Realtime`.
* **Observe Realtime Data**:\
  To view real-time data in Google Analytics 4 (GA4), scroll to the bottom of the left-hand menu, click Reports, then select  Realtime Overview. This gives you a live snapshot of user activity on your website or app.

  **Key Highlights:**
  1. **Active Users** in the last 30 minutes and 5 minutes
  2. **User Locations** displayed on a world map
  3. **Top Pages & Screens** currently being viewed
  4. **Live Events** like page views, form starts, and impressions
  5. **Audience Segments** such as returning users or cart abandoners

<Image align="center" border={true} caption="GA Reports" src="https://files.readme.io/7b01f1bb32468850377ce8794c86d3a7819980bca02845445d9d24a56605fc52-image2.png" />