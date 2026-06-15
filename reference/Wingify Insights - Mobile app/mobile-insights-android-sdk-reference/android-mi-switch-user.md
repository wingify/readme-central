---
title: Switch User
excerpt: >-
  Set or update the current user identifier for Wingify Insights. - Available from
  SDK version 2.2.0
deprecated: false
hidden: false
metadata:
  robots: index
---
`WingifyInsights.setUserId` switches identity when the logged-in user changes in the same process. Call it only after `WingifyInsights.init` has completed successfully.

**Signature**

```kotlin
fun setUserId(userId: String, initCallBack: IWingifyInitCallback?): Boolean
```
```java
public static boolean setUserId(String userId, IWingifyInitCallback initCallBack)
```

**Parameters**

* `userId` — Non-blank string. Blank values return `false`.
* `initCallBack` — Optional. Invoked when configuration refresh finishes after the switch (`wingifyInitSuccess` / `wingifyInitFailed`), similar to init.

**Returns**

* `true` — Request accepted locally; refresh started.
* `false` — Rejected (blank `userId`, or SDK not initialized).

**Behavior**

* Stops the current recording/session for the previous user.
* Updates client identity and refreshes server configuration for the new `userId`.
* If recording was active before the switch, it automatically resumes after configuration refresh completes. If recording was stopped, it remains stopped.

```kotlin
import com.wingify.insights.WingifyInsights
import com.wingify.insights.exposed.IWingifyInitCallback

val accepted = WingifyInsights.setUserId("user-123", object : IWingifyInitCallback {
    override fun wingifyInitSuccess(message: String) {
        // User switch complete
    }

    override fun wingifyInitFailed(message: String) {
        // Handle failure
    }
})
```
```java
import com.wingify.insights.WingifyInsights;
import com.wingify.insights.exposed.IWingifyInitCallback;

boolean accepted = WingifyInsights.setUserId("user-123", new IWingifyInitCallback() {
    @Override
    public void wingifyInitSuccess(String message) {
        // User switch complete
    }

    @Override
    public void wingifyInitFailed(String message) {
        // Handle failure
    }
});
```