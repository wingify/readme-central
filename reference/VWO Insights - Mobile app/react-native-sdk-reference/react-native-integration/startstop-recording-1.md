---
title: Start/Stop Recording
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
If you want to start recording when the application launches, start recording during the SDK initialization in App.tsx file.

<br />

```javascript
import {config, startRecording } from 'vwo-insights-react-native-sdk';

React.useEffect(() => {
 
    // Auto Start after Lunch in both Platform Android & ios.
    startRecording()

 }, []);

```

<br />

If you want to start recording based on a user action, such as tapping a button, use the following code snippet:

```javascript
import {startRecording } from 'vwo-insights-react-native-sdk';

// on button Click Event
onPress =() => {
  
		startRecording()

}

```

<br />

If you want to stop recording based on a user action, such as tapping a button, use the following code snippet:

```javascript
import { stopRecording } from 'vwo-insights-react-native-sdk';

// on button Click Event
onPress =() => {
	
  stopRecording()

}

```