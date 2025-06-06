---
title: FME Github Action
excerpt: VWO FME GitHub Action Documentation
deprecated: false
hidden: true
metadata:
  robots: index
---
## Introduction

The **VWO FME GitHub Action** enables you to evaluate feature flags in your CI/CD pipelines using the **VWO platform** (Visual Website Optimizer). It allows you to dynamically enable or disable features or retrieve feature flag values during the build process. By leveraging feature flags, you can make more flexible, robust, and dynamic applications, eliminating hardcoded values from the codebase.

This documentation provides a comprehensive guide to understand how to set up and use the VWO FME GitHub Action in your repository.

## Inputs

The following input fields need to be provided when using the VWO FME GitHub Action.

| Input Name             | Description                                                                                                                                                                                               | Required |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| **flagsWithVariables** | A JSON object containing feature flag keys and their default values. This allows you to evaluate multiple feature flags with associated variables. Example: `{"featureA": {"variableA": "defaultValue"}}` | Yes      |
| **userContext**        | A JSON object describing the context of the user for whom the feature flag needs to be evaluated. This helps determine which flag state the user should receive. Example: `{"id": "userId"}`              | Yes      |
| **sdkInitOptions**     | An optional JSON object for configuring the VWO SDK. This could include logger settings, network options, etc. Example: `{"logger": {"level": "DEBUG"}}`                                                  | No       |

## Outputs

The action will provide the following outputs that can be referenced in subsequent steps of your GitHub Actions workflow.

| Output Name              | Description                                                                                                                                                                                                |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **flagKey**              | The status of the evaluated feature flag, either `true` or `false`. Example: `${{ steps.vwo_action.outputs.featureA }}`. This represents the result of the flag evaluation.                                |
| **flagKey\_variableKey** | The value of the associated variable for the feature flag. Example: `${{ steps.vwo_action.outputs.featureA_variableA }}`. This allows you to get the value assigned for variables inside the feature flag. |

> Note: The output keys (`flagKey` and `flagKey_variableKey`) are dynamic and will change based on the feature flags you're working with. For example, if your feature flag is named `featureA`, you can access its status as `${{ steps.vwo_action.outputs.featureA }}` and the variable value as `${{ steps.vwo_action.outputs.featureA_variableA }}`.

## Environment Variables

The action requires the following environment variables to be set for the VWO SDK initialization:

| Environment Variable | Description                                                                                                           | Required |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------- | :------- |
| **VWO\_SDK\_KEY**    | The SDK key is used to initialize the VWO SDK. This key is required for the action to interact with the VWO platform. | Yes      |
| **VWO\_ACCOUNT\_ID** | The account ID of the VWO project. This ID is used to identify the VWO account associated with the feature flags.     | Yes      |

You should store the `VWO_SDK_KEY` and `VWO_ACCOUNT_ID` securely in your GitHub repository’s secrets (e.g., `${{ secrets.VWO_SDK_KEY }})`.

## Usage Example

Below is an example of how to use the VWO FME GitHub Action in a GitHub Actions workflow:

```yaml
name: Feature Flag Management

on:
  push:
    branches:
      - main

jobs:
  feature-flag-evaluation:
    runs-on: ubuntu-latest
    steps:
      - name: Evaluate Feature Flags
        uses: wingify/vwo-fme-github-action@v1.1.0
        with:
          flagsWithVariables: |
            {
              "feature-flag-key-1": {
                "variable-key-1": "variable-default-value"
              },
              "feature-flag-key-2": {
                "variable-key-1": "variable-default-value"
              }
            }
          userContext: |
            {
              "id": "your-user-id"
            }
          sdkInitOptions: |
            {
              "logger": {
                "level": "DEBUG"
              }
            }
        env:
          VWO_SDK_KEY: ${{ secrets.VWO_SDK_KEY }}
          VWO_ACCOUNT_ID: ${{ secrets.VWO_ACCOUNT_ID }}

```

Explanation:

* The workflow is triggered on a `push` event to the `main` branch.
* The `Evaluate Feature Flags` step uses the `VWO FME GitHub Action` to evaluate the feature flags for a user with the specified context (`userContext`).
* Feature flags are specified in the `flagsWithVariables` input as JSON, where each key represents a feature flag and its associated variable values.
* The `sdkInitOptions` input allows for optional SDK configuration.
* The VWO SDK credentials (`VWO_SDK_KEY` and `VWO_ACCOUNT_ID`) are passed securely using GitHub secrets.