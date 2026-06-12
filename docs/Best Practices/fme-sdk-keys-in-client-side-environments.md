---
title: SDK Keys in Client-Side Environments
deprecated: false
hidden: false
metadata:
  robots: index
---
Wingify's FE SDKs allow you to run experiments and feature rollouts in any environment — web, mobile, or backend. However, when using Wingify in client-side environments (e.g., browsers or mobile apps), you're required to expose your Account ID and SDK Key, which may raise security concerns.

This document outlines best practices for safely using Wingify SDK Keys on the client-side and when you should consider using a server-side or proxy-based model instead.

## What is a Wingify SDK Key?

* A **Wingify SDK Key** is used to initialize the FE SDK and authenticate with Wingify servers to fetch feature flags and experiment configurations.
* It is **not a secret**, but it should be treated with care. Anyone with access to it can fetch variation assignments and feature flags, although they **cannot modify experiments** or access your Wingify account settings.

> 📘 Note
>
> The SDK Key is read-only and only used to fetch your FE feature flag configurations, so its exposure doesn't pose a direct security risk. However, Wingify strongly advises against storing any personally identifiable information (PII) in your flag configurations.

<br />

## What Happens If an SDK Key is Exposed?

SDK keys are often embedded in the frontend code when using Wingify FE in the browser or with mobile clients. While this is supported, consider the security implications:

| Risk                           | Impact                                                                |
| ------------------------------ | --------------------------------------------------------------------- |
| Key reuse in unauthorized apps | 3rd parties may use your SDK Key to access experiment variations      |
| Traffic abuse                  | Excessive requests could lead to rate limits or increased costs       |
| User impersonation             | Malicious actors may simulate end users if they know user identifiers |

<br />

## Best Practices for Using SDK Key in Client-Side Apps

### 1. Use Environment-Specific SDK Keys

When working with Wingify FE, it's important to isolate environments to reduce risk and maintain control over your feature flag configurations. Wingify provides you with default multiple environments (such as `development`, `staging`, and `production`) within your project, each with its own unique SDK Key.

#### 💡 Best Practice for Client-Side Usage

For client-side integrations, especially in web browsers where the SDK Key is publicly exposed, you should go one step further:

* **Create a dedicated environment** (e.g., named `client-side`) within your Wingify Default project.
* **Restrict this environment** so that only feature flags intended for use in browser-based applications are enabled within it.
* **Avoid including any server-side or mobile-specific flags** in this environment to prevent unintended exposure.

By doing this, the SDK Key associated with the `client-side` **environment** will only fetch configurations relevant to the frontend, reducing the risk of exposing internal or sensitive features that are meant for backend or mobile contexts.

#### Benefits

* **Tighter security**: Even if the SDK Key is exposed (which is expected on the client), it only has access to safe, client-appropriate configurations.
* **Better control**: You can independently manage rollout strategies and permissions for client vs. server environments.
* **Easier debugging**: Isolating environments makes it easier to track down environment-specific issues during development.

```javascript
const wingifyClient = init({
  accountId: '123456',
  sdkKey: 'dev-xyz-456', // Use enviroment-specific keys
});
```
```javascript React.js
import { VWOProvider } from 'wingify-fme-react-sdk';

const wingifyConfig = {
  sdkKey: 'your-sdk-key', // Replace with your SDK Key
  accountId: 'your-account-id', // Replace with your Account ID
  logger: {
    level: 'info', // Optional: Set log level
  },
};

function App() {
  return (
    <VWOProvider config={wingifyConfig}>
      {/* Your application components */}
    </VWOProvider>
  );
}
```

### 2. Avoid Hardcoding the SDK Key in Source Code

Use environment variables and inject them securely at build time via your CI/CD pipeline.

```shell
# .env.production
WINGIFY_ACCOUNT_ID=123456
WINGIFY_SDK_KEY=prod-abc-123
```

```javascript
const wingifyClient = init({
  accountId: process.env.WINGIFY_ACCOUNT_ID,
  sdkKey: process.env.WINGIFY_SDK_KEY,
});
```
```javascript React.js
import { VWOProvider } from 'wingify-fme-react-sdk';

const wingifyConfig = {
  accountId: process.env.WINGIFY_ACCOUNT_ID,
  sdkKey: process.env.WINGIFY_SDK_KEY
};

function App() {
  return (
    <VWOProvider config={wingifyConfig}>
      {/* Your application components */}
    </VWOProvider>
  );
}
```

### 3. Use Secure Connections (HTTPS)

Ensure your app only communicates over HTTPS to prevent man-in-the-middle attacks that could intercept SDK Key traffic.

### 4. Don’t Expose Internal User Identifiers

Always hash or anonymize user identifiers on the client-side:

```javascript
const hashedUserId = sha256(user.email); // Never use raw emails or PII
const flag = wingifyClient.getFlag('flag_key', { id: hashedUserId });
```

> 🚧 Limitations of Client-Side SDK Usage

| Limitation           | Implication                                |
| -------------------- | ------------------------------------------ |
| SDK Key exposure     | Public key can be used to fetch variations |
| PII risk             | User info may leak if not anonymized       |
| No server validation | Cannot enforce access controls             |
| Slower performance   | Network requests add latency               |

<br />

## Alternative: Server-Side Bootstrapping

To reduce exposure and improve control, consider bootstrapping your client SDKs from the server:

### Flow

* Client sends user info to your backend (secure).
* Backend initializes the SDK using the features flag configuration
* Backend returns configuration to the client(eg, browser).
  * (Optional)Evaluate flags on the server side and return them to the client.
* Client uses configuration or even pre-evaluated flags(no SDK Key needed).

### Example

```javascript Node.js
import {init} from 'wingify-fme-node-sdk';

const wingifyClient = init({
  accountId: process.env.WINGIFY_ACCOUNT_ID,
  sdkKey: process.env.WINGIFY_SDK_KEY,
});

const flag = wingifyClient.getFlag('flag_key', { id: hashedUserId });
const isFlagEnabled = flag.isEnabled();
const variableValues = flag.variables();
```

Then send that flag result/variable values to the frontend either via `cookies` or setting on `window`object.

<br />

## Additional Security Recommendations

| Recommendation       | Description                                                                         |
| -------------------- | ----------------------------------------------------------------------------------- |
| Rotate SDK Keys      | Regenerate SDK keys periodically or upon suspected misuse                           |
| Monitor usage        | Use network monitoring tools or’s dashboards to track API calls                 |
| Rate limit via proxy | If using a server-side proxy, add rate limits and throttling                        |
| Obfuscate code       | For web apps, consider bundling and obfuscating JS code to make key scraping harder |
