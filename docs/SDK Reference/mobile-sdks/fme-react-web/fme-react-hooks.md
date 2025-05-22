---
title: Hooks
excerpt: Available Hooks in VWO FME React SDK
deprecated: false
hidden: false
metadata:
  robots: index
---
The `VWO FME React SDK` provides a set of hooks to help you seamlessly integrate feature flagging, experimentation, and event tracking into your React application. These hooks provide an easy and flexible way to interact with the VWO SDK.

Here are the available hooks:

## useVWOClient

`useVWOClient` is a custom React hook that provides access to the initialized VWO SDK client instance within components wrapped by `VWOProvider`. It enables interaction with the VWO platform for experiments, feature flags, and tracking.

#### Usage

The hook **does not** accept any parameters. It internally consumes the VWO context provided by `VWOProvider`.

```javascript
const { vwoClient, isReady } = useVWOClient();

if (isReady) {
  // Using vwoClient, you can run experiments, track events, and manage feature flags.
  // For example, call methods like vwoClient.getFlag(), vwoClient.trackEvent(), etc.
}
```

#### Hook Lifecycle & Side Effects

* The hook internally accesses the VWO client and readiness state from the React context.
* If used outside of a `VWOProvider`, it logs an error and returns a default state with no client and `isReady: false`.
* If the context indicates the client is not ready, it returns a default state signaling the client is still initializing.
* The hook has `No side effects` (like state updates or async calls) happen inside this hook, it’s purely for safe retrieval of the VWO client from context.

#### Return Type

```typescript
interface VWOClientResult {
  vwoClient: IVWOClient | null;
  isReady: boolean;
}
```

* `vwoClient`: The VWO SDK client instance if initialized; otherwise null.
* `isReady`: Boolean indicating whether the VWO client is fully initialized and ready for use.

Using the above `vwoClient`You can call the different methods available directly without using any hooks.

Check if the feature flag is enabled using `getFlag` method:

```typescript
const { vwoClient, isReady } = useVWOClient();

useEffect(() => {
  if (!isReady) return;

  (async () => {
    const userContext: IVWOContextModel = { id: 'user_123' };
    
    // Retrieve the flag using the feature key and userContext
    const feature: Flag = await vwoClient.getFlag('feature_key', userContext);
    // check if the flag is enabled
    const enabled = feature.isEnabled();
    // get specific variable value
    const variableValue = feature.getVariable('variable-key', 'default-value')
    // get all variables
    const allVariables = feature.getVariables();
  })();
}, [isReady]);
```

Track an event using `trackEvent` method.

```typescript
const { vwoClient, isReady } = useVWOClient();
if (!isReady || !vwoClient) return;

const userContext: IVWOContextModel = { id: 'user_123' };
vwoClient.trackEvent('event_name', userContext);
```

> If you want to check the status of `trackEvent` method, then you have to use `await` and store the result.

Set Attributes using `setAttribute` method:

```typescript
const { vwoClient, isReady } = useVWOClient();
if (!isReady || !vwoClient) return;

const userContext: IVWOContextModel = { id: 'user_123' };
vwoClient.setAttribute('event_name', userContext);
```

## useVWOContext

The `useVWOContext` hook is used to access the `VWOContext`, which provides shared context values for components that need to interact with the VWO SDK and user targeting information.

The `useVWOContext` hook provides access to `setUserContext`, which lets you dynamically update the user details. Updating the context this way triggers updates in all components consuming the VWO context, enabling real-time evaluation of feature flags based on the latest user data.

It should only be used within components wrapped by `VWOProvider`.

#### Usage

```typescript
import React from 'react';
import { useVWOContext } from './VWOProvider';

const UpdateUserContextButton: React.FC = () => {
  const context = useVWOContext();
  // If you want to access the current user context, use - context.userContext
  
  const handleUpdateUser = () => {
    if (context && context.userContext && context.setUserContext) {
      // use setUserContext to update userContext 
      context.setUserContext({
        id: 'new-user-id',
        customVariables: {key: 'value'}
      });
    }
  };

  return (
    <div>
      <p>Click the button to update the user context:</p>
      <button onClick={handleUpdateUser}>Set User ID</button>
    </div>
  );
};

export default UpdateUserContextButton;
```

This hook **does not** accept any parameters.

#### Hook Lifecycle & Side Effects

* On component render, `useContext(VWOContext)` is called to retrieve context values.
* If the hook is used outside of a provider or the context is undefined, an error is logged and `null` is returned.
* If used correctly, it provides access to current context values and the updater function.
* There are **no side effects** inside this hook itself.
* Updating `userContext` via `setUserContext` may trigger re-renders in components using this hook.

> 📘 Note
>
> * ⚠️ Using `setUserContext` from the `useVWOContext` hook will cause any component using the `useGetFlag` hook to re-run its effect and likely re-render, since it depends on the `userContext`.
> * ⚠️ Updating the `id` using `setUserContext` is treated as switching to a new user. This may result in different variation or flag values for the same feature. Additionally, it will be counted as a **new visitor** in VWO.

## useGetFlag

`useGetFlag` is a custom React hook to fetch and manage the state of a specific feature flag from the VWO SDK. It allows components to retrieve the current status and variables of a feature flag based on a feature key and optional user context.

* **Usage**: Retrieve a feature flag using VWO client instance.
* **More Info**: [Learn more about useGetFlag](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables)

## useGetFlagVariable

`useGetFlagVariable` is a generic React hook that retrieves the value of a specific variable from a VWO feature flag. It provides a typed interface to safely access variables with a fallback default.

* **Usage**: Retrieve the value of a specific feature flag variable.
* **More Info**: [Learn more about useGetFlagVariable](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflagvariable-hook)

## useGetFlagVariables

The `useGetFlagVariable` hook allows you to fetch all variables associated with a feature flag.

* **Usage**: Retrieve all feature flag variables.
* **More Info**: [Learn more about useGetFlagVariables](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflagvariables-hook)

## useTrackEvent

The `useTrackEvent` hook allows you to track custom events within your app, such as user actions or conversions.

* **Usage**: Track important metrics, such as button clicks or completed purchases.
* **More Info**: [Learn more about useTrackEvent](https://developers.vwo.com/v2/docs/fme-react-metrics-tracking#usetrackevent-hook)

## useSetAttribute

The `useSetAttribute` hook provides a simple way to associate these attributes with users in VWO for advanced segmentation.

* **Usage**: Assign user attributes to help with segmentation and personalization.
* **More Info**: [Learn more about useSetAttribute](https://developers.vwo.com/v2/docs/fme-react-attributes#usesetattribute-hook)

# Testing

When writing tests for React components that use VWO hooks like useGetFlag, you can easily mock the SDK’s hooks to control returned values and simulate different feature flag states.

Consider the following React component that uses the useGetFlag hook to check whether a feature flag is enabled and displays its status.

```typescript
import React from 'react';
import { useGetFlag } from 'vwo-fme-react-sdk';

function FeatureStatus(): JSX.Element {
  const { flag, isReady } = useGetFlag('your_feature_key');

  if (!isReady) {
    return <div>Loading feature status...</div>;
  }

  return (
    <div data-testid="feature-status">
      Feature is {flag.isEnabled() ? 'Enabled' : 'Disabled'}
    </div>
  );
}
```

Use Jest  to mock useGetFlag and VWOProvider to return controlled values, allowing you to test component behaviour under different flag conditions:

```typescript TypeScript
import { render, screen } from '@testing-library/react';

jest.mock('vwo-fme-react-sdk', () => ({
  useGetFlag: () => ({
    flag: {
      isEnabled: () => true,
      getVariable: () => 'mocked_value',
    },
    isReady: true,
  }),
  VWOProvider: ({ children }) => <>{children}</>,
}));

const FlagComponent = () => {
  const { flag, isReady } = useGetFlag('feature-key');
  if (!isReady) return null;
  return (
    <>
      <div data-testid="flag-status">{flag.isEnabled() ? 'Enabled' : 'Disabled'}</div>
      <div data-testid="flag-variable">{flag.getVariable('varKey', 'default')}</div>
    </>
  );
};

test('renders flag enabled and variable value', () => {
  render(<FlagComponent />);
  expect(screen.getByTestId('flag-status').textContent).toBe('Enabled');
  expect(screen.getByTestId('flag-variable').textContent).toBe('mocked_value');
});

```

You can also refer to the VWO FME React SDK tests [here](https://github.com/wingify/vwo-fme-react-sdk/tree/master/test) .