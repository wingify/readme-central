---
title: Segment - Import Event
deprecated: false
hidden: true
metadata:
  robots: index
---
## **Overview**

The **Wingify Cloud Mode (Actions)** destination in Segment forwards serverSide Segment track and identify calls to Wingify FM. Events can then be used as metrics on feature flags, and traits as attributes for segmentation. The link between the two systems is the user ID: the id passed in the FM SDK context must also be sent to Segment as vwo_uuid.

## **Key Features**

> * Reuses events already sent to Segment as FM metrics, without extra trackEvent() calls in the code
> * Maps Segment traits to FM user attributes for segmentation, without extra setAttribute() calls
> * Works with server sources such as Node.js, so it fits FM's server-side flag evaluation
> * Links to a specific FM environment using that environment's SDK key

**Note:** This page covers only the FM flow. Web Experimentation setup, the Page Visit action and Engage audience sync are not covered here; see the [Segment destination docs](https://www.twilio.com/docs/segment/connections/destinations/catalog/actions-vwo-cloud) for those.

## **Prerequisites**

> * The [FM Node.js SDK](https://developers.wingify.com/v3/docs/fme-node) installed and initialized in your application
> * A Segment workspace with a server source, for example [Analytics for Node.js](https://www.twilio.com/docs/segment/connections/sources/catalog/libraries/server/node)

## **Enabling the Segment Integration in FM**

Setting up takes two parts: add the destination in Segment, then link to FM environment

### **Add the destination in Segment**

> 1. In Segment, go to **Connections > Catalog**.
> 2. On the **Destinations** tab, search for **VWO Cloud Mode (Actions)** and select it.
> 3. Click **Configure VWO Cloud Mode (Actions)**.
> 4. Select the server source that will send data, click **Next**, name the destination and click **Save**.
> 5. On the **Settings** tab, under **Other Settings**, enter your Account ID and click **Save**.

### **Link your FM environment**

> 1. In the Wingify dashboard, open the FM project and find the **Environments** section.
> 2. Click **Copy** next to the environment you want to link to Segment.
> 3. In Segment's destination settings, paste the key into **VWO SDK Key** and click **Save Changes**.
> 4. Turn the destination on with the toggle.

### **Destination settings**

| Setting        | Required | Description                                   |
| :------------- | :------- | :-------------------------------------------- |
| VWO account ID | Yes      | Wingify account ID                            |
| VWO SDK Key    | Yes      | SDK key of the FM environment to send data to |
| Region         | No       | Data region to sync to. Default is US         |

**Note:** Each destination instance supports up to 5 mappings. Use [Customizing mappings](https://www.twilio.com/docs/segment/connections/destinations/actions#customize-mappings) to control which events and traits reach FM.

## **Usage**

Use the same user ID in both places: as context.id when calling getFlag(), and as vwo_uuid in every Segment call. For track calls, put vwo_uuid in properties. For identify calls, put it in traits.

`const { init } = require('wingify-fme-node-sdk');`<br />`const { Analytics } = require('@segment/analytics-node');`

`const analytics = new Analytics({ writeKey: 'SEGMENT_WRITE_KEY' });`

`(async function () {`<br />`const wingifyClient = await init({`<br />`accountId: '123456',`<br />`sdkKey: '32-alpha-numeric-sdk-key',`<br />`});`

`const userId = 'user-123';`<br />`const context = { id: userId };`

`// 1. Evaluate the flag in FM`<br />`const flag = await wingifyClient.getFlag('feature-key', context);`

`// 2. Send user traits to Segment -> FM attributes`<br />`analytics.identify({`<br />`userId,`<br />`traits: { vwo_uuid: userId, plan: 'premium' },`<br />`});`

`// 3. Send a conversion to Segment -> FM event`<br />`analytics.track({`<br />`userId,`<br />`event: 'purchase_completed',`<br />`properties: { vwo_uuid: userId, amount: 49.99 },`<br />`});`<br />`})();`

### **Flow Diagram**

`Your app (Node.js)`<br />`|`<br />`|-- getFlag(key, context) ----> FM Node SDK --------------------------> Wingify FM: flag decision per user`<br />`|`<br />`'-- track / identify + vwo_uuid --> Segment --> VWO Cloud Mode destination --> Wingify FM: segment.* events / attributes`

Your app calls getFlag() with the user ID and sends the same ID to Segment as vwo_uuid. The destination forwards events and traits to FM, which joins them to the flag decision on that ID.

## **Field Reference**

FM uses two of the destination's actions. Both run in cloud mode and are enabled by default through Segment's presets.<br />**Track Event**: sends Segment track calls to FM as events. Default trigger: type = "track".

| Field      | Required | Description                                                |
| :--------- | :------- | :--------------------------------------------------------- |
| Name       | Yes      | Event name. Sent to FM as segment.\<name>                  |
| VWO UUID   | Yes      | The FM user ID (context.id), read from properties.vwo_uuid |
| Properties | No       | Extra properties attached to the event                     |
| IP Address | No       | IP address of the user                                     |
| User Agent | No       | User agent of the user                                     |
| Timestamp  | No       | Timestamp of the event                                     |

**Identify User**: maps Segment traits to FM user attributes. Default trigger: type = "identify".

| Field      | Required | Description                                              |
| :--------- | :------- | :------------------------------------------------------- |
| Attributes | Yes      | User traits to map. Each key is sent as segment.\<trait> |
| VWO UUID   | Yes      | The FM user ID (context.id), read from traits.vwo_uuid   |
| IP Address | No       | IP address of the user                                   |
| User Agent | No       | User agent of the user                                   |
| Timestamp  | No       | Timestamp of the event                                   |

**Note:** The Page Visit action does not apply to FM. Server-side sources do not support the Page Visit event.

## **Using Segment Data in FM**

Segment data first shows up as **unregistered**. You must save it before FM can use it.

> 1. Send a test track and identify call with vwo_uuid set.
> 2. In the Wingify dashboard, go to **Data360 > Events**. The event shows under **Unregistered Events** with a segment. prefix: purchase_completed appears as segment.purchase_completed.
> 3. Register the event, then add it in a metric on your feature flag.
> 4. Go to **Data360 > Attributes**. Traits show under **Unregistered Attributes** with the same prefix, for example segment.plan.
> 5. Register the attribute, then use it in your flag's audience targeting conditions.
