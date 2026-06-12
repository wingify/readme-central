---
title: Testing Email/SMS via Server-Side Experimentation
deprecated: false
hidden: false
metadata:
  robots: index
---
## **Testing Email/SMS via Server-Side Experimentation**

This document outlines why standard client-side experimentation is incompatible with Email and SMS channels and demonstrates how Wingify Feature Experimentation (Server-Side) provides the robust solution required for these test cases.

### **The Challenge: Why Client-Side Testing Fails for Email/SMS**

Client-side testing tools (like Wingify Visual Editor) rely on two fundamental technologies that are absent in Email and SMS environments:

<br />

1. **JavaScript Execution**  
   Standard A/B testing loads a JavaScript library in the user's browser to modify the DOM (Document Object Model) in real-time.
   * Email Clients (Gmail, Outlook, etc.): Do not execute JavaScript for security reasons.
   * SMS: Is purely text-based (or simple media) and has no execution capability.
2. **Real-Time Modification**
   Client-side tools modify content after the page loads but before the user sees it.
   * Email/SMS: The content is generated once on the server and "shipped" to the user. Once delivered, the subject line or message body cannot be changed.

Since a script can’t be run on the user's device to decide and change the text, it must be decided on the server before the message is sent.

<br />

### **Server-Side Experimentation is Best for Backend Logic and Emails/SMS**

**a. Execution at Source of Delivery**

Server-side testing evaluates logic on the backend where operational decisions are made, such as:

* Which email variant to send (subject line, content block, CTAs)
* Which SMS script to use
* Conditional logic based on user segments

This is fundamentally different from client experimentation, where variation is displayed after page load.

**b. Ability to Run Complex Tests**

Server-side tests support:

* Testing complex business logic (e.g., recommendation algorithms, pricing rules)
* Multi-channel experiments
* Variation selection beyond UI (e.g., email content, SMS behavior)

Furthermore, server-side experimentation avoids UI performance costs like flicker or slow page load due to injected scripts — not relevant for email/SMS but still a core difference vs client side.

<br />

## **What Wingify Feature Experimentation (FE) Offers**

**a. Feature Experimentation Server-Side Support**

Wingify FE provides SDKs that you integrate into backend environments (such as Node.js, Java, Python, etc.). These server-side SDKs:

* Connect to Wingify servers to fetch experiment/feature flags.
* Evaluate variation logic at the server level.
* Return variation assignments that your application can use before sending messages.

Typical integration flow:

1. Backend code calls the Wingify SDK during message processing.
2. SDK evaluates experiment rules and segments.
3. Backend composes a message based on the returned variation.
4. Backend sends email/SMS with variation content.

```mermaid
---
config:
  theme: default
---
sequenceDiagram
    participant App as Backend Application
    participant Wingify as Wingify Feature Experimentation SDK
    participant Msg as Email/SMS Service

    App->>Wingify: Call SDK during message processing (userId, attributes)
   ->>Wingify: Evaluate experiment rules & audience segments
   -->>App: Return assigned variation

    App->>App: Compose Email/SMS content based on variation
    App->>Msg: Send Email/SMS with variation content
```

Wingify documentation outlines that server-side testing allows testing deeply within the tech stack and is ideal when experimenting inside logic layers rather than UI.

**Example: A/B Test for Email Subject Lines Using Wingify FE**

**Scenario**

You want to test two subject lines for an email campaign:

* **Variant A:** “Unlock Your Exclusive Offer”
* **Variant B:** “Don’t Miss Out — Your Deal Awaits”

**Server-Side Implementation**

```javascript
import { init } from "wingify-fme-node-sdk";

// Initialize Wingify SDK
const wingifyClient = init({ accoutnId: WINGIFY_ACCOUNT_ID, sdkKey: WINGIFY_SDK_KEY });

async function sendCampaignEmail(user) {
  const userContext = { id: user.id };
  const flagKey = ‘email_subject_test_flag_key’;
  const variableKey = ‘email_subject’;
  const defaultSubject = ‘Unlock Your Exclusive Offer’;

  // Evaluate which subject line to use
  const flag = await wingifyClient.getFlag(flagKey, userContext);

  let subject = flag.getVariable(variableKey, defaultValue);

  // Compose email depending on the variation
  const emailBody = generateEmailBody(user, subject);

  // Send email via your email service
  emailService.send(user.email, subject, emailBody);

  // Track goal/event
  await wingifyClient.trackEvent(‘event_name’, userContext);
}

```

<br />

* `getVariable()` determines the value of the variable corresponding to the variant assigned for the given user.
* The flag evaluation drives the subject line logic before sending the email.
  <br />

### **Example: SMS Content Variation**

**Scenario**

Test two SMS scripts to see which increases click-through rate.

**Sample Flow**

```python
# Python example
from wingifyimport init

wingify_client = init({account_id=WINGIFY_ACCOUNT_ID, sdk_key=WINGIFY_SDK_KEY})
feature_key = ‘sms_script_test’

def send_sms(user):
    user_context = {
     ‘id’: user.id
    }

    flag = wingify_client.get_flag(feature_key, user_context)
    
    default_variable_value = ‘Grab the latest offers here: https://app.example.com’ 
    message = flag.getVariable(‘’, default_value)

    sms_service.send(user.phone, message)

    wingify_client.trackEvent("sms_clicked", user_context)

```

The variation logic occurs before SMS dispatch, ensuring the message delivered reflects tested content.

<br />

### **Benefits of Server-Side Testing for Emails/SMS**

**a. Deterministic Variation Assignment**

Assignments happen on the backend, ensuring consistent treatment across devices and delivery channels.

**b. No Reliance on Client Context**

No need for browser execution; variation is decided at the server where message templates are built.

**c. Rich Segment Control**

Server-side SDKs allow complex segmentation (user attributes, custom rules) that influences experiment variation before message generation — enabling sophisticated personalization.

**d. Consistent Analytics**

Events (opens, clicks) can be tracked in correlation with experiment buckets via server logs and analytics pipelines.

| Feature           | Client-Side (Visual Editor | Server-Side (Wingify FE           |
| ----------------- | -------------------------- | ----------------------------- |
| Logic Location    | Browser / User Device      | Your Server                   |
| Email/SMS Support | ❌ No                       | ✅ Yes                         |
| Performance       | Can have a flicker         | ⚡ Zero Latency for User       |
| Security          | Logic exposed in JS        | Logic is hidden on the server |
| Complexity        | Low (Point & Click)        | Moderate (Requires coding)    |

<br />

## **Conclusion**

Testing email/SMS messaging content or logic cannot rely on client-side experimentation because:

* There is no execution environment for client-side JavaScript in email/SMS. Variations must be selected before message delivery.

<br />

**Server-side testing** using **Wingify Feature Experimentation SDKs** is the correct approach, enabling teams to:

* Choose variation logic in the backend code.
* Evaluate feature flags programmatically.
* Scale experimentation across channels.
* Track results and tie them back to campaign performance.

This approach ensures accuracy, consistency, and robust experimentation for email and SMS-based experiences.
