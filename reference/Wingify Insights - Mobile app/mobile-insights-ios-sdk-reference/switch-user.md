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
`Wingify.setUserId` switches identity when the logged-in user changes in the same app session. Call it only after `Wingify.configure` has completed successfully.

**Signature**

```swift
public static func setUserId(_ newUserId: String, 
                              completion: @escaping (Result<String, Error>) -> Void)
```

**Parameters**

- `newUserId` — Non-empty string. Empty values will fail with an error.
- `completion` — Closure called when switch completes with `Result<String, Error>`

**Returns**

- **Success**: Completion called with `.success(String)` containing success message
- **Failure**: Completion called with `.failure(Error)` — SDK not initialized, empty userId, or network failure

**Behavior**

- Stops the current recording/session for the previous user.
- Updates client identity and refreshes server configuration for the new `userId`.
- If recording was active before the switch, it automatically resumes after configuration refresh completes. If recording was stopped, it remains stopped.

**Example**

```swift
import Wingify

func handleUserLogin(userId: String) {
    Wingify.setUserId(userId) { result in
        switch result {
        case .success(let message):
            print("User switch complete: \(message)")
            // Recording resumes automatically if it was active before
            
        case .failure(let error):
            print("User switch failed: \(error.localizedDescription)")
        }
    }
}
```

**Common Use Case**

```swift
// After user authentication
let user = try await authenticateUser(email: email, password: password)

Wingify.setUserId(user.id) { result in
    if case .success = result {
        // User identity updated successfully
        // No need to call startSessionRecording() manually
    }
}
```