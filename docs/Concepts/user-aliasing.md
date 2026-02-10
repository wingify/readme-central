---
title: 'User Aliasing '
excerpt: >-
  Connect anonymous userId and permanent userId, to get a unified experience for
  logged in and guest users
deprecated: false
hidden: true
metadata:
  robots: index
---
User aliasing allows you to associate two different user identifiers so your experimentation and personalization systems can treat them as the same user. This is especially useful when a user transitions from an anonymous ID to a logged-in ID.

Once an alias is created, all future lookups and evaluations can reference a unified identity.

### Prerequisites

To use user aliasing, the following must be configured in your SDK setup:

* **Aliasing must be enabled** via a configuration flag (e.g., `isAliasingEnabled: true`)
* **Gateway service must be configured**, since alias updates are sent through an API call

## Overview

User Aliasing is particularly useful in scenarios where users transition between anonymous and authenticated states. By creating an alias between identifiers, VWO ensures that:

* Users receive consistent feature flag variations regardless of which identifier is used
* Events and conversions are correctly attributed to the original user
* Flows where userId is not initially known but captured post a login, but the experience needs to be delivered immediately

<Callout theme="default">
  User Aliasing requires the **VWO Gateway Service** to be configured. The Gateway Service stores and retrieves alias mappings. See [Gateway Service documentation](https://developers.vwo.com/v2/docs/gateway-service) for setup instructions.
</Callout>

## How It Works

The aliasing system works by maintaining a mapping between alias identifiers and original user IDs in the VWO Gateway Service. When API methods are called with an aliased identifier, the SDK automatically resolves it to the original user ID before processing.

### Flow Diagram

> _See `mermaid.txt` file to generate the sequence diagram using any Mermaid renderer._
>
> The diagram illustrates the complete aliasing flow from SDK initialization through alias creation and subsequent API calls with automatic alias resolution.

### Key Concepts

| Term      | Description                                                           |
| --------- | --------------------------------------------------------------------- |
| `userId`  | The original/primary user identifier used for bucketing and analytics |
| `aliasId` | An alternative identifier that maps to the original userId            |

## Configuration

To enable User Aliasing, you must configure both the `isAliasingEnabled` flag and the `gatewayService` when initializing the VWO SDK.

### Initialization Options

**isAliasingEnabled** `boolean` _optional_

Set to `true` to enable user aliasing functionality. Default is `false`.

**gatewayService** `object` _required for aliasing_

Configuration object for the VWO Gateway Service. Required when `isAliasingEnabled` is `true`.

### Example Configuration

<Tabs>
  <Tab title="TypeScript">
    ```typescript
    import { init } from 'vwo-fme-node-sdk';

    const vwoClient = await init({
      accountId: 'YOUR_ACCOUNT_ID',
      sdkKey: 'YOUR_SDK_KEY',

      // Enable aliasing
      isAliasingEnabled: true,

      // Gateway service is required for aliasing
      gatewayService: {
        url: 'https://your-gateway-service.com',
        // Optional: specify port if not using default
        port: 443,
        // Optional: specify protocol (defaults to https)
        protocol: 'https'
      }
    });
    ```
  </Tab>

  <Tab title="JavaScript">
    ```javascript
    const { init } = require('vwo-fme-node-sdk');

    const vwoClient = await init({
      accountId: 'YOUR_ACCOUNT_ID',
      sdkKey: 'YOUR_SDK_KEY',

      // Enable aliasing
      isAliasingEnabled: true,

      // Gateway service is required for aliasing
      gatewayService: {
        url: 'https://your-gateway-service.com',
        port: 443,
        protocol: 'https'
      }
    });
    ```
  </Tab>
</Tabs>

## API Reference

### setAlias()

Creates a mapping between a user ID and an alias ID. Once set, any API calls made with the `aliasId` will automatically resolve to the original `userId`.

#### Method Signatures

```typescript
// Using context object
setAlias(context: { id: string }, aliasId: string): Promise<boolean>

// Using userId directly
setAlias(userId: string, aliasId: string): Promise<boolean>
```

#### Parameters

**contextOrUserId** `object | string` _required_

Either a context object containing an `id` property, or the user ID string directly. This is the original/primary user identifier.

**aliasId** `string` _required_

The alias identifier to map to the original user ID. Cannot be the same as the userId, cannot be an array, and cannot be empty.

#### Returns

`Promise<boolean>` - Resolves to `true` if the alias was successfully created, `false` otherwise.

#### Where To Call

Typically, setAlias() is called, once the guest user has logged in. The first time the user comes to the platform, and there is no permanent userId available, assign a random userId and use that to get a decision. Once the user has logged in, set that as the aliasId and continue. After that, whether the userId is used, or the aliasId is used, the SDK treats them both as the same user and returns the same variable values.

#### Example Usage

<Tabs>
  <Tab title="With Context">
    ```typescript
    // User logs in - link anonymous ID to authenticated ID
    const anonymousId = 'anon_abc123';
    const authenticatedId = 'user_john_doe';

    // Create alias: anonymousId now maps to authenticatedId
    const success = await vwoClient.setAlias(
      { id: authenticatedId },  // Original user ID
      anonymousId               // Alias ID
    );

    if (success) {
      console.log('Alias created successfully');
    }
    ```
  </Tab>

  <Tab title="With User ID">
    ```typescript
    // Using user ID string directly
    const success = await vwoClient.setAlias(
      'user_john_doe',   // Original user ID
      'anon_abc123'      // Alias ID
    );

    if (success) {
      console.log('Alias created successfully');
    }
    ```
  </Tab>
</Tabs>

<Callout theme="default">
  * `userId` and `aliasId` cannot be the same value
  * Neither value can be an array or empty string
</Callout>

## Automatic Alias Resolution

When aliasing is enabled, the following SDK methods automatically resolve alias IDs to their original user IDs before processing:

| Method           | Behavior                                                                      |
| ---------------- | ----------------------------------------------------------------------------- |
| `getFlag()`      | Resolves alias before evaluating feature flags, ensuring consistent bucketing |
| `trackEvent()`   | Resolves alias before tracking, attributing events to the original user       |
| `setAttribute()` | Resolves alias before setting attributes on the original user profile         |

### Example: Cross-Device Consistency

```typescript
// Mobile app: User is anonymous
const mobileAnonId = 'mobile_anon_xyz';
const flag1 = await vwoClient.getFlag('new_checkout', { id: mobileAnonId });
// User gets variation A

// User logs in on mobile
const userId = 'user_12345';
await vwoClient.setAlias(userId, mobileAnonId);

// Web app: Same user logs in
const webAnonId = 'web_anon_abc';
await vwoClient.setAlias(userId, webAnonId);

// Now, all three IDs resolve to the same user
const flag2 = await vwoClient.getFlag('new_checkout', { id: mobileAnonId });
const flag3 = await vwoClient.getFlag('new_checkout', { id: webAnonId });
const flag4 = await vwoClient.getFlag('new_checkout', { id: userId });

// flag2, flag3, and flag4 all return the same variation (A)
```

## Gateway API Endpoints

The SDK uses the following Gateway Service endpoints for alias operations. These are called internally by the SDK.

### Set Alias

|              |                                                |
| ------------ | ---------------------------------------------- |
| **Endpoint** | `/user-alias/setUserAlias`                     |
| **Method**   | `POST`                                         |
| **Purpose**  | Creates a mapping between a userId and aliasId |

### Get Alias

|              |                                                   |
| ------------ | ------------------------------------------------- |
| **Endpoint** | `/user-alias/getAliasUserId`                      |
| **Method**   | `GET`                                             |
| **Purpose**  | Retrieves the original userId for a given aliasId |

## Error Handling

The SDK handles the following error scenarios gracefully:

| Error                 | Cause                                                 | Behavior                              |
| --------------------- | ----------------------------------------------------- | ------------------------------------- |
| Aliasing not enabled  | `setAlias()` called when `isAliasingEnabled` is false | Returns `false`, logs error           |
| No gateway configured | Aliasing enabled but no `gatewayService` provided     | Returns `false`, logs error           |
| Invalid parameters    | userId equals aliasId, or either is empty/array       | Throws `TypeError`, logs error        |
| Gateway unavailable   | Network error contacting Gateway Service              | Falls back to using provided ID as-is |

## Best Practices

* **Call setAlias immediately after user identification** - Create the alias as soon as the user logs in or is identified to ensure all subsequent calls use consistent bucketing.

* **Use meaningful identifier patterns** - Use prefixes like `anon_`, `mobile_`, or `web_` to easily distinguish identifier types during debugging.

* **Handle setAlias failures gracefully** - Always check the return value and implement appropriate fallback behavior.

* **Avoid circular aliases** - Don't create aliases that point to each other; always alias to a single canonical user ID.

<Callout theme="default">
  Consider implementing a retry mechanism for `setAlias()` calls in case of transient network failures. The SDK supports `retryConfig` in initialization options for automatic retries.
</Callout>

***
