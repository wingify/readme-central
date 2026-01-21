---
title: Surveys - React Native - Migration Guide
deprecated: false
hidden: true
metadata:
  robots: index
---
# Migration Guide: Blitzllama to VWO Pulse React Native SDK

This guide helps you migrate your **survey implementation from Blitzllama React Native SDK to VWO Pulse React Native SDK**. It provides a conceptual mapping, API replacements, and step-by-step migration instructions.

---

## High-Level Differences

| Area | Blitzllama | VWO Pulse |
|------|------------|-----------|
| SDK Purpose | In-app surveys & feedback | In-app surveys with advanced targeting |
| Initialization | App key / environment-based | `ACCOUNT_ID` & `SDK_KEY` |
| Event-based triggers | Yes | Yes |
| User attributes | Yes | Yes |
| User identification | Yes | Yes |
| Language handling | Explicit / SDK-based | Auto-detected from device (override supported) |
| Logout handling | `logout()` | Not required |

---

# Step 1: Update Dependencies

## Remove Blitzllama Dependency

**Before (Blitzllama):**

```bash
npm uninstall blitzllama-react-native
```

## Add VWO Pulse Dependency

**After (VWO Pulse):**

```bash
npm install vwo-insights-react-native-sdk
# or
yarn add vwo-insights-react-native-sdk
```

**For iOS:**

```bash
cd ios && pod install && cd ..
```

**For Android:**
- No additional setup required.

---

# Step 2: Update SDK Initialization

## Blitzllama (Before)

```javascript
Blitz.init({
  apiKey: 'BLITZ_API_KEY',
});
```

## VWO Pulse (After)

### Android Initialization

Initialize VWO SDK in your Application class (`ReactNativeVwoApp.kt`):

```kotlin
// ReactNativeVwoApp.kt
import com.vwo.insights.VwoInsightsReactNativeSdkModule

class ReactNativeVwoApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        VwoInsightsReactNativeSdkModule.init(
            this,
            "your_account_id",
            "your_sdk_key",
            "user_id"
        )
    }
}
```

Register the Application class in `AndroidManifest.xml`:

```xml
<application
    android:name=".ReactNativeVwoApp"
    ... >
</application>
```

### iOS Initialization

```javascript
import { config } from 'vwo-insights-react-native-sdk';

React.useEffect(() => {
    config(ACCOUNT_ID, SDK_KEY, USER_ID);
}, []);
```

> 📘 **Migration Note**
> - Replace Blitz API Key with VWO `ACCOUNT_ID` & `SDK_KEY`
> - Initialization must happen before triggering surveys

---

# Step 3: Update Survey Triggers

## Blitzllama (Before)

```jsx
const [show, setShow] = React.useState(false);

<Blitzllama 
  showSurvey={show}
  trigger="trigger_name"
  closeSurvey={() => setShow(false)}
/>
```

## VWO Pulse (After)

```javascript
import { trackEvent } from 'vwo-insights-react-native-sdk';

trackEvent('event_name');
```

> 📘 **Key Change:** VWO uses a function-based approach instead of a component-based approach.

---

# Step 4: Update Event Properties

## Blitzllama (Before)

```jsx
<Blitzllama 
  event_properties={event_property_object}
  trigger="trigger_name"
/>
```

## VWO Pulse (After)

```javascript
import { trackEvent } from 'vwo-insights-react-native-sdk';

trackEvent('PurchaseCompleted', {
  productId: '12345',
  productName: 'Premium Plan',
  amount: 99.99,
  currency: 'USD'
});
```

> ⚠️ **Important:** Event names must **exactly match** those configured in the VWO dashboard.

---

# Step 5: Update User Attributes

## Blitzllama (Before)

```javascript
Blitzllama.setUserAttributes('attribute_name', 'attribute_value', 'attribute_datatype');
```

## VWO Pulse (After)

```javascript
import { setAttribute } from 'vwo-insights-react-native-sdk';

setAttribute({
  userType: 'premium',
  subscriptionPlan: 'annual',
  accountAge: '6months'
});
```

## Setting User Email and Name

**Blitzllama (Before):**

```javascript
Blitzllama.setUserName('John Doe');
Blitzllama.setUserEmail('john@example.com');
```

**VWO Pulse (After):**

```javascript
setAttribute({
  'user_name': 'John Doe',
  'user_email': 'john@example.com'
});
```

> ⚠️ **Important:** Always set attributes **before** triggering survey events.

---

# Step 6: Update Language Settings

## Blitzllama (Before)

```javascript
Blitz.setSurveyLanguage('en');
```

## VWO Pulse (After)

```javascript
import { setSurveyLanguage } from 'vwo-insights-react-native-sdk';

// Optional: override device language
setSurveyLanguage('en'); // ISO 639-1
```

**Key Difference:**
- VWO **auto-detects language** from the user's device by default
- If you explicitly set a language using `setSurveyLanguage`, it **overrides the device language**

---

# Step 7: Handle User Logout

## Blitzllama (Before)

```javascript
Blitz.logout();
```

## VWO Pulse (After)

Logout handling is no longer required in VWO Pulse.

---

# Recommended Initialization Flow

Here's the recommended complete initialization flow for VWO Pulse:

```javascript
import {
  config,
  setSurveyLanguage,
  setAttribute,
  trackEvent
} from 'vwo-insights-react-native-sdk';

useEffect(() => {
  // 1. Initialize SDK (iOS)
  config(ACCOUNT_ID, SDK_KEY, USER_ID);

  // 2. Set language (optional - override device default)
  setSurveyLanguage('en');

  // 3. Set user attributes for targeting
  setAttribute({ 
    userType: 'premium' 
  });
  
  setAttribute({
    'user_name': 'John Doe',
    'user_email': 'john@example.com'
  });
  
  // 4. Trigger initial survey event
  trackEvent('AppLaunched');
}, []);
```

---

# API Mapping Summary

| Blitzllama | VWO Pulse |
|------------|-----------|
| `init()` | `config()` |
| `<Blitzllama showSurvey={} trigger="" />` | `trackEvent()` |
| `setUserAttributes()` | `setAttribute()` |
| `setUserName()` | `setAttribute({ 'user_name': 'Name' })` |
| `setUserEmail()` | `setAttribute({ 'user_email': 'email' })` |
| `setSurveyLanguage()` | `setSurveyLanguage()` |
| `logout()` | Not required |

---

# Import Statement Changes

| Blitzllama Import | VWO Pulse Import |
|-------------------|------------------|
| `import Blitzllama from 'blitzllama-react-native'` | `import { config, trackEvent, setAttribute, setSurveyLanguage } from 'vwo-insights-react-native-sdk'` |

---

# Common Migration Issues

## Survey Not Showing

| Issue | Solution |
|-------|----------|
| SDK not initialized | Ensure `config()` is called before any other SDK methods |
| Event name mismatch | Verify event names match exactly with VWO dashboard |
| Survey inactive | Check survey status in VWO dashboard |
| Attributes set after event | Set attributes **before** calling `trackEvent()` |

## Attributes Not Applied

| Issue | Solution |
|-------|----------|
| Key mismatch | Ensure attribute keys match dashboard targeting configuration |
| Incorrect data types | Use correct data types (string, number, boolean) |
| Timing issue | Set attributes **before** triggering events |

## Language Not Applied

| Issue | Solution |
|-------|----------|
| Invalid code | Use valid ISO 639-1 language codes |
| Timing issue | Set language **before** triggering events |
| Not enabled | Verify language is enabled in VWO dashboard |

---

# Migration Checklist

- [ ] Uninstalled Blitzllama SDK (`npm uninstall blitzllama-react-native`)
- [ ] Installed VWO Pulse SDK (`npm install vwo-insights-react-native-sdk`)
- [ ] Run `pod install` for iOS
- [ ] Updated Android Application class initialization
- [ ] Updated iOS initialization with `config()`
- [ ] Replaced `<Blitzllama />` component with `trackEvent()` calls
- [ ] Updated `setUserAttributes()` to `setAttribute()`
- [ ] Updated `setUserName()` and `setUserEmail()` to `setAttribute()`
- [ ] Updated `setSurveyLanguage()` import
- [ ] Removed `logout()` calls (no longer needed)
- [ ] Configured events in VWO dashboard
- [ ] Tested survey triggering in the app

---

# Final Notes

1. **Remove Blitzllama SDK** after successful migration
2. **Validate all survey triggers** in VWO Dashboard
3. **Keep event naming consistent** across platforms (iOS, Android, React Native)
4. **Test thoroughly** before releasing to production