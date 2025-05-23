---
title: Testing SDK Hooks and Provider
deprecated: false
hidden: false
metadata:
  robots: index
---
When writing tests for React components that use VWO hooks like `useGetFlag`, you can easily mock the SDK’s hooks to control returned values and simulate different feature flag states.

Consider the following React component that uses the `useGetFlag` hook to check whether a feature flag is enabled and displays its status.

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

Use `Jest`  to mock `useGetFlag` and `VWOProvider` to return controlled values, allowing you to test component behaviour under different flag conditions:

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