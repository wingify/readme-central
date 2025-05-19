---
title: Hooks
excerpt: Available Hooks in VWO FME React SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
The `VWO FME React SDK` provides a set of hooks to help you seamlessly integrate feature flagging, experimentation, and event tracking into your React application. These hooks are designed to provide an easy and flexible way to interact with the VWO SDK.

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

<br />

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