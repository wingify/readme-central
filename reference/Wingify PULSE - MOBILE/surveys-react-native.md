---
title: Surveys - React Native
deprecated: false
hidden: true
metadata:
  robots: index
---
# Wingify Pulse React Native SDK - Survey Feature

The Wingify Pulse React Native SDK provides comprehensive survey functionality that allows you to trigger surveys based on user events, set user attributes for targeting, and manage user identification. Surveys help you collect feedback directly from users within your React Native application.

## Key Features

* **Event-based Triggers** - Trigger surveys based on specific events in your app
* **User Identification** - Identify and track users to ensure proper survey targeting
* **Personalization** - Personalize surveys with user attributes
* **Localization** - Localize surveys by setting different languages

## Requirements

| Requirement   | Details                                            |
| ------------- | -------------------------------------------------- |
| React Native  | 0.60+                                              |
| iOS           | 12.0+                                              |
| Android       | API level 21+ (Android 5.0)                        |
| Wingify Dashboard | Access required to retrieve Account ID and SDK Key |

***

# Getting Started

## Before You Begin

1. **Obtain Your API Key**  
   Log in to the Wingify dashboard and navigate to:  
   `Configuration → Websites and apps → Default mobile app → SDK`  
   Retrieve your API key from this section.

2. **Create a Survey**  
   A survey should be created in your Wingify dashboard with appropriate trigger events.

***

# Quick Start

## Step 1: SDK Installation

Install the SDK using npm or yarn:

```bash
npm install wingify-insights-react-native-sdk
# or
yarn add wingify-insights-react-native-sdk
```

**For iOS**, install CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

## Step 2: Initialize the SDK

### Android Initialization

Initialize Wingify SDK in your Application class (`ReactNativeWingifyApp.kt`):

```kotlin
// ReactNativeWingifyApp.kt
import com.wingify.insights.WingifyInsightsReactNativeSdkModule

class ReactNativeWingifyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        
        WingifyInsightsReactNativeSdkModule.init(
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
    android:name=".ReactNativeWingifyApp"
    ... >
</application>
```

### iOS Initialization

Initialize the SDK in your React Native component:

```javascript
import { config } from 'wingify-insights-react-native-sdk';

React.useEffect(() => {
    config(ACCOUNT_ID, SDK_KEY, USER_ID);
}, []);
```

## Step 3: Trigger a Survey

```javascript
import { trackEvent } from 'wingify-insights-react-native-sdk';

trackEvent('event_name');
```

***

# Triggering Surveys

Surveys can be triggered based on events that occur in your application. Use the `trackEvent` function to trigger surveys.

## Basic Trigger

```javascript
import { trackEvent } from 'wingify-insights-react-native-sdk';

// Trigger a survey
trackEvent('Main');
```

## Trigger with Event Properties

You can pass additional properties along with the event to provide more context:

```javascript
import { trackEvent } from 'wingify-insights-react-native-sdk';

trackEvent('PurchaseCompleted', {
    productId: '12345',
    productName: 'Premium Plan',
    amount: 99.99,
    currency: 'USD'
});
```

## More Examples

```javascript
// Feature usage tracking
trackEvent('FeatureUsed', {
    featureName: 'dark_mode',
    duration: 120
});

// Screen view tracking
trackEvent('ScreenViewed', {
    screenName: 'checkout',
    previousScreen: 'cart'
});

// Error tracking
trackEvent('ErrorOccurred', {
    errorCode: 'E001',
    errorMessage: 'Payment failed'
});
```

***

# Setting User Attributes

User attributes help you target surveys to specific user segments. Set attributes before triggering surveys to ensure proper targeting.

## Basic Usage

```javascript
import { setAttribute } from 'wingify-insights-react-native-sdk';

setAttribute({
    'userType': 'premium',
    'subscriptionPlan': 'annual',
    'accountAge': '6months'
});
```

## Setting User Email and Name

```javascript
import { setAttribute } from 'wingify-insights-react-native-sdk';

setAttribute({
    'user_name': 'John Doe',
    'user_email': 'john@example.com'
});
```

## Supported Attribute Types

| Type    | Example     |
| ------- | ----------- |
| String  | `'premium'` |
| Number  | `99.99`     |
| Boolean | `true`      |

```javascript
setAttribute({
    'userType': 'premium',        // String
    'purchaseCount': 5,           // Number
    'isVerified': true,           // Boolean
    'user_email': 'user@test.com' // String
});
```

***

# Language Settings

Set the language for surveys to display them in the user's preferred language.

## Default Behavior

By default, the survey language is **automatically detected from the user's phone/device language**.

If you explicitly set a language using the SDK, **that language will override the device language** and will be used for displaying surveys.

## Setting Survey Language

```javascript
import { setSurveyLanguage } from 'wingify-insights-react-native-sdk';

// Set language using ISO 639-1 language code
setSurveyLanguage('en'); // English
setSurveyLanguage('es'); // Spanish
setSurveyLanguage('fr'); // French
setSurveyLanguage('de'); // German
```

**Common Language Codes:**

| Code | Language   |
| ---- | ---------- |
| `en` | English    |
| `es` | Spanish    |
| `fr` | French     |
| `de` | German     |
| `ja` | Japanese   |
| `pt` | Portuguese |
| `zh` | Chinese    |

***

# API Reference

## trackEvent

Triggers a survey based on an event name.

```typescript
trackEvent(event: string, properties?: { [key: string]: any }): void
```

| Parameter    | Type   | Required | Description                                    |
| ------------ | ------ | -------- | ---------------------------------------------- |
| `event`      | string | Yes      | The name of the event that triggers the survey |
| `properties` | object | No       | Additional properties to pass with the event   |

**Example:**

```javascript
trackEvent('PurchaseCompleted', { orderId: '12345' });
```

***

## setAttribute

Sets user attributes for survey targeting.

```typescript
setAttribute(attributes: { [key: string]: any }): void
```

| Parameter    | Type   | Required | Description                        |
| ------------ | ------ | -------- | ---------------------------------- |
| `attributes` | object | Yes      | Key-value pairs of user attributes |

**Example:**

```javascript
setAttribute({
    'userType': 'premium',
    'subscriptionPlan': 'annual'
});
```

***

## setSurveyLanguage

Sets the language for surveys.

```typescript
setSurveyLanguage(languageCode: string): void
```

| Parameter      | Type   | Required | Description                                      |
| -------------- | ------ | -------- | ------------------------------------------------ |
| `languageCode` | string | Yes      | ISO 639-1 language code (e.g., 'en', 'es', 'fr') |

**Example:**

```javascript
setSurveyLanguage('en');
```

***

## config (iOS only)

Initializes the SDK on iOS.

```typescript
config(accountId: string, sdkKey: string, userId: string): void
```

| Parameter   | Type   | Required | Description                     |
| ----------- | ------ | -------- | ------------------------------- |
| `accountId` | string | Yes      | Your Wingify account ID             |
| `sdkKey`    | string | Yes      | Your SDK key from Wingify dashboard |
| `userId`    | string | Yes      | Unique identifier for the user  |

**Example:**

```javascript
config('your_account_id', 'your_sdk_key', 'user_123');
```

***

# Best Practices

## 1. Initialize Before Use

Always ensure the SDK is initialized before calling any survey functions.

### Android

```kotlin
// In Application class
WingifyInsightsReactNativeSdkModule.init(
    this,
    "your_account_id",
    "your_sdk_key",
    "user_id"
)
```

### iOS

```javascript
import { config, trackEvent } from 'wingify-insights-react-native-sdk';

React.useEffect(() => {
    config(ACCOUNT_ID, SDK_KEY, USER_ID);
    
    // Wait for initialization before triggering surveys
    setTimeout(() => {
        trackEvent('AppLaunched');
    }, 1000);
}, []);
```

## 2. Set Attributes Before Triggering

Set user attributes before triggering surveys to ensure proper targeting:

```javascript
// ✅ Correct: Set attributes first
setAttribute({ 'userType': 'premium' });
trackEvent('Main');

// ❌ Incorrect: Triggering before setting attributes
trackEvent('Main');
setAttribute({ 'userType': 'premium' });
```

## 3. Use Meaningful Event Names

Use descriptive event names that clearly indicate when and why a survey should be triggered:

```javascript
// ✅ Descriptive event names
trackEvent('PurchaseCompleted');
trackEvent('FeatureAbandoned');
trackEvent('SupportTicketCreated');
trackEvent('OnboardingFinished');

// ❌ Vague event names
trackEvent('event1');
trackEvent('click');
```

## 4. Include Relevant Properties

Pass relevant properties with events to provide context:

```javascript
// ✅ Include relevant context
trackEvent('PurchaseCompleted', {
    productId: '12345',
    amount: 99.99,
    currency: 'USD',
    paymentMethod: 'credit_card'
});
```

## 5. Set Language Early

Set the survey language as early as possible, ideally during app initialization:

```javascript
import { setSurveyLanguage } from 'wingify-insights-react-native-sdk';

React.useEffect(() => {
    const languageCode = getUserPreferredLanguage();
    setSurveyLanguage(languageCode);
}, []);
```

***

# FAQ and Troubleshooting

## Survey Not Appearing

1. **Check SDK Initialization**: Ensure the SDK is properly initialized before triggering surveys
2. **Verify Event Name**: Make sure the event name matches exactly with the trigger configured in your Wingify dashboard
3. **Check User Attributes**: Verify that user attributes match the targeting criteria set in your survey
4. **Review Survey Status**: Ensure the survey is active in your Wingify dashboard

## Attributes Not Working

1. **Set Before Trigger**: Make sure attributes are set before triggering the survey event
2. **Check Attribute Names**: Verify attribute names match exactly with your survey targeting criteria
3. **Data Types**: Ensure attribute values are strings or numbers as expected

## Language Not Changing

1. **Valid Language Code**: Ensure you're using a valid ISO 639-1 language code
2. **Set Early**: Set the language before triggering surveys
3. **Survey Support**: Verify that your survey supports the requested language in the dashboard

## Race Condition on App Launch

If surveys aren't showing on the first screen, add a small delay after initialization:

```javascript
React.useEffect(() => {
    config(ACCOUNT_ID, SDK_KEY, USER_ID);
    
    // Add delay to ensure SDK is ready
    setTimeout(() => {
        trackEvent('AppLaunched');
    }, 1000);
}, []);
```

***

# Version Information

| Component           | Version                         |
| ------------------- | ------------------------------- |
| SDK Package         | `wingify-insights-react-native-sdk` |
| Minimum iOS Version | 12.0                            |
| Minimum Android SDK | 21 (Android 5.0)                |