---
title: Google Tag Manager (GTM)
excerpt: Trigger Wingify Tracking Events Seamlessly via Google Tag Manager (GTM)
deprecated: false
hidden: false
metadata:
  robots: index
---
## Overview

This guide explains how to integrate **Wingify Feature Experimentation** with **Google Tag Manager (GTM)** to trigger custom tracking events, without requiring client-side SDK initialization.

By following this flow, you can:

* Generate consistent **Wingify UUIDs** on your backend
* Pass them securely to your frontend
* Use GTM to trigger **Wingify tracking events** on clicks, form submissions, or any custom user interaction

<br />

### Step 1 — Install the Wingify SDK

Install the official Wingify Feature Experimentation SDK in your backend:

```shell
npm install vwo-fme-node-sdk
```

<br />

### Step 2 — Generate a Wingify UUID in Your Backend

Use the SDK’s _getUUID()_ method to convert your user’s ID into a **Wingify-compatible UUID**. This ensures a consistent identifier across all tracking events.

```javascript
import { getUUID } from 'vwo-fme-node-sdk';
const userId = 'sample_user_id';
const accountId = 'sample_account_id';

const vwoUuid = getUUID(userId, accountId);
console.log(vwoUuid); // e.g., "A1B2C3D4E5F6..."
```

**Next**: Pass this UUID to your frontend via an API response.

<br />

### Step 3 — Pass the UUID to the Frontend (via API Response)

Either pass the generated UUID as a response from a new API endpoint, or as part of an existing API endpoint

```javascript
{
  "user": {
    "id": "sample_user_id",
    "vwo_uuid": "A1B2C3D4E5F6..."
  }
}
```

<br />

<Callout icon="📘" theme="info">
  1. Your frontend application can fetch this data and store it globally for GTM to use.
  2. Receive the _VWO_UUID_ from backend and set the _VWO_UUID_
</Callout>

<br />

```javascript
fetch('/api/user-data')
  .then(res => res.json())
  .then(data => {
    window.VWO_UUID = data.user.vwo_uuid;
    // GTM tag can now use this UUID for VWO tracking
  });
```

<br />

### Step 4:  Trigger Setup in GTM

* **Trigger Type**: Choose your event trigger (e.g., _Click – All Elements or Form Submission_).
* **Conditions**: Specify rules (e.g., _Click Text contains "Buy Now"_).
* **Variables**: Add `VWO UUID` as a GTM variable (from `window.VWO_UUID`).

This ensures that the same user UUID is passed to Wingify during every event.

<br />

### Step 5 — Create an Event Tag in GTM

In Google Tag Manager, create a **Custom HTML Tag**. This tag will trigger a Wingify event when an action (e.g., a button click) occurs.

Paste the following script into your GTM Custom HTML field:

**🧾 Event Tag Code**

<Callout icon="🚧" theme="warn">
  Make sure to replace `<ACCOUNT_ID>` and `<EVENT_NAME>` with your actual values in the below code.
</Callout>

<br />

```javascript
<script>
(function() {
    // ------------------------
    // CONFIGURE THESE VALUES
    // ------------------------
    var VWO_ACCOUNT_ID = "<ACCOUNT_ID>";   // replace with your VWO account ID
    var EVENT_NAME = "<EVENT_NAME>";       // replace with your custom event name
    var PAGE_TITLE = document.title;
    var PAGE_URL = window.location.href;
    var REFERRED_URL = document.referrer || "";
    var VWO_UUID = {{VWO UUID}}; // replace if needed

    // Generate timestamps
    var timestampMs = new Date().getTime();
    var timestampSec = Math.floor(timestampMs / 1000);

    // Construct payload
    var payload = {
        d: {
            msgId: VWO_UUID + "-" + timestampMs,
            visId: VWO_UUID,
            event: {
                name: EVENT_NAME,
                time: timestampMs,
                props: {
                    page: {
                        title: PAGE_TITLE,
                        url: PAGE_URL,
                        referredUrl: REFERRED_URL
                    },
                    isCustomEvent: true,
                    vwoMeta: {
                        source: "client"
                    }
                }
            },
            sessionId: timestampSec
        }
    };

    // Send POST request
    var endpoint = "https://dev.visualwebsiteoptimizer.com/events/t?en="
      + encodeURIComponent(EVENT_NAME)
      + "&a=" + encodeURIComponent(VWO_ACCOUNT_ID);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                console.log("✅ VWO custom event triggered successfully: " + EVENT_NAME);
            } else {
                console.error("❌ Error triggering VWO event", xhr.responseText);
            }
        }
    };
    xhr.send(JSON.stringify(payload));
})();
</script>
```

<br />

## Example Usage of the Integration

1. **Backend**

Generates a unique Wingify UUID for each user by calling getUUID(userId, accountId) from the Wingify FME SDK (any supported SDK can be used — see [list of all SDKs](https://developers.wingify.com/v2/docs/list-of-fme-sdks#/)). Below is the sample code for Node.js application.

```javascript Node.js
import { getUUID } from 'vwo-fme-node-sdk';

app.get('/api/user-data', (req, res) => {
  const userId = req.user.id;
  const accountId = 'sample_account_id';
  const vwoUuid = getUUID(userId, accountId);

  res.json({
    user: {
      id: userId,
      vwo_uuid: vwoUuid
    }
  });
});
```

2. **Frontend (JavaScript)**

Fetches the user data from the backend, stores the vwo_uuid in `window.VWO_UUID`, making it available for Wingify or GTM tracking.

```javascript
fetch('/api/user-data')
  .then(res => res.json())
  .then(data => {
    window.VWO_UUID = data.user.vwo_uuid;
    // GTM tag can now use this UUID for VWO tracking
  });
```

3. **GTM Trigger**
   Use the same code to trigger custom HTML using events as mentioned in Step 5.
