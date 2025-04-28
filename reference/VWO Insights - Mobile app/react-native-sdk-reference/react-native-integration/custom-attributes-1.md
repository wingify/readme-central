---
title: Custom Attributes
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
Custom Attributes can be created by creating a map that contains key and value pairs as follows:

<br />

```javascript
import { customAttribute } from 'vwo-insights-react-native-sdk';
  
<Button
            style={styles.button}
            title="Attribute"
            color="#AFB52C"
            click={() => {
              const customData = {
                reactnativeattribute: "test",
                textProperty: "testing",
                numberProperty: 12,
                booleanProperty: false
              }
              customAttribute(customData)
            }}
          />


```