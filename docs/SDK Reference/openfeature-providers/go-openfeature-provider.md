---
title: Go Provider
deprecated: false
hidden: true
metadata:
  robots: index
---
## Get Started

An **OpenFeature Provider** is a **pluggable integration layer** that connects the **OpenFeature SDK** to a specific **feature flag management system** (e.g., VWO or custom in-house solutions). OpenFeature is an open-source standard for feature flagging, designed to provide a **vendor-agnostic** approach, enabling organizations to switch between feature flagging tools without rewriting application code.

This VWO OpenFeature Provider for Go helps you integrate Feature Experimentation systems into your Go-based applications.

<Cards columns={4}>
  <Card title="GitHub Repo" icon="fa-code-commit">
    Check <a href="https://github.com/wingify/vwo-openfeature-provider-go" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Docs" icon="fa-book-open">
    Check <a href="https://openfeature.dev/docs/reference/technologies/server/go/" target="_blank">this</a> out
  </Card>
</Cards>

> 🚧 **Note**
>
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

Go 1.24

## SDK Installation

```shell
go get github.com/wingify/vwo-openfeature-provider-go
```

## Usage

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/open-feature/go-sdk/openfeature"
    vwo "github.com/wingify/vwo-openfeature-provider-go/pkg"
)

func main() {
    provider, err := vwo.NewVWOProviderWithConfig(map[string]interface{}{
        "sdkKey":    "<your-vwo-sdk-key>",
        "accountId": "<your-vwo-account-id>",
    })
    if err != nil {
        log.Fatalf("Failed to create VWO feature provider: %v", err)
    }

    openfeature.SetProviderAndWait(provider)
    client := openfeature.NewClient("my-app")

    // Evaluate a boolean flag. If no variableKey is provided, this returns flag enabled/disabled.
    ctx := openfeature.NewEvaluationContext("unique-user-id", map[string]any{"variableKey": "booleanVariableKey"})
    enabled, err := client.BooleanValue(context.Background(), "featureKey", false, ctx)
    if err != nil {
        log.Fatalf("Failed to get boolean value: %v", err)
    }
    fmt.Println("Enabled:", enabled)

    // Evaluate typed variables by passing variableKey in the evaluation context
    // String variable
    ctx = openfeature.NewEvaluationContext("unique-user-id", map[string]any{"variableKey": "stringVariableKey"})
    strVal, _ := client.StringValue(context.Background(), "featureKey", "default", ctx)
    fmt.Println("String value:", strVal)

    // Integer variable
    ctx = openfeature.NewEvaluationContext("unique-user-id", map[string]any{"variableKey": "integerVariableKey"})
    intVal, _ := client.IntValue(context.Background(), "featureKey", 0, ctx)
    fmt.Println("Int value:", intVal)

    // Float variable
    ctx = openfeature.NewEvaluationContext("unique-user-id", map[string]any{"variableKey": "floatVariableKey"})
    floatVal, _ := client.FloatValue(context.Background(), "featureKey", 0.0, ctx)
    fmt.Println("Float value:", floatVal)

    // JSON variable
    ctx = openfeature.NewEvaluationContext("unique-user-id", map[string]any{"variableKey": "jsonVariableKey"})
    jsonVal, _ := client.ObjectValue(context.Background(), "featureKey", map[string]any{}, ctx)
    fmt.Println("JSON value:", jsonVal)
}
```

## API Details

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        API
      </th>

      <th>
        Arguments
      </th>

      <th>
        Argument Description
      </th>

      <th>
        API Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        `vwo.NewVWOProviderWithConfig(config)`
      </td>

      <td>
        `config: map[string]interface{}`
      </td>

      <td>
        **config**: Configuration object containing: `sdkKey` your VWO SDK key and `accountId`your VWO account ID
      </td>

      <td>
        Creates a new instance of `VWOProvider`, enabling integration of VWO with OpenFeature in Go.
      </td>
    </tr>

    <tr>
      <td>
        `OpenFeature.setProvider(vwo_provider)`
      </td>

      <td>
        `provider` (Instance of `VWOProvider`)
      </td>

      <td>
        **provider**: The VWO provider instance that will handle feature flag evaluations.
      </td>

      <td>
        Sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.
      </td>
    </tr>

    <tr>
      <td>
        `client.set_context(context)`
      </td>

      <td>
        `context: object`
      </td>

      <td>
        **context**: Contains user details (e.g., `{ user: { id: 'unique-user-id' } }`).
      </td>

      <td>
        Sets the evaluation context for feature flag evaluations, helping with user-based targeting.
      </td>
    </tr>

    <tr>
      <td>
        `client.get_boolean_value`
      </td>

      <td>
        `feature_key: string, default_value: boolean, context: object`
      </td>

      <td>
        **feature_key**: The unique key representing the feature flag.<br />
        **default_value**: The fallback boolean value if the flag evaluation fails.<br />
        **context**: The evaluation context containing user details and an optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the boolean value of a feature flag. If `key` is present in `context`, it retrieves a specific variable; otherwise, it returns whether the feature is enabled.
      </td>
    </tr>

    <tr>
      <td>
        `client.get_string_value`
      </td>

      <td>
        `feature_key: string, default_value: string, context: object`
      </td>

      <td>
        **feature_key**: The unique key representing the feature flag.<br />
        **default_value**: The fallback string value if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the string value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>

    <tr>
      <td>
        `client.get_number_value`
      </td>

      <td>
        `feature_key: string, default_value: number, context: object`
      </td>

      <td>
        **feature_key**: The unique key representing the feature flag.<br />
        **default_value**: The fallback numeric value if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the numeric value of a feature flag. Requires `key` in `context` to return a specific variable's value; otherwise, returns `undefined`.
      </td>
    </tr>

    <tr>
      <td>
        `client.get_object_value`
      </td>

      <td>
        `feature_key: string, default_value: object, context: object`
      </td>

      <td>
        **feature_key**: The unique key representing the feature flag.<br />
        **default_value**: The fallback JSON object if the flag evaluation fails.<br />
        **context**: The evaluation context with user details and optional `key` to fetch a specific variable.
      </td>

      <td>
        Fetches the JSON object value of a feature flag. If `key` is provided in `context`, it retrieves a specific variable value; otherwise, it returns all JSON variables.
      </td>
    </tr>
  </tbody>
</Table>
