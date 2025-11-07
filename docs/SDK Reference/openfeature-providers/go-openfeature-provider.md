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

  <Card title="OpenFeature Ecosystem" icon="fa-globe-pointer">
    Check <a href="https://openfeature.dev/ecosystem?instant_search%5Bquery%5D=vwo%20go" target="_blank">this</a> out
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
