---
title: Switch User
excerpt: >-
  Set or update the current user identifier for Wingify Insights. - Available
  from SDK version 2.2.0
deprecated: false
hidden: false
metadata:
  robots: index
---
Sets or updates the current user identifier for Wingify Insights.

**Method Signature**

```typescript
setUserId(userId: string): Promise<boolean>
```

**Parameters**

- `userId` (`string`, required): Unique identifier for the user.

**Returns**

`Promise<boolean>`

- `true`: User ID update succeeded.
- `false`: SDK did not apply the update.
- Rejected Promise: Update failed with an error.

**When to Call**

- After successful user login
- When switching accounts
- When you want to associate future session activity with a known user

**Notes**

- Call only after SDK initialization is complete.
- If recording was active before calling `setUserId`, it automatically resumes after the user switch completes. If recording was stopped, it remains stopped.

**Example**

```typescript
import { setUserId } from 'vwo-insights-react-native-sdk';

async function identifyUser(userId: string) {
  try {
    const applied = await setUserId(userId);
    if (!applied) {
      // Handle "not applied" state
      return;
    }
    // User ID applied successfully
  } catch (error) {
    // Handle error
  }
}
```

<br />
