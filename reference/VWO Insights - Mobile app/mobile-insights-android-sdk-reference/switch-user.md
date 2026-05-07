---
title: Switch User
excerpt: Set or update the current user identifier for VWO Insights.
deprecated: false
hidden: false
metadata:
  robots: index
---
`VWOInsights.setUserId` switches identity when the logged-in user changes in the same process. Call it only after `VWOInsights.init` has completed successfully.

**Signature**

```kotlin
fun setUserId(userId: String, initCallBack: IVwoInitCallback?): Boolean
```
```java
public static boolean setUserId(String userId, IVwoInitCallback initCallBack)
```

**Parameters**

* `userId` — Non-blank string. Blank values return `false`.
* `initCallBack` — Optional. Invoked when configuration refresh finishes after the switch (`vwoInitSuccess` / `vwoInitFailed`), similar to init.

**Returns**

* `true` — Request accepted locally; refresh started.
* `false` — Rejected (blank `userId`, or SDK not initialized).

**Behavior**

* Stops recording/session for the previous user when needed.
* Updates client identity and refreshes server configuration for the new `userId`.
* Does not auto-start recording. Call `startSessionRecording()` in `vwoInitSuccess` when you want recording to resume.


```kotlin
import com.vwo.insights.VWOInsights
import com.vwo.insights.exposed.IVwoInitCallback

val accepted = VWOInsights.setUserId("user-123", object : IVwoInitCallback {
    override fun vwoInitSuccess(message: String) {
        VWOInsights.startSessionRecording()
    }

    override fun vwoInitFailed(message: String) {
        // Handle failure
    }
})
```
```java
import com.vwo.insights.VWOInsights;
import com.vwo.insights.exposed.IVwoInitCallback;

boolean accepted = VWOInsights.setUserId("user-123", new IVwoInitCallback() {
    @Override
    public void vwoInitSuccess(String message) {
        VWOInsights.startSessionRecording();
    }

    @Override
    public void vwoInitFailed(String message) {
        // Handle failure
    }
});
```
