---
title: User Context
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
The **user context** serves as a unique identifier for individual users and plays a critical role in ensuring **consistent feature rollouts** across sessions and devices. Typically represented as an **object**, the user context includes an _id_ key that uniquely identifies the user.

In addition to the user ID, the context can incorporate various _**attributes**_ to support advanced targeting and segmentation strategies. These may include:

- **customVariables**: User-specific data points for personalized experiences.

By leveraging these attributes, organizations can deliver **precisely targeted features**, maintain **personalization consistency**, and **conduct granular experimentation** for improved user engagement and performance analysis.

> 📘 Important Note
> 
> The **user context attributes** differ from the attributes set using the **_setAttribute_** API.
> 
> - **User Context Attributes**: Primarily used for **targeting purposes** during feature rollouts and experimentation. These attributes help determine which users are eligible for specific features or variations.
> - **_setAttribute_ API Attributes**: Specifically designed for **post-segmentation analysis**, allowing you to segment and analyze experiment results based on defined user characteristics.

> 🚧 Current Limitation
> 
> VWO **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of VWO applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage

```javascript JavaScript
import { VWOProvider } from 'vwo-fme-react-sdk';

const vwoConfig = {
  sdkKey: '32-alpha-numeric-sdk-key',  // Your VWO SDK Key
  accountId: '123456',  // Your VWO Account ID
};

const userContext = {
  id: 'unique_user_id',  // Required: Unique identifier for the user
  customVariables: {     // Optional
    age: 25,
    location: 'US',
  }
};

// Here passing userContext is optional. You can also pass this in useGetFlag hook.
const App = () => (
  <VWOProvider config={vwoConfig} userContext={userContext}>
    <YourComponent />
  </VWOProvider>
);

export default App;
```

## User Context keys

[block:parameters]
{
  "data": {
    "h-0": "Parameter",
    "h-1": "Type",
    "h-2": "Description",
    "0-0": "**id**  \n_Required_",
    "0-1": "string",
    "0-2": "Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to VWO. [Read more here](https://developers.vwo.com/v2/docs/user-id-management).",
    "1-0": "**userAgent**  \n_Optional_",
    "1-1": "string",
    "1-2": "The userAgent object for the current user can be used for targeting & segmentation. ",
    "2-0": "**ipAddress**  \n_Optional_",
    "2-1": "string",
    "2-2": "IP Address of the current user can be used for targeting & segmentation.",
    "3-0": "**customVariables**  \n_Optional_",
    "3-1": "object",
    "3-2": "Any additional details of the current user that you want to push to VWO can be added here as key-value pairs and can be used for targeting & pre-segmentation."
  },
  "cols": 3,
  "rows": 4,
  "align": [
    "left",
    "left",
    "left"
  ]
}
[/block]