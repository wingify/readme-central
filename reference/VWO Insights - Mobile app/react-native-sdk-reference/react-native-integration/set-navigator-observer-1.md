---
title: Set Navigator Observer
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
Inform screen changes in your application using setScreenName() in the App.tsx or App.js file.

<br />

```javascript
import { NavigationContainer } from '@react-navigation/native';
import { setScreenName } from 'vwo-insights-react-native-sdk';

<NavigationContainer
          onStateChange={(state) => {
            setScreenName(state)}}>										

  <Stack.Navigator>
	// otherscreens
	</Stack.Navigator>

</NavigationContainer>

```