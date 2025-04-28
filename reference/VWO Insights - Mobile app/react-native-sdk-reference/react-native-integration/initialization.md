---
title: Initialization
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
After installing the SDK, initialize it in App.tsx file

<br />

Copy the code below and replace the "ACCOUNT\_ID" and "SDK\_KEY" with the appropriate values from the dashboard.

```javascript
import {config} from 'vwo-insights-react-native-sdk';

React.useEffect(() => {
    config(ACCOUNT_ID, SDK_KEY, '')
  }, []);

```

<br />

> 📘 An internal condition check ensures that the above initialization runs only on iOS, not on Android.
