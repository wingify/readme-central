---
title: .NET Provider
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
## Get Started

An **OpenFeature Provider** is a **pluggable integration layer** that connects the **OpenFeature SDK** to a specific **feature flag management system** (e.g., VWO or custom in-house solutions). OpenFeature is an open-source standard for feature flagging, designed to provide a **vendor-agnostic** approach, enabling organizations to switch between feature flagging tools without rewriting application code.

This VWO Openfeature Provider for .NET helps you integrate feature management and experimentation systems within your .NET-based server applications.

| Resource              | Link                                                                |
| :-------------------- | :------------------------------------------------------------------ |
| GitHub repository     | <https://github.com/wingify/vwo-openfeature-provider-dotnet>        |
| Published on          | <https://www.nuget.org/packages/VWO.OpenFeature.Provider>           |
| Openfeature .NET docs | <https://openfeature.dev/docs/reference/technologies/server/dotnet> |

> 🚧 Please Note
> 
> This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

.NET 6.0+

## SDK Installation

```shell Shell
dotnet add package VWO.OpenFeature.Provider
```

## Usage

```csharp C#
using OpenFeature;
using OpenFeature.Model;
using VWOOpenFeatureProvider;
using VWOFmeSdk;
using VWOFmeSdk.Models.User;

static async Task Main(string[] args)
{
    var vwoInitOptions = new VWOInitOptions
    {
        SdkKey = "your-sdk-key-here",     // Replace with your SDK Key
        AccountId = 123456,               // Replace with your VWO Account ID
        Logger = new Dictionary<string, object>
        {
            { "level", "ERROR" }         // Logging level
        }
    };

    // Initialize the VWO client
    var vwoClient = VWO.Init(vwoInitOptions);

    // Initialize the VWO Provider
    var vwoProvider = new VWOProvider(vwoClient);

    // Get the client from OpenFeature API
    var client = Api.Instance.GetClient();

    // Test feature flags with variable key values
    await TestFlags();
}
static async Task TestFlags(FeatureClient client, EvaluationContext context)
{

    // Setting up the EvaluationContext
    var context = EvaluationContext.Builder()
        .Set("targetingKey", new Value("user-id"))
        .Set("key", new Value("variable-key")) // Replace with your variable key
        .Build();

    // Set the provider using OpenFeature API
    await Api.Instance.SetProviderAsync(vwoProvider);

    // Test boolean flag
    var boolResult = await client.GetBooleanValueAsync("feature-boolean", false, context);
    Console.WriteLine($"BOOL result: {boolResult}");

    // Test string flag
    var stringResult = await client.GetStringValueAsync("feature-string", "defaultString", context);
    Console.WriteLine($"STRING result: {stringResult}");

    // Test integer flag
    var intResult = await client.GetIntegerValueAsync("feature-integer", 0, context);
    Console.WriteLine($"INTEGER result: {intResult}");

    // Test float flag
    var floatResult = await client.GetDoubleValueAsync("feature-float", 0.0, context);
    Console.WriteLine($"FLOAT result: {floatResult}");

    // Test object flag
    var objectResult = await client.GetObjectValueAsync("feature-object", new Value(new Structure(new Dictionary<string, Value>())), context);
    Console.WriteLine($"OBJECT result: {objectResult}");
}
```

## API Details

[block:parameters]
{
  "data": {
    "h-0": "API",
    "h-1": "Arguments",
    "h-2": "Argument Description",
    "h-3": "API Description",
    "0-0": "`VWO.Init`",
    "0-1": "`VWOInitOptions vwoInitOptions`",
    "0-2": "**SdkKey**: Unique key for authentication with VWO.<br>**AccountId**: VWO account identifier.<br>**Logger**: Dictionary defining logging level.",
    "0-3": "Initializes the VWO client with the provided SDK key, account ID, and logging options.",
    "1-0": "`new VWOProvider(vwoClient)`",
    "1-1": "`vwoClient: VWO`",
    "1-2": "**vwoClient**: The initialized VWO SDK client instance.",
    "1-3": "Creates a new instance of `VWOProvider`, integrating VWO with OpenFeature.",
    "2-0": "`Api.Instance.GetClient()`",
    "2-1": "None",
    "2-2": "-",
    "2-3": "Returns an OpenFeature client instance that is used for feature flag evaluations.",
    "3-0": "`EvaluationContext.Builder()`",
    "3-1": "None",
    "3-2": "-",
    "3-3": "Creates a builder instance to construct an `EvaluationContext`.",
    "4-0": "`context.Set(\"key\",\nnew Value(\"variable-key\"))`",
    "4-1": "`\"key\": string, \"value\": Value`",
    "4-2": "**key**: The attribute key to set.<br>**value**: The value associated with the key.",
    "4-3": "Sets a key-value pair inside the evaluation context.",
    "5-0": "`context.Build()`",
    "5-1": "None",
    "5-2": "-",
    "5-3": "Finalizes the `EvaluationContext` with set attributes.",
    "6-0": "`await Api.Instance.SetProviderAsync(\nvwoProvider)`",
    "6-1": "`vwoProvider: VWOProvider`",
    "6-2": "**vwoProvider**: The VWO provider instance that will handle feature flag evaluations.",
    "6-3": "Asynchronously sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.",
    "7-0": "`await client.GetBooleanValueAsync`",
    "7-1": "`featureKey: string, defaultValue: bool, context: EvaluationContext`",
    "7-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback boolean value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "7-3": "Asynchronously fetches the boolean value of a feature flag.",
    "8-0": "`await client.GetStringValueAsync`",
    "8-1": "`featureKey: string, defaultValue: string, context: EvaluationContext`",
    "8-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback string value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "8-3": "Asynchronously fetches the string value of a feature flag.",
    "9-0": "`await client.GetIntegerValueAsync`",
    "9-1": "`featureKey: string, defaultValue: int, context: EvaluationContext`",
    "9-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback integer value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "9-3": "Asynchronously fetches the integer value of a feature flag.",
    "10-0": "`await client.GetDoubleValueAsync`",
    "10-1": "`featureKey: string, defaultValue: double, context: EvaluationContext`",
    "10-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback float value if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "10-3": "Asynchronously fetches the float value of a feature flag.",
    "11-0": "`await client.GetObjectValueAsync`",
    "11-1": "`featureKey: string, defaultValue: Value, context: EvaluationContext`",
    "11-2": "**featureKey**: The unique key representing the feature flag.<br>**defaultValue**: The fallback object if the flag evaluation fails.<br>**context**: The evaluation context containing user details and attributes.",
    "11-3": "Asynchronously fetches the object value of a feature flag."
  },
  "cols": 4,
  "rows": 12,
  "align": [
    null,
    null,
    null,
    null
  ]
}
[/block]