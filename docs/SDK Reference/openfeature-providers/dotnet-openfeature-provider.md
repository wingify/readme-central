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

<Cards columns={4}>
  <Card title="GitHub Repo" icon="fa-code-commit">
    Check <a href="https://github.com/wingify/vwo-openfeature-provider-dotnet" target="_blank">this</a> out
  </Card>

  <Card title="Published On" icon="fa-download">
    Check <a href="https://www.nuget.org/packages/VWO.OpenFeature.Provider" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Website" icon="fa-globe-pointer">
    Check <a href="https://openfeature.dev/docs/reference/technologies/server/dotnet" target="_blank">this</a> out
  </Card>

  <Card title="OpenFeature Docs" icon="fa-book-open">
    Check <a href="https://openfeature.dev/ecosystem?instant_search%5Bquery%5D=vwo%20.net" target="_blank">this</a> out
  </Card>
</Cards>

| Resource                | Link                                                                                                                                              |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| GitHub repository       | [https://github.com/wingify/vwo-openfeature-provider-dotnet](https://github.com/wingify/vwo-openfeature-provider-dotnet)                          |
| Published on            | [https://www.nuget.org/packages/VWO.OpenFeature.Provider](https://www.nuget.org/packages/VWO.OpenFeature.Provider)                                |
| OpenFeature .NET docs   | [https://openfeature.dev/docs/reference/technologies/server/dotnet](https://openfeature.dev/docs/reference/technologies/server/dotnet)            |
| openfeature.dev website | [https://openfeature.dev/ecosystem?instant\_search%5Bquery%5D=vwo%20.net](https://openfeature.dev/ecosystem?instant_search%5Bquery%5D=vwo%20.net) |

> 🚧 **Warning**
>
> **Note:** This library is intended to be used in server-side contexts and has not been evaluated for use on mobile devices.

## Requirements

.NET 6.0+

## SDK Installation

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
        `VWO.Init`
      </td>

      <td>
        `VWOInitOptions vwoInitOptions`
      </td>

      <td>
        * *SdkKey : Unique key for authentication with VWO.<br />  AccountId : VWO account identifier.  <br />  Logger*\*: Dictionary defining logging level.
      </td>

      <td>
        Initializes the VWO client with the provided SDK key, account ID, and logging options.
      </td>
    </tr>

    <tr>
      <td>
        `new VWOProvider(vwoClient)`
      </td>

      <td>
        `vwoClient: VWO`
      </td>

      <td>
        * *vwoClient*\*: The initialized VWO SDK client instance.
      </td>

      <td>
        Creates a new instance of `VWOProvider`, integrating VWO with OpenFeature.
      </td>
    </tr>

    <tr>
      <td>
        `Api.Instance.GetClient()`
      </td>

      <td>
        None
      </td>

      <td>
        * <br />
      </td>

      <td>
        Returns an OpenFeature client instance that is used for feature flag evaluations.
      </td>
    </tr>

    <tr>
      <td>
        `EvaluationContext.Builder()`
      </td>

      <td>
        None
      </td>

      <td>
        * <br />
      </td>

      <td>
        Creates a builder instance to construct an `EvaluationContext`.
      </td>
    </tr>

    <tr>
      <td>
        ```
        context.Set("key",
        new Value("variable-key"))
        ```
      </td>

      <td>
        `"key": string, "value": Value`
      </td>

      <td>
        * *key : The attribute key to set.<br />  value*\*: The value associated with the key.
      </td>

      <td>
        Sets a key-value pair inside the evaluation context.
      </td>
    </tr>

    <tr>
      <td>
        `context.Build()`
      </td>

      <td>
        None
      </td>

      <td>
        * <br />
      </td>

      <td>
        Finalizes the `EvaluationContext` with set attributes.
      </td>
    </tr>

    <tr>
      <td>
        ```
        await Api.Instance.SetProviderAsync(
        vwoProvider)
        ```
      </td>

      <td>
        `vwoProvider: VWOProvider`
      </td>

      <td>
        * *vwoProvider*\*: The VWO provider instance that will handle feature flag evaluations.
      </td>

      <td>
        Asynchronously sets the provider for OpenFeature, enabling it to evaluate feature flags using VWO.
      </td>
    </tr>

    <tr>
      <td>
        `await client.GetBooleanValueAsync`
      </td>

      <td>
        `featureKey: string, defaultValue: bool, context: EvaluationContext`
      </td>

      <td>
        * *featureKey : The unique key representing the feature flag.<br />  defaultValue : The fallback boolean value if the flag evaluation fails.  <br />  context*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Asynchronously fetches the boolean value of a feature flag.
      </td>
    </tr>

    <tr>
      <td>
        `await client.GetStringValueAsync`
      </td>

      <td>
        `featureKey: string, defaultValue: string, context: EvaluationContext`
      </td>

      <td>
        * *featureKey : The unique key representing the feature flag.<br />  defaultValue : The fallback string value if the flag evaluation fails.  <br />  context*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Asynchronously fetches the string value of a feature flag.
      </td>
    </tr>

    <tr>
      <td>
        `await client.GetIntegerValueAsync`
      </td>

      <td>
        `featureKey: string, defaultValue: int, context: EvaluationContext`
      </td>

      <td>
        * *featureKey : The unique key representing the feature flag.<br />  defaultValue : The fallback integer value if the flag evaluation fails.  <br />  context*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Asynchronously fetches the integer value of a feature flag.
      </td>
    </tr>

    <tr>
      <td>
        `await client.GetDoubleValueAsync`
      </td>

      <td>
        `featureKey: string, defaultValue: double, context: EvaluationContext`
      </td>

      <td>
        * *featureKey : The unique key representing the feature flag.<br />  defaultValue : The fallback float value if the flag evaluation fails.  <br />  context*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Asynchronously fetches the float value of a feature flag.
      </td>
    </tr>

    <tr>
      <td>
        `await client.GetObjectValueAsync`
      </td>

      <td>
        `featureKey: string, defaultValue: Value, context: EvaluationContext`
      </td>

      <td>
        * *featureKey : The unique key representing the feature flag.<br />  defaultValue : The fallback object if the flag evaluation fails.  <br />  context*\*: The evaluation context containing user details and attributes.
      </td>

      <td>
        Asynchronously fetches the object value of a feature flag.
      </td>
    </tr>
  </tbody>
</Table>