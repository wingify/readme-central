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

## useGetFlag

The `useGetFlag` hook is used to retrieve a feature flag and check its status. It also provides access to associated variables.

* **Usage**: Retrieve the flag and check if it is enabled for the current user.
* **More Info**: [Learn more about useGetFlag](https://developers.vwo.com/v2/docs/fme-react-feature-flags-variables#usegetflag-hook)

## useGetFlagVariable

The `useGetFlagVariable` hook allows you to fetch a specific variable associated with a feature flag.

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