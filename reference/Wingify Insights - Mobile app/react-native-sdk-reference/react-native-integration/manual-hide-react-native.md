---
title: Manual Hide
deprecated: false
hidden: true
metadata:
  robots: index
---
#

Use **Manual Hide** when you need to hide specific UI elements from session recordings. Hidden views are masked while recording only — the end user still sees them normally in the app.

This guide is for apps using the **VWO** React Native SDK (`vwo-insights-react-native-sdk`).

## When to use Manual Hide

Use Manual Hide for views that may contain sensitive or private information, for example:

- Password, OTP, or PIN fields
- Payment / card details
- Personal identifiers (email, phone, account numbers)
- Profile cards or other containers that show PII
- Video or media areas you do not want captured in recordings

> Manual Hide complements dashboard-based privacy controls. Use it when you need per-view control from app code.

## APIs

| API                         | Purpose                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| `hideSensitiveView(view)`   | Marks the given React Native view as hidden in session recordings |
| `unhideSensitiveView(view)` | Removes the hide mark so the view can appear in recordings again  |

Both APIs accept a **native-backed component instance** (typically `ref.current` from a `View`, `TextInput`, or similar host component).

## How it works

1. Attach a `ref` to the component you want to hide.
2. After the component is mounted and `ref.current` is available, call `hideSensitiveView(ref.current)`.
3. Optionally call `unhideSensitiveView(ref.current)` later if the content should become visible in recordings again.

## Basic usage

### Hide a container view

```javascript
import React, { useRef, useEffect } from 'react';
import { View, Text } from 'react-native';
import {
  hideSensitiveView,
  unhideSensitiveView,
} from 'vwo-insights-react-native-sdk';

function ProfileCard() {
  const sensitiveCardRef = useRef(null);

  useEffect(() => {
    if (sensitiveCardRef.current) {
      hideSensitiveView(sensitiveCardRef.current);
    }
  }, []);

  return (
    <View
      ref={sensitiveCardRef}
      collapsable={false}
      style={{ padding: 16 }}
    >
      <Text>Name: USER_NAME</Text>
      <Text>Email: USER_EMAIL</Text>
    </View>
  );
}
```

### Hide a text input

```javascript
import React, { useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { hideSensitiveView } from 'vwo-insights-react-native-sdk';

function PasswordField() {
  const passwordRef = useRef(null);

  useEffect(() => {
    if (passwordRef.current) {
      hideSensitiveView(passwordRef.current);
    }
  }, []);

  return (
    <TextInput
      ref={passwordRef}
      secureTextEntry
      placeholder="Password"
    />
  );
}
```

## Important notes

- **Recording only** — Manual Hide does not change what users see on device. It only affects recorded sessions.
- **Call after mount** — Pass a valid `ref.current`. Calling before the view is mounted has no effect.
- **Use host components** — Prefer refs on `View`, `TextInput`, and other native host components. A composite component is a JS wrapper (for example a `ProfileCard` that only renders other components); a ref on it often points at the React component instance, not a native view, so hiding may not work.
- **Android: set&#x20;**`collapsable={false}` — On Android, React Native may optimize away simple `View` nodes. Set `collapsable={false}` on the view you hide so the native node remains available for masking.
- **Re-apply when the view remounts** — If the screen unmounts and mounts again, call `hideSensitiveView` again after the new ref is ready.
- **Hide the right scope** — Hiding a parent view also masks its children in the recording. Prefer the smallest container that covers the sensitive content.