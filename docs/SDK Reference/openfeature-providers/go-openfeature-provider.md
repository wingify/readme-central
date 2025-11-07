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
        `openfeature.SetProviderAndWait(provider)`
      </td>

      <td>
        `provider` (instance of `VWOProvider`)
      </td>

      <td>
        **provider**: The VWO provider instance responsible for flag evaluations.
      </td>

      <td>
        Registers the VWO provider with OpenFeature and waits until it is ready.
      </td>
    </tr>

    <tr>
      <td>
        `openfeature.NewClient(name)`
      </td>

      <td>
        `name: string`
      </td>

      <td>
        **name**: A logical application or client name.
      </td>

      <td>
        Creates a new OpenFeature client used to evaluate feature flags.
      </td>
    </tr>

    <tr>
      <td>
        `openfeature.NewEvaluationContext(userID, attributes)`
      </td>

      <td>
        `userID: string` `attributes: map[string]any`
      </td>

      <td>
        **userID**: Unique identifier for the user. **attributes**: Additional data (e.g., `{ "variableKey": "stringVariableKey" }`)
      </td>

      <td>
        Defines the evaluation context for feature flag resolution.  
        Pass `variableKey` in attributes to fetch a specific variable.
      </td>
    </tr>

    <tr>
      <td>
        `client.BooleanValue(ctx, featureKey, defaultValue, evalCtx)`
      </td>

      <td>
        `ctx: context.Context, featureKey: string, defaultValue: bool,  
        evalCtx: EvaluationContext`
      </td>

      <td>
        **featureKey**: The feature flag key.  
        **defaultValue**: Returned if evaluation fails.  
        **evalCtx**: Must include `variableKey` to fetch a variable; otherwise returns feature ON/OFF.
      </td>

      <td>
        Fetches the boolean value of a feature flag.  
            Without `variableKey`, evaluates flag enabled/disabled.
      </td>
    </tr>

    <tr>
      <td>
         `client.StringValue(ctx, featureKey, defaultValue, evalCtx)`
      </td>

      <td>
        `featureKey: string`, `defaultValue: string`, `evalCtx: EvaluationContext`
      </td>

      <td>
        **evalCtx** must contain `variableKey` to return a string variable.
      </td>

      <td>
        Returns the string variable value.  
            Without `variableKey`, returns the default value.
      </td>
    </tr>

    <tr>
      <td>
        `client.IntValue(ctx, featureKey, defaultValue, evalCtx)`
      </td>

      <td>
        `featureKey: string`, `defaultValue: int64`, `evalCtx: EvaluationContext`
      </td>

      <td>
        **evalCtx** must contain `variableKey` to fetch a specific integer variable.
      </td>

      <td>
        Fetches an integer variable value.  
            Without `variableKey`, returns the default.
      </td>
    </tr>

    <tr>
      <td>
        `client.FloatValue(ctx, featureKey, defaultValue, evalCtx)`
      </td>

      <td>
        `featureKey: string`, `defaultValue: float64`, `evalCtx: EvaluationContext`
      </td>

      <td>
        **evalCtx** must include `variableKey` to get the numeric variable.
      </td>

      <td>
        Fetches a floating-point variable.  
            Without `variableKey`, returns the default.
      </td>
    </tr>

    <tr>
      <td>
         `client.ObjectValue(ctx, featureKey, defaultValue, evalCtx)`
      </td>

      <td>
        `featureKey: string`, `defaultValue: map[string]any`, `evalCtx: EvaluationContext`
      </td>

      <td>
        **evalCtx** may contain `variableKey` to fetch a specific JSON variable;  
        Otherwise, all variables are returned.
      </td>

      <td>
        Fetches JSON variable values.  
            If `variableKey` is provided, returns that variable's value; otherwise, returns the entire JSON object.
      </td>
    </tr>
  </tbody>
</Table>
