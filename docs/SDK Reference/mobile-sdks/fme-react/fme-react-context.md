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

In addition to the user ID, the context can incorporate various **_attributes_** to support advanced targeting and segmentation strategies. These may include:

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
> Wingify **does not support** using **user context attributes** directly as **post-segmentation filters** in the reporting section of Wingify applications. For post-segmentation, it is recommended to rely on attributes set via the _setAttribute_ API.

## Usage with `WingifyProvider`

```typescript TypeScript
import React from 'react';
import { WingifyProvider, IWingifyOptions, IWingifyContextModel } from 'wingify-fme-react-sdk';

const wingifyConfig: IWingifyOptions = {
  sdkKey: '32-alpha-numeric-sdk-key', // Your Wingify SDK Key
  accountId: '123456', // Your Wingify Account ID
  logger: {
    level: 'debug', // Optional log level for debugging
  },
};

const userContext: IWingifyContextModel = {
  id: 'unique_user_id', // Required: Unique identifier for the user
  customVariables: { age: 25, location: 'US' }, // Optional
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36', // Optional
  ipAddress: '1.1.1.1', // Optional
};

// Optional: Provide a fallback UI component that will be displayed while WingifyProvider initializes.
// This is useful for showing a loading state or placeholder content during SDK initialization.
const fallbackComponent = <div>Initializing Wingify...</div>;

const App = () => (
  <WingifyProvider config={wingifyConfig} userContext={ userContext } fallbackComponent={fallbackComponent}>
    <YourComponent />
  </WingifyProvider>
);

export default App;
```

## User Context keys

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Parameter
      </th>

      <th>
        Type
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **id**
        _Required_
      </td>

      <td>
        string
      </td>

      <td>
        Unique user ID for the current user. 'id' is the only required property in userContext. This ID should be a unique identifier for the current user which you need to pass to. [Read more here](https://developers.wingify.com/v2/docs/user-id-management).
      </td>
    </tr>

    <tr>
      <td>
        **userAgent**
        _Optional_
      </td>

      <td>
        string
      </td>

      <td>
        The userAgent object for the current user can be used for targeting & segmentation.
      </td>
    </tr>

    <tr>
      <td>
        **ipAddress**
        _Optional_
      </td>

      <td>
        string
      </td>

      <td>
        IP Address of the current user can be used for targeting & segmentation.
      </td>
    </tr>

    <tr>
      <td>
        **customVariables**
        _Optional_
      </td>

      <td>
        object
      </td>

      <td>
        Any additional details of the current user that you want to push to Wingify can be added here as key-value pairs and can be used for targeting & pre-segmentation.
      </td>
    </tr>
  </tbody>
</Table>

## Usage with `useGetFlag` Hook

```typescript TypeScript
import { IWingifyContextModel, useGetFlag } from 'wingify-fme-react-sdk';

const userContext: IWingifyContextModel = { id: 'unique_user_id' };
const { flag, isReady } = useGetFlag('feature_key', userContext);
```

[Learn more about useGetFlag](https://developers.wingify.com/v2/docs/fme-react-feature-flags-variables)
