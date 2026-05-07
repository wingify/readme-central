---
title: Change User ID
deprecated: false
hidden: true
metadata:
  robots: index
---
<br />

Switch the active user identity for the VWO Insights Android SDK **without killing the app process**.

## API

```kotlin
@JvmStatic
fun setUserId(userId: String, initCallBack: IVwoInitCallback?): Boolean
```

* **Return value**: `true` means the switch request was **accepted locally**; `false` means it was rejected immediately (due to reasons like blank userId / SDK not initialized).
* **Completion**: use `IVwoInitCallback` to know whether the user switch and server refresh finished successfully.
* **Recording**: this API **does not** auto-start recording again; call `VWOInsights.startSessionRecording()` after getting callback in `vwoInitSuccess`.

## Usage

### Set userId during `init` (recommended for first launch)

If you already know the logged-in user when initializing the SDK, set the user identity via `ClientConfiguration(..., userId)` passed to `VWOInsights.init(...)`.

### Kotlin

```kotlin
val clientConfig = ClientConfiguration(
  accountId = "your_account_id",
  appId = "your_sdk_key",
  userId = "user_123"
)

VWOInsights.init(application, initCallback, clientConfig)
```

### Java

```java
ClientConfiguration clientConfig =
  new ClientConfiguration("your_account_id", "your_sdk_key", "user_123");

VWOInsights.init(application, initCallback, clientConfig);
```

Use `VWOInsights.setUserId(...)` only when the user changes **after** initialization (e.g., logout/login switch) and you need to re-identify without restarting the app.

### Kotlin

```kotlin
val accepted = VWOInsights.setUserId("user_123", object : IVwoInitCallback {
  override fun vwoInitSuccess(message: String) {
    // User switch completed (server refresh finished)
    VWOInsights.startSessionRecording()
  }

  override fun vwoInitFailed(message: String) {
    // User switch failed
  }
})
```

### Java

```java
boolean accepted = VWOInsights.setUserId("user_123", new IVwoInitCallback() {
  @Override public void vwoInitSuccess(String message) {
    // User switch completed (server refresh finished)
    VWOInsights.startSessionRecording();
  }

  @Override public void vwoInitFailed(String message) {
    // User switch failed
  }
});
```

## What “override user” does

When `setUserId` is accepted:

* Stops the current recording/session (if running)
* Updates SDK user context to the provided `userId`
* Clears persisted client/server configuration so identity can be regenerated for the new user
* Regenerates and persists the client identity for the new user context
* Refreshes server configuration for the new user

## Notes

* Calling `setUserId` with a blank string returns `false`.
* Calling `setUserId` before `VWOInsights.init(...)` returns `false`.
* If you pass `null` for the callback, you only get the boolean “accepted locally” result.
