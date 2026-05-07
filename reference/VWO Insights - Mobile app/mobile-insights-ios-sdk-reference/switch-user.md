---
title: Switch User
deprecated: false
hidden: false
metadata:
  robots: index
---
`VWO.setUserId` switches identity when the logged-in user changes in the same app session. Call it only after `VWO.configure` has completed successfully.

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
import VWO

func handleUserLogin(userId: String) {
    VWO.setUserId(userId) { result in
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

VWO.setUserId(user.id) { result in
    if case .success = result {
        // User identity updated successfully
        // No need to call startSessionRecording() manually
    }
}
```
